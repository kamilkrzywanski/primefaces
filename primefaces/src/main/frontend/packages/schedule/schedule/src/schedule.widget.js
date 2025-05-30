import { Calendar } from "@fullcalendar/core";
import allLocales from "@fullcalendar/core/locales-all.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import timeGridPlugin from "@fullcalendar/timegrid";

/**
 * __PrimeFaces Schedule Widget__
 * 
 * Schedule provides an Outlook Calendar, iCal like Faces component to manage events.
 * 
 * @typedef PrimeFaces.widget.Schedule.ScheduleExtender Name of JavaScript function to extend the options of the
 * underlying FullCalendar plugin. Access the this schedule widget via the this context, and change the FullCalendar
 * configuration stored in `this.cfg`. See also {@link ScheduleCfg.extender}.
 * @this {PrimeFaces.widget.Schedule} PrimeFaces.widget.Schedule.ScheduleExtender 
 * 
 * @prop {import("@fullcalendar/core").Calendar} [calendar] The current full calendar instance. May be `undefined` when
 * the widget exists, but was not yet rendered, such as when inside a non-active tab.
 * @prop {string | null} [doubleClick] The clicked date, used internally when an event was clicked to detect
 * a double click.
 * @prop {number | null} [clickTimer] Timeout ID, used internally when an event was clicked to detect a double
 * click.
 * @prop {JQuery} [tip] The DOM element for the tooltip.
 * @prop {number} [tipTimeout] The set-time   out timer ID for displaying a delayed tooltip.
 * @prop {JQuery} viewNameState The DOM element for the hidden input storing the current view state.
 * 
 * @interface {PrimeFaces.widget.ScheduleCfg} cfg The configuration for the {@link  Schedule| Schedule widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.DeferredWidgetCfg} cfg
 * 
 * @prop {PrimeFaces.widget.Schedule.ScheduleExtender} cfg.extender Name of JavaScript function to extend the options of
 * the underlying FullCalendar plugin. Access the this schedule widget via the this context, and change the FullCalendar
 * configuration stored in `this.cfg`.
 * @prop {import("@fullcalendar/core").CalendarOptions} cfg.options The configuration object that is passed to the
 * FullCalendar upon initialization.
 * @prop {string} cfg.locale Locale code of the locale for the FullCalendar, such as `de` or `en`.
 * @prop {boolean} cfg.noOpener Whether for URL events access to the opener window from the target site should be
 * prevented (phishing protection), default value is `true`.
 * @prop {boolean} cfg.themeSystem Theme system used for rendering the calendar.
 * @prop {boolean} cfg.tooltip Whether a tooltip should be displayed on hover.
 * @prop {string} cfg.urlTarget Target for events with urls. Clicking on such events in the schedule will not trigger the
 * `selectEvent` but open the url using this target instead. Default is `_blank`.
 */
