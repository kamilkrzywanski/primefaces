/**
 * __PrimeFaces SelectManyButton Widget__
 * 
 * SelectManyButton is a multi select component using button UI.
 * 
 * @prop {JQuery} buttons The DOM elements for the selectable buttons.
 * @prop {boolean} [disabled] `true` if this many select element is disabled, `false` if enabled, `undefined`
 * if the state is not known.
 * @prop {JQuery} inputs The DOM elements for the hidden input fields of type checkbox storing which buttons are
 * selected.
 * 
 * @interface {PrimeFaces.widget.SelectManyButtonCfg} cfg The configuration for the {@link  SelectManyButton| SelectManyButton widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.BaseWidgetCfg} cfg
 */
PrimeFaces.widget.SelectManyButton = class SelectManyButton extends PrimeFaces.widget.BaseWidget {

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init(cfg) {
        super.init(cfg);

        this.buttons = this.jq.children('div:not(.ui-state-disabled)');
        this.inputs = this.jq.find(':checkbox:not(:disabled)');
        this.bindEvents();

        //pfs metadata
        this.inputs.data(PrimeFaces.CLIENT_ID_DATA, this.id);
    }

    /**
     * Sets up all event listeners required by this widget.
     * @private
     */
    bindEvents() {
        this.buttons.on('mouseover', function() {
            var button = $(this);
            if(!button.hasClass('ui-state-active')) {
                button.addClass('ui-state-hover');
            }
        })
        .on('mouseout', function() {
            $(this).removeClass('ui-state-hover');
        })
        .on('click', function(e) {
            var button = $(this),
            input = button.children(':checkbox');

            if(button.hasClass('ui-state-active'))
                button.addClass('ui-state-hover');
            else
                button.removeClass('ui-state-hover');
            
            input.trigger('focus').trigger('click');
        });

        /* Keyboard support */
        this.inputs.on('focus', function() {
            var input = $(this),
            button = input.parent();

            button.addClass('ui-state-focus');
        })
        .on('blur', function() {
            var input = $(this),
            button = input.parent();

            button.removeClass('ui-state-focus');
        })
        .on('change', function() {
            var input = $(this),
            button = input.parent();

            if(input.prop('checked'))
                button.addClass('ui-state-active');
            else
                button.removeClass('ui-state-active');
        })
        .on('click', function(e) {
            e.stopPropagation();
        });
    }

    /**
     * Selects the given button option.
     * @param {JQuery} button A button of this widget to select.
     */
    select(button) {
        button.children(':checkbox').prop('checked', true).trigger('change');
    }

    /**
     * Unselects the given button option.
     * @param {JQuery} button A button of this widget to unselect.
     */
    unselect(button) {
        button.children(':checkbox').prop('checked', false).trigger('change');
    }

    /**
     * Enables this input so that the user can enter a value.
     */
    enable() {
        PrimeFaces.utils.enableInputWidget(this.jq, this.inputs);
        this.disabled = false;
    }

    /**
     * Disables this input so that the user cannot enter a value anymore.
     */
    disable() {
        PrimeFaces.utils.disableInputWidget(this.jq, this.inputs);
        this.disabled = true;
    }

}
