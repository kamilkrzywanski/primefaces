/**
 * __PrimeFaces DataTable Widget__
 *
 * DataTable displays data in tabular format.
 *
 * @typedef {number | JQuery} PrimeFaces.widget.DataTable.RowSpecifier Either the 0-based index of a row, or the row
 * element (`TR`) itself.
 *
 * @typedef {"ASCENDING" | "DESCENDING" | "UNSORTED"} PrimeFaces.widget.DataTable.SortOrder The available sort order
 * types for the DataTable.
 *
 * @typedef {"single" | "multiple"} PrimeFaces.widget.DataTable.CmSelectionMode Indicates whether multiple rows or only
 * a single row of a DataTable can be selected.
 *
 * @typedef {"radio" | "checkbox"} PrimeFaces.widget.DataTable.SelectionMode Indicates whether rows are selected via
 * radio buttons or via checkboxes.
 *
 * @typedef {"single" | "multiple"} PrimeFaces.widget.DataTable.SortMode Indicates whether a DataTable can be sorted
 * by multiple columns or only by a single column.
 *
 * @typedef {"single" | "multiple"} PrimeFaces.widget.DataTable.RowExpandMode Indicates whether multiple columns of a
 * DataTable can be expanded at the same time, or whether other expanded rows should be collapsed when a new row is
 * expanded.
 *
 * @typedef {"eager" | "lazy"} PrimeFaces.widget.DataTable.RowEditMode Indicates whether row editors are loaded eagerly
 * or on-demand.
 *
 * @typedef {"eager" | "lazy"} PrimeFaces.widget.DataTable.CellEditMode Indicates whether cell editors are loaded
 * eagerly or on-demand.
 *
 * @typedef {"expand" | "fit"} PrimeFaces.widget.DataTable.ResizeMode Indicates the resize behavior of columns.
 *
 * @typedef {"new" | "add" | "none"} PrimeFaces.widget.DataTable.SelectionRowMode Indicates how rows of a DataTable
 * may be selected, when clicking on the row itself (not the checkbox / radiobutton from p:column).
 * `new` always unselects other rows, `add` preserves the currently selected rows, and `none` disables row selection.
 *
 * @typedef {"cancel" | "save"} PrimeFaces.widget.DataTable.RowEditAction When a row is editable: whether to `save` the
 * current contents of the row or `cancel` the row edit and discard all changes.
 *
 * @typedef PrimeFaces.widget.DataTable.OnRowClickCallback Callback that is invoked when the user clicks on a row of the
 * DataTable.
 * @param {JQuery.TriggeredEvent} PrimeFaces.widget.DataTable.OnRowClickCallback.event The click event that occurred.
 * @param {JQuery} PrimeFaces.widget.DataTable.OnRowClickCallback.row The TR row that was clicked.
 *
 * @interface {PrimeFaces.widget.DataTable.RowMeta} RowMeta Describes the meta information of row, such as its index and
 * its row key.
 * @prop {string | undefined} RowMeta.key The unique key of the row. `undefined` when no key was defined for the rows.
 * @prop {number} RowMeta.index The 0-based index of the row in the DataTable.
 *
 *
 * @interface {PrimeFaces.widget.DataTable.SortMeta} SortMeta Describes a sorting operation of the DataTable. The
 * items of the DataTable may be sorted by multiple column, in which case the sorting operation is describes by a list
 * of these objects.
 * @prop {string} SortMeta.col ID of the column to sort by.
 * @prop {-1 | 1} SortMeta.order Whether to sort the items by the column value in an ascending or descending order.
 *
 * @implements {PrimeFaces.widget.ContextMenu.ContextMenuProvider<PrimeFaces.widget.DataTable>}
 *
 * @prop {boolean} allLoadedLiveScroll Whether all available items were  already loaded.
 * @prop {string} [ascMessage] Localized message for sorting a column in ascending order.
 * @prop {JQuery} bodyTable The DOM element for the body part of the table.
 * @prop {Record<number, string>} cacheMap Cache for the contents of a row. Key is the row index, value the HTML content
 * of the row.
 * @prop {number} cacheRows Number of rows to cache.
 * @prop {JQuery} checkAllToggler DOM element of the container with the `check all` checkbox in the header.
 * @prop {JQuery} clone Clone of the table header.
 * @prop {boolean} columnWidthsFixed Whether column widths are fixed or may be resized.
 * @prop {JQuery} [contextMenuCell] DOM element of the table cell for which the context menu was opened.
 * @prop {PrimeFaces.widget.ContextMenu} contextMenuWidget Widget with the context menu for the DataTable.
 * @prop {JQuery} currentCell Current cell to be edited.
 * @prop {PrimeFaces.widget.DataTable.RowMeta | null} cursorRowMeta 0-based index of row where the the cursor is located.
 * @prop {string} [descMessage] Localized message for sorting a column in descending order.
 * @prop {JQuery} dragIndicatorBottom DOM element of the icon that indicates a column is draggable.
 * @prop {JQuery} dragIndicatorTop DOM element of the icon that indicates a column is draggable.
 * @prop {JQuery} [expansionHolder] DOM element of the hidden input that holds the row keys of the rows that
 * are expanded. Used to preserve the expansion state during AJAX updates.
 * @prop {number[]} expansionProcess List of row indices to expand.
 * @prop {JQuery | null} focusedRow DOM element of the currently focused row.
 * @prop {boolean} focusedRowWithCheckbox Whether the focused row includes the checkbox for selecting the row.
 * @prop {JQuery} footerCols The DOM elements for the footer columns.
 * @prop {JQuery} footerTable The DOM elements for the footer table.
 * @prop {JQuery} frozenThead The DOM element for the header THEAD.
 * @prop {JQuery} groupResizers The DOM elements for the resizer button of each group.
 * @prop {boolean} hasColumnGroup Whether the table has any column groups.
 * @prop {JQuery} headerTable The DOM elements for the header table.
 * @prop {JQuery} headers DOM elements for the `TH` headers of this DataTable.
 * @prop {boolean} ignoreRowHoverEvent Whether to ignore row hover event.
 * @prop {boolean} isRTL Whether the writing direction is set to right-to-left.
 * @prop {boolean} isRowTogglerClicked Whether a row toggler was clicked.
 * @prop {Document | string} [jqTargetId] Target of the context menu, when a context menu is used.
 * @prop {boolean} liveScrollActive Whether live scrolling is currently active.
 * @prop {string[]} [loadedExpansionRows] List of row keys of the expansion rows that had their content
 * already loaded via AJAX.
 * @prop {boolean} loadingLiveScroll Whether data is currently being loaded due to the live scrolling feature.
 * @prop {boolean} mousedownOnRow Whether a mousedown event occurred on a row.
 * @prop {JQuery} orderStateHolder INPUT element storing the current column / row order.
 * @prop {PrimeFaces.widget.DataTable.RowMeta | null} originRowMeta The original row index of the row that was clicked.
 * @prop {string} [otherMessage] Localized message for removing the sort order and showing rows in their
 * original order.
 * @prop {PrimeFaces.widget.Paginator} paginator When pagination is enabled: The paginator widget instance used for
 * paging.
 * @prop {boolean} percentageScrollHeight The current relative vertical scroll position.
 * @prop {boolean} percentageScrollWidth The current relative horizontal scroll position.
 * @prop {boolean} reflowDD `true` if reflow is enabled, `false` otherwise.
 * @prop {number} relativeHeight The height of the table viewport, relative to the total height, used for scrolling.
 * @prop {string[]} resizableState A list with the current widths for each resizable column.
 * @prop {JQuery} resizableStateHolder INPUT element storing the current widths for each resizable column.
 * @prop {number} resizeTimeout The set-timeout timer ID of the timer used for resizing.
 * @prop {JQuery} resizerHelper The DOM element for the resize helper.
 * @prop {number} [rowHeight] Constant height in pixels for each row, when virtual scrolling is enabled.
 * @prop {string} rowSelector The CSS selector for the table rows.
 * @prop {string} rowSelectorForRowClick The CSS selector for the table rows that can be clicked.
 * @prop {JQuery} scrollBody The DOM element for the scrollable body of the table.
 * @prop {JQuery} scrollFooter The DOM element for the scrollable body of the table.
 * @prop {JQuery} scrollFooterBox The DOM element for the scrollable footer box of the table.
 * @prop {JQuery} scrollHeader The DOM element for the scrollable header of the table.
 * @prop {JQuery} scrollHeaderBox The DOM element for the scrollable header box of the table.
 * @prop {number} scrollOffset The current scroll position.
 * @prop {JQuery} scrollStateHolder INPUT element storing the current scroll position.
 * @prop {JQuery} scrollTbody The DOM element for the scrollable TBODY.
 * @prop {number} scrollTimeout The set-timeout timer ID of the timer used for scrolling.
 * @prop {string} scrollbarWidth CSS attribute for the scrollbar width, eg. `20px`.
 * @prop {string[]} selection List of row keys for the currently selected rows.
 * @prop {string} selectionHolder ID of the INPUT element storing the currently selected rows.
 * @prop {boolean} shouldLiveScroll Whether live scrolling is currently enabled.
 * @prop {Record<string, PrimeFaces.widget.DataTable.SortMeta>} sortMeta Information about how each column is sorted.
 * Key is the column key.
 * @prop {JQuery} sortableColumns DOM elements for the columns that are sortable.
 * @prop {JQuery} stickyContainer The DOM element for the sticky container of the table.
 * @prop {JQuery} tbody DOM element of the `TBODY` element of this DataTable, if it exists.
 * @prop {JQuery} tfoot DOM element of the `TFOOT` element of this DataTable, if it exists.
 * @prop {JQuery} thead DOM element of the `THEAD` element of this DataTable, if it exists.
 * @prop {JQuery} theadClone The DOM element for the cloned table head.
 * @prop {boolean} virtualScrollActive Whether virtual scrolling is currently active.
 *
 *
 * @interface {PrimeFaces.widget.DataTableCfg} cfg The configuration for the {@link  DataTable| DataTable widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.DeferredWidgetCfg} cfg
 *
 * @prop {boolean} cfg.allowUnsorting When true columns can be unsorted upon clicking sort.
 * @prop {string} cfg.cellEditMode Defines the cell edit behavior.
 * @prop {string} cfg.cellSeparator Separator text to use in output mode of editable cells with multiple components.
 * @prop {boolean} cfg.clientCache Caches the next page asynchronously.
 * @prop {boolean} cfg.disableContextMenuIfEmpty `true` to disable the context menu when the DataTable has got on
 * data row, or `false` otherwise.
 * @prop {boolean} cfg.disabledTextSelection Disables text selection on row click.
 * @prop {boolean} cfg.draggableColumns Columns can be reordered with drag & drop when enabled.
 * @prop {boolean} cfg.draggableRows When enabled, rows can be reordered using drag & drop.
 * @prop {string} cfg.editInitEvent Event that triggers row/cell editing.
 * @prop {PrimeFaces.widget.DataTable.CellEditMode} cfg.editMode Whether rows may be edited as a whole or whether each
 * cell can be edited individually.
 * @prop {boolean} cfg.editable Controls in-cell editing.
 * @prop {boolean} cfg.expansion `true` if rows are expandable, or `false` otherwise.
 * @prop {boolean} cfg.filter `true` if filtering is enabled, or `false` otherwise.
 * @prop {number} cfg.filterDelay Delay for filtering in milliseconds.
 * @prop {string} cfg.filterEvent Event to invoke filtering for input filters.
 * @prop {number} cfg.frozenColumns The number of frozen columns.
 * @prop {string} cfg.frozenColumnsAlignment The alignment of frozen columns.
 * @prop {boolean} cfg.liveResize Columns are resized live in this mode without using a resize helper.
 * @prop {boolean} cfg.liveScroll Enables live scrolling.
 * @prop {number} cfg.liveScrollBuffer Percentage of the height of the buffer between the bottom of the page and the
 * scroll position to initiate the load for the new chunk. This value is in the range `0...100`.
 * @prop {boolean} cfg.multiSort `true` if sorting by multiple columns is enabled, or `false` otherwise.
 * @prop {boolean} cfg.multiViewState Whether multiple resize mode is enabled.
 * @prop {boolean} cfg.nativeElements `true` to use native radio button and checkbox elements, or `false` otherwise.
 * @prop {PrimeFaces.widget.DataTable.OnRowClickCallback} cfg.onRowClick Callback that is invoked when the user clicked on
 * a row of the DataTable.
 * @prop {boolean} cfg.reflow Reflow mode is a responsive mode to display columns as stacked depending on screen size.
 * @prop {boolean} cfg.resizableColumns Enables column resizing.
 * @prop {PrimeFaces.widget.DataTable.ResizeMode} cfg.resizeMode Defines the resize behavior.
 * @prop {string} cfg.rowDragSelector CSS selector for the draggable handle.
 * @prop {PrimeFaces.widget.DataTable.RowEditMode} cfg.rowEditMode Defines the row edit.
 * @prop {PrimeFaces.widget.DataTable.RowExpandMode} cfg.rowExpandMode Defines row expand mode.
 * @prop {boolean} cfg.rowHover Adds hover effect to rows. Hover is always on when selection is enabled.
 * @prop {PrimeFaces.widget.DataTable.SelectionRowMode} cfg.selectionRowMode Defines row selection mode when clicking on the row itself.
 * @prop {string} cfg.rowSelector CSS selector find finding the rows of this DataTable.
 * @prop {boolean} cfg.saveOnCellBlur Saves the changes in cell editing on blur, when set to false changes are
 * discarded.
 * @prop {string} cfg.scrollHeight Scroll viewport height.
 * @prop {number} cfg.scrollLimit Maximum number of rows that may be loaded via live scrolling.
 * @prop {number} cfg.scrollStep Number of additional rows to load in each live scroll.
 * @prop {string} cfg.scrollWidth Scroll viewport width.
 * @prop {boolean} cfg.scrollable Makes data scrollable with fixed header.
 * @prop {PrimeFaces.widget.DataTable.SelectionMode} cfg.selectionMode Enables row selection.
 * @prop {boolean} cfg.selectionPageOnly When using a paginator and selection mode is `checkbox`, the select all
 * checkbox in the header will select all rows on the current page if `true`, or all rows on all pages if `false`.
 * Default is `true`.
 * @prop {boolean} cfg.sorting `true` if sorting is enabled on the DataTable, `false` otherwise.
 * @prop {string[]} cfg.sortMetaOrder IDs of the columns by which to order. Order by the first column, then by the
 * second, etc.
 * @prop {boolean} cfg.stickyHeader Sticky header stays in window viewport during scrolling.
 * @prop {string} cfg.stickyTopAt Selector to position on the page according to other fixing elements on the top of the
 * table.
 * @prop {string} cfg.tabindex The value of the `tabindex` attribute for this DataTable.
 * @prop {boolean} cfg.virtualScroll Loads data on demand as the scrollbar gets close to the bottom.
 *
 * @interface {PrimeFaces.widget.DataTable.WidthInfo} WidthInfo Describes the width information of a DOM element.
 * @prop {number | string} WidthInfo.width The width of the element. It's either a unit-less numeric pixel value or a
 * string containing the width including an unit.
 * @prop {boolean} WidthInfo.isOuterWidth Tells whether the width includes the border-box or not.
 */