PrimeFaces.widget.Schedule = class Schedule extends PrimeFaces.widget.DeferredWidget {

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init(cfg) {
        super.init(cfg);
        this.cfg.options.themeSystem = 'standard';
        this.cfg.options.slotLabelFormat = this.cfg.options.slotLabelFormat || undefined; 
        this.cfg.options.viewClassNames = this.onViewChange.bind(this);
        this.viewNameState = $(this.jqId + '_view');
        this.cfg.urlTarget = this.cfg.urlTarget || "_blank";
        this.cfg.options.plugins = [
            interactionPlugin, 
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            momentPlugin,
            momentTimezonePlugin
        ];

        this.setupEventSource();

        this.configureLocale();

        if(this.cfg.tooltip) {
            this.tip = $('<div class="ui-tooltip ui-widget ui-widget-content ui-shadow"></div>').appendTo(document.body);
            this.addDestroyListener(function(){this.tip.remove();});
            this.addRefreshListener(function(){this.tip.remove();});
        }

        this.setupEventHandlers();

        if(this.cfg.extender) {
            this.cfg.extender.call(this);
        }

        this.setViewOptions();

        this.renderDeferred();

        // must be done after FullCalendar is built
        this.setupTitlebarHandlers();
    }

    /**
     * @include
     * @override
     * @protected
     * @inheritdoc
     */
    _render() {
        var _self = this;
        var calendarEl = document.getElementById(this.cfg.id);
        _self.calendar = new Calendar(calendarEl, this.cfg.options);
        _self.calendar.render();
    }

    /**
     * Localizes certain aspects of FullCalendar that are exposed. The rest are configured by "locale"
     * setting and FullCalendar and Moment translations for that locale.
     * @private
     */
    configureLocale() {
        var options = this.cfg.options;

        // #6496 must add all locales
        options.locales = allLocales;

        var lang = PrimeFaces.locales[this.cfg.locale];
        if (lang) {
            if (lang.firstDayOfWeek !== undefined) { options.firstDay = lang.firstDayOfWeek; }
            if (lang.weekNumberTitle) { options.weekText = lang.weekNumberTitle; }
            if (lang.allDayText) { options.allDayText = lang.allDayText; }
            if (lang.moreLinkText) { options.moreLinkText = lang.moreLinkText; }
            if (lang.noEventsText) { options.noEventsText = lang.noEventsText; }
            
            var buttonText = options.buttonText || {};
            if (lang.aria.previous) { buttonText.prev = lang.aria.previous; }
            if (lang.aria.next) { buttonText.next = lang.aria.next; }
            if (lang.today) { buttonText.today = lang.today; }
            if (lang.year) { buttonText.year = lang.year; }
            if (lang.month) { buttonText.month = lang.month; }
            if (lang.week) { buttonText.week = lang.week; }
            if (lang.day) { buttonText.day = lang.day; }
            if (lang.list) { buttonText.list = lang.list; }
            options.buttonText = buttonText;
        }
    }
    
    /**
     * Creates and sets the event listeners for the full calendar.
     * @private
     */
    setupEventHandlers() {
        var $this = this;

        this.cfg.options.dateClick = function(dateClickInfo) {
            var currentDate = dateClickInfo.date.toISOString();
            var ext = {
                params: [{
                    name: $this.id + '_selectedDate',
                    value: currentDate
                }]
            };

            if ($this.doubleClick === currentDate) {
                $this.doubleClick = null;
                if ($this.hasBehavior('dateDblSelect')) {
                    $this.callBehavior('dateDblSelect', ext);
                }
            } else {
                $this.doubleClick = currentDate;
                clearInterval($this.clickTimer);
                $this.clickTimer = setInterval(function() {
                    $this.doubleClick = null;
                    clearInterval($this.clickTimer);
                    $this.clickTimer = null;
                }, 500);

                if ($this.hasBehavior('dateSelect')) {
                    $this.callBehavior('dateSelect', ext);
                }
            }
        };
        
        this.cfg.options.eventClick = function(eventClickInfo) {
            if (eventClickInfo.event.url) {
                var targetWindow = window.open('', $this.cfg.urlTarget);
                if ($this.cfg.noOpener) {
                    targetWindow.opener = null;    
                }
                targetWindow.location = eventClickInfo.event.url;
                eventClickInfo.jsEvent.preventDefault(); // don't let the browser navigate
                return false;
            }
            
            var eventId = eventClickInfo.event.id;
            var ext = {
                    params: [
                        {name: $this.id + '_selectedEventId', value: eventId}
                    ]
            };
            
            if ($this.doubleClick === eventId) {
                $this.doubleClick = null;
                if ($this.hasBehavior('eventDblSelect')) {
                    $this.callBehavior('eventDblSelect', ext);
                }
            } else {
                $this.doubleClick = eventId;
                clearInterval($this.clickTimer);
                $this.clickTimer = setInterval(function() {
                    $this.doubleClick = null;
                    clearInterval($this.clickTimer);
                    $this.clickTimer = null;
                }, 500);

                if ($this.hasBehavior('eventSelect')) {
                    $this.callBehavior('eventSelect', ext);
                }
            }
        };

        this.cfg.options.eventDrop = function(eventDropInfo) {
            if($this.hasBehavior('eventMove')) {
                var ext = {
                    params: [
                        {name: $this.id + '_movedEventId', value: eventDropInfo.event.id},
                        {name: $this.id + '_yearDelta', value: eventDropInfo.delta.years},
                        {name: $this.id + '_monthDelta', value: eventDropInfo.delta.months},
                        {name: $this.id + '_dayDelta', value: eventDropInfo.delta.days},
                        {name: $this.id + '_minuteDelta', value: (eventDropInfo.delta.milliseconds/60000)},
                        {name: $this.id + '_allDay', value: (eventDropInfo.event.allDay)}
                    ]
                };

                $this.callBehavior('eventMove', ext);
            }
        };

        this.cfg.options.eventResize = function(eventResizeInfo) {
            if($this.hasBehavior('eventResize')) {
                var ext = {
                    params: [
                        {name: $this.id + '_resizedEventId', value: eventResizeInfo.event.id},
                        {name: $this.id + '_startDeltaYear', value: eventResizeInfo.startDelta.years},
                        {name: $this.id + '_startDeltaMonth', value: eventResizeInfo.startDelta.months},
                        {name: $this.id + '_startDeltaDay', value: eventResizeInfo.startDelta.days},
                        {name: $this.id + '_startDeltaMinute', value: (eventResizeInfo.startDelta.milliseconds/60000)},
                        {name: $this.id + '_endDeltaYear', value: eventResizeInfo.endDelta.years},
                        {name: $this.id + '_endDeltaMonth', value: eventResizeInfo.endDelta.months},
                        {name: $this.id + '_endDeltaDay', value: eventResizeInfo.endDelta.days},
                        {name: $this.id + '_endDeltaMinute', value: (eventResizeInfo.endDelta.milliseconds/60000)}
                    ]
                };

                $this.callBehavior('eventResize', ext);
            }
        };

        if (this.cfg.options.selectable) {
            this.cfg.options.select = function(selectionInfo) {
                if ($this.hasBehavior('rangeSelect')) {
                    var ext = {
                        params: [
                            { name: $this.id + '_startDate', value: selectionInfo.start.toISOString() },
                            { name: $this.id + '_endDate', value: selectionInfo.end.toISOString() }
                        ]
                    };

                    $this.callBehavior('rangeSelect', ext);
                }
            };
        };

        if(this.cfg.tooltip) {
            this.cfg.options.eventMouseEnter = function(mouseEnterInfo) {
                if(mouseEnterInfo.event.extendedProps.description) {
                    $this.tipTimeout = PrimeFaces.queueTask(function() {
                        $this.tip.css({
                            'left': mouseEnterInfo.jsEvent.pageX + 'px',
                            'top': (mouseEnterInfo.jsEvent.pageY + 15) + 'px',
                            'z-index': PrimeFaces.nextZindex()
                        });
                        $this.tip[0].innerHTML = mouseEnterInfo.event.extendedProps.description;
                        $this.tip.show();
                    }, 150);
                }
            };

            this.cfg.options.eventMouseLeave = function(mouseLeaveInfo) {
                if($this.tipTimeout) {
                    clearTimeout($this.tipTimeout);
                }

                if($this.tip.is(':visible')) {
                    $this.tip.hide();
                    $this.tip.text('');
                }
            };
        } else {
            // PF #2795 default to regular tooltip
            this.cfg.options.eventDidMount = function(info) {
                if(info.event.description) {
                    element.attr('title', info.event.description);
                }
            };
        }
    }

    /**
     * Creates and sets the event listeners for the previous, next, and today buttons in the title bar.
     * @private
     */
    setupTitlebarHandlers() {
        var $this = this;
        $('.fc-prev-button, .fc-next-button, .fc-today-button').on('click.' + this.id, function() {
            $this.callBehavior('viewChange');
        });
    }

    /**
     * Creates the event listeners for the FullCalendar events.
     * @private
     */
    setupEventSource() {
        var $this = this;

        this.cfg.options.events = function(fetchInfo, successCallback) {
            // #13346 - schedule events must be called after the viewChange event is fired
            PrimeFaces.queueTask(() => {
                var options = {
                    source: $this.id,
                    process: $this.id,
                    update: $this.id,
                    ignoreAutoUpdate: true,
                    formId: $this.getParentFormId(),
                    params: [
                        {name: $this.id + '_event', value: true},
                        {name: $this.id + '_start', value: fetchInfo.start.toISOString()},
                        {name: $this.id + '_end', value:  fetchInfo.end.toISOString()}
                    ],
                    onsuccess: function(responseXML, status, xhr) {
                        PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                            widget: $this,
                            handle: function(content) {
                                successCallback(JSON.parse(content).events);
                            }
                        });
    
                        return true;
                    }
                };
                PrimeFaces.ajax.Request.handle(options)
            });
        };
    }

    /**
     * Updates and refreshes the schedule view.
     */
    update() {
        var _self = this;
        _self.calendar.refetchEvents();
    }

    /**
     * The event listener for when the user switches the to a different view (month view, week day, or time view).
     * Updates the hidden input field with the current view name. Used for restoring the view after an AJAX update.
     * @param {import("@fullcalendar/common").ViewContentArg} arg Event data passed by FullCalendar when the view
     * changes.
     * @private
     */
    onViewChange(arg) {
        this.viewNameState.val(arg.view.type);
        this.callBehavior('viewChange');
    }

    /**
     * Creates and sets the view options for FullCalendar on this widget configuration.
     * @private
     */
    setViewOptions() {
        var views = {
            month: {},
            week: {},
            day: {},
            dayGrid: {},
            timeGrid: {},
            list: {},
            dayGridMonth: {},
            dayGridWeek: {},
            dayGridDay: {},
            timeGridWeek: {},
            timeGridDay: {},
            listYear: {},
            listMonth: {},
            listDay: {}
        };

        var columnFormat = this.cfg.columnFormatOptions;
        if(columnFormat) {
            for (var view in views) {
                views[view] = {dayHeaderFormat: columnFormat[view]};
            }
        }

        // Using this.cfg.views was a bug, but fall back to that for backwards compatibility
        // Can be removed in the next major release
        this.cfg.options.views = this.cfg.options.views || this.cfg.views || {};
        $.extend(true, this.cfg.options.views, views);
    }

}