PrimeFaces.widget.DataTable = class DataTable extends PrimeFaces.widget.DeferredWidget {

    /**
     * Map between the sort order names and the multiplier for the comparator.
     * @protected
     * @type {Record<PrimeFaces.widget.DataTable.SortOrder, -1 | 0 | 1>}
     */
    static SORT_ORDER = {
        ASCENDING: 1,
        DESCENDING: -1,
        UNSORTED: 0
    }

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init(cfg) {
        super.init(cfg);

        this.thead = this.getThead();
        this.tbody = this.getTbody();
        this.tfoot = this.getTfoot();

        if(this.cfg.paginator) {
            this.bindPaginator();
        }

        if(this.cfg.sorting) {
            this.bindSortEvents();
        }

        if(this.cfg.rowHover) {
            this.setupRowHover();
        }

        if(this.cfg.selectionMode) {
            this.setupSelection();
        }
        else {
            this.cfg.selectionRowMode = this.cfg.selectionRowMode || 'none';
        }

        if(this.cfg.filter) {
            this.setupFiltering();
        }

        if(this.cfg.expansion) {
            this.expansionProcess = [];
            this.bindExpansionEvents();
        }

        if(this.cfg.editable) {
            this.bindEditEvents();
            // ensure DOM memory is cleaned up by releasing document event handlers
            this.addDestroyListener(function () {
                $(document).off(namespace);
                $(document).off('mouseup.datatable-cell-blur' + this.id);
            });
        }

        if(this.cfg.draggableRows) {
            this.makeRowsDraggable();
        }

        if(this.cfg.reflow) {
            this.initReflow();
        }

        if(this.cfg.resizableColumns) {
            this.resizableStateHolder = $(this.jqId + '_resizableColumnState');
            this.resizableState = [];

            if(this.resizableStateHolder.attr('value')) {
                this.resizableState = this.resizableStateHolder.val().split(',');
            }
        }

        this.updateEmptyColspan();
        this.renderDeferred();
    }

    /**
     * @override
     * @protected
     * @inheritdoc
     */
    _render() {
        var $this = this;
        this.isRTL = this.jq.hasClass('ui-datatable-rtl');
        this.cfg.partialUpdate = (this.cfg.partialUpdate === false) ? false : true;

        if(this.cfg.scrollable) {
            this.setupScrolling();
        }

        if(this.cfg.groupColumnIndexes) {
            this.groupRows();
            this.bindToggleRowGroupEvents();
        }

        if(this.cfg.resizableColumns) {
            this.setupResizableColumns();
        }

        if(this.cfg.draggableColumns) {
            this.setupDraggableColumns();
        }

        if(this.cfg.stickyHeader) {
            PrimeFaces.queueTask(function () {$this.setupStickyHeader();}, 1);
        }

        if(this.cfg.onRowClick) {
            this.bindRowClick();
        }

        if(this.cfg.expansion) {
            this.initRowExpansion();
            this.updateExpandedRowsColspan();
        }
        if(this.cfg.reflow) {
           this.jq.css('visibility', 'visible');
        }

        // cell navigation is enabled by default, but it is disabled when editing, reflow, orrow selection is enabled (unless explicitly specified by the user).
        if (this.cfg.cellNavigation === undefined) {
            this.cfg.cellNavigation = !(this.cfg.editMode || this.cfg.reflow || this.cfg.selectionRowMode !== 'none');
        }
        if (this.cfg.cellNavigation) {
            this.setupNavigableCells();
        }
    }

    /**
     * Retrieves the table header of this DataTable.
     * @return {JQuery} DOM element of the table header.
     */
    getThead() {
        return $(this.jqId + '_head');
    }

    /**
     * Retrieves the table body of this DataTable.
     * @return {JQuery} DOM element of the table body.
     */
    getTbody() {
        return $(this.jqId + '_data');
    }

    /**
     * Retrieves the table footer of this DataTable.
     * @return {JQuery} DOM element of the table footer.
     */
    getTfoot() {
        return $(this.jqId + '_foot');
    }

    /**
     * Sets the given HTML string as the content of the body of this DataTable. Afterwards, sets up all required event
     * listeners etc.
     * @protected
     * @param {string} data HTML string to set on the body.
     * @param {boolean} [clear] Whether the contents of the table body should be removed beforehand.
     */
    updateData(data, clear) {
        var empty = (clear === undefined) ? true: clear;

        if(empty)
            this.tbody.html(data);
        else
            this.tbody.append(data);

        this.postUpdateData();
    }

    /**
     * Called after an AJAX update. Binds the appropriate event listeners again.
     * @private
     */
    postUpdateData() {
        if (this.cfg.editable) {
            this.bindEditEvents();
        }

        if(this.cfg.draggableRows) {
            this.makeRowsDraggable();
        }

        if(this.cfg.reflow) {
            this.initReflow();
        }

        if(this.cfg.groupColumnIndexes) {
            this.groupRows();
            this.bindToggleRowGroupEvents();
        }

        if(this.cfg.expansion) {
            this.initRowExpansion();
        }
        
        if (this.cfg.cellNavigation) {
            this.setupNavigableCells();
        }
    }

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    refresh(cfg) {
        this.columnWidthsFixed = false;
        this.ignoreRowHoverEvent = false;

        this.unbindEvents();

        super.refresh(cfg);
    }

    /**
     * Removes event listeners needed if refreshing to prevent multiple sort and pagination events.
     *
     * Cancels all current drag and drop events.
     * @private
     */
    unbindEvents() {
        if (this.sortableColumns) {
            this.sortableColumns.off();
        }
        if (this.paginator) {
            this.paginator.unbindEvents();
        }

        // #5582: destroy any current draggable items
        if (this.cfg.draggableColumns || this.cfg.draggableRows) {
            var dragdrop = $.ui.ddmanager.current;
            if (dragdrop && dragdrop.helper) {
                var item = dragdrop.currentItem || dragdrop.element;
                if(item.closest('.ui-datatable')[0] === this.jq[0]) {
                    document.body.style.cursor = 'default';
                    dragdrop.cancel();
                }
            }
        }
    }

    /**
     * Binds the change event listener and renders the paginator
     * @private
     */
    bindPaginator() {
        var $this = this;
        this.cfg.paginator.paginate = function(newState) {
            if($this.cfg.clientCache) {
                $this.loadDataWithCache(newState);
            }
            else {
                $this.paginate(newState);
            }
        };

        this.paginator = new PrimeFaces.widget.Paginator();
        this.paginator.init(this.cfg.paginator);
        this.paginator.bindSwipeEvents(this.jq, this.cfg);

        if(this.cfg.clientCache) {
            this.cacheRows = this.paginator.getRows();
            var newState = {
                first:  this.paginator.getFirst(),
                rows: this.paginator.getRows(),
                page: this.paginator.getCurrentPage()
            };
            this.clearCacheMap();
            this.fetchNextPage(newState);
        }
    }

    /**
     * Applies events related to sorting in a non-obtrusive way
     * @private
     */
    bindSortEvents() {
        var $this = this,
            hasAriaSort = false;
        this.cfg.tabindex = this.cfg.tabindex||'0';
        this.cfg.multiSort = this.cfg.multiSort||false;
        this.cfg.allowUnsorting = this.cfg.allowUnsorting||false;
        this.headers = this.thead.find('> tr > th');
        this.sortableColumns = this.headers.filter('.ui-sortable-column');
        this.sortableColumns.attr('tabindex', this.cfg.tabindex);

        //aria messages
        this.ascMessage = this.getAriaLabel('datatable.sort.ASC');
        this.descMessage = this.getAriaLabel('datatable.sort.DESC');
        if (this.cfg.allowUnsorting) {
            this.otherMessage = this.getAriaLabel('datatable.sort.NONE');
        }
        else {
            this.otherMessage = this.getAriaLabel('datatable.sort.ASC');
        }

        //reflow dropdown
        this.reflowDD = $(this.jqId + '_reflowDD');

        this.sortMeta = [];

        for(var i = 0; i < this.sortableColumns.length; i++) {
            var columnHeader = this.sortableColumns.eq(i),
            columnHeaderId = columnHeader.attr('id'),
            sortIcon = columnHeader.children('span.ui-sortable-column-icon'),
            sortOrder = null,
            resolvedSortMetaIndex = null,
            ariaLabel = columnHeader.attr('aria-label');

            if (columnHeader.hasClass('ui-state-active')) {
                if (sortIcon.hasClass('ui-icon-triangle-1-n')) {
                    sortOrder = DataTable.SORT_ORDER.ASCENDING;
                    columnHeader.attr('aria-label', this.getSortMessage(ariaLabel, this.descMessage));
                    if (!hasAriaSort) {
                        columnHeader.attr('aria-sort', 'ascending');
                        hasAriaSort = true;
                    }
                }
                else if (sortIcon.hasClass('ui-icon-triangle-1-s')) {
                    sortOrder = DataTable.SORT_ORDER.DESCENDING;
                    columnHeader.attr('aria-label', this.getSortMessage(ariaLabel, this.otherMessage));
                    if (!hasAriaSort) {
                        columnHeader.attr('aria-sort', 'descending');
                        hasAriaSort = true;
                    }
                } else {
                    sortOrder = DataTable.SORT_ORDER.UNSORTED;
                    columnHeader.attr('aria-label', this.getSortMessage(ariaLabel, this.ascMessage));
                    if (!hasAriaSort) {
                        columnHeader.attr('aria-sort', 'other');
                        hasAriaSort = true;
                    }
                }

                if (this.cfg.multiSort && this.cfg.sortMetaOrder) {
                    resolvedSortMetaIndex = $.inArray(columnHeaderId, this.cfg.sortMetaOrder);

                    this.sortMeta[resolvedSortMetaIndex] = {
                        col: columnHeaderId,
                        order: sortOrder
                    };
                }

                $this.updateReflowDD(columnHeader, sortOrder);
            }
            else {
                sortOrder = DataTable.SORT_ORDER.UNSORTED;
                columnHeader.attr('aria-label', this.getSortMessage(ariaLabel, this.ascMessage));
                if(!hasAriaSort && i == (this.sortableColumns.length - 1)) {
                    this.sortableColumns.eq(0).attr('aria-sort', 'other');
                    hasAriaSort = true;
                }
            }

            columnHeader.data('sortorder', sortOrder);
        }

        this.sortableColumns.on('mouseenter.dataTable', function() {
            var column = $(this);
            column.addClass('ui-state-hover');
        })
        .on('mouseleave.dataTable', function() {
            var column = $(this);
            column.removeClass('ui-state-hover');
        })
        .on('blur.dataTable', function() {
            $(this).removeClass('ui-state-focus');
        })
        .on('focus.dataTable', function() {
            $(this).addClass('ui-state-focus');
        })
        .on('keydown.dataTable', function(e) {
            if((e.key === 'Enter') && $(e.target).is(':not(:input)')) {
                $(this).trigger('click.dataTable', (e.metaKey||e.ctrlKey));
                e.preventDefault();
            }
        })
        .on('click.dataTable', function(e, metaKeyOn) {
            if(!$this.shouldSort(e, this)) {
                return;
            }

            PrimeFaces.clearSelection();

            var columnHeader = $(this),
                sortOrderData = columnHeader.data('sortorder'),
                sortOrder = (sortOrderData === DataTable.SORT_ORDER.UNSORTED) ? DataTable.SORT_ORDER.ASCENDING :
                    (sortOrderData === DataTable.SORT_ORDER.ASCENDING) ? DataTable.SORT_ORDER.DESCENDING :
                        $this.cfg.allowUnsorting ? DataTable.SORT_ORDER.UNSORTED : DataTable.SORT_ORDER.ASCENDING,
                metaKey = e.metaKey || e.ctrlKey || metaKeyOn;

            if(!$this.cfg.multiSort || !metaKey) {
                $this.sortMeta = [];
            }

            $this.addSortMeta({
                col: columnHeader.attr('id'),
                order: sortOrder
            });

            $this.sort(columnHeader, sortOrder, $this.cfg.multiSort && metaKey);

            if($this.cfg.scrollable) {
                $(PrimeFaces.escapeClientId(columnHeader.attr('id') + '_clone')).trigger('focus');
            }

            $this.updateReflowDD(columnHeader, sortOrder);
        });

        $this.updateSortPriorityIndicators();

        if(this.reflowDD && this.cfg.reflow) {
            PrimeFaces.skinSelect(this.reflowDD);
            this.reflowDD.on('change', function(e) {
                var selectedOption = $(this).find(":selected");
                var columnKey = selectedOption.data('columnkey');
                var sortOrder = selectedOption.data('sortorder');
                var columnHeader = $this.jq.find(PrimeFaces.escapeClientId(columnKey));

                columnHeader.data('sortorder', sortOrder);
                columnHeader.trigger('click.dataTable');
            });
        }
    }

    /**
     * Creates the sort order message shown to indicate what the current sort order is.
     * @private
     * @param {string | undefined} ariaLabel Optional label text from an aria attribute.
     * @param {string} sortOrderMessage Sort order message.
     * @return {string} The sort order message to use.
     */
    getSortMessage(ariaLabel, sortOrderMessage) {
        var headerName = ariaLabel ? ariaLabel.split(':')[0] : '';
        return headerName + ': ' + sortOrderMessage;
    }

    /**
     * Called in response to a click. Checks whether this DataTable should now be sorted. Returns `false` when there
     * are no items to be sorted, or when no sorting button was clicked.
     * @private
     * @param {JQuery.TriggeredEvent} event (Click) event that occurred.
     * @param {JQuery} column Column Column of this DataTable on which the event occurred.
     * @return {boolean} `true` to perform a sorting operation, `false` otherwise.
     */
    shouldSort(event, column) {
        if(this.isEmpty()) {
            return false;
        }

        var target = $(event.target);
        if(target.closest('.ui-column-customfilter', column).length) {
            return false;
        }

        return target.is('th,span');
    }

    /**
     * Adds the given sorting to the list of sort rows. Each sorting describes a column by which to sort. This data
     * table may be sorted by multiple columns.
     * @private
     * @param {PrimeFaces.widget.DataTable.SortMeta} meta Sorting to add.
     */
    addSortMeta(meta) {
        this.sortMeta = $.grep(this.sortMeta, function(value) {
            return value.col !== meta.col;
        });

        this.sortMeta.push(meta);
    }

    /**
     * Binds filter events to standard filters
     * @private
     */
    setupFiltering() {
        var $this = this,
        filterColumns = this.thead.find('> tr > th.ui-filter-column');
        this.cfg.filterEvent = this.cfg.filterEvent||'keyup';
        this.cfg.filterDelay = this.cfg.filterDelay||300;

        filterColumns.children('.ui-column-filter').each(function() {
            var filter = $(this);

            if(filter.is("input[type='search']")) {
                PrimeFaces.skinInput(filter);
                $this.bindTextFilter(filter);
            }
            else {
                PrimeFaces.skinSelect(filter);
                $this.bindChangeFilter(filter);
            }
            
        });
        
        // ARIA labels for filters
        filterColumns.each(function() {
            var filterColumn = $(this);
            var filter = filterColumn.find(':input');
            var title = filterColumn.find('.ui-column-title')

            if (filter && title) {
                filter.attr('aria-label', $this.getLabel('filter') + " " + title.text());
            }
        });
    }

    /**
     * Sets up the event listeners for the text filters on a column.
     * @private
     * @param {JQuery} filter INPUT element of the text filter.
     */
    bindTextFilter(filter) {
        if(this.cfg.filterEvent === 'enter')
            this.bindEnterKeyFilter(filter);
        else
            this.bindFilterEvent(filter);

        // #8113 clear 'x' event handler
        this.bindClearFilterEvent(filter);

        // #7562 draggable columns cannot be filtered with touch
        if (PrimeFaces.env.isTouchable(this.cfg)) {
            filter.on('touchstart', function(e) {
                e.stopPropagation();
            });
        }
    }

    /**
     * Sets up the change event listeners on the column filter elements.
     * @private
     * @param {JQuery} filter DOM element of a column filter
     */
    bindChangeFilter(filter) {
        var $this = this;

        filter.off('change')
        .on('change', function() {
            $this.filter();
        });
    }

    /**
     * Sets up the enter key event listeners for the text filters on a column.
     * @private
     * @param {JQuery} filter INPUT element of the text filter.
     */
    bindEnterKeyFilter(filter) {
        var $this = this;

        filter.off('keydown').on('keydown', function(e) {
            if(PrimeFaces.utils.blockEnterKey(e)) {
                $this.filter();
            }
        });
    }

    /**
     * Sets up the 'search' event which for HTML5 text search fields handles the clear 'x' button.
     * @private
     * @param {JQuery} filter INPUT element of the text filter.
     */
    bindClearFilterEvent(filter) {
        var $this = this;

        filter.off('search').on('search', function(e) {
            // only care when 'X'' is clicked
            if ($(this).val() == "") {
                $this.filter();
            }
        });
    }

    /**
     * Sets up all event listeners for the given filter element of a column filter.
     * @private
     * @param {JQuery} filter DOM element of a column filter.
     */
    bindFilterEvent(filter) {
        var $this = this;
        var filterEventName = this.cfg.filterEvent + '.dataTable';
        
        filter.off('keydown ' + filterEventName).on(filterEventName, function(e) {
            //prevent form submit on enter key
            if (e.key && (PrimeFaces.utils.ignoreFilterKey(e) || PrimeFaces.utils.blockEnterKey(e))) {
                return;
            }

            PrimeFaces.debounce(() => $this.filter(), $this.cfg.filterDelay);
        })
        .on('keydown', function(e) {
            // #12327 do not submit form on ENTER
            PrimeFaces.utils.blockEnterKey(e);
        });
    }

    /**
     * Sets up the DataTable and adds all event listeners required for hovering over rows.
     * @private
     */
    setupRowHover() {
        var selector = '> tr.ui-widget-content';
        if(!this.cfg.selectionMode || this.cfg.selectionMode === 'checkbox') {
            this.bindRowHover(selector);
        }
    }
    
    /**
     * Sets up WCAG keyboard navigation of cells.
     * @private
     */
    setupNavigableCells() {
        if (!this.cfg.cellNavigation) {
            return;
        }
        var $this = this;
        var cellTabIndex = this.cfg.tabindex || "0";
        var pageRows = this.cfg.paginator && this.cfg.paginator.rows ? this.cfg.paginator.rows : 1000;
        var clickSelector = ':button:enabled, :input:enabled, a, [role="combobox"], .ui-row-toggler, .ui-chkbox-box';

        // helper function to set the current and next cell focus
        function makeFocusable(e, cell, nextCell) {
            if (cell && cell.length) {
                cell.attr("tabindex", "-1");
            }

            if (nextCell && nextCell.length) {
                nextCell.attr("tabindex", cellTabIndex).trigger("focus");
                if (e) {
                    e.preventDefault();
                }
            }
        }

        // helper function to reset the state of the whole table
        function resetFocusable(resetFirstCell) {
            var selector = resetFirstCell ? "td:not(.ui-helper-hidden)" : 'td[tabindex="'+cellTabIndex+'"]';
            // default all cells to not focusable
            var focusableCells = $this.getTbody().find(selector);
            focusableCells.attr("tabindex", "-1");

            if (resetFirstCell) {
                // the very first cell should be focusable
                focusableCells.first().attr("tabindex", cellTabIndex);
            }
        }

        // default all cells to not focusable except the very first cell
        resetFocusable(true);

        // on click should make it focusable
        this.getTbody().find("td").off('.focuscell')
            .on("click.focuscell", function(e) {
                resetFocusable(false);

                if ($(e.target).is(clickSelector)) {
                    return;
                }

                makeFocusable(null, null, $(this));
            })
            .on("keydown.focuscell", function(e) {
                if ($(e.target).is(":input:enabled")) {
                    return;
                }
                
                var cell = $(this);
                var nextCell = null;
                var prevCell = null;
                var currentRow = null;

                switch (e.code) {
                    case "KeyW":
                        if ($this.cfg.resizableColumns && e.altKey) {
                            $this.autosizeColumnWidth(cell);
                        }
                        break;
                    case "ArrowLeft":
                        prevCell = $this.isRTL ? cell.nextAll('[tabindex="-1"]:first') : cell.prevAll('[tabindex="-1"]:first');
                        makeFocusable(e, cell, prevCell);
                        break;
                    case "ArrowRight":
                        nextCell = $this.isRTL ? cell.prevAll('[tabindex="-1"]:first') : cell.nextAll('[tabindex="-1"]:first');
                        makeFocusable(e, cell, nextCell);
                        break;
                    case "ArrowDown":
                        nextCell = cell.closest("tr[data-ri]").nextAll("tr[data-ri]:first").find('td[tabindex="-1"], td.ui-helper-hidden').eq(cell.index());
                        makeFocusable(e, cell, nextCell);
                        break;
                    case "ArrowUp":
                        prevCell = cell.closest("tr[data-ri]").prevAll("tr[data-ri]:first").find('td[tabindex="-1"], td.ui-helper-hidden').eq(cell.index());
                        makeFocusable(e, cell, prevCell);
                        break;
                    case "Home":
                        prevCell = cell.prevAll('[tabindex="-1"]').last();
                        if (e.ctrlKey) {
                            prevCell = cell.closest("tr[data-ri]").prevAll().last().find('td[tabindex="-1"]').first();
                        }
                        makeFocusable(e, cell, prevCell);
                        break;
                    case "End":
                        nextCell = cell.nextAll('[tabindex="-1"]').last();
                        if (e.ctrlKey) {
                            nextCell = cell.closest("tr[data-ri]").nextAll().last().find('td[tabindex="-1"]').last();
                        }
                        makeFocusable(e, cell, nextCell);
                        break;
                    case "PageUp":
                        // Select the current record
                        currentRow = cell.closest("tr[data-ri]");

                        // Navigate back 1 page records
                        for (var i = 0; i < pageRows; i++) {
                            currentRow = currentRow.prev("tr[data-ri]");
                            if (currentRow.length) {
                                prevCell = currentRow.find('td[tabindex="-1"]').eq(cell.index());
                            } else {
                                break;
                            }
                        }
                        makeFocusable(e, cell, prevCell);
                        break;
                    case "PageDown":
                        // Select the current row
                        currentRow = cell.closest("tr[data-ri]");

                        // Navigate forward 1 page rows
                        for (var i = 0; i < pageRows; i++) {
                            currentRow = currentRow.next("tr[data-ri]");
                            if (currentRow.length) {
                                nextCell = currentRow.find('td[tabindex="-1"]').eq(cell.index());
                            } else {
                                break;
                            }
                        }
                        makeFocusable(e, cell, nextCell);
                        break;
                    case "Space":
                    case "Enter":
                    case "NumpadEnter":
                        // #12198 allow meta keys for multiselection
                        if ($this.cfg.selectionRowMode !== 'none' && (e.metaKey || e.ctrlKey || e.shiftKey)) {
                            return;
                        }
                        // Find the first child element with a click event bound
                        var $clickable = cell.find(clickSelector).first();
                        if ($clickable.length) {
                            $clickable.trigger('click');
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        else {
                            cell.trigger('click');
                        }
                        break;
                    default:
                        break;
                }
            });
    }

    /**
     * Sets up the DataTable and adds all event listener required for selecting rows.
     * @private
     */
    setupSelection() {
        var $this = this;
        this.selectionHolder = this.jqId + '_selection';
        this.cfg.selectionRowMode = this.cfg.selectionRowMode||'new';
        this.rowSelector = '> tr.ui-widget-content.ui-datatable-selectable';
        this.cfg.disabledTextSelection = this.cfg.disabledTextSelection === false ? false : true;
        this.cfg.selectionPageOnly = this.cfg.selectionPageOnly !== false;
        this.rowSelectorForRowClick = this.cfg.rowSelector||'td:not(.ui-column-unselectable):not(.ui-grouped-column),span:not(.ui-c)';

        var preselection = $(this.selectionHolder).val();
        this.selection = !preselection ? [] : preselection.split(',');
        
        // set aria labels
        this.tbody.find(this.rowSelector).each(function() {
            $this.updateSelectionAria($(this))
        });

        this.bindSelectionEvents();
        
        //shift key based range selection
        if (this.isCheckboxSelectionEnabled()) {
            this.originRowMeta = null;
            this.cursorRowMeta = null;
        }

        this.originRowMeta = this.originRowMeta ? this.getRowMeta(this.tbody.find("[data-rk='" + this.originRowMeta.key + "']")) : null;
        if (this.cursorRowMeta) {
            // #3551 lookup row after update by row key
            var cursorRow = this.tbody.find("[data-rk='" + this.cursorRowMeta.key + "']");
            this.cursorRowMeta = this.getRowMeta(cursorRow);

            if (this.isMultipleSelection() && this.originRowMeta !== null) {
                this.selectRowsInRange(cursorRow, true);
            }
            else {
                this.originRowMeta = this.getRowMeta(cursorRow);
                this.cursorRowMeta = null;
                this.selectRow(cursorRow, true);
            }
        }
        else {
            this.cursorRowMeta = null;
        }
    }

    /**
     * Applies events related to selection in a non-obtrusive way
     * @private
     */
    bindSelectionEvents() {
        if(this.cfg.selectionMode === 'radio') {
            this.bindRadioEvents();

            if(this.cfg.selectionRowMode !== 'none') {
                this.bindRowEvents();
            }
            else {
                this.jq.find('tr.ui-datatable-selectable').css('cursor', 'default');
            }
        }
        else if(this.cfg.selectionMode === 'checkbox') {
            this.bindCheckboxEvents();
            this.updateHeaderCheckbox();

            if(this.cfg.selectionRowMode !== 'none') {
                this.bindRowEvents();
            }
            else {
                this.jq.find('tr.ui-datatable-selectable').css('cursor', 'default');
            }
        }
        else {
            this.bindRowEvents();
        }
    }

    /**
     * Sets up all event listeners for event triggered on a row of this DataTable.
     * @private
     */
    bindRowEvents() {
        var $this = this;

        this.bindRowHover(this.rowSelector);

        this.tbody.off('click.dataTable mousedown.dataTable', this.rowSelector).on('mousedown.dataTable', this.rowSelector, null, function(e) {
            $this.mousedownOnRow = true;
        })
        .on('click.dataTable', this.rowSelector, null, function(e) {
            $this.onRowClick(e, this);
            $this.mousedownOnRow = false;
        });

        //double click
        if (this.hasBehavior('rowDblselect')) {
            this.tbody.off('dblclick.dataTable', this.rowSelector).on('dblclick.dataTable', this.rowSelector, null, function(e) {
                $this.onRowDblclick(e, $(this));
            });
        };

        this.bindSelectionKeyEvents();
    }

    /**
     * Sets up all delegated event listeners on the table body.
     * @private
     */
    bindSelectionKeyEvents() {
        var $this = this;

        this.getFocusableTbody().on('focus', function(e) {
            //ignore mouse click on row
            if(!$this.mousedownOnRow) {
                $this.focusedRow = $this.tbody.children('tr.ui-widget-content.ui-datatable-selectable.ui-state-highlight').eq(0);
                if ($this.focusedRow.length == 0) {
                    $this.focusedRow = $this.tbody.children('tr.ui-widget-content.ui-datatable-selectable').eq(0);
                }

                $this.highlightFocusedRow();

                if($this.cfg.scrollable) {
                    PrimeFaces.scrollInView($this.scrollBody, $this.focusedRow);
                }
            }
        })
        .on('blur', function() {
            if($this.focusedRow) {
                $this.unhighlightFocusedRow();
                $this.focusedRow = null;
            }
        })
        .on('keydown', function(e) {
            if($(e.target).is(':input')) {
                return;
            }

            if($this.focusedRow) {
                switch(e.code) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        var rowSelector = 'tr.ui-widget-content.ui-datatable-selectable',
                        row = e.key === 'ArrowUp' ? $this.focusedRow.prevAll(rowSelector).eq(0) : $this.focusedRow.nextAll(rowSelector).eq(0);

                        if(row.length) {
                            $this.unhighlightFocusedRow();

                            if($this.isCheckboxSelectionEnabled()) {
                                row.find('> td.ui-selection-column .ui-chkbox-box').trigger('focus');
                            }
                            else {
                                $this.focusedRow = row;
                            }

                            $this.highlightFocusedRow();

                            if($this.cfg.scrollable) {
                                PrimeFaces.scrollInView($this.scrollBody, $this.focusedRow);
                            }
                        }
                        e.preventDefault();
                    break;

                    case 'Enter':
                    case 'NumpadEnter':
                    case 'Space':
                        if($this.focusedRowWithCheckbox) {
                            $this.focusedRow.find('> td.ui-selection-column > div.ui-chkbox > div.ui-chkbox-box').trigger('click.dataTable');
                        }
                        else {
                            e.target = $this.focusedRow.children().eq(0).get(0);
                            $this.onRowClick(e,$this.focusedRow.get(0));
                        }

                        e.preventDefault();
                    break;

                    default:
                    break;
                };
            }
        });

    }

    /**
     * Highlights the currently focused row (if any) by adding the appropriate CSS class.
     * @protected
     */
    highlightFocusedRow() {
        this.focusedRow.addClass('ui-state-hover');
    }

    /**
     * Unhighlights the currently focused row (if any) by adding the appropriate CSS class.
     * @protected
     */
    unhighlightFocusedRow() {
        this.focusedRow.removeClass('ui-state-hover');
    }

    /**
     * Stores the row which is currently focused.
     * @protected
     * @param {JQuery} row Row to set as the focused row.
     */
    assignFocusedRow(row) {
        this.focusedRow = row;
    }

    /**
     * Sets up the event listeners for hovering over a DataTable row.
     * @protected
     * @param {string} rowSelector Selector for the row elements. Any hover event that does not reach an element that
     * matches this selector will be ignored.
     */
    bindRowHover(rowSelector) {
        var $this = this;
        this.tbody.off('mouseenter.dataTable mouseleave.dataTable', rowSelector)
            .on('mouseenter.dataTable', rowSelector, null, function() {
                if (!$this.ignoreRowHoverEvent) {
                    $(this).addClass('ui-state-hover');
                }
            })
            .on('mouseleave.dataTable', rowSelector, null, function() {
                if (!$this.ignoreRowHoverEvent) {
                    $(this).removeClass('ui-state-hover');
                }
            });

        if (this.cfg.groupColumnIndexes) {
            var columnSelector = rowSelector + ' > td';
            this.tbody.off('mouseenter.dataTable mouseleave.dataTable', columnSelector)
                .on('mouseenter.dataTable', columnSelector, null, function() {
                    var row = $(this).parent();
                    if ($(this).hasClass('ui-grouped-column')) {
                        row.removeClass('ui-state-hover');
                        $this.ignoreRowHoverEvent = true;
                    }
                    else {
                        row.addClass('ui-state-hover');
                    }
                })
                .on('mouseleave.dataTable', columnSelector, null, function() {
                    if (!$(this).hasClass('ui-grouped-column')) {
                        $this.ignoreRowHoverEvent = false;
                    }
                });
        }
    }

    /**
     * Sets up the event listeners for radio buttons contained in this DataTable.
     * @protected
     */
    bindRadioEvents() {
        var $this = this,
        radioInputSelector = '> tr.ui-widget-content:not(.ui-datatable-empty-message) > td.ui-selection-column :radio';

        if(this.cfg.nativeElements) {
            this.tbody.off('click.dataTable', radioInputSelector).on('click.dataTable', radioInputSelector, null, function(e) {
                var radioButton = $(this);

                if(!radioButton.prop('checked'))
                    $this.selectRowWithRadio(radioButton);
            });
        }
        else {
            var radioSelector = '> tr.ui-widget-content:not(.ui-datatable-empty-message) > td.ui-selection-column .ui-radiobutton .ui-radiobutton-box';
            this.tbody.off('click.dataTable mouseenter.dataTable mouseleave.dataTable', radioSelector)
                .on('mouseenter.dataTable', radioSelector, null, function() {
                    var radio = $(this);
                    if(!radio.hasClass('ui-state-disabled')) {
                        radio.addClass('ui-state-hover');
                    }
                })
                .on('mouseleave.dataTable', radioSelector, null, function() {
                    var radio = $(this);
                    radio.removeClass('ui-state-hover');
                })
                .on('click.dataTable', radioSelector, null, function() {
                    var radio = $(this),
                    checked = radio.hasClass('ui-state-active'),
                    disabled = radio.hasClass('ui-state-disabled');

                    if (!disabled) {
                        radio.prev().children(':radio').trigger('focus.dataTable');
                        if (!checked) {
                            $this.selectRowWithRadio(radio);
                        }
                    }
                });
        }

        //keyboard support
        this.tbody.off('focus.dataTable blur.dataTable change.dataTable', radioInputSelector)
            .on('focus.dataTable', radioInputSelector, null, function() {
                var input = $(this),
                box = input.parent().next();

                box.addClass('ui-state-focus');
            })
            .on('blur.dataTable', radioInputSelector, null, function() {
                var input = $(this),
                box = input.parent().next();

                box.removeClass('ui-state-focus');
            })
            .on('change.dataTable', radioInputSelector, null, function() {
                var currentInput = $this.tbody.find(radioInputSelector).filter(':checked'),
                currentRadio = currentInput.parent().next();

                $this.selectRowWithRadio(currentRadio);
            });

    }

    /**
     * Sets up the event listeners for radio buttons contained in this DataTable.
     * @protected
     */
    bindCheckboxEvents() {
        var $this = this,
        checkboxSelector;

        if(this.cfg.nativeElements) {
            checkboxSelector = 'tr.ui-widget-content.ui-datatable-selectable > td.ui-selection-column :checkbox';
            this.checkAllToggler = this.thead.find('> tr > th.ui-selection-column > :checkbox');

            this.checkAllToggler.on('click', function() {
                $this.toggleCheckAll();
            });

            this.jq.off('click.dataTable', checkboxSelector).on('click.dataTable', checkboxSelector, null, function(e) {
                var checkbox = $(this);

                if(checkbox.prop('checked'))
                    $this.selectRowWithCheckbox(checkbox, e);
                else
                    $this.unselectRowWithCheckbox(checkbox, e);
            });
        }
        else {
            checkboxSelector = 'tr.ui-widget-content.ui-datatable-selectable > td.ui-selection-column > div.ui-chkbox > div.ui-chkbox-box';
            this.checkAllToggler = this.thead.find('> tr > th.ui-selection-column > div.ui-chkbox.ui-chkbox-all > div.ui-chkbox-box');

            this.checkAllToggler.on('mouseenter', function() {
                var box = $(this);
                if(!box.hasClass('ui-state-disabled')) {
                    box.addClass('ui-state-hover');
                }
            })
            .on('mouseleave', function() {
                $(this).removeClass('ui-state-hover');
            })
            .on('click', function() {
                var box = $(this);
                if(!box.hasClass('ui-state-disabled')) {
                    $this.toggleCheckAll();
                }
            })
            .on('keydown', function(e) {
                if (PrimeFaces.utils.isActionKey(e)) {
                    if(!$(this).hasClass('ui-state-disabled')) {
                        $this.toggleCheckAll();
                        e.preventDefault();
                    }
                }
            });

            this.jq.off('mouseenter.dataTable mouseleave.dataTable click.dataTable keydown.dataTable', checkboxSelector)
            .on({
                'mouseenter.dataTable': function() {
                    $(this).addClass('ui-state-hover');
                },
                'mouseleave.dataTable': function() {
                    $(this).removeClass('ui-state-hover');
                },
                'click.dataTable': function(e) {
                    var checkbox = $(this)
                    if(checkbox.attr('aria-checked') === "true") {
                        $this.unselectRowWithCheckbox(checkbox, e);
                    }
                    else {
                        $this.selectRowWithCheckbox(checkbox, e);
                    }
                },
                'keydown.dataTable': function(e) {
                    if ($this.cfg.selectionRowMode === 'none' && PrimeFaces.utils.isActionKey(e)) {
                        $(this).trigger('click');
                        e.preventDefault();
                    }
                }
            }, checkboxSelector);
        }
        this.configureSelectAllAria();

        //keyboard support
        this.tbody.off('focus.dataTable blur.dataTable change.dataTable', checkboxSelector)
                    .on('focus.dataTable', checkboxSelector, null, function() {
                        var input = $(this);

                        input.addClass('ui-state-focus');

                        $this.focusedRow = input.closest('.ui-datatable-selectable');
                        $this.focusedRowWithCheckbox = true;
                    })
                    .on('blur.dataTable', checkboxSelector, null, function() {
                        var input = $(this);

                        input.removeClass('ui-state-focus');

                        $this.unhighlightFocusedRow();
                        $this.focusedRow = null;
                        $this.focusedRowWithCheckbox = false;
                    })
                    .on('change.dataTable', checkboxSelector, null, function(e) {
                        var input = $(this);

                        if(input.attr('aria-checked') === "true" || input.prop('checked')) {
                            $this.selectRowWithCheckbox(input, e);
                        }
                        else {
                            $this.unselectRowWithCheckbox(input, e);
                        }
                    });

        this.checkAllToggler.on('focus.dataTable', function(e) {
                        var input = $(this);

                        if(!input.hasClass('ui-state-disabled')) {
                            input.addClass('ui-state-focus');
                        }
                    })
                    .on('blur.dataTable', function(e) {
                        var input = $(this);

                        input.removeClass('ui-state-focus');
                    })
                    .on('change.dataTable', function(e) {
                        var input = $(this);

                        if(!input.hasClass('ui-state-disabled')) {
                            if((input.attr('aria-checked') !== "true") && !input.prop('checked')) {
                                input.addClass('ui-state-active');
                            }

                            $this.toggleCheckAll();

                            if(input.attr('aria-checked') === "true" || input.prop('checked')) {
                                input.removeClass('ui-state-active');
                            }
                        }
                    });
    }

    /**
     * Expands or collapses the given row, depending on whether it is currently collapsed or expanded, respectively.
     * @param {JQuery} row A row (`TR`) to expand or collapse.
     */
    toggleRow(row) {
        if(row && !this.isRowTogglerClicked) {
            var toggler = row.find('> td > div.ui-row-toggler');
            this.toggleExpansion(toggler);
        }
        this.isRowTogglerClicked = false;
    }

    /**
     * Applies events related to row expansion in a non-obtrusive way
     * @protected
     */
    bindExpansionEvents() {
        var $this = this,
        togglerSelector = '> tr > td > div.ui-row-toggler';

        this.tbody.off('click.datatable-expansion', togglerSelector)
            .on('click.datatable-expansion', togglerSelector, null, function() {
                $this.isRowTogglerClicked = true;
                $this.toggleExpansion($(this));
            })
            .on('keydown.datatable-expansion', togglerSelector, null, function(e) {
                if(e.key === 'Enter') {
                    $this.toggleExpansion($(this));
                    e.preventDefault();
                }
            });
        // set aria labels
        this.tbody.find(togglerSelector).each(function() {
            $this.updateExpansionAria($(this))
        });
    }

    /**
     * Configures the ARIA label for the row expander.
     * @param {JQuery} toggler the toggler button
     * @private
     */
    updateExpansionAria(toggler) {
        if (toggler) {
            var row = toggler.closest('tr');
            var rowMeta = this.getRowMeta(row);
            var expanded = toggler.attr('aria-expanded') === "true";
            var ariaLabel = expanded ? this.getAriaLabel('collapseLabel') : this.getAriaLabel('expandLabel');
            if (rowMeta && rowMeta.key) {
                ariaLabel += " " + rowMeta.key;
            }
            toggler.attr('aria-label', ariaLabel);
        }
    }

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.widget.ContextMenu} menuWidget
     * @param {PrimeFaces.widget.DataTable} targetWidget
     * @param {string} targetId
     * @param {PrimeFaces.widget.ContextMenuCfg} cfg
     */
    bindContextMenu(menuWidget, targetWidget, targetId, cfg) {
        var $this = this;
        var targetSelector = targetId + ' tbody.ui-datatable-data > tr.ui-widget-content';
        var targetEvent = cfg.event + '.row' + this.id;
        var containerEvent = cfg.event.split(' ').map(e => e + '.datatable' + this.id).join(' ');
        this.contextMenuWidget = menuWidget;

        $(document).off(targetEvent, targetSelector).on(targetEvent, targetSelector, null, function(e) {
            var row = $(this);

            if(targetWidget.cfg.selectionMode && row.hasClass('ui-datatable-selectable')) {
                var isContextMenuDelayed = targetWidget.onRowRightClick(e, this, cfg.selectionMode, function() {
                    $this.contextMenuWidget.show(e);
                });
                targetWidget.updateContextMenuCell(e, targetWidget);

                if(isContextMenuDelayed) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
            else if(targetWidget.cfg.editMode === 'cell') {
                targetWidget.updateContextMenuCell(e, targetWidget);
                $this.contextMenuWidget.show(e);
            }
            else if(row.hasClass('ui-datatable-empty-message') && !$this.cfg.disableContextMenuIfEmpty) {
                $this.contextMenuWidget.show(e);
            }
        });
        $(document).off(containerEvent, this.jqTargetId).on(containerEvent, this.jqTargetId, null, function(e) {
            if (e.target.id == targetWidget.id + '_data') {
                $this.contextMenuWidget.show(e);
            }
        });
        this.addDestroyListener(function() {
            $(document).off(targetEvent + ' ' + containerEvent);
        });

        if(this.cfg.scrollable && this.scrollBody) {
            this.scrollBody.off('scroll.dataTable-contextmenu').on('scroll.dataTable-contextmenu', function() {
                if($this.contextMenuWidget.jq.is(':visible')) {
                    $this.contextMenuWidget.hide();
                }
            });
        }
    }

    /**
     * Updates the currently selected cell based on where the context menu right click occurred.
     * @private
     * @param {JQuery.TriggeredEvent} event Event that occurred.
     * @param {PrimeFaces.widget.DataTable} targetWidget The current widget
     */
    updateContextMenuCell(event, targetWidget) {
        var target = $(event.target),
        cell = target.is('td.ui-editable-column') ? target : target.parents('td.ui-editable-column:first');

        if(targetWidget.contextMenuCell) {
            targetWidget.contextMenuCell.removeClass('ui-state-highlight');
        }

        targetWidget.contextMenuCell = cell;
        targetWidget.contextMenuCell.addClass('ui-state-highlight');
    }

    /**
     * Sets up the event listeners for clicking on a row.
     * @private
     */
    bindRowClick() {
        var $this = this,
        rowSelector = '> tr.ui-widget-content:not(.ui-expanded-row-content)';
        this.tbody.off('click.dataTable-rowclick', rowSelector).on('click.dataTable-rowclick', rowSelector, null, function(e) {
            var target = $(e.target),
            row = target.is('tr.ui-widget-content') ? target : target.closest('tr.ui-widget-content');

            $this.cfg.onRowClick.call(this, row);
        });
    }

    /**
     * Reflow mode is a responsive mode to display columns as stacked depending on screen size.
     * @private
     */
    initReflow() {
        var headerColumns = this.thead.find('> tr > th');

        for(var i = 0; i < headerColumns.length; i++) {
            var headerColumn = headerColumns.eq(i),
            reflowHeaderText = headerColumn.find('.ui-reflow-headertext:first').text(),
            colTitleEl = headerColumn.children('.ui-column-title'),
            title = (reflowHeaderText && reflowHeaderText.length) ? reflowHeaderText : colTitleEl.text();

            var column = this.tbody.find('> tr:not(.ui-datatable-empty-message,.ui-datatable-summaryrow) > td:nth-child(' + (i + 1) + ')')
            column.find(".ui-column-title").remove(); // #11078
            column.prepend('<span class="ui-column-title">' + PrimeFaces.escapeHTML(title) + '</span>');
        }
    }

    /**
     * Prepares this DataTable for the current scrolling settings and sets up all related event handlers.
     * @protected
     */
    setupScrolling() {
        this.scrollHeader = this.jq.children('.ui-datatable-scrollable-header');
        this.scrollBody = this.jq.children('.ui-datatable-scrollable-body');
        this.scrollFooter = this.jq.children('.ui-datatable-scrollable-footer');
        this.scrollStateHolder = $(this.jqId + '_scrollState');
        this.scrollHeaderBox = this.scrollHeader.children('div.ui-datatable-scrollable-header-box');
        this.scrollFooterBox = this.scrollFooter.children('div.ui-datatable-scrollable-footer-box');
        this.headerTable = this.scrollHeaderBox.children('table');
        this.bodyTable = this.cfg.virtualScroll ? this.scrollBody.children('div').children('table') : this.scrollBody.children('table');
        this.scrollTbody = this.bodyTable.children('tbody');
        this.footerTable = this.scrollFooter.children('table');
        this.footerCols = this.scrollFooter.find('> .ui-datatable-scrollable-footer-box > table > tfoot > tr > td');
        this.percentageScrollHeight = this.cfg.scrollHeight && (this.cfg.scrollHeight.indexOf('%') !== -1);
        this.percentageScrollWidth = this.cfg.scrollWidth && (this.cfg.scrollWidth.indexOf('%') !== -1);
        var $this = this,
        scrollBarWidth = this.getScrollbarWidth() + 'px';

        if(this.cfg.scrollHeight) {
            if(this.percentageScrollHeight) {
                this.adjustScrollHeight();
            }

            if(this.hasVerticalOverflow()) {
                var marginProperty = this.isRTL ? 'margin-left' : 'margin-right';
                this.scrollHeaderBox.css(marginProperty, scrollBarWidth);
                this.scrollFooterBox.css(marginProperty, scrollBarWidth);
            }
        }

        if (!this.cfg.reflow) {
            this.fixColumnWidths();
        }

        if(this.cfg.scrollWidth) {
            if(this.percentageScrollWidth)
                this.adjustScrollWidth();
            else
                this.setScrollWidth(parseInt(this.cfg.scrollWidth));
        }

        this.cloneHead();

        if(this.cfg.liveScroll) {
            this.clearScrollState();
            this.scrollOffset = 0;
            this.cfg.liveScrollBuffer = (100 - this.cfg.liveScrollBuffer) / 100;
            this.shouldLiveScroll = true;
            this.loadingLiveScroll = false;
            this.allLoadedLiveScroll = $this.cfg.scrollStep >= $this.cfg.scrollLimit;
        }

        this.restoreScrollState();

        if(this.cfg.virtualScroll) {
            var row = this.bodyTable.children('tbody').children('tr.ui-widget-content');
            if(row) {
                var hasEmptyMessage = row.eq(0).hasClass('ui-datatable-empty-message'),
                scrollLimit = $this.cfg.scrollLimit;

                if(hasEmptyMessage) {
                    scrollLimit = 1;
                    $this.bodyTable.css('top', '0px');
                }

                this.rowHeight = row.outerHeight();
                this.scrollBody.children('div').css('height', parseFloat((scrollLimit * this.rowHeight + 1) + 'px'));

                if(hasEmptyMessage && this.cfg.scrollHeight && this.percentageScrollHeight) {
                    PrimeFaces.queueTask(function() {
                        $this.adjustScrollHeight();
                    });
                }
            }
        }

        this.scrollBody.on('scroll.dataTable', function() {
            var scrollShift = $this.scrollBody.scrollLeft();

            if ($this.isRTL) {
                $this.scrollHeaderBox.css('margin-right', scrollShift + 'px');
                $this.scrollFooterBox.css('margin-right', scrollShift + 'px');
            }
            else {
                $this.scrollHeaderBox.css('margin-left', -scrollShift + 'px');
                $this.scrollFooterBox.css('margin-left', -scrollShift + 'px');
            }

            if($this.isEmpty()) {
                return;
            }

            if($this.cfg.virtualScroll) {
                var virtualScrollBody = this;

                clearTimeout($this.scrollTimeout);
                $this.scrollTimeout = PrimeFaces.queueTask(function() {
                    var viewportHeight = $this.scrollBody.outerHeight(),
                    tableHeight = $this.bodyTable.outerHeight(),
                    pageHeight = $this.rowHeight * $this.cfg.scrollStep,
                    virtualTableHeight = parseFloat(($this.cfg.scrollLimit * $this.rowHeight) + 'px'),
                    pageCount = (virtualTableHeight / pageHeight)||1;

                    if(virtualScrollBody.scrollTop + viewportHeight > parseFloat($this.bodyTable.css('top')) + tableHeight || virtualScrollBody.scrollTop < parseFloat($this.bodyTable.css('top'))) {
                        var page = Math.floor((virtualScrollBody.scrollTop * pageCount) / (virtualScrollBody.scrollHeight)) + 1;
                        $this.loadRowsWithVirtualScroll(page, function () {
                            $this.bodyTable.css('top', ((page - 1) * pageHeight) + 'px');
                        });
                    }
                }, 200);
            }
            else if($this.shouldLiveScroll) {
                var scrollTop = Math.ceil(this.scrollTop),
                scrollHeight = this.scrollHeight,
                viewportHeight = this.clientHeight;

                if((scrollTop >= ((scrollHeight * $this.cfg.liveScrollBuffer) - (viewportHeight))) && $this.shouldLoadLiveScroll()) {
                    $this.loadLiveRows();
                }
            }

            $this.saveScrollState();
        });

        this.scrollHeader.on('scroll.dataTable', function() {
            $this.scrollHeader.scrollLeft(0);
        });

        this.scrollFooter.on('scroll.dataTable', function() {
            $this.scrollFooter.scrollLeft(0);
        });

        PrimeFaces.utils.registerResizeHandler(this, 'resize.' + this.id + '_align', $this.jq, function() {
            if ($this.percentageScrollHeight) {
                $this.adjustScrollHeight();
            }
            if ($this.percentageScrollWidth) {
                $this.adjustScrollWidth();
            }
        });
    }

    /**
     * When live scrolling (loading more items on-demand) is enabled, checks whether more items are allowed to be loaded
     * right now. Returns `false` when live scroling is disabled or items are currently being loaded already.
     * @private
     * @return {boolean} `true` if more items may be loaded, `false` otherwise.
     */
    shouldLoadLiveScroll() {
        return (!this.loadingLiveScroll && !this.allLoadedLiveScroll);
    }

    /**
     * Clones a table header and removes duplicate IDs.
     * @private
     * @param {JQuery} thead The head (`THEAD`) of the table to clone.
     * @param {JQuery} table The table to which the head belongs.
     * @return {JQuery} The cloned table head.
     */
    cloneTableHeader(thead, table) {
        var clone = thead.clone();
        clone.find('th').each(function() {
            var header = $(this);
            header.attr('id', header.attr('id') + '_clone');
            header.removeAttr('aria-label');
            header.children().not('.ui-column-title').remove();
            header.children('.ui-column-title').children().remove();
        });
        clone.removeAttr('id').addClass('ui-datatable-scrollable-theadclone').height(0).prependTo(table);

        return clone;
    }

    /**
     * Creates and stores a cloned copy of the table head(er) of this DataTable, and sets up some event handlers.
     * @protected
     */
    cloneHead() {
        if (this.theadClone) {
            PrimeFaces.utils.cleanseDomElement(this.theadClone);
        }
        this.theadClone = this.cloneTableHeader(this.thead, this.bodyTable);

        //reflect events from clone to original
        if(this.cfg.sorting) {
            this.sortableColumns.removeAttr('tabindex').off('blur.dataTable focus.dataTable keydown.dataTable');

            var clonedColumns = this.theadClone.find('> tr > th'),
            clonedSortableColumns = clonedColumns.filter('.ui-sortable-column');
            clonedColumns.each(function() {
                var col = $(this),
                originalId = col.attr('id').split('_clone')[0];
                if(col.hasClass('ui-sortable-column')) {
                    col.data('original', originalId);
                }

                $(PrimeFaces.escapeClientId(originalId))[0].style.width = col[0].style.width;
            });

            clonedSortableColumns.on('blur.dataTable', function() {
                $(PrimeFaces.escapeClientId($(this).data('original'))).removeClass('ui-state-focus');
            })
            .on('focus.dataTable', function() {
                $(PrimeFaces.escapeClientId($(this).data('original'))).addClass('ui-state-focus');
            })
            .on('keydown.dataTable', function(e) {
                if((e.key === 'Enter') && $(e.target).is(':not(:input)')) {
                    $(PrimeFaces.escapeClientId($(this).data('original'))).trigger('click.dataTable', (e.metaKey||e.ctrlKey));
                    e.preventDefault();
                }
            });
        }
    }

    /**
     * Adjusts the height of the body of this DataTable for the current scrolling settings.
     * @protected
     */
    adjustScrollHeight() {
        var relativeHeight = this.jq.parent().innerHeight() * (parseInt(this.cfg.scrollHeight) / 100),
        headerChilden = this.jq.children('.ui-datatable-header'),
        footerChilden = this.jq.children('.ui-datatable-footer'),
        tableHeaderHeight = (headerChilden.length > 0) ? headerChilden.outerHeight(true) : 0,
        tableFooterHeight = (footerChilden.length > 0) ? footerChilden.outerHeight(true) : 0,
        scrollersHeight = (this.scrollHeader.outerHeight(true) + this.scrollFooter.outerHeight(true)),
        paginatorsHeight = this.paginator ? this.paginator.getContainerHeight(true) : 0,
        height = (relativeHeight - (scrollersHeight + paginatorsHeight + tableHeaderHeight + tableFooterHeight));

        if(this.cfg.virtualScroll) {
            this.scrollBody.css('max-height', height + 'px');
        }
        else {
            this.scrollBody.height(height);
        }
    }

    /**
     * Adjusts the width of the header, body, and footer of this DataTable to fit the current settings.
     * @protected
     */
    adjustScrollWidth() {
        var width = parseInt((this.jq.parent().innerWidth() * (parseInt(this.cfg.scrollWidth) / 100)));
        this.setScrollWidth(width);
    }

    /**
     * Applies the given width to this DataTable.
     * @private
     * @param {JQuery} element Element of the DataTable.
     * @param {number} width New width in pixels to set.
     */
    setOuterWidth(element, width) {
        if (element.css('box-sizing') === 'content-box') { // Github issue: #5014
            element.outerWidth(width);
        }
        else {
            element.width(width);
        }
    }

    /**
     * Retrieves width information of the given column.
     * @private
     * @param {JQuery} col The column of which the width should be retrieved.
     * @param {boolean} isIncludeResizeableState Tells whether the width should be retrieved from the resizable state,
     * if it exists.
     * @return {PrimeFaces.widget.DataTable.WidthInfo} The width information of the given column.
     */
    getColumnWidthInfo(col, isIncludeResizeableState) {
        var $this = this;
        var width, isOuterWidth;

        if(isIncludeResizeableState && this.resizableState) {
            width = $this.findColWidthInResizableState(col.attr('id'));
            isOuterWidth = false;
        }

        if(!width) {
            width = col[0].style.width;
            isOuterWidth = width && (col.css('box-sizing') === 'content-box');
        }

        if(!width) {
            width = col.width();
            isOuterWidth = false;
        }

        return {
            width: width,
            isOuterWidth: isOuterWidth
        };
    }

    /**
     * Applies the width information to the given element.
     * @private
     * @param {JQuery} element The element to which the width should be applied.
     * @param {PrimeFaces.widget.DataTable.WidthInfo} widthInfo The width information (retrieved using the method {@link getColumnWidthInfo}).
     */
    applyWidthInfo(element, widthInfo) {
        if(widthInfo.isOuterWidth) {
            element.outerWidth(widthInfo.width);
        }
        else {
            element.width(widthInfo.width);
        }
    }

    /**
     * Applies the given scroll width to this DataTable.
     * @protected
     * @param {number} width Scroll width in pixels to set.
     */
    setScrollWidth(width) {
        var $this = this;
        this.jq.children('.ui-widget-header').each(function() {
            $this.setOuterWidth($(this), width);
        });
        this.scrollHeader.width(width);
        this.scrollBody.css('margin-right', '0px').width(width);
        this.scrollFooter.width(width);
    }

    /**
     * Adds some margin to the scroll body to make it align properly.
     * @private
     */
    alignScrollBody() {
        var margin = this.hasVerticalOverflow() ? this.getScrollbarWidth() + 'px' : '0px';

        var marginProperty = this.isRTL ? 'margin-left' : 'margin-right';
        this.scrollHeaderBox.css(marginProperty, margin);
        this.scrollFooterBox.css(marginProperty, margin);
    }

    /**
     * Finds the width of the current scrollbar used for this DataTable.
     * @private
     * @return {number} The width in pixels of the scrollbar of this DataTable.
     */
    getScrollbarWidth() {
        if(!this.scrollbarWidth) {
            this.scrollbarWidth = PrimeFaces.calculateScrollbarWidth();
        }

        return this.scrollbarWidth;
    }

    /**
     * Checks whether the body of this DataTable overflow vertically.
     * @protected
     * @return {boolean} `true` if any content overflow vertically, `false` otherwise.
     */
    hasVerticalOverflow() {
        return (this.cfg.scrollHeight && this.bodyTable.outerHeight() > this.scrollBody.outerHeight());
    }

    /**
     * Reads the saved scroll state and applies it. This helps to preserve the current scrolling position during AJAX
     * updates.
     * @private
     */
    restoreScrollState() {
        var scrollState = this.scrollStateHolder.val(),
        scrollValues = scrollState.split(',');

        if (scrollValues[0] == '-1') {
            scrollValues[0] = this.scrollBody[0].scrollWidth;
        }

        this.scrollBody.scrollLeft(scrollValues[0]);
        this.scrollBody.scrollTop(scrollValues[1]);
    }

    /**
     * Saves the current scrolling position. This helps to preserve the current scrolling position during AJAX updates.
     * @private
     */
    saveScrollState() {
        var scrollState = this.scrollBody.scrollLeft() + ',' + this.scrollBody.scrollTop();

        this.scrollStateHolder.val(scrollState);
    }

    /**
     * Clears the saved scrolling position.
     * @private
     */
    clearScrollState() {
        this.scrollStateHolder.val('0,0');
    }
    
    /**
     * Adjusts the width of a column in a table to fit the widest cell content.
     *
     * This function calculates the maximum width needed for a column in a table
     * to accommodate the widest cell content. It creates a temporary span element
     * to measure the width of cell contents and adjusts the column header width accordingly.
     *
     * @param {JQuery} cell - A jQuery object representing a cell in the column to be resized.
     * @private
     */
    autosizeColumnWidth(cell) {
        // Create a temporary span element
        var $span = $("<span></span>")
            .css({
                visibility: "hidden",
                position: "absolute",
                whiteSpace: "nowrap",
            })
            .appendTo(document.body);

        // Function to set the span's styles based on a cell's styles
        var setSpanStyles = function($element) {
            $span.text($element.text()).css({
                font: $element.css("font"),
                fontSize: $element.css("fontSize"),
                fontWeight: $element.css("fontWeight"),
                fontFamily: $element.css("fontFamily"),
            });
        };

        // Get the index of the cell's column within its row
        var columnIndex = cell.index();

        // Select all the cells in the same column of other rows
        var $whichBody = this.cfg.scrollable ? this.scrollTbody : this.tbody;
        var cellsInSameColumn = $whichBody.find("> tr:not(.ui-expanded-row-content) td:nth-child(" + (columnIndex + 1) + ")");

        // Find the max width of the largest column
        var maxWidth = 0;
        cellsInSameColumn.each(function() {
            var $td = $(this);
            setSpanStyles($td);
            var cellWidth = $span.outerWidth(true);
            maxWidth = Math.max(maxWidth, cellWidth);
        });

        // Find the header for the column
        var $header = this.thead.find(".ui-resizable-column").eq(columnIndex);
        setSpanStyles($header);

        // get header width and add 20px to account for possible sort icon
        var headerWidth = $span.outerWidth(true) + 20;
        maxWidth = Math.max(maxWidth, headerWidth);

        // Remove the span from the document body
        $span.remove();

        // set the TH header to the new width
        $header.css("width", maxWidth);
        // set the cloned scroll header to the same width
        if (this.cfg.scrollable) {
            this.theadClone.find(".ui-resizable-column").eq(columnIndex).css("width", maxWidth);
        }
        
        // fire the AJAX event if necessary
        this.fireColumnResizeEvent($header);
    }

    /**
     * Adjusts the width of the given columns to fit the current settings.
     * @protected
     */
    fixColumnWidths() {
        var $this = this;

        if(!this.columnWidthsFixed) {
            if(this.cfg.scrollable) {
                this.scrollHeader.find('> .ui-datatable-scrollable-header-box > table > thead > tr > th').each(function() {
                    var headerCol = $(this),
                    colIndex = headerCol.index(),
                    widthInfo = $this.getColumnWidthInfo(headerCol, true);

                    $this.applyWidthInfo(headerCol, widthInfo);

                    if($this.footerCols.length > 0) {
                        var footerCol = $this.footerCols.eq(colIndex);
                        $this.applyWidthInfo(footerCol, widthInfo);
                    }
                });
            }
            else {
                var columns = this.jq.find('> .ui-datatable-tablewrapper > table > thead > tr > th'),
                    visibleColumns = columns.filter(':visible'),
                    hiddenColumns = columns.filter(':hidden');

                this.setColumnsWidth(visibleColumns);
                /* IE fixes */
                this.setColumnsWidth(hiddenColumns);
            }

            this.columnWidthsFixed = true;
        }
    }

    /**
     * Applies the appropriated width to all given column elements.
     * @param {JQuery} columns A list of column elements.
     * @private
     */
    setColumnsWidth(columns) {
        if(columns.length) {
            var $this = this;

            columns.each(function() {
                var col = $(this),
                widthInfo = $this.getColumnWidthInfo(col, true);

                $this.applyWidthInfo(col, widthInfo);
            });
        }
    }

    /**
     * Use only when live scrolling is enabled: Loads the next set of rows on-the-fly.
     */
    loadLiveRows() {
        if(this.liveScrollActive||(this.scrollOffset + this.cfg.scrollStep > this.cfg.scrollLimit)) {
            return;
        }

        this.liveScrollActive = true;
        this.scrollOffset += this.cfg.scrollStep;

        //Disable scroll if there is no more data left
        if(this.scrollOffset === this.cfg.scrollLimit) {
            this.shouldLiveScroll = false;
        }

        var $this = this,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_scrolling', value: true},
                            {name: this.id + '_first', value: 1},
                            {name: this.id + '_skipChildren', value: true},
                            {name: this.id + '_scrollOffset', value: this.scrollOffset},
                            {name: this.id + '_encodeFeature', value: true}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                    widget: $this,
                    handle: function(content) {
                        //insert new rows
                        this.updateData(content, false);

                        this.liveScrollActive = false;
                    }
                });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                if(typeof args.totalRecords !== 'undefined') {
                    $this.cfg.scrollLimit = args.totalRecords;
                }

                $this.loadingLiveScroll = false;
                $this.allLoadedLiveScroll = ($this.scrollOffset + $this.cfg.scrollStep) >= $this.cfg.scrollLimit;

                // reset index of shift selection on multiple mode
                $this.originRowMeta = null;
            }
        };

        if (this.hasBehavior('liveScroll')) {
            this.callBehavior('liveScroll', options);
        } else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * When live scrolling is enabled: Loads the next set of rows via AJAX.
     * @private
     * @param {number} page 0-based index of the page to load.
     * @param {() => void} callback Callback that is invoked after the rows have been loaded and inserted into the DOM.
     */
    loadRowsWithVirtualScroll(page, callback) {
        if(this.virtualScrollActive) {
            return;
        }

        this.virtualScrollActive = true;

        var $this = this,
        first = (page - 1) * this.cfg.scrollStep,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_scrolling', value: true},
                            {name: this.id + '_skipChildren', value: true},
                            {name: this.id + '_first', value: first},
                            {name: this.id + '_encodeFeature', value: true}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                    widget: $this,
                    handle: function(content) {
                        //insert new rows
                        this.updateData(content);
                        callback();
                        this.virtualScrollActive = false;
                    }
                });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                if(typeof args.totalRecords !== 'undefined') {
                    $this.cfg.scrollLimit = args.totalRecords;
                }

                // reset index of shift selection on multiple mode
                $this.originRowMeta = null;
            }
        };
        if (this.hasBehavior('virtualScroll')) {
            this.callBehavior('virtualScroll', options);
        } else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Switches to the given page by loading the content via AJAX. Compare with `loadDataWithCache`, which first checks
     * whether the data is already cached and loads it from the server only when not found in the cache.
     * @private
     * @param {PrimeFaces.widget.Paginator.PaginationState} newState The new values for the current page and the rows
     * per page count.
     */
    paginate(newState) {
        var $this = this,
        options = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_pagination', value: true},
                    {name: this.id + '_first', value: newState.first},
                    {name: this.id + '_rows', value: newState.rows},
                    {name: this.id + '_skipChildren', value: true},
                    {name: this.id + '_encodeFeature', value: true}]
        };

        if (!this.cfg.partialUpdate) {
            options.params.push({name: this.id + '_fullUpdate', value: true});

            options.onsuccess = function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.jq.replaceWith(content);
                        }
                    });

                return true;
            };
        }
        else {
            options.onsuccess = function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.updateData(content);

                            if(this.checkAllToggler) {
                                this.updateHeaderCheckbox();
                            }

                            if(this.cfg.scrollable) {
                                this.alignScrollBody();
                            }

                            if(this.cfg.clientCache) {
                                this.cacheMap[newState.first] = content;
                            }
                        }
                    });

                return true;
            };

            options.oncomplete = function(xhr, status, args, data) {
                $this.paginator.cfg.page = newState.page;
                if(args && typeof args.totalRecords !== 'undefined') {
                    $this.paginator.updateTotalRecords(args.totalRecords);
                }
                else {
                    $this.paginator.updateUI();
                }
                $this.updateColumnsView();
                // reset index of shift selection on multiple mode
                $this.originRowMeta = null;
            };
        }

        if(this.hasBehavior('page')) {
            this.callBehavior('page', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Loads next page asynchronously to keep it at viewstate and Updates viewstate
     * @private
     * @param {PrimeFaces.widget.Paginator.PaginationState} newState The new values for the current page and the rows
     * per page count.
     */
    fetchNextPage(newState) {
        var rows = newState.rows,
        first = newState.first,
        $this = this,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            global: false,
            params: [{name: this.id + '_skipChildren', value: true},
                    {name: this.id + '_encodeFeature', value: true},
                    {name: this.id + '_first', value: first},
                    {name: this.id + '_rows', value: rows},
                    {name: this.id + '_pagination', value: true},
                    {name: this.id + '_clientCache', value: true}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                    widget: $this,
                    handle: function(content) {
                        if(content.length) {
                            var nextFirstValue = first + rows;
                            $this.cacheMap[nextFirstValue] = content;
                        }
                    }
                });

                return true;
            }
        };

        PrimeFaces.ajax.Request.handle(options);
    }

    /**
     * Updates and syncs the current pagination state with the server.
     * @private
     * @param {PrimeFaces.widget.Paginator.PaginationState} newState The new values for the current page and the rows
     * per page count.
     */
    updatePageState(newState) {
        var $this = this,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            global: false,
            params: [{name: this.id + '_pagination', value: true},
                    {name: this.id + '_encodeFeature', value: true},
                    {name: this.id + '_pageState', value: true},
                    {name: this.id + '_first', value: newState.first},
                    {name: this.id + '_rows', value: newState.rows}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                    widget: $this,
                    handle: function(content) {
                        // do nothing
                    }
                });

                return true;
            }
        };

        PrimeFaces.ajax.Request.handle(options);
    }

    /**
     * Performs a sorting operation on the rows of this DataTable via AJAX
     * @private
     * @param {JQuery} columnHeader Header of the column by which to sort.
     * @param {-1 | 0 | 1} order `-1` to sort column values in ascending order, `+1` to sort column values in descending
     * order, or `0` to remove the sorting order and display rows in their original order.
     * @param {boolean} multi `true` if sorting by multiple columns is enabled, or `false` otherwise.
     */
    sort(columnHeader, order, multi) {
        var $this = this,
        options = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_sorting', value: true},
                     {name: this.id + '_skipChildren', value: true},
                     {name: this.id + '_encodeFeature', value: true},
                     {name: this.id + '_sortKey', value: $this.joinSortMetaOption('col')},
                     {name: this.id + '_sortDir', value: $this.joinSortMetaOption('order')}]
        };

        if (!this.cfg.partialUpdate) {
            options.params.push({name: this.id + '_fullUpdate', value: true});

            options.onsuccess = function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.jq.replaceWith(content);
                        }
                    });

                return true;
            };
        }
        else {
            options.onsuccess = function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.updateData(content);

                            if(this.checkAllToggler) {
                              this.updateHeaderCheckbox();
                            }
                        }
                    });

                return true;
            };

            options.oncomplete = function(xhr, status, args, data) {
                var paginator = $this.getPaginator();
                if(args) {
                    if(args.totalRecords) {
                        $this.cfg.scrollLimit = args.totalRecords;

                        if(paginator && paginator.cfg.rowCount !== args.totalRecords) {
                            paginator.setTotalRecords(args.totalRecords);
                        }
                    }

                    if(!args.validationFailed) {
                        if(paginator) {
                            paginator.setPage(0, true);
                        }

                        // remove aria-sort
                        var activeColumns = $this.sortableColumns.filter('.ui-state-active');
                        if(activeColumns.length) {
                            activeColumns.removeAttr('aria-sort');
                        }
                        else {
                            $this.sortableColumns.eq(0).removeAttr('aria-sort');
                        }

                        if(!multi) {
                            //aria reset
                            for(var i = 0; i < activeColumns.length; i++) {
                                var activeColumn = $(activeColumns.get(i)),
                                    ariaLabelOfActive = activeColumn.attr('aria-label');

                                activeColumn.attr('aria-label', $this.getSortMessage(ariaLabelOfActive, $this.ascMessage));
                                $(PrimeFaces.escapeClientId(activeColumn.attr('id') + '_clone')).removeAttr('aria-sort').attr('aria-label', $this.getSortMessage(ariaLabelOfActive, $this.ascMessage));
                            }

                            activeColumns.data('sortorder', DataTable.SORT_ORDER.UNSORTED).removeClass('ui-state-active')
                                        .find('.ui-sortable-column-icon').removeClass('ui-icon-triangle-1-n ui-icon-triangle-1-s');
                        }

                        columnHeader.data('sortorder', order).addClass('ui-state-active');
                        var sortIcon = columnHeader.find('.ui-sortable-column-icon'),
                        ariaLabel = columnHeader.attr('aria-label');

                        if (order === DataTable.SORT_ORDER.DESCENDING) {
                            sortIcon.removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-s');
                            columnHeader.attr('aria-sort', 'descending').attr('aria-label', $this.getSortMessage(ariaLabel, $this.otherMessage));
                            $(PrimeFaces.escapeClientId(columnHeader.attr('id') + '_clone')).attr('aria-sort', 'descending')
                                .attr('aria-label', $this.getSortMessage(ariaLabel, $this.otherMessage));
                        } else if (order === DataTable.SORT_ORDER.ASCENDING) {
                            sortIcon.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-n');
                            columnHeader.attr('aria-sort', 'ascending').attr('aria-label', $this.getSortMessage(ariaLabel, $this.descMessage));
                            $(PrimeFaces.escapeClientId(columnHeader.attr('id') + '_clone')).attr('aria-sort', 'ascending')
                                .attr('aria-label', $this.getSortMessage(ariaLabel, $this.descMessage));
                        } else {
                            sortIcon.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-carat-2-n-s');
                            columnHeader.removeClass('ui-state-active').attr('aria-sort', 'other')
                                .attr('aria-label', $this.getSortMessage(ariaLabel, $this.ascMessage));
                            $(PrimeFaces.escapeClientId(columnHeader.attr('id') + '_clone')).attr('aria-sort', 'other')
                                .attr('aria-label', $this.getSortMessage(ariaLabel, $this.ascMessage));
                        }

                        $this.updateSortPriorityIndicators();
                    }
                }

                if($this.cfg.virtualScroll) {
                    $this.resetVirtualScrollBody();
                }
                else if($this.cfg.liveScroll) {
                    $this.scrollOffset = 0;
                    $this.liveScrollActive = false;
                    $this.shouldLiveScroll = true;
                    $this.loadingLiveScroll = false;
                    $this.allLoadedLiveScroll = $this.cfg.scrollStep >= $this.cfg.scrollLimit;
                }

                if($this.cfg.clientCache) {
                    $this.clearCacheMap();
                }

                $this.updateColumnsView();

                // reset index of shift selection on multiple mode
                $this.originRowMeta = null;
            }
        }

        if (this.hasBehavior('sort')) {
            this.callBehavior('sort', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * In multi-sort mode this will add number indicators to let the user know the current
     * sort order. If only one column is sorted then no indicator is displayed and will
     * only be displayed once more than one column is sorted.
     * @private
     */
    updateSortPriorityIndicators() {
        var $this = this;

        // remove all indicator numbers first
        $this.sortableColumns.find('.ui-sortable-column-badge').text('').addClass('ui-helper-hidden');

        // add 1,2,3 etc to columns if more than 1 column is sorted
        var sortMeta =  $this.sortMeta;
        if (sortMeta && sortMeta.length > 1) {
            $this.sortableColumns.each(function() {
                var id = $(this).attr("id");
                for (var i = 0; i < sortMeta.length; i++) {
                    if (sortMeta[i].col == id) {
                        $(this).find('.ui-sortable-column-badge').text(i + 1).removeClass('ui-helper-hidden');
                    }
                }
            });
        }
    }

    /**
     * Serializes the option from the sort meta items.
     * @private
     * @param {keyof PrimeFaces.widget.DataTable.SortMeta} option Property of the sort meta to use.
     * @return {string} All values from the current sort meta list for the given option.
     */
    joinSortMetaOption(option) {
        var value = '';

        for(var i = 0; i < this.sortMeta.length; i++) {
            value += this.sortMeta[i][option];

            if(i !== (this.sortMeta.length - 1)) {
                value += ',';
            }
        }

        return value;
    }

    /**
     * Filters this DataTable. Uses the current values of the filter inputs. This will result in an AJAX request being
     * sent.
     */
    filter() {
        var $this = this,
        options = {
            source: this.id,
            update: this.id,
            process: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_filtering', value: true},
                     {name: this.id + '_encodeFeature', value: true}]
        };


        if (!this.cfg.partialUpdate){
            options.params.push({name: this.id + '_fullUpdate', value: true});

            options.onsuccess = function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.jq.replaceWith(content);
                        }
                    });

                return true;
            };
        }
        else {
            options.onsuccess = function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            this.updateData(content);

                            if(this.cfg.scrollable) {
                                this.alignScrollBody();
                            }

                            if(this.isCheckboxSelectionEnabled()) {
                                this.updateHeaderCheckbox();
                            }
                        }
                    });

                return true;
            };

            options.oncomplete = function(xhr, status, args, data) {
                var paginator = $this.getPaginator();
                if(args && typeof args.totalRecords !== 'undefined') {
                    $this.cfg.scrollLimit = args.totalRecords;

                    if(paginator) {
                        paginator.setTotalRecords(args.totalRecords);
                    }
                }

                if($this.cfg.clientCache) {
                    $this.clearCacheMap();
                }

                if($this.cfg.virtualScroll) {
                    var row = $this.bodyTable.children('tbody').children('tr.ui-widget-content');
                    if(row) {
                        var hasEmptyMessage = row.eq(0).hasClass('ui-datatable-empty-message'),
                        scrollLimit = $this.cfg.scrollLimit;

                        if(hasEmptyMessage) {
                            scrollLimit = 1;
                        }

                        $this.resetVirtualScrollBody();

                        $this.rowHeight = row.outerHeight();
                        $this.scrollBody.children('div').css({'height': parseFloat((scrollLimit * $this.rowHeight + 1) + 'px')});

                        if(hasEmptyMessage && $this.cfg.scrollHeight && $this.percentageScrollHeight) {
                            PrimeFaces.queueTask(function() {
                                $this.adjustScrollHeight();
                            });
                        }
                    }
                }
                else if($this.cfg.liveScroll) {
                    $this.scrollOffset = 0;
                    $this.liveScrollActive = false;
                    $this.shouldLiveScroll = true;
                    $this.loadingLiveScroll = false;
                    $this.allLoadedLiveScroll = $this.cfg.scrollStep >= $this.cfg.scrollLimit;
                }

                $this.updateColumnsView();
                $this.updateEmptyColspan();

                // reset index of shift selection on multiple mode
                $this.originRowMeta = null;
            }
        }

        if(this.hasBehavior('filter')) {
            this.callBehavior('filter', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Callback for a click event on a row.
     * @private
     * @param {JQuery.TriggeredEvent} event Click event that occurred.
     * @param {HTMLElement} rowElement Row that was clicked
     * @param {boolean} silent `true` to prevent behaviors from being invoked, `false` otherwise.
     */
    onRowClick(event, rowElement, silent) {
        // Check if row click triggered this event not a clickable element in row content
        if($(event.target).is(this.rowSelectorForRowClick)) {
            var row = $(rowElement),
            selected = row.hasClass('ui-state-highlight'),
            metaKey = event.metaKey||event.ctrlKey||PrimeFaces.env.isTouchable(this.cfg),
            shiftKey = event.shiftKey;

            this.assignFocusedRow(row);

            // Unselect a selected row if meta key is on
            if(selected && metaKey) {
                this.unselectRow(row, silent);
            }
            else {
                //unselect previous selection if this is single selection or multiple one with no keys
                if(this.isSingleSelection() || (this.isMultipleSelection() && event && !metaKey && !shiftKey && this.cfg.selectionRowMode === 'new' )) {
                    this.unselectAllRows();
                }

                //range selection with shift key
                if(this.isMultipleSelection() && event && event.shiftKey && this.originRowMeta !== null) {
                    this.selectRowsInRange(row, false);
                }
                else if(this.cfg.selectionRowMode === 'add' && selected) {
                    this.unselectRow(row, silent);
                }
                //select current row
                else {
                    this.originRowMeta = this.getRowMeta(row);
                    this.cursorRowMeta = null;
                    this.selectRow(row, silent);
                }
            }

            if(this.cfg.disabledTextSelection) {
                PrimeFaces.clearSelection();
            }

            //#3567 trigger client row click on ENTER/SPACE
            if (this.cfg.onRowClick && event.type === "keydown") {
                this.cfg.onRowClick.call(this, row);
            }
        }
    }

    /**
     * Callback for a double click event on a row.
     * @private
     * @param {JQuery.TriggeredEvent} event Event that occurred.
     * @param {JQuery} row Row that was clicked.
     */
    onRowDblclick(event, row) {
        if(this.cfg.disabledTextSelection) {
            PrimeFaces.clearSelection();
        }

        //Check if row click triggered this event not a clickable element in row content
        if($(event.target).is(this.rowSelectorForRowClick)) {
            var rowMeta = this.getRowMeta(row);

            this.fireRowSelectEvent(rowMeta.key, 'rowDblselect');
        }
    }

    /**
     * Callback for a right click event on a row. May bring up the context menu
     * @private
     * @param {JQuery.TriggeredEvent} event Event that occurred.
     * @param {JQuery} rowElement Row that was clicked.
     * @param {PrimeFaces.widget.DataTable.CmSelectionMode} cmSelMode The current selection mode.
     * @param {() => void} [fnShowMenu] Optional callback function invoked when the menu was opened.
     * @return {boolean} true to hide the native browser context menu, false to display it
     */
    onRowRightClick(event, rowElement, cmSelMode, fnShowMenu) {
        var row = $(rowElement),
        rowMeta = this.getRowMeta(row),
        selected = row.hasClass('ui-state-highlight');

        this.assignFocusedRow(row);

        if(cmSelMode === 'single' || !selected) {
            this.unselectAllRows();
        }

        this.selectRow(row, true);

        this.fireRowSelectEvent(rowMeta.key, 'contextMenu', fnShowMenu);

        if(this.cfg.disabledTextSelection) {
            PrimeFaces.clearSelection();
        }

        return this.hasBehavior('contextMenu');
    }

    /**
     * Converts a row specifier to the row element. The row specifier is either a row index or the row element itself.
     *
     * __In case this DataTable has got expandable rows, please not that a new table row is created for each expanded row.__
     * This may result in the given index not pointing to the intended row.
     * @param {PrimeFaces.widget.DataTable.RowSpecifier} r The row to convert.
     * @return {JQuery} The row, or an empty JQuery instance of no row was found.
     */
    findRow(r) {
        var row = r;

        if(PrimeFaces.isNumber(r)) {
            row = this.tbody.children('tr:eq(' + r + ')');
        }

        return row;
    }

    /**
     * Select the rows between the cursor and the given row.
     * @private
     * @param {JQuery} row A row of this DataTable.
     * @param {boolean} [silent] `true` to prevent behaviors and event listeners from being invoked, or `false`
     * otherwise.
     */
    selectRowsInRange(row, silent) {
        var rows = this.tbody.children('.ui-datatable-selectable'),
            rowMeta = this.getRowMeta(row),
            offset = (this.cfg.paginator && this.cfg.paginator.page >= 0) ? this.cfg.paginator.rows * this.cfg.paginator.page : 0,
            newCursorIndex = offset > this.originRowMeta.index ? this.originRowMeta.index : this.originRowMeta.index - offset,
            currentIndex = offset > rowMeta.index ? rowMeta.index : rowMeta.index - offset,
            $this = this;

        // Unselect previously selected rows with shift
        if (this.cursorRowMeta !== null) {
            var oldCursorIndex = this.cursorRowMeta.index,
                rowsToUnselect = rows.slice(Math.min(oldCursorIndex, newCursorIndex), Math.max(oldCursorIndex, newCursorIndex) + 1);

            rowsToUnselect.each(function(i, item) {
                $this.unselectRow($(item), true);
            });
        }

        // Select rows between cursor and origin
        this.cursorRowMeta = rowMeta;
        var rowsToSelect = rows.slice(Math.min(currentIndex, newCursorIndex), Math.max(currentIndex, newCursorIndex) + 1);

        rowsToSelect.each(function(i, item) {
            $this.selectRow($(item), true);
        });

        if (!silent) {
            this.fireRowSelectEvent(rowMeta.key, 'rowSelect');
        }
    }

    /**
     * Selects the given row, according to the current selection mode.
     * @param {PrimeFaces.widget.DataTable.RowSpecifier} r A row of this DataTable to select.
     * @param {boolean} [silent] `true` to prevent behaviors and event listeners from being invoked, or `false`
     * otherwise.
     */
    selectRow(r, silent) {
        var row = this.findRow(r);
        if(!row.hasClass('ui-datatable-selectable')) {
            return;
        }

        // #5944 in single select all other rows should be unselected
        if (this.isSingleSelection() || this.isRadioSelectionEnabled()) {
            this.unselectAllRows();
        }

        var rowMeta = this.getRowMeta(row);

        this.highlightRow(row);

        if(this.isCheckboxSelectionEnabled()) {
            if(this.cfg.nativeElements)
                row.children('td.ui-selection-column').find(':checkbox').prop('checked', true);
            else
                this.selectCheckbox(row.children('td.ui-selection-column').find('> div.ui-chkbox > div.ui-chkbox-box'));

            this.updateHeaderCheckbox();
        }

        if(this.isRadioSelectionEnabled()) {
            if(this.cfg.nativeElements)
                row.children('td.ui-selection-column').find(':radio').prop('checked', true);
            else
                this.selectRadio(row.children('td.ui-selection-column').find('> div.ui-radiobutton > div.ui-radiobutton-box'));
        }

        this.addSelection(rowMeta.key);

        this.writeSelections();

        if(!silent) {
            this.fireRowSelectEvent(rowMeta.key, 'rowSelect');
        }
    }

    /**
     * Unselects the given row.
     * @param {PrimeFaces.widget.DataTable.RowSpecifier} r A row of this DataTable to unselect.
     * @param {boolean} [silent] `true` to prevent behaviors and event listeners from being invoked, or `false`
     * otherwise.
     */
    unselectRow(r, silent) {
        var row = this.findRow(r);
        if(!row.hasClass('ui-datatable-selectable')) {
            return;
        }

        var rowMeta = this.getRowMeta(row);

        this.unhighlightRow(row);

        if(this.isCheckboxSelectionEnabled()) {
            if(this.cfg.nativeElements)
                row.children('td.ui-selection-column').find(':checkbox').prop('checked', false);
            else
                this.unselectCheckbox(row.children('td.ui-selection-column').find('> div.ui-chkbox > div.ui-chkbox-box'));

            this.updateHeaderCheckbox();
        }

        if(this.isRadioSelectionEnabled()) {
            if(this.cfg.nativeElements)
                row.children('td.ui-selection-column').find(':radio').prop('checked', false);
            else
                this.unselectRadio(row.children('td.ui-selection-column').find('> div.ui-radiobutton > div.ui-radiobutton-box'));
        }

        this.removeSelection(rowMeta.key);

        this.writeSelections();

        if(!silent) {
            this.fireRowUnselectEvent(rowMeta.key, "rowUnselect");
        }
    }
    
    /**
     * Configures the ARIA label for the row checkbox/radio button.
     * @param {JQuery} row the row key to identify
     * @private
     */
    updateSelectionAria(row) {
        if (row) {
            var jq = row.children('td.ui-selection-column').find(":radio,:checkbox,div.ui-chkbox-box");
            // Only update aria-label if one doesn't already exist
            if (jq && !jq.attr('aria-label')) {
                var rowMeta = this.getRowMeta(row);
                var checked = row.attr('aria-selected') === "true"
                var ariaLabel = checked ? this.getAriaLabel('unselectLabel') : this.getAriaLabel('selectLabel');
                ariaLabel += " " + rowMeta.key;
                jq.attr('aria-label', ariaLabel);
            }
        }
    }

    /**
     * Highlights row to mark it as selected.
     * @protected
     * @param {JQuery} row Row to highlight.
     */
    highlightRow(row) {
        row.addClass('ui-state-highlight').attr('aria-selected', true);
        this.updateSelectionAria(row)
    }

    /**
     * Removes the highlight of a row so it is no longer marked as selected.
     * @protected
     * @param {JQuery} row Row to unhighlight.
     */
    unhighlightRow(row) {
        row.removeClass('ui-state-highlight').attr('aria-selected', false);
        this.updateSelectionAria(row)
    }

    /**
     * Sends a row select event on server side to invoke a row select listener if defined.
     * @private
     * @param {string} rowKey The key of the row that was selected.
     * @param {string} behaviorEvent Name of the event to fire.
     * @param {() => void} [fnShowMenu] Optional callback function invoked when the menu was opened.
     */
    fireRowSelectEvent(rowKey, behaviorEvent, fnShowMenu) {
        if(this.hasBehavior(behaviorEvent)) {
            var ext = {
                    params: [{name: this.id + '_instantSelectedRowKey', value: rowKey}
                ],
                oncomplete: function() {
                    if(typeof fnShowMenu === "function") {
                        fnShowMenu();
                    }
                }
            };

            this.callBehavior(behaviorEvent, ext);
        }
        else {
            if(typeof fnShowMenu === "function") {
                fnShowMenu();
            }
        }
    }

    /**
     * Sends a row unselect event on server side to invoke a row unselect listener if defined
     * @private
     * @param {string} rowKey The key of the row that was deselected.
     * @param {string} behaviorEvent Name of the event to fire.
     */
    fireRowUnselectEvent(rowKey, behaviorEvent) {
        if(this.hasBehavior(behaviorEvent)) {
            var ext = {
                params: [
                {
                    name: this.id + '_instantUnselectedRowKey',
                    value: rowKey
                }
                ]
            };

            this.callBehavior(behaviorEvent, ext);
        }
    }

    /**
     * Selects the corresponding row of a radio based column selection
     * @private
     * @param {JQuery} radio A radio INPUT element
     */
    selectRowWithRadio(radio) {
        var row = radio.closest('tr'),
        rowMeta = this.getRowMeta(row);

        //clean selection
        this.unselectAllRows();

        //select current
        if(!this.cfg.nativeElements) {
            this.selectRadio(radio);
        }

        this.highlightRow(row);
        this.addSelection(rowMeta.key);
        this.writeSelections();
        this.fireRowSelectEvent(rowMeta.key, 'rowSelectRadio');
    }

    /**
     * Selects the corresponding row of a checkbox based column selection
     * @private
     * @param {JQuery} checkbox A checkox INPUT element
     * @param {JQuery.TriggeredEvent} event Event that occurred.
     * @param {boolean} [silent] `true` to prevent behaviors from being invoked, `false` otherwise.
     */
    selectRowWithCheckbox(checkbox, event, silent) {
        var row = checkbox.closest('tr');
        if (!row.hasClass('ui-datatable-selectable')) {
            return;
        }

        var rangeSelected = false;
        var rowMeta = this.getRowMeta(row);

        if (this.getSelectedRowsCount() > 0 && this.originRowMeta) {
            this.cursorRowMeta = rowMeta;

            if (event && event.shiftKey) {
                this.selectRowsInRange(row, true);
                rangeSelected = true;
            }
        }
        else {
            this.originRowMeta = rowMeta;
            this.cursorRowMeta = null;
        }

        if (!rangeSelected) {
            this.addSelection(rowMeta.key);
            this.highlightRow(row);
            if (!this.cfg.nativeElements) {
                this.selectCheckbox(checkbox);
            }
        }
        this.writeSelections();

        if (!silent) {
            this.updateHeaderCheckbox();
            this.fireRowSelectEvent(rowMeta.key, "rowSelectCheckbox");
        }
    }

    /**
     * Unselects the corresponding row of a checkbox based column selection
     * @private
     * @param {JQuery} checkbox A checkox INPUT element
     * @param {JQuery.TriggeredEvent} event Event that occurred.
     * @param {boolean} [silent] `true` to prevent behaviors from being invoked, `false` otherwise.
     */
    unselectRowWithCheckbox(checkbox, event, silent) {
        var row = checkbox.closest('tr');
        if(!row.hasClass('ui-datatable-selectable')) {
            return;
        }

        var rowMeta = this.getRowMeta(row);

        this.unhighlightRow(row);

        if(!this.cfg.nativeElements) {
            this.unselectCheckbox(checkbox);
        }

        this.removeSelection(rowMeta.key);

        this.uncheckHeaderCheckbox();

        this.writeSelections();

        this.originRowMeta = null;

        if(!silent) {
            this.fireRowUnselectEvent(rowMeta.key, "rowUnselectCheckbox");
        }
    }

    /**
     * Unselects all rows of this DataTable so that no rows are selected. This includes all rows on all pages,
     * irrespective of whether they are on the currently shown page.
     */
    unselectAllRows() {
        var selectedRows = this.jq.find('tr.ui-state-highlight'),
        checkboxSelectionEnabled = this.isCheckboxSelectionEnabled(),
        radioSelectionEnabled = this.isRadioSelectionEnabled();

        for(var i = 0; i < selectedRows.length; i++) {
            var row = selectedRows.eq(i);
            if(!row.hasClass('ui-datatable-selectable')) {
                continue;
            }

            this.unhighlightRow(row);

            if(checkboxSelectionEnabled) {
                if(this.cfg.nativeElements)
                    row.children('td.ui-selection-column').find(':checkbox').prop('checked', false);
                else
                    this.unselectCheckbox(row.children('td.ui-selection-column').find('> div.ui-chkbox > div.ui-chkbox-box'));
            }
            else if(radioSelectionEnabled) {
                if(this.cfg.nativeElements)
                    row.children('td.ui-selection-column').find(':radio').prop('checked', false);
                else
                    this.unselectRadio(row.children('td.ui-selection-column').find('> div.ui-radiobutton > div.ui-radiobutton-box'));
            }
        }

        if(checkboxSelectionEnabled) {
            this.uncheckHeaderCheckbox();
        }

        this.selection = [];
        this.writeSelections();
    }

    /**
     * Select all rows on the currently shown page. Compare with `selectAllRows`.
     */
    selectAllRowsOnPage() {
        var rows = this.tbody.children('tr');
        for(var i = 0; i < rows.length; i++) {
            var row = rows.eq(i);
            this.selectRow(row, true);
        }
    }

    /**
     * Unselect all rows on the currently shown page. Compare with `unselectAllRows`.
     */
    unselectAllRowsOnPage() {
        var rows = this.tbody.children('tr');
        for(var i = 0; i < rows.length; i++) {
            var row = rows.eq(i);
            this.unselectRow(row, true);
        }
    }

     /**
     * Selects all rows of this DataTable so that no rows are selected. This includes all rows on all pages,
     * irrespective of whether they are on the currently shown page.
     */
    selectAllRows() {
        this.selectAllRowsOnPage();
        this.selection = new Array('@all');
        this.writeSelections();
    }
    
    /**
     * Configures the ARIA label for the select all checkbox.
     * @private
     */
    configureSelectAllAria() {
        if (this.checkAllToggler) {
           var checked = this.checkAllToggler.attr('aria-checked') === "true" || this.checkAllToggler.prop('checked');
           var ariaLabel = checked ? this.getAriaLabel('selectAll') : this.getAriaLabel('unselectAll');
           this.checkAllToggler.attr('aria-label', ariaLabel);
        }
    }

    /**
     * Toggles the `selected all` checkbox in the header of this DataTable. When no rows are selected, this will select
     * all rows. When some rows are selected, this will unselect all rows.
     */
    toggleCheckAll() {
        var shouldCheckAll = true;
        if(this.cfg.nativeElements) {
            var checkboxes = this.jq.find('tr.ui-datatable-selectable > td.ui-selection-column > :checkbox:visible'),
            checked = this.checkAllToggler.prop('checked'),
            $this = this;

            checkboxes.each(function() {
                if(checked) {
                    var checkbox = $(this);
                    checkbox.prop('checked', true);
                    $this.selectRowWithCheckbox(checkbox, null, true);
                }
                else {
                    var checkbox = $(this);
                    checkbox.prop('checked', false);
                    $this.unselectRowWithCheckbox(checkbox, null, true);
                    shouldCheckAll = false;
                }
            });
        }
        else {
            var checkboxes = this.jq.find('tr.ui-datatable-selectable > td.ui-selection-column > div.ui-chkbox > div.ui-chkbox-box:visible'),
            checked = this.checkAllToggler.attr('aria-checked') === "true";
            $this = this;

            if(checked) {
                this.checkAllToggler.removeClass('ui-state-active').children('span.ui-chkbox-icon').addClass('ui-icon-blank').removeClass('ui-icon-check');
                this.checkAllToggler.attr('aria-checked', false);
                shouldCheckAll = false;

                checkboxes.each(function() {
                    $this.unselectRowWithCheckbox($(this), null, true);
                });
            }
            else {
                this.checkAllToggler.addClass('ui-state-active').children('span.ui-chkbox-icon').removeClass('ui-icon-blank').addClass('ui-icon-check');
                this.checkAllToggler.attr('aria-checked', true);

                checkboxes.each(function() {
                    $this.selectRowWithCheckbox($(this), null, true);
                });
            }
        }
        
        this.configureSelectAllAria();

        // GitHub #6730 user wants all rows not just displayed rows
        if(!this.cfg.selectionPageOnly) {
            if (shouldCheckAll) {
                this.selectAllRows();
            }
            else {
                this.unselectAllRows();
            }
        }

        //save state
        this.writeSelections();

        //fire toggleSelect event
        if(this.hasBehavior('toggleSelect')) {
            var ext = {
                params: [{name: this.id + '_checked', value: !checked}]
            };

            this.callBehavior('toggleSelect', ext);
        }
    }

    /**
     * Selects the given checkbox from a row.
     * @private
     * @param {JQuery} checkbox A checkbox to select.
     */
    selectCheckbox(checkbox) {
        checkbox.addClass('ui-state-active');

        if (this.cfg.nativeElements) {
            checkbox.prop('checked', true);
        }
        else {
            checkbox.children('span.ui-chkbox-icon:first').removeClass('ui-icon-blank').addClass('ui-icon-check');
            checkbox.attr('aria-checked', true);
        }
    }

    /**
     * Unselects the given checkbox from a row.
     * @private
     * @param {JQuery} checkbox A checkbox to unselect.
     */
    unselectCheckbox(checkbox) {
        checkbox.removeClass('ui-state-active');

        if (this.cfg.nativeElements) {
            checkbox.prop('checked', false);
        }
        else {
            checkbox.children('span.ui-chkbox-icon:first').addClass('ui-icon-blank').removeClass('ui-icon-check');
            checkbox.attr('aria-checked', false);
        }
    }

    /**
     * Selects the given radio button from a row.
     * @private
     * @param {JQuery} radio A radio button to select.
     */
    selectRadio(radio){
        radio.addClass('ui-state-active');
        radio.children('.ui-radiobutton-icon').addClass('ui-icon-bullet').removeClass('ui-icon-blank');
        radio.prev().children('input').prop('checked', true);
    }

    /**
     * Unselects the given radio button from a row.
     * @private
     * @param {JQuery} radio A radio button to unselect.
     */
    unselectRadio(radio){
        radio.removeClass('ui-state-active').children('.ui-radiobutton-icon').addClass('ui-icon-blank').removeClass('ui-icon-bullet');
        radio.prev().children('input').prop('checked', false);
    }

    /**
     * Expands a row to display its detailed content
     * @private
     * @param {JQuery} toggler The row toggler of a row to expand.
     */
    toggleExpansion(toggler) {
        var row = toggler.closest('tr'),
        rowIndex = this.getRowMeta(row).index,
        iconOnly = toggler.hasClass('ui-icon'),
        labels = toggler.children('span'),
        expandIconClasses = toggler.attr('data-expand-icon').split(' '),
        collapseIconClasses = toggler.attr('data-collapse-icon').split(' '),
        expanded = iconOnly ? collapseIconClasses.every(it => toggler.hasClass(it)) : toggler.children('span').eq(0).hasClass('ui-helper-hidden'),
        $this = this;

        //Run toggle expansion if row is not being toggled already to prevent conflicts
        if($.inArray(rowIndex, this.expansionProcess) === -1) {
            this.expansionProcess.push(rowIndex);

            if(expanded) {
                if(iconOnly) {
                    toggler.removeClass(collapseIconClasses).addClass(expandIconClasses).attr('aria-expanded', false);
                    this.updateExpansionAria(toggler);
                }
                else {
                    labels.eq(0).removeClass('ui-helper-hidden');
                    labels.eq(1).addClass('ui-helper-hidden');
                }

                this.collapseRow(row);
                $this.expansionProcess = $.grep($this.expansionProcess, function(r) {
                    return (r !== rowIndex);
                });
                this.fireRowCollapseEvent(row);
            }
            else {
                if(this.cfg.rowExpandMode === 'single') {
                    this.collapseAllRows();
                }

                if(iconOnly) {
                    toggler.removeClass(expandIconClasses).addClass(collapseIconClasses).attr('aria-expanded', true);
                    this.updateExpansionAria(toggler);
                }
                else {
                    labels.eq(0).addClass('ui-helper-hidden');
                    labels.eq(1).removeClass('ui-helper-hidden');
                }

                this.loadExpandedRowContent(row);
            }
        }
    }

    /**
     * Loads the detailed content for the given expandable row.
     * @private
     * @param {JQuery} row A row with content to load.
     */
    loadExpandedRowContent(row) {
        // To check whether or not any hidden expansion content exists to avoid reloading multiple duplicate nodes in DOM
        var expansionContent = row.next('.ui-expanded-row-content');
        if(expansionContent.length > 0) {
            expansionContent.remove();
        }

        var $this = this,
        rowMeta = this.getRowMeta(row),
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_rowExpansion', value: true},
                     {name: this.id + '_expandedRowIndex', value: rowMeta.index},
                     {name: this.id + '_expandedRowKey', value: rowMeta.key},
                     {name: this.id + '_encodeFeature', value: true},
                     {name: this.id + '_skipChildren', value: true}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            if(content && PrimeFaces.trim(content).length) {
                                row.addClass('ui-expanded-row');
                                this.displayExpandedRow(row, content);
                            }
                        }
                    });

                return true;
            },
            oncomplete: function() {
                $this.expansionProcess = $.grep($this.expansionProcess, function(r) {
                    return r !== rowMeta.index;
                });
            }
        };

        if(!PrimeFaces.inArray(this.loadedExpansionRows, rowMeta.key)) {
            this.loadedExpansionRows.push(rowMeta.key);
            this.writeRowExpansions();
        }

        if(this.hasBehavior('rowToggle')) {
            this.callBehavior('rowToggle', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Display the given HTML string in the specified row. Called mainly after an AJAX request.
     * @protected
     * @param {JQuery} row Row to display.
     * @param {string} content HTML string of the content to add to the row
     */
    displayExpandedRow(row, content) {
        row.after(content);
        this.updateRowspan(row);
        this.updateColspan(row.next());
    }

    /**
     * Calls the behaviors and event listeners when a row is collapsed.
     * @private
     * @param {JQuery} row A row of this DataTable.
     */
    fireRowCollapseEvent(row) {
        var rowMeta = this.getRowMeta(row);

        if(this.hasBehavior('rowToggle')) {
            var ext = {
                params: [
                    {name: this.id + '_collapsedRowIndex', value: rowMeta.index},
                    {name: this.id + '_collapsedRowKey', value: rowMeta.key},
                    {name: this.id + '_skipChildren', value: true}
                ]
            };
            this.callBehavior('rowToggle', ext);
        }
    }

    /**
     * Collapses the given row, if it is expandable. Use `findRow` to get a row by its index. Does not update the row
     * expansion toggler button.
     * @protected
     * @param {JQuery} row Row to collapse.
     */
    collapseRow(row) {
        // #942: need to use "hide" instead of "remove" to avoid incorrect form mapping when a row is collapsed
        row.removeClass('ui-expanded-row').next('.ui-expanded-row-content').hide();

        var rowMeta = this.getRowMeta(row);
        if(PrimeFaces.inArray(this.loadedExpansionRows, rowMeta.key)) {
            this.loadedExpansionRows = this.loadedExpansionRows.filter(function(value, index, arr){
                return value != rowMeta.key;
            });
            this.writeRowExpansions();
        }

        this.updateRowspan(row);
    }

    /**
     * Collapses all rows that are currently expanded.
     */
    collapseAllRows() {
        var $this = this;

        this.getExpandedRows().each(function() {
            var expandedRow = $(this);
            $this.collapseRow(expandedRow);

            var columns = expandedRow.children('td');
            for(var i = 0; i < columns.length; i++) {
                var column = columns.eq(i),
                toggler = column.children('.ui-row-toggler');
                $this.updateExpansionAria(toggler);

                if(toggler.length > 0) {
                    if(toggler.hasClass('ui-icon')) {
                        toggler.removeClass(toggler.attr('data-collapse-icon')).addClass(toggler.attr('data-expand-icon'));
                    }
                    else {
                        var labels = toggler.children('span');
                        labels.eq(0).removeClass('ui-helper-hidden');
                        labels.eq(1).addClass('ui-helper-hidden');
                    }
                    break;
                }
            }
        });
    }

    /**
     * Finds the list of row that are currently expanded.
     * @return {JQuery} All rows (`TR`) that are currently expanded.
     */
    getExpandedRows() {
        return this.tbody.children('.ui-expanded-row');
    }

    /**
     * Disables all cell editors to prevent extra data on form posts.
     * @private
     * @param {JQuery} element the row or cell to find inputs to enable for editing
     */
    disableCellEditors(element) {
        if (element) {
            $(element).find(":input:enabled").attr('disabled', 'disabled');
        }
        else {
            this.tbody.find(".ui-cell-editor-input :input:enabled").attr('disabled', 'disabled').attr("data-disabled-by-editor", "true");
            //#13159: re-enable for all rows that are rowEditing="true"
            this.enableCellEditors(this.tbody.find('.ui-row-editing'));
            
        }
    }
    
    /**
     * Enables all cell editors that were previously disabled by the UI and not already disabled from user.
     * @private
     * @param {JQuery} element the row or cell to find inputs to enable for editing
     */
    enableCellEditors(element) {
        if (element) {
            element.find(":input[data-disabled-by-editor='true']").removeAttr('disabled');
        }
    }

    /**
     * Binds editor events non-obtrusively.
     * @private
     */
    bindEditEvents() {
        var $this = this;
        var namespace = '.datatable' + this.id;
        this.cfg.saveOnCellBlur = (this.cfg.saveOnCellBlur === false) ? false : true;
        
        // #3571 Set all fields to disabled by default
        this.disableCellEditors();
        
        if(this.cfg.editMode === 'row') {
            var rowEditorSelector = '> tr > td > div.ui-row-editor > a';
            
            // add aria to buttons
            this.tbody.find('a.ui-row-editor-pencil').attr('aria-label', this.getAriaLabel('editRow'));
            this.tbody.find('a.ui-row-editor-check').attr('aria-label', this.getAriaLabel('saveEdit'));
            this.tbody.find('a.ui-row-editor-close').attr('aria-label', this.getAriaLabel('cancelEdit'));

            this.tbody.off('click.datatable focus.datatable blur.datatable', rowEditorSelector)
                        .on('click.datatable', rowEditorSelector, null, function(e) {
                            var element = $(this),
                            row = element.closest('tr');

                            if(element.hasClass('ui-row-editor-pencil')) {
                                $this.switchToRowEdit(row);
                                element.hide().siblings().show();
                            }
                            else if(element.hasClass('ui-row-editor-check')) {
                                $this.saveRowEdit(row);
                            }
                            else if(element.hasClass('ui-row-editor-close')) {
                                $this.cancelRowEdit(row);
                            }

                            e.preventDefault();
                        })
                        .on('focus.datatable', rowEditorSelector, null, function(e) {
                            $(this).addClass('ui-row-editor-outline');
                        })
                        .on('blur.datatable', rowEditorSelector, null, function(e) {
                            $(this).removeClass('ui-row-editor-outline');
                        });

            // GitHub #433 Allow ENTER to submit ESC to cancel row editor
            $(document).off("keydown" + namespace, $this.jqId + " tr.ui-row-editing")
                        .on("keydown" + namespace, $this.jqId + " tr.ui-row-editing", function(e) {
                            switch (e.key) {
                                case 'Enter':
                                    // #7028/#13927 Do not proceed if target is a textarea, button, link, or TextEditor
                                    if(PrimeFaces.utils.isEnterKeyBlocked(e)) {
                                         return true;
                                    }
                                    $(this).closest("tr").find(".ui-row-editor-check").trigger("click");
                                    return false; // prevents executing other event handlers (adding new row to the table)
                                case 'Escape':
                                    $(this).closest("tr").find(".ui-row-editor-close").trigger("click");
                                    return false;
                                default:
                                    break;
                }
            });
            
        }
        else if(this.cfg.editMode === 'cell') {
            var originalCellSelector = '> tr > td.ui-editable-column',
            cellSelector = this.cfg.cellSeparator || originalCellSelector,
            editEvent = (this.cfg.editInitEvent !== 'click') ? this.cfg.editInitEvent + '.datatable-cell click.datatable-cell' : 'click.datatable-cell';

            this.tbody.off(editEvent, cellSelector)
                        .on(editEvent, cellSelector, null, function(e) {
                            var item = $(this),
                            cell = item.hasClass('ui-editable-column') ? item : item.closest('.ui-editable-column');

                            if(!cell.hasClass('ui-cell-editing') && e.type === $this.cfg.editInitEvent) {
                                $this.showCellEditor(cell);
                            }
                        });

            // save/cancel on mouseup to queue the event request before whatever was clicked reacts
            $(document).off('mouseup.datatable-cell-blur' + this.id)
                        .on('mouseup.datatable-cell-blur' + this.id, function(e) {
                            // ignore if not editing
                            if(!$this.currentCell)
                                return;

                            var currentCell = $($this.currentCell);
                            var target = $(e.target);

                            // ignore clicks inside edited cell
                            if(currentCell.is(target) || currentCell.has(target).length)
                                return;

                            // ignore clicks inside input overlays like calendar popups etc
                            var ignoredOverlay = '.ui-input-overlay, .ui-editor-popup, #keypad-div, .ui-colorpicker-container';
                            // and menus - in case smth like menubutton is inside the table
                            ignoredOverlay += ', .ui-datepicker-buttonpane, .ui-menuitem, .ui-menuitem-link';
                            // and blockers
                            ignoredOverlay += ', .ui-blockui, .blockUI';
                            if(target.is(ignoredOverlay) || target.closest(ignoredOverlay).length)
                                return;

                            if($.datepicker && ($.datepicker._datepickerShowing || $('.p-datepicker-panel:visible').length))
                                return;

                            if($this.cfg.saveOnCellBlur)
                                $this.saveCell($this.currentCell);
                            else
                                $this.doCellEditCancelRequest($this.currentCell);
                        });
        }
    }

    /**
     * Switch all editable columns of the given row to their editing mode, if editing is enabled on this DataTable.
     * Use `findRow` to get a row by its index.
     * @param {JQuery} row A row (`TR`) to switch to edit mode.
     */
    switchToRowEdit(row) {
        // #1499 disable rowReorder while editing
        if (this.cfg.draggableRows) {
            this.tbody.sortable("disable");
        }

        if(this.cfg.rowEditMode === "lazy") {
            this.lazyRowEditInit(row);
        }
        else {
            this.showRowEditors(row);

            if(this.hasBehavior('rowEditInit')) {
                var rowIndex = this.getRowMeta(row).index;

                var ext = {
                    params: [{name: this.id + '_rowEditIndex', value: rowIndex}]
                };

                this.callBehavior('rowEditInit', ext);
            }
        }

        // #12184 disable other row editors as you should only edit one row at a time
        this.tbody.find('a.ui-row-editor-pencil').addClass('ui-state-disabled');
    }

    /**
     * Shows the row editor(s) for the given row (and hides the normal output display).
     * @protected
     * @param {JQuery} row Row for which to show the row editor.
     */
    showRowEditors(row) {
        row.addClass('ui-state-highlight ui-row-editing').children('td.ui-editable-column').each(function() {
            var column = $(this);

            column.find('.ui-cell-editor-output').hide();
            column.find('.ui-cell-editor-input').show();
        });
        
        this.enableCellEditors(row);

        var inputs=row.find(':input:enabled');
        if (inputs.length > 0) {
            inputs.first().trigger('focus');
        }
    }

    /**
     * Finds the meta data for a given cell.
     * @param {JQuery} cell A cell for which to get the meta data.
     * @return {string} The meta data of the given cell or NULL if not found
     */
    getCellMeta(cell) {
        var rowMeta = this.getRowMeta(cell.closest('tr')),
            cellIndex = cell.index();

        if(this.cfg.scrollable && this.cfg.frozenColumns) {
            cellIndex = (this.scrollTbody.is(cell.closest('tbody'))) ? (cellIndex + this.cfg.frozenColumns) : cellIndex;
        }

        if (rowMeta === undefined || rowMeta.index === undefined) {
            return null;
        }
        var cellInfo = rowMeta.index + ',' + cellIndex;
        if(rowMeta.key) {
            cellInfo = cellInfo + ',' + rowMeta.key;
        }

        return cellInfo;
    }

    /**
     * Initializes the given cell so that its content can be edited (when row editing is enabled)
     * @private
     * @param {JQuery} cell A cell of this DataTable to set up.
     */
    cellEditInit(cell) {
        var cellInfo = this.getCellMeta(cell),
        cellEditor = cell.children('.ui-cell-editor'),
        $this = this;

        var options = {
            source: this.id,
            process: this.id,
            update: this.id,
            global: false,
            params: [{name: this.id + '_encodeFeature', value: true},
                    {name: this.id + '_cellEditInit', value: true},
                    {name: this.id + '_cellInfo', value: cellInfo}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            cellEditor.children('.ui-cell-editor-input').html(content);
                        }
                    });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                cell.data('edit-events-bound', false);
                $this.showCurrentCell(cell);
            }
        };

        if(this.hasBehavior('cellEditInit')) {
            this.callBehavior('cellEditInit', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * When cell editing is enabled, shows the cell editor for the given cell that lets the user edit the cell content.
     * @param {JQuery} c A cell (`TD`) of this DataTable to edit.
     */
    showCellEditor(c) {
        var cell = null;

        if(c) {
            cell = c;

            //remove contextmenu selection highlight
            if(this.contextMenuCell) {
                this.contextMenuCell.parent().removeClass('ui-state-highlight');
            }
        }
        else {
            cell = this.contextMenuCell;
        }

        var editorInput = cell.find('> .ui-cell-editor > .ui-cell-editor-input');
        if(editorInput.length !== 0 && editorInput.children().length === 0 && this.cfg.editMode === 'cell') {
            // for lazy cellEditMode
            this.cellEditInit(cell);
        }
        else {
            this.showCurrentCell(cell);

            if(this.hasBehavior('cellEditInit')) {
                var cellInfo = this.getCellMeta(cell);
                if (cellInfo) {
                    var ext = {
                        params: [{name: this.id + '_cellInfo', value: cellInfo}]
                    };
                    this.callBehavior('cellEditInit', ext);
                }
            }
        }
    }

    /**
     * Shows the cell editors for the given cell.
     * @private
     * @param {JQuery} cell A cell of this DataTable.
     */
    showCurrentCell(cell) {
        var $this = this;

        if(this.currentCell) {
            if(this.cfg.saveOnCellBlur)
                this.saveCell(this.currentCell);
            else if(!this.currentCell.is(cell))
                this.doCellEditCancelRequest(this.currentCell);
        }

        if(cell && cell.length) {
            this.currentCell = cell;

            var cellEditor = cell.children('div.ui-cell-editor'),
            displayContainer = cellEditor.children('div.ui-cell-editor-output'),
            inputContainer = cellEditor.children('div.ui-cell-editor-input');
            this.enableCellEditors(inputContainer);
            // Look for selectonemenu inputs first since they have special DOM structure, otherwise find any enabled visible inputs
            var inputs = inputContainer.find('.ui-selectonemenu .ui-inputfield');
            if (!inputs.length) {
                inputs = inputContainer.find(':input:enabled:not([type="hidden"])');
            }
            var multi = inputs.length > 1;

            cell.addClass('ui-state-highlight ui-cell-editing');
            displayContainer.hide();
            inputContainer.show();
            var input = inputs.eq(0);
            input.trigger('focus');
            input.trigger('select');

            //metadata
            if(multi) {
                var oldValues = [];
                for(var i = 0; i < inputs.length; i++) {
                    var input = inputs.eq(i);

                    if(input.is(':checkbox')) {
                        oldValues.push(input.val() + "_" + input.is(':checked'));
                    }
                    else {
                        oldValues.push(input.val());
                    }
                }

                cell.data('multi-edit', true);
                cell.data('old-value', oldValues);
            }
            else {
                cell.data('multi-edit', false);
                cell.data('old-value', inputs.eq(0).val());
            }

            //bind events on demand
            if(!cell.data('edit-events-bound')) {
                cell.data('edit-events-bound', true);

                inputs.on('keydown.datatable-cell', function(e) {
                        var shiftKey = e.shiftKey,
                        key = e.key,
                        input = $(this);

                        if(key === 'Enter') {
                            // #7028/#13927 Do not proceed if target is a textarea, button, link, or TextEditor
                            if(PrimeFaces.utils.isEnterKeyBlocked(e)) {
                                return true;
                            }
                            $this.saveCell(cell);
                            $this.currentCell = null;

                            e.preventDefault();
                        }
                        else if(key === 'Tab') {
                            if(multi) {
                                // Calculate next/prev input index based on shift key
                                var focusIndex = shiftKey ? input.index() - 1 : input.index() + 1;

                                var parent = input.parent();
                                // Move to next/prev cell if:
                                // - Index out of bounds
                                // - Parent is special input component that handles its own tab behavior
                                if(focusIndex < 0 || focusIndex === inputs.length || 
                                   parent.hasClass('ui-inputnumber') ||
                                   parent.hasClass('ui-selectonemenu') ||
                                   parent.hasClass('ui-helper-hidden-accessible')) {
                                    $this.tabCell(cell, !shiftKey);
                                } else {
                                    inputs.eq(focusIndex).trigger('focus');
                                }
                            }
                            else {
                                $this.tabCell(cell, !shiftKey);
                            }

                            e.preventDefault();
                        }
                        else if(key === 'Escape') {
                            $this.doCellEditCancelRequest(cell);
                            e.preventDefault();
                        }
                    })
                    .on('focus.datatable-cell click.datatable-cell', function(e) {
                        $this.currentCell = cell;
                    });
            }
        }
        else {
            this.currentCell = null;
        }
    }

    /**
     * Moves to the next or previous editable cell when the tab key was pressed.
     * @private
     * @param {JQuery} cell The currently focused cell
     * @param {boolean} forward `true` if tabbing forward, `false` otherwise.
     */
    tabCell(cell, forward) {
        var targetCell = forward ? cell.nextAll('td.ui-editable-column:first') : cell.prevAll('td.ui-editable-column:first');
        if(targetCell.length == 0) {
            var tabRow = forward ? cell.parent().next() : cell.parent().prev();
            targetCell = forward ? tabRow.children('td.ui-editable-column:first') : tabRow.children('td.ui-editable-column:last');
        }

        var cellEditor = targetCell.children('div.ui-cell-editor'),
        inputContainer = cellEditor.children('div.ui-cell-editor-input');

        if(inputContainer.length) {
            var inputs = inputContainer.find(':input[type!=hidden]'),
            disabledInputs = inputs.filter(':disabled:not([data-disabled-by-editor="true"])');

            if(inputs.length === disabledInputs.length) {
                this.tabCell(targetCell, forward);
                return;
            }
        }

        this.showCellEditor(targetCell);
    }

    /**
     * After the user is done editing a cell, saves the content of the given cell and switches back to view mode.
     * @param {JQuery} cell A cell (`TD`) in edit mode.
     */
    saveCell(cell) {
        if (!cell) {
            return;
        }
        var inputs = cell.find('div.ui-cell-editor-input :input:enabled'),
        changed = false,
        valid = cell.data('valid'),
        $this = this;

        if(cell.data('multi-edit')) {
            var oldValues = cell.data('old-value');
            for(var i = 0; i < inputs.length; i++) {
                var input = inputs.eq(i),
                    inputVal = input.val(),
                    oldValue = oldValues[i];

                if(input.is(':checkbox') || input.is(':radio')) {
                    inputVal = inputVal + "_" + input.is(':checked');
                }

                if(inputVal != oldValue) {
                    changed = true;
                    break;
                }
            }
        }
        else {
            var input = inputs.eq(0),
                inputVal = input.val(),
                oldValue = cell.data('old-value');

            if(input.is(':checkbox') || input.is(':radio')) {
                inputVal = inputVal + "_" + input.is(':checked');
            }
            changed = (inputVal != oldValue);
        }

        if(changed || valid == false)
            $this.doCellEditRequest(cell);
        else
            $this.viewMode(cell);

        if(this.cfg.saveOnCellBlur) {
            this.currentCell = null;
        }
    }

    /**
     * Switches the given cell to its view mode (not editable).
     * @private
     * @param {JQuery} cell A cell of this DataTable.
     */
    viewMode(cell) {
        var cellEditor = cell.children('div.ui-cell-editor'),
        editableContainer = cellEditor.children('div.ui-cell-editor-input'),
        displayContainer = cellEditor.children('div.ui-cell-editor-output');

        cell.removeClass('ui-cell-editing ui-state-error ui-state-highlight');
        displayContainer.show();
        editableContainer.hide();
        cell.removeData('old-value').removeData('multi-edit');

        if(this.cfg.cellEditMode === "lazy") {
            editableContainer.children().remove();
        }
    }

    /**
     * When the users clicks on an editable cell, runs the AJAX request to show the inline editor for the given cell.
     * @private
     * @param {JQuery} cell The cell to switch to edit mode.
     */
    doCellEditRequest(cell) {
        var rowMeta = this.getRowMeta(cell.closest('tr')),
        cellEditor = cell.children('.ui-cell-editor'),
        cellEditorId = cellEditor.attr('id'),
        cellIndex = cell.index(),
        $this = this;

        if(this.cfg.scrollable && this.cfg.frozenColumns) {
            cellIndex = (this.scrollTbody.is(cell.closest('tbody'))) ? (cellIndex + this.cfg.frozenColumns) : cellIndex;
        }

        var cellInfo = rowMeta.index + ',' + cellIndex;
        if(rowMeta.key) {
            cellInfo = cellInfo + ',' + rowMeta.key;
        }

        var options = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{name: this.id + '_encodeFeature', value: true},
                     {name: this.id + '_cellInfo', value: cellInfo},
                     {name: cellEditorId, value: cellEditorId}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            cellEditor.children('.ui-cell-editor-output').html(content);
                        }
                    });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                if(args.validationFailed){
                    cell.data('valid', false);
                    cell.addClass('ui-state-error');
                }
                else{
                    cell.data('valid', true);
                    $this.disableCellEditors(cell);
                    $this.viewMode(cell);
                }

                if($this.cfg.clientCache) {
                    $this.clearCacheMap();
                }
            }
        };

        if(this.hasBehavior('cellEdit')) {
            this.callBehavior('cellEdit', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * When the user wants to discard the edits to a cell, performs the required AJAX request for that.
     * @private
     * @param {JQuery} cell The cell in edit mode with changes to discard.
     */
    doCellEditCancelRequest(cell) {
        var rowMeta = this.getRowMeta(cell.closest('tr')),
        cellEditor = cell.children('.ui-cell-editor'),
        cellIndex = cell.index(),
        $this = this;

        if(this.cfg.scrollable && this.cfg.frozenColumns) {
            cellIndex = (this.scrollTbody.is(cell.closest('tbody'))) ? (cellIndex + this.cfg.frozenColumns) : cellIndex;
        }

        var cellInfo = rowMeta.index + ',' + cellIndex;
        if(rowMeta.key) {
            cellInfo = cellInfo + ',' + rowMeta.key;
        }

        this.currentCell = null;

        var options = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{name: this.id + '_encodeFeature', value: true},
                     {name: this.id + '_cellEditCancel', value: true},
                     {name: this.id + '_cellInfo', value: cellInfo}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            cellEditor.children('.ui-cell-editor-input').html(content);
                        }
                    });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                $this.viewMode(cell);
                cell.data('edit-events-bound', false);

                if($this.cfg.clientCache) {
                    $this.clearCacheMap();
                }
                
                $this.disableCellEditors();
            }
        };

        if(this.hasBehavior('cellEditCancel')) {
            this.callBehavior('cellEditCancel', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * When the given row is currently being edited, saves the contents of the edited row and switch back to view mode.
     * Use `findRow` to get a row by its index.
     * @param {JQuery} rowEditor A row (`TR`) in edit mode to save.
     */
    saveRowEdit(rowEditor) {
        this.doRowEditRequest(rowEditor, 'save');
    }

    /**
     * When the given row is currently being edited, cancel the editing operation and discard the entered data. Use
     * `findRow` to get a row by its index.
     * @param {JQuery} rowEditor A row (`TR`) in edit mode.
     */
    cancelRowEdit(rowEditor) {
        this.doRowEditRequest(rowEditor, 'cancel');
    }

    /**
     * Sends an AJAX request to handle row save or cancel
     * @private
     * @param {JQuery} rowEditor The current row editor.
     * @param {PrimeFaces.widget.DataTable.RowEditAction} action Whether to save or cancel the row edit.
     */
    doRowEditRequest(rowEditor, action) {
        var row = rowEditor.closest('tr'),
        rowIndex = this.getRowMeta(row).index,
        expanded = row.hasClass('ui-expanded-row'),
        $this = this,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            formId: this.getParentFormId(),
            params: [{name: this.id + '_rowEditIndex', value: this.getRowMeta(row).index},
                     {name: this.id + '_rowEditAction', value: action},
                     {name: this.id + '_encodeFeature', value: true}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            if(expanded) {
                                this.collapseRow(row);
                            }

                            this.updateRow(row, content);

                            // #1499 enable rowReorder when done editing
                            if (this.cfg.draggableRows && $('tr.ui-row-editing').length === 0) {
                                this.tbody.sortable("enable");
                            }

                            // #258 must reflow after editing
                            this.postUpdateData();

                            // #12184 enable other row edits now that we are done editing
                            this.tbody.find('a.ui-row-editor-pencil').removeClass('ui-state-disabled');
                        }
                    });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                if(args && args.validationFailed) {
                    $this.invalidateRow(rowIndex);
                }
                else {
                    if($this.cfg.rowEditMode === "lazy") {
                        var index = ($this.paginator) ? (rowIndex % $this.paginator.getRows()) : rowIndex,
                        newRow = $this.tbody.children('tr').eq(index);
                        $this.getRowEditors(newRow).children('.ui-cell-editor-input').children().remove();
                    }
                    
                    $this.disableCellEditors();
                }

                if($this.cfg.clientCache) {
                    $this.clearCacheMap();
                }
            }
        };

        if(action === 'save') {
            this.getRowEditors(row).each(function() {
                options.params.push({name: this.id, value: this.id});
            });
        }

        if(action === 'save' && this.hasBehavior('rowEdit')) {
            this.callBehavior('rowEdit', options);
        }
        else if(action === 'cancel' && this.hasBehavior('rowEditCancel')) {
            this.callBehavior('rowEditCancel', options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Performs the required initialization for making a row editable. Only called on-demand when the row actually needs
     * to be edited.
     * @private
     * @param {JQuery} row A row of this DataTable.
     */
    lazyRowEditInit(row) {
        var rowIndex = this.getRowMeta(row).index,
        $this = this;

        var options = {
            source: this.id,
            process: this.id,
            update: this.id,
            global: false,
            params: [{name: this.id + '_encodeFeature', value: true},
                    {name: this.id + '_rowEditInit', value: true},
                    {name: this.id + '_rowEditIndex', value: rowIndex}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                        widget: $this,
                        handle: function(content) {
                            $this.updateRow(row, content);
                        }
                    });

                return true;
            },
            oncomplete: function(xhr, status, args, data) {
                var index = ($this.paginator) ? (rowIndex % $this.paginator.getRows()) : rowIndex,
                newRow = $this.tbody.children('tr').eq(index);
                $this.showRowEditors(newRow);
            }
        };

        if(this.hasBehavior('rowEditInit')) {
            this.cfg.behaviors['rowEditInit'].call(this, options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    }

    /**
     * Updates a row with the given content and ensures it is visible.
     * @protected
     * @param {JQuery} row Row to update.
     * @param {string} content HTML string to set on the row.
     */
    updateRow(row, content) {
        const $content = $(content).show();
        row.replaceWith($content);
    }

    /**
     * Displays row editors in invalid format.
     * @protected
     * @param {number} index 0-based index of the row to invalidate.
     */
    invalidateRow(index) {
        var i = (this.paginator) ? (index % this.paginator.getRows()) : index;
        var row =  this.tbody.children('tr[data-ri]').eq(i);
        row.addClass('ui-widget-content ui-row-editing ui-state-error');
        this.enableCellEditors(row);
    }

    /**
     * Finds all editors of a row. Usually each editable column has got an editor.
     * @protected
     * @param {JQuery} row A row for which to find its row editors.
     * @return {JQuery} A list of row editors for each editable column of the given row
     */
    getRowEditors(row) {
        return row.find('div.ui-cell-editor');
    }

    /**
     * Returns the paginator instance if any exists.
     * @return {PrimeFaces.widget.Paginator | undefined} The paginator instance for this widget, or `undefined` if
     * paging is not enabled.
     */
    getPaginator() {
        return this.paginator;
    }

    /**
     * Writes selected row ids to state holder
     * @private
     */
    writeSelections() {
        $(this.selectionHolder).val(this.selection.join(','));
    }

    /**
     * Checks whether only one row may be selected at a time.
     * @return {boolean} `true` if selection mode is set to `single`, or `false` otherwise.
     */
    isSingleSelection() {
        return this.cfg.selectionMode == 'single';
    }

    /**
     * Checks whether multiples rows may be selected at a time.
     * @return {boolean} `true` if selection mode is set to `multiple`, or `false` otherwise.
     */
    isMultipleSelection() {
        return this.cfg.selectionMode == 'multiple' || this.isCheckboxSelectionEnabled();
    }

    /**
     * Clears the saved list of selected rows.
     * @private
     */
    clearSelection() {
        this.selection = [];

        $(this.selectionHolder).val('');
    }

    /**
     * Checks whether the user may select the rows of this DataTable.
     * @return {boolean} `true` is rows may be selected, or `false` otherwise.
     */
    isSelectionEnabled() {
        return this.cfg.selectionMode != undefined || this.cfg.columnSelectionMode != undefined;
    }

    /**
     * Checks whether the rows of this DataTable are selected via checkboxes.
     * @return {boolean} `true` if selection mode is set to `checkbox`, or `false` otherwise.
     */
    isCheckboxSelectionEnabled() {
        return this.cfg.selectionMode === 'checkbox';
    }

    /**
     * Checks whether the rows of this DataTable are selected via radio buttons.
     * @return {boolean} `true` if selection mode is set to `radio`, or `false` otherwise.
     */
    isRadioSelectionEnabled() {
        return this.cfg.selectionMode === 'radio';
    }

    /**
     * Clears all table filters and shows all rows that may have been hidden by filters.
     */
    clearFilters() {
        var resetInputFields = function(inputFields) {
            inputFields.val('');
        };

        var resetWidget = function(widgetElement) {
            const selector = ':input:not(:disabled):not([readonly]), textarea:not(:disabled):not([readonly])';
            var widget = PrimeFaces.getWidgetById(widgetElement.attr('id'));
            if (widget && typeof widget.resetValue === 'function') {
                widget.resetValue(true);
            } else if (widgetElement.is(selector)) {
                resetInputFields(widgetElement);
            } else {
                resetInputFields($(this).find(selector));
            }
        };

        var standardFilters = this.thead.find('> tr > th.ui-filter-column > .ui-column-filter:not(:disabled):not([readonly])');
        resetInputFields(standardFilters);

        var customFilters = this.thead.find('> tr > th.ui-filter-column > .ui-column-customfilter');
        customFilters.each(function() {
            var widgetElement = $(this).find('.ui-widget');
            if (widgetElement.length > 0) {
                resetWidget(widgetElement);
            } else {
                resetInputFields($(this).find(':input:not(:disabled):not([readonly]), textarea:not(:disabled):not([readonly])'));
            }
        });

        var globalFilter = $(this.jqId + '\\:globalFilter');
        resetInputFields(globalFilter);

        this.filter();
    }

    /**
     * Sets up the event listeners to enable columns to be resized.
     * @private
     */
    setupResizableColumns() {
        this.cfg.resizeMode = this.cfg.resizeMode||'fit';

        this.fixColumnWidths();

        this.hasColumnGroup = this.hasColGroup();
        if(this.hasColumnGroup) {
            this.addGhostRow();
        }

        if(!this.cfg.liveResize) {
            this.resizerHelper = $('<div class="ui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.jq);
        }

        this.addResizers();

        var resizers = this.thead.find('> tr > th > span.ui-column-resizer'),
        $this = this;
        
        // #11918 double click resizes column like Excel
        resizers.on('dblclick', function() {
            $this.autosizeColumnWidth($(this).parent());
        });

        resizers.draggable({
            axis: 'x',
            start: function(event, ui) {
                ui.helper.data('originalposition', ui.helper.offset());

                if($this.cfg.liveResize) {
                    $this.jq.css('cursor', 'col-resize');
                }
                else {
                    var header = $this.cfg.stickyHeader ? $this.clone : $this.thead,
                        height = $this.cfg.scrollable ? $this.scrollBody.height() : header.parent().height() - header.height() - 1;

                    if($this.cfg.stickyHeader) {
                        height = height - $this.relativeHeight;
                    }

                    $this.resizerHelper.height(height);
                    $this.resizerHelper.show();
                }
            },
            drag: function(event, ui) {
                if($this.cfg.liveResize) {
                    $this.resize(event, ui);
                }
                else {
                    $this.resizerHelper.offset({
                        left: ui.helper.offset().left + ui.helper.width() / 2,
                        top: $this.thead.offset().top + $this.thead.height()
                    });
                }
            },
            stop: function(event, ui) {
                ui.helper.css({
                    'left': '',
                    'top': '0px'
                });

                if($this.cfg.liveResize) {
                    $this.jq.css('cursor', 'default');
                } else {
                    $this.resize(event, ui);
                    $this.resizerHelper.hide();
                }

                if($this.cfg.resizeMode === 'expand') {
                    PrimeFaces.queueTask(function() {
                        $this.fireColumnResizeEvent(ui.helper.parent());
                    });
                }
                else {
                    $this.fireColumnResizeEvent(ui.helper.parent());
                }

                if($this.cfg.stickyHeader) {
                    $this.reclone();
                }
            },
            containment: this.cfg.resizeMode === "expand" ? "document" : this.jq
        });
    }

    /**
     * Invokes the behaviors and event listeners when a column is resized.
     * @private
     * @param {JQuery} columnHeader Header of the column which was resized.
     */
    fireColumnResizeEvent(columnHeader) {
        if(this.hasBehavior('colResize')) {
            var options = {
                source: this.id,
                process: this.id,
                params: [
                    {name: this.id + '_colResize', value: true},
                    {name: this.id + '_columnId', value: columnHeader.attr('id')},
                    {name: this.id + '_width', value: parseInt(columnHeader.width())},
                    {name: this.id + '_height', value: parseInt(columnHeader.height())}
                ]
            };

            this.callBehavior('colResize', options);
        }
    }

    /**
     * Checks whether this DataTable has got any column groups.
     * @protected
     * @return {boolean} `true` if this DataTable has got any column groups, or `false` otherwise.
     */
    hasColGroup() {
        return this.thead.children('tr').length > 1;
    }

    /**
     * Adds and sets up an invisible row for internal purposes.
     * @protected
     */
    addGhostRow() {
        var firstRow = this.tbody.find('tr:first');
        if(firstRow.hasClass('ui-datatable-empty-message')) {
            return;
        }

        var columnsOfFirstRow = firstRow.children('td'),
        dataColumnsCount = columnsOfFirstRow.length,
        columnMarkup = '';

        for(var i = 0; i < dataColumnsCount; i++) {
            var colWidth = columnsOfFirstRow.eq(i).width() + 1,
            id = this.id + '_ghost_' + i;

            if (this.resizableState) {
                colWidth = this.findColWidthInResizableState(id) || colWidth;
            }

            columnMarkup += '<th id="' + id + '" style="height:0px;border-bottom-width: 0px;border-top-width: 0px;padding-top: 0px;padding-bottom: 0px;outline: 0 none; width:' + colWidth + 'px" class="ui-resizable-column"></th>';
        }

        this.thead.prepend('<tr>' + columnMarkup + '</tr>');

        if(this.cfg.scrollable) {
            this.theadClone.prepend('<tr>' + columnMarkup + '</tr>');
            this.footerTable.children('tfoot').prepend('<tr>' + columnMarkup + '</tr>');
        }
    }

    /**
     * Finds the group resizer element for the given drag event data.
     * @protected
     * @param {JQueryUI.DraggableEventUIParams} ui Data for the drag event.
     * @return {JQuery|null} The resizer DOM element.
     */
    findGroupResizer(ui) {
        for(var i = 0; i < this.groupResizers.length; i++) {
            var groupResizer = this.groupResizers.eq(i);
            if(groupResizer.offset().left === ui.helper.data('originalposition').left) {
                return groupResizer;
            }
        }

        return null;
    }

    /**
     * Adds the resizers for change the width of a column of this DataTable.
     * @protected
     */
    addResizers() {
        var resizableColumns = this.thead.find('> tr > th.ui-resizable-column');
        resizableColumns.prepend('<span class="ui-column-resizer">&nbsp;</span>');

        if(this.cfg.resizeMode === 'fit') {
            var child = this.isRTL ? ':first-child' : ':last-child';
            resizableColumns.filter(child).children('span.ui-column-resizer').hide();
        }

        if(this.hasColumnGroup) {
            this.groupResizers = this.thead.find('> tr:first > th > .ui-column-resizer');
        }
    }

    /**
     * Resizes this DataTable, row, or columns in response to a drag event of a resizer element.
     * @protected
     * @param {JQuery.TriggeredEvent} event Event triggered for the drag.
     * @param {JQueryUI.DraggableEventUIParams} ui Data for the drag event.
     */
    resize(event, ui) {
        var columnHeader, nextColumnHeader, change = null, newWidth = null, nextColumnWidth = null,
        expandMode = (this.cfg.resizeMode === 'expand'),
        table = this.thead.parent(),
        $this = this;

        if(this.hasColumnGroup) {
            var groupResizer = this.findGroupResizer(ui);
            if(!groupResizer) {
                return;
            }

            columnHeader = groupResizer.parent();
        }
        else {
            columnHeader = ui.helper.parent();
        }

        var title = columnHeader.children('.ui-column-title');
        var nextColumnHeader = this.isRTL ? columnHeader.prevAll(':visible:first') : columnHeader.nextAll(':visible:first');

        if(this.cfg.liveResize) {
            change = columnHeader.outerWidth() - (event.pageX - columnHeader.offset().left);
            newWidth = (columnHeader.width() - change);
            nextColumnWidth = (nextColumnHeader.width() + change);
        }
        else {
            change = (ui.position.left - ui.originalPosition.left);
            newWidth = (columnHeader.width() + change);
            nextColumnWidth = (nextColumnHeader.width() - change);
        }

        var minWidth = parseInt(columnHeader.css('min-width'));
        minWidth = (minWidth == 0) ? 15 : minWidth;

        if((newWidth > minWidth && nextColumnWidth > minWidth) || (expandMode && newWidth > minWidth)) {
            if(expandMode) {
                table.width(table.width() + change);
                PrimeFaces.queueTask(function() {
                    columnHeader.width(newWidth);
                    $this.updateResizableState(columnHeader, nextColumnHeader, table, newWidth, null);
                });
            }
            else {
                columnHeader.width(newWidth);
                nextColumnHeader.width(nextColumnWidth);
                this.updateResizableState(columnHeader, nextColumnHeader, table, newWidth, nextColumnWidth);
            }

            if(this.cfg.scrollable) {
                var cloneTable = this.theadClone.parent(),
                colIndex = columnHeader.index();

                if(expandMode) {
                    //body
                    cloneTable.width(cloneTable.width() + change);

                    //footer
                    this.footerTable.width(this.footerTable.width() + change);

                    PrimeFaces.queueTask(function() {
                        if($this.hasColumnGroup) {
                            $this.theadClone.find('> tr:first').children('th').eq(colIndex).width(newWidth);            //body
                            $this.footerTable.find('> tfoot > tr:first').children('th').eq(colIndex).width(newWidth);   //footer
                        }
                        else {
                            $this.theadClone.find(PrimeFaces.escapeClientId(columnHeader.attr('id') + '_clone')).width(newWidth);   //body
                            $this.footerCols.eq(colIndex).width(newWidth);                                                          //footer
                        }
                    });
                }
                else {
                    if(this.hasColumnGroup) {
                        //body
                        this.theadClone.find('> tr:first').children('th').eq(colIndex).width(newWidth);
                        this.theadClone.find('> tr:first').children('th').eq(colIndex + 1).width(nextColumnWidth);

                        //footer
                        this.footerTable.find('> tfoot > tr:first').children('th').eq(colIndex).width(newWidth);
                        this.footerTable.find('> tfoot > tr:first').children('th').eq(colIndex + 1).width(nextColumnWidth);
                    }
                    else {
                        //body
                        this.theadClone.find(PrimeFaces.escapeClientId(columnHeader.attr('id') + '_clone')).width(newWidth);
                        this.theadClone.find(PrimeFaces.escapeClientId(nextColumnHeader.attr('id') + '_clone')).width(nextColumnWidth);

                        //footer
                        if(this.footerCols.length > 0) {
                            var footerCol = this.footerCols.eq(colIndex),
                            nextFooterCol = footerCol.next();

                            footerCol.width(newWidth);
                            nextFooterCol.width(nextColumnWidth);
                        }
                    }
                }
            }
        }
    }

    /**
     * Remove given row from the list of selected rows.
     * @private
     * @param {string} rowKey Key of the row to remove.
     */
    removeSelection(rowKey) {
        if(this.selection.includes('@all')) {
            // GitHub #3535 if @all was previously selected just select values on page
            this.clearSelection();
            var rows = this.tbody.children('tr');
            for(var i = 0; i < rows.length; i++) {
                var rowMeta = this.getRowMeta(rows.eq(i));
                if(rowMeta.key !== rowKey) {
                    this.addSelection(rowMeta.key);
                }
            }
        }
        else {
            this.selection = $.grep(this.selection, function(value) {
                return value !== rowKey;
            });
        }
    }

    /**
     * Adds given row to the list of selected rows.
     * @private
     * @param {number} rowKey Key of the row to add.
     */
    addSelection(rowKey) {
        if(!this.isSelected(rowKey)) {
            this.selection.push(rowKey);
        }
    }

    /**
     * Checks whether the given row is currently selected.
     * @param {string} rowKey The key of a row from this DataTable.
     * @return {boolean} `true` if the given row is currently selected, or `false` otherwise.
     */
    isSelected(rowKey) {
        return PrimeFaces.inArray(this.selection, rowKey);
    }

    /**
     * Finds the index and the row key for the given row.
     * @param {JQuery} row The element (`TR`) of a row of this DataTable.
     * @return {PrimeFaces.widget.DataTable.RowMeta} The meta for the row with the index and the row key.
     */
    getRowMeta(row) {
        var meta = {
            index: row.data('ri'),
            key:  row.attr('data-rk')
        };

        return meta;
    }

    /**
     * Sets up all event listeners required for making column draggable and reorderable.
     * @private
     */
    setupDraggableColumns() {
        this.orderStateHolder = $(this.jqId + '_columnOrder');
        this.saveColumnOrder();

        this.dragIndicatorTop = $('<span class="ui-icon ui-icon-arrowthick-1-s" style="position:absolute"></span>').hide().appendTo(this.jq);
        this.dragIndicatorBottom = $('<span class="ui-icon ui-icon-arrowthick-1-n" style="position:absolute"></span>').hide().appendTo(this.jq);

        var $this = this;

        $(this.jqId + ' thead th.ui-draggable-column').draggable({
            appendTo: 'body',
            opacity: 0.75,
            cursor: 'move',
            scope: this.id,
            cancel: ':input,.ui-column-resizer',
            start: function(event, ui) {
                PrimeFaces.nextZindex(ui.helper);
            },
            drag: function(event, ui) {
                var droppable = ui.helper.data('droppable-column');

                if(droppable) {
                    var droppableOffset = droppable.offset(),
                    topArrowY = droppableOffset.top - 10,
                    bottomArrowY = droppableOffset.top + droppable.height() + 8,
                    arrowX = null;

                    //calculate coordinates of arrow depending on mouse location
                    if(event.originalEvent.pageX >= droppableOffset.left + (droppable.width() / 2)) {
                        var nextDroppable = droppable.next();
                        if(nextDroppable.length == 1)
                            arrowX = nextDroppable.offset().left - 9;
                        else
                            arrowX = droppable.offset().left + droppable.innerWidth() - 9;

                        ui.helper.data('drop-location', 1);     //right
                    }
                    else {
                        arrowX = droppableOffset.left  - 9;
                        ui.helper.data('drop-location', -1);    //left
                    }

                    $this.dragIndicatorTop.offset({
                        'left': arrowX,
                        'top': topArrowY - 3
                    }).show();

                    $this.dragIndicatorBottom.offset({
                        'left': arrowX,
                        'top': bottomArrowY - 3
                    }).show();
                }
            },
            stop: function(event, ui) {
                //hide dnd arrows
                $this.dragIndicatorTop.css({
                    'left':'0px',
                    'top':'0px'
                }).hide();

                $this.dragIndicatorBottom.css({
                    'left':'0px',
                    'top':'0px'
                }).hide();
            },
            helper: function() {
                var header = $(this),
                helper = $('<div class="ui-widget ui-state-default" style="padding:4px 10px;text-align:center;"></div>');

                helper.width(header.width());
                helper.height(header.height());

                helper.html(header.html());

                return helper.get(0);
            }
        }).droppable({
            hoverClass:'ui-state-highlight',
            tolerance:'pointer',
            scope: this.id,
            over: function(event, ui) {
                ui.helper.data('droppable-column', $(this));
            },
            drop: function(event, ui) {
                var draggedColumnHeader = ui.draggable,
                dropLocation = ui.helper.data('drop-location'),
                droppedColumnHeader =  $(this),
                draggedColumnFooter = null,
                droppedColumnFooter = null;

                var draggedCells = $this.tbody.find('> tr:not(.ui-expanded-row-content) > td:nth-child(' + (draggedColumnHeader.index() + 1) + ')'),
                droppedCells = $this.tbody.find('> tr:not(.ui-expanded-row-content) > td:nth-child(' + (droppedColumnHeader.index() + 1) + ')');

                if($this.tfoot.length) {
                    var footerColumns = $this.tfoot.find('> tr > td'),
                    draggedColumnFooter = footerColumns.eq(draggedColumnHeader.index()),
                    droppedColumnFooter = footerColumns.eq(droppedColumnHeader.index());
                }

                //drop right
                if(dropLocation > 0) {
                    if($this.cfg.resizableColumns) {
                        if(droppedColumnHeader.next().length === 0) {
                            droppedColumnHeader.children('span.ui-column-resizer').show();
                            draggedColumnHeader.children('span.ui-column-resizer').hide();
                        }
                    }

                    draggedColumnHeader.insertAfter(droppedColumnHeader);

                    draggedCells.each(function(i, item) {
                        $(this).insertAfter(droppedCells.eq(i));
                    });

                    if(draggedColumnFooter && droppedColumnFooter) {
                        draggedColumnFooter.insertAfter(droppedColumnFooter);
                    }

                    //sync clone
                    if($this.cfg.scrollable) {
                        var draggedColumnClone = $(document.getElementById(draggedColumnHeader.attr('id') + '_clone')),
                        droppedColumnClone = $(document.getElementById(droppedColumnHeader.attr('id') + '_clone'));
                        draggedColumnClone.insertAfter(droppedColumnClone);
                    }
                }
                //drop left
                else {
                    draggedColumnHeader.insertBefore(droppedColumnHeader);

                    draggedCells.each(function(i, item) {
                        $(this).insertBefore(droppedCells.eq(i));
                    });

                    if(draggedColumnFooter && droppedColumnFooter) {
                        draggedColumnFooter.insertBefore(droppedColumnFooter);
                    }

                    //sync clone
                    if($this.cfg.scrollable) {
                        var draggedColumnClone = $(document.getElementById(draggedColumnHeader.attr('id') + '_clone')),
                        droppedColumnClone = $(document.getElementById(droppedColumnHeader.attr('id') + '_clone'));
                        draggedColumnClone.insertBefore(droppedColumnClone);
                    }
                }

                //save order
                $this.saveColumnOrder();

                //fire colReorder event
                if($this.hasBehavior('colReorder')) {
                    var ext = null;

                    if($this.cfg.multiViewState) {
                        ext = {
                            params: [{name: this.id + '_encodeFeature', value: true}]
                        };
                    }

                    $this.callBehavior('colReorder', ext);
                }
            }
        });

        // GitHub #5013 Frozen Columns should not be draggable/droppable
        if($this.cfg.frozenColumns) {
            var frozenHeaders = this.frozenThead.find('.ui-frozen-column');
            frozenHeaders.draggable('disable');
            frozenHeaders.droppable('disable');
            frozenHeaders.disableSelection();
        }
    }

    /**
     * Saves the current column order, used to preserve the state between AJAX updates etc.
     * @protected
     */
    saveColumnOrder() {
        var columnIds = [],
        columns = $(this.jqId + ' thead:first th');

        columns.each(function(i, item) {
            columnIds.push($(item).attr('id'));
        });

        this.orderStateHolder.val(columnIds.join(','));
    }

    /**
     * Makes the rows of this DataTable draggable via JQueryUI.
     * @private
     */
    makeRowsDraggable() {
        var $this = this,
        draggableHandle = this.cfg.rowDragSelector||'td,span:not(.ui-c)';

        this.tbody.sortable({
            placeholder: 'ui-datatable-rowordering ui-state-active',
            cursor: 'move',
            handle: draggableHandle,
            appendTo: document.body,
            start: function(event, ui) {
                PrimeFaces.nextZindex(ui.helper);
            },
            helper: function(event, ui) {
                var cells = ui.children(),
                helper = $('<div class="ui-datatable ui-widget"><table><tbody class="ui-datatable-data"></tbody></table></div>'),
                helperRow = ui.clone(),
                helperCells = helperRow.children();

                for(var i = 0; i < helperCells.length; i++) {
                    var helperCell = helperCells.eq(i);
                    helperCell.width(cells.eq(i).width());
                    // #5584 reflow must remove column title span
                    helperCell.children().remove('.ui-column-title');
                }

                helperRow.appendTo(helper.find('tbody'));

                return helper;
            },
            update: function(event, ui) {
                var fromIndex = ui.item.data('ri');
                var fromNode = ui.item;
                var itemIndex = ui.item.index();
                var toIndex = $this.paginator ? $this.paginator.getFirst() + itemIndex : itemIndex;
                var isDirectionUp = fromIndex >= toIndex;

                // #5296 must not count header group rows
                // #6557 must not count expanded rows
                if (isDirectionUp) {
                    for (let i = 0; i <= toIndex; i++) {
                        fromNode = fromNode.next('tr');
                        if (fromNode.hasClass('ui-rowgroup-header') || fromNode.hasClass('ui-expanded-row-content')){
                            toIndex--;
                        }
                    }
                } else {
                    fromNode.prevAll('tr').each(function() {
                        var node = $(this);
                        if (node.hasClass('ui-rowgroup-header') || node.hasClass('ui-expanded-row-content')){
                            toIndex--;
                        }
                    });
                }
                toIndex = Math.max(toIndex, 0);

                $this.syncRowParity();

                var options = {
                    source: $this.id,
                    process: $this.id,
                    params: [
                        {name: $this.id + '_rowreorder', value: true},
                        {name: $this.id + '_fromIndex', value: fromIndex},
                        {name: $this.id + '_toIndex', value: toIndex},
                        {name: $this.id + '_skipChildren', value: true}
                    ]
                }

                if($this.hasBehavior('rowReorder')) {
                    $this.callBehavior('rowReorder', options);
                }
                else {
                    PrimeFaces.ajax.Request.handle(options);
                }
            },
            change: function(event, ui) {
                if($this.cfg.scrollable) {
                    PrimeFaces.scrollInView($this.scrollBody, ui.placeholder);
                }
            }
        });
    }

    /**
     * Sets the style class on each, depending whether it is an even-numbered or odd-numbered row.
     * @private
     */
    syncRowParity() {
        var rows = this.tbody.children('tr.ui-widget-content'),
        first = this.paginator ? this.paginator.getFirst(): 0;

        for(var i = first; i < rows.length; i++) {
            var row = rows.eq(i);

            row.data('ri', i).removeClass('ui-datatable-even ui-datatable-odd');

            if(i % 2 === 0)
                row.addClass('ui-datatable-even');
            else
                row.addClass('ui-datatable-odd');

        }
    }

    /**
     * Checks whether this DataTable has got any rows. When there are no rows, usually the message `no items found` is
     * shown.
     * @return {boolean} `true` if this DataTable has got no rows, `false` otherwise.
     */
    isEmpty() {
        return this.tbody.children('tr.ui-datatable-empty-message').length === 1;
    }

    /**
     * Finds the number of rows that are selected.
     * @return {number} The number of rows that are currently selected.
     */
    getSelectedRowsCount() {
        return this.isSelectionEnabled() ? this.selection.length : 0;
    }

    /**
     * Updates the `check all` checkbox in the header of this DataTable.
     * @private
     */
    updateHeaderCheckbox() {
        if(this.isEmpty()) {
            this.uncheckHeaderCheckbox();
            this.disableHeaderCheckbox();
        }
        else if(!this.cfg.selectionPageOnly && this.selection.includes('@all')) {
            this.enableHeaderCheckbox();
            this.checkHeaderCheckbox();
        }
        else {
            var checkboxes, selectedCheckboxes, enabledCheckboxes, disabledCheckboxes;

            if(this.cfg.nativeElements) {
                checkboxes = this.tbody.find('> tr > td.ui-selection-column > :checkbox');
                enabledCheckboxes = checkboxes.filter(':enabled');
                disabledCheckboxes = checkboxes.filter(':disabled');
                selectedCheckboxes = enabledCheckboxes.filter(':checked');
            }
            else {
                checkboxes = this.tbody.find('> tr > td.ui-selection-column > div.ui-chkbox > .ui-chkbox-box');
                enabledCheckboxes = checkboxes.filter(':not(.ui-state-disabled)');
                disabledCheckboxes = checkboxes.filter('.ui-state-disabled');
                selectedCheckboxes = enabledCheckboxes.filter("div[aria-checked='true']");
            }

            var totalEnabled = enabledCheckboxes.length;
            if (this.cfg.selectionPageOnly) {
                if(totalEnabled && totalEnabled === selectedCheckboxes.length)
                    this.checkHeaderCheckbox();
                else
                    this.uncheckHeaderCheckbox();
            }

            if(checkboxes.length === disabledCheckboxes.length)
               this.disableHeaderCheckbox();
            else
               this.enableHeaderCheckbox();
        }
    }

    /**
     * Checks the `select all` checkbox in the header of this DataTable.
     * @private
     */
    checkHeaderCheckbox() {
        if(this.cfg.nativeElements) {
            this.checkAllToggler.prop('checked', true);
        }
        else {
            this.checkAllToggler.addClass('ui-state-active').children('span.ui-chkbox-icon').removeClass('ui-icon-blank').addClass('ui-icon-check');
            this.checkAllToggler.attr('aria-checked', true);
        }
    }

    /**
     * Unchecks the `select all` checkbox in the header of this data table.
     * @private
     */
    uncheckHeaderCheckbox() {
        if(this.cfg.nativeElements) {
            this.checkAllToggler.prop('checked', false);
        }
        else {
            this.checkAllToggler.removeClass('ui-state-active').children('span.ui-chkbox-icon').addClass('ui-icon-blank').removeClass('ui-icon-check');
            this.checkAllToggler.attr('aria-checked', false);
        }
    }

    /**
     * Disables the `select all` checkbox in the header of this DataTable.
     * @private
     */
    disableHeaderCheckbox() {
        if(this.cfg.nativeElements)
            this.checkAllToggler.prop('disabled', true);
        else
            this.checkAllToggler.addClass('ui-state-disabled');
    }

    /**
     * Enables the `select all` checkbox in the header of this DataTable.
     * @private
     */
    enableHeaderCheckbox() {
        if(this.cfg.nativeElements)
            this.checkAllToggler.prop('disabled', false);
        else
            this.checkAllToggler.removeClass('ui-state-disabled');
    }

    /**
     * Applies the styling and event listeners required for the sticky headers feature.
     * @private
     */
    setupStickyHeader() {
        var table = this.thead.parent(),
            offset = table.offset(),
            $this = this,
            orginTableContent = this.jq.find('> .ui-datatable-tablewrapper > table'),
            fixedElementsOnTop = this.cfg.stickyTopAt ? $(this.cfg.stickyTopAt) : null,
            fixedElementsHeight = 0;

        if (fixedElementsOnTop && fixedElementsOnTop.length) {
            fixedElementsHeight = fixedElementsOnTop.toArray().reduce(function(height, elem) {
                return height + $(elem).outerHeight();
            }, 0);
        }

        this.stickyContainer = $('<div class="ui-datatable ui-datatable-sticky ui-widget"><table></table></div>');
        this.clone = this.thead.clone(false);
        this.stickyContainer.children('table').append(this.thead);
        table.prepend(this.clone);

        this.stickyContainer.css({
            position: 'absolute',
            width: table.outerWidth(),
            top: offset.top,
            left: offset.left,
            display: 'none'
        });

        this.jq.prepend(this.stickyContainer);

        if (this.cfg.resizableColumns) {
            this.relativeHeight = 0;
        }

        var updateStickyHeaderPosition = function() {
            var scrollTop = $(window).scrollTop(),
                tableOffset = table.offset();

            if (scrollTop + fixedElementsHeight > tableOffset.top) {
                if (!$this.stickyContainer.hasClass('ui-shadow ui-sticky')) {
                    $this.stickyContainer.css({ 'z-index': PrimeFaces.utils.nextStickyZindex() });
                }
                $this.stickyContainer.css({
                    position: 'fixed',
                    top: fixedElementsHeight
                }).addClass('ui-shadow ui-sticky');

                if ($this.cfg.resizableColumns) {
                    $this.relativeHeight = (scrollTop + fixedElementsHeight) - tableOffset.top;
                }

                if (scrollTop + fixedElementsHeight >= (tableOffset.top + $this.tbody.height())) {
                    $this.stickyContainer.hide();
                } else {
                    $this.stickyContainer.show();
                }
            } else {
                $this.stickyContainer.css({
                    position: 'absolute',
                    top: tableOffset.top
                }).removeClass('ui-shadow ui-sticky');

                if ($this.stickyContainer.is(':hidden')) {
                    $this.stickyContainer.css({ 'z-index': PrimeFaces.utils.nextStickyZindex() });
                    $this.stickyContainer.show();
                }

                if ($this.cfg.resizableColumns) {
                    $this.relativeHeight = 0;
                }
            }
        };

        PrimeFaces.utils.registerScrollHandler(this, 'scroll.' + this.id, updateStickyHeaderPosition);

        PrimeFaces.utils.registerResizeHandler(this, 'resize.sticky-' + this.id, null, function(e) {
            var _delay = e.data.delay || 0;

            if (_delay !== null && typeof _delay === 'number' && _delay > -1) {
                if ($this.resizeTimeout) {
                    clearTimeout($this.resizeTimeout);
                }

                $this.stickyContainer.hide();
                $this.resizeTimeout = PrimeFaces.queueTask(function() {
                    $this.stickyContainer.css({ left: orginTableContent.offset().left + 'px', 'z-index': PrimeFaces.nextZindex() });
                    $this.stickyContainer.width(table.outerWidth());
                    // Dispatch the scroll event on the window
                    window.dispatchEvent(new Event('scroll'));
                }, _delay);
            }
            else {
                $this.stickyContainer.width(table.outerWidth());
            }
        }, { delay: null });

        //filter support
        this.clone.find('.ui-column-filter').prop('disabled', true);

        // set original state upon loading
        updateStickyHeaderPosition();

        // must clean up memory when this widget is destroyed
        this.addDestroyListener(function() {
            PrimeFaces.utils.cleanseDomElement($this.clone);
            PrimeFaces.utils.cleanseDomElement($this.stickyContainer);
        });
    }

    /**
     * Initializes the expansion state
     * @private
     */
    initRowExpansion() {
        var $this = this;

        this.expansionHolder = $(this.jqId + '_rowExpansionState');
        this.loadedExpansionRows = this.tbody.children('.ui-expanded-row-content').prev().map(function() {
            return $this.getRowMeta($(this)).key;
        }).get();

        this.writeRowExpansions();

        PrimeFaces.utils.registerResizeHandler(this, 'resize.expansion-' + this.id, null, function(e) {
            $this.updateExpandedRowsColspan();
        });
    }

    /**
     * Write row expansion state.
     * @private
     */
    writeRowExpansions() {
        this.expansionHolder.val(this.loadedExpansionRows.join(','));
    }

    /**
     * Finds the body of this DataTable with the property that the user can focus it.
     * @protected
     * @return {JQuery} The body of this DataTable.
     */
    getFocusableTbody() {
        return this.tbody;
    }

    /**
     * Removes the current clone of the table header from the DOM, and creates a new clone.
     * @private
     */
    reclone() {
        PrimeFaces.utils.cleanseDomElement(this.clone);
        this.clone = this.thead.clone(false);
        this.jq.find('.ui-datatable-tablewrapper > table').prepend(this.clone);
    }

    /**
     * Fetches the last row from the backend and inserts a row instead of updating the table itself.
     */
    addRow() {
        var $this = this,
        options = {
            source: this.id,
            process: this.id,
            update: this.id,
            params: [{name: this.id + '_addrow', value: true},
                    {name: this.id + '_skipChildren', value: true},
                    {name: this.id + '_encodeFeature', value: true}],
            onsuccess: function(responseXML, status, xhr) {
                PrimeFaces.ajax.Response.handle(responseXML, status, xhr, {
                    widget: $this,
                    handle: function(content) {
                        this.tbody.append(content);
                    }
                });

                if ($this.isEmpty()) {
                    $this.tbody.children('tr.ui-datatable-empty-message').remove();
                }

                if ($this.isCheckboxSelectionEnabled()) {
                    $this.enableHeaderCheckbox();
                }

                return true;
            }
        };

        PrimeFaces.ajax.Request.handle(options);
    }

    /**
     * Clears all cached rows so that they are loaded from the server the next time they are requested.
     * @private
     */
    clearCacheMap() {
        this.cacheMap = {};
    }

    /**
     * Loads the data for the given page and displays it. When some rows exist in the cache, do not reload them from the
     * server.
     * @param {PrimeFaces.widget.Paginator.PaginationState} newState The new values for the current page and the rows
     * per page count.
     * @private
     */
    loadDataWithCache(newState) {
        var isRppChanged = false;
        if(this.cacheRows != newState.rows) {
            this.clearCacheMap();
            this.cacheRows = newState.rows;
            isRppChanged = true;
        }

        var pageFirst = newState.first,
            nextPageFirst = newState.rows + pageFirst,
            lastPageFirst = this.cfg.paginator.pageCount * newState.rows,
            hasNextPage = (!this.cacheMap[nextPageFirst]) && nextPageFirst < lastPageFirst;

        if(this.cacheMap[pageFirst] && !isRppChanged) {
            this.updateData(this.cacheMap[pageFirst]);
            this.paginator.cfg.page = newState.page;
            this.paginator.updateUI();

            if(!hasNextPage) {
                this.updatePageState(newState);
            }
        }
        else {
            this.paginate(newState);
        }

        if(hasNextPage) {
            this.fetchNextPage(newState);
        }
    }

    /**
     * Reflow mode is a responsive mode to display columns as stacked depending on screen size. Updates the reflow for
     * the given header.
     * @private
     * @param {JQuery} columnHeader Header of a column to update.
     * @param {number} sortOrder Sort order of the column.
     */
    updateReflowDD(columnHeader, sortOrder) {
        if(this.reflowDD && this.cfg.reflow) {
            sortOrder = sortOrder > 0 ? 0 : 1;

            var columnHeader = columnHeader.text().replace(/[^a-zA-Z0-9\u00C0-\u017F]/g, '');
            var filterby = columnHeader.indexOf("Filter by");
            if (filterby !== -1) {
                columnHeader = columnHeader.substring(0, filterby);
            }
            columnHeader = CSS.escape(columnHeader);

            this.reflowDD.children('option').each(function() {
                var optionLabel = CSS.escape(this.text);
                var optionSortOrder = $(this).data('sortorder');
                this.selected = optionLabel.startsWith(columnHeader) && optionSortOrder == sortOrder;
            });
        }
    }

    /**
     * When row grouping is enabled, groups all rows accordingly.
     * @protected
     */
    groupRows() {
        var rows = this.tbody.children('tr');

        // see #8027
        // remember the original column index
        // columns are removed because of grouping and mapping to the header isnt possible anymore in #updateColumnsView
        if(this.headers && !this.hasColGroup()) {
            for(var i = 0; i < this.headers.length; i++) {
                var header = this.headers.eq(i),
                    index = header.index(),
                    column = this.tbody.find('> tr:not(.ui-expanded-row-content) > td:nth-child(' + (index + 1) + ')');

                column.data('ci', index);
            }
        }
 
        for(var i = 0; i < this.cfg.groupColumnIndexes.length; i++) {
            this.groupRow(this.cfg.groupColumnIndexes[i], rows);
        }

        rows.children('td.ui-duplicated-column').remove();
    }

    /**
     * Called by `groupRows`, this method performs the grouping of a single set of rows that belong to one row group.
     * @private
     * @param {number} colIndex Index of the column to group.
     * @param {JQuery} rows Rows to group into one row group.
     */
    groupRow(colIndex, rows) {
        var groupStartIndex = null, rowGroupCellData = null, rowGroupCount = null;

        for(var i = 0; i < rows.length; i++) {
            var row = rows.eq(i);
            var column = row.children('td').eq(colIndex);
            var columnData = column.text();

            if(rowGroupCellData != columnData) {
                groupStartIndex = i;
                rowGroupCellData = columnData;
                rowGroupCount = 1;

                if (this.cfg.liveScroll && column[0].hasAttribute('rowspan')) {
                    rowGroupCount = parseInt(column.attr('rowspan'));
                    i += rowGroupCount - 1;
                }

                row.addClass('ui-datatable-grouped-row');
            }
            else {
                column.addClass('ui-duplicated-column');
                rowGroupCount++;
            }

            if(groupStartIndex != null && rowGroupCount > 1) {
                rows.eq(groupStartIndex).children('td').eq(colIndex).attr('rowspan', rowGroupCount);
            }
        }
    }

    /**
     * Sets up the event handlers for row group events.
     * @protected
     */
    bindToggleRowGroupEvents() {
        var $this = this, 
            expandableRows = this.tbody.children('tr.ui-rowgroup-header'),
            toggler = expandableRows.find('> td:first > a.ui-rowgroup-toggler');

        toggler.off('click.dataTable-rowgrouptoggler').on('click.dataTable-rowgrouptoggler', function(e) {
           var link = $(this),
           togglerIcon = link.children('.ui-rowgroup-toggler-icon'),
           parentRow = link.closest('tr.ui-rowgroup-header');

           if(togglerIcon.hasClass('ui-icon-circle-triangle-s')) {
               link.attr('aria-expanded', false).attr('aria-label', $this.getAriaLabel('expandLabel'));
               togglerIcon.addClass('ui-icon-circle-triangle-e').removeClass('ui-icon-circle-triangle-s');
               parentRow.nextUntil('tr.ui-rowgroup-header').hide();
           }
           else {
               link.attr('aria-expanded', true).attr('aria-label', $this.getAriaLabel('collapseLabel'));
               togglerIcon.addClass('ui-icon-circle-triangle-s').removeClass('ui-icon-circle-triangle-e');
               parentRow.nextUntil('tr.ui-rowgroup-header').show();
           }

           e.preventDefault();
        });
        // set aria labels
        toggler.each(function() {
            $this.updateExpansionAria($(this))
        });
    }

    /**
     * Computes the `colspan value for the table rows.
     * @private
     * @param {boolean} visibleOnly If true, only visible columns are considered.
     * @return {number} The computed `colspan` value.
     */
    calculateColspan(visibleOnly = false) {
        var headerSelector = '> tr:first th:not(.ui-helper-hidden):not(.ui-grouped-column)';
        if (visibleOnly) {
            headerSelector += ':visible';
        }
        var visibleHeaderColumns = this.thead.find(headerSelector),
            colSpanValue = 0;

        for(var i = 0; i < visibleHeaderColumns.length; i++) {
            var column = visibleHeaderColumns.eq(i);
            if(column.is('[colspan]')) {
                colSpanValue += parseInt(column.attr('colspan'));
            }
            else {
                colSpanValue++;
            }
        }

        return colSpanValue;
    }

    /**
     * Updates the `colspan` attribute of the given row.
     * @private
     * @param {JQuery} row A row to update.
     * @param {number} [colspanValue] The new `colspan` value. If not given, computes the value automatically.
     */
    updateColspan(row, colspanValue) {
        row.children('td').attr('colspan', colspanValue || this.calculateColspan());
    }

    /**
     * Updates the colspan attribute for the message shown when no rows are available.
     * @private
     */
    updateEmptyColspan() {
        var emptyRow = this.tbody.children('tr:first');
        if(emptyRow && emptyRow.hasClass('ui-datatable-empty-message')) {
            let colspanValue = this.calculateColspan();
            // #13742 need to re-add the grouped column to fill out the empty row
            if (this.thead.find('> tr:first th.ui-grouped-column').length > 0) {
                colspanValue = colspanValue + 1;
            }
            this.updateColspan(emptyRow, colspanValue);
        }
    }

    /**
     * Updates the `rowspan` attribute of the given row.
     * @private
     * @param {JQuery} row A column to update.
     */
    updateRowspan(row) {
        if (this.cfg.groupColumnIndexes) {
            var isGroupedRow = row.hasClass('ui-datatable-grouped-row');
            var groupedRow = isGroupedRow ? row : row.prevAll('.ui-datatable-grouped-row:first');
            var groupedColumn = groupedRow.children('.ui-grouped-column:first');
            var rowSpan = groupedRow.nextUntil('.ui-datatable-grouped-row').not(':hidden').length + 1;
            var diff = rowSpan - parseInt(groupedColumn.attr('rowspan') || 1);
            groupedColumn.attr('rowspan', rowSpan);

            var groupedColumnIndex = groupedColumn.index();
            if (groupedColumnIndex > 0) {
                var columns = row.children('td:visible');
                for (var i = 0; i < groupedColumnIndex; i++) {
                    var column = columns.eq(i);
                    if (column) {
                        column.attr('rowspan', parseInt(column.attr('rowspan') || 1) + diff);
                    }
                }
            }
        }
    }

    /**
     * Updates the `colspan` attributes of all expanded rows.
     * @private
     */
    updateExpandedRowsColspan() {
        var colspanValue = this.calculateColspan(true),
            $this = this;
        this.getExpandedRows().each(function() {
            $this.updateColspan($(this).next('.ui-expanded-row-content'), colspanValue);
        });
    }

    /**
     * Computes and saves the resizable state of this DataTable, ie. which columns have got which width. May be used
     * later to restore the current column width after an AJAX update.
     * @private
     * @param {JQuery} columnHeader Element of a column header of this DataTable.
     * @param {JQuery} nextColumnHeader Element of the column header next to the given column header.
     * @param {JQuery} table The element for this DataTable.
     * @param {number} newWidth New width to be applied.
     * @param {number | null} nextColumnWidth Width of the column next to the given column header.
     */
    updateResizableState(columnHeader, nextColumnHeader, table, newWidth, nextColumnWidth) {
        var expandMode = (this.cfg.resizeMode === 'expand'),
        currentColumnId = columnHeader.attr('id'),
        nextColumnId = nextColumnHeader.attr('id'),
        tableId = this.id + "_tableWidthState",
        currentColumnState = currentColumnId + '_' + newWidth,
        nextColumnState = nextColumnId + '_' + nextColumnWidth,
        tableState = tableId + '_' + parseInt(table.css('width')),
        currentColumnMatch = false,
        nextColumnMatch = false,
        tableMatch = false;

        for(var i = 0; i < this.resizableState.length; i++) {
            var state = this.resizableState[i];
            if(state.indexOf(currentColumnId) === 0) {
                this.resizableState[i] = currentColumnState;
                currentColumnMatch = true;
            }
            else if(!expandMode && state.indexOf(nextColumnId) === 0) {
                this.resizableState[i] = nextColumnState;
                nextColumnMatch = true;
            }
            else if(expandMode && state.indexOf(tableId) === 0) {
                this.resizableState[i] = tableState;
                tableMatch = true;
            }
        }

        if(!currentColumnMatch) {
            this.resizableState.push(currentColumnState);
        }

        if(!expandMode && !nextColumnMatch) {
            this.resizableState.push(nextColumnState);
        }

        if(expandMode && !tableMatch) {
            this.resizableState.push(tableState);
        }

        this.resizableStateHolder.val(this.resizableState.join(','));
    }

    /**
     * Finds the saved width of the given column. The width of resizable columns may be saved to restore it after an
     * AJAX update.
     * @private
     * @param {string} id ID of a column
     * @return {string | undefined} The saved width of the given column in pixels. `undefined` when the given column
     * does not exist.
     */
    findColWidthInResizableState(id) {
        for (var i = 0; i < this.resizableState.length; i++) {
            var state = this.resizableState[i];
            if (state.indexOf(id) === 0) {
                return state.substring(state.lastIndexOf('_') + 1, state.length);
            }
        }

        return null;
    }

    /**
     * Updates some style classes for all columns.
     * @private
     */
    updateColumnsView() {
        if(this.isEmpty()) {
            return;
        }

        // update the visibility of columns but ignore expanded rows and GitHub #7255 grouped headers
        if(this.headers && !this.hasColGroup()) {
            var rows = this.tbody.find('> tr:not(.ui-expanded-row-content):not(.ui-datatable-headerrow)');
            for(var i = 0; i < rows.length; i++) {
                var row = rows.eq(i);
                var columns = row.find('td');
                
                for(var j = 0; j < columns.length; j++) {
                    var column = columns.eq(j);
                    var columnIndex = column.data('ci') || j;

                    var header = this.headers.eq(columnIndex);
                    if(header.hasClass('ui-helper-hidden')) {
                        column.addClass('ui-helper-hidden');
                    }
                    else {
                        column.removeClass('ui-helper-hidden');
                    }
                }
            }
        }

        // update the colspan of the expanded rows
        if(this.cfg.expansion) {
            this.updateExpandedRowsColspan();
        }
    }

    /**
     * Resets the scroll state of the body to a non-scrolled state.
     * @protected
     */
    resetVirtualScrollBody() {
        this.bodyTable.css('top', '0px');
        this.scrollBody.scrollTop(0);
        this.clearScrollState();
    }

    /**
     * In case of a toggleable filter datatable toggle all filter input components
     * @param {string | null} speed speed of fade animation. (see jquery fadeToggle method)
     * @param {(() => void) | null} callback will be executed after animation is finished. (see jquery fadeToggle method)
     */
    toggleFilter(speed, callback) {
        this.jq.find(".ui-column-filter, .ui-column-customfilter").fadeToggle(speed || 0, callback);
    }

}
