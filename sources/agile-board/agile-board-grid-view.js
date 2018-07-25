import { DHXView } from 'dhx-optimus';
import route from 'riot-route';

const API_URL = 'api/stories';
const LOCAL_SERVICE_NAME = 'AgileBoardGridService';
const MODEL_SERVICE = 'AgileBoardModelService';
const LOCAL_NAME = 'AgileBoard';
const MY_URL = '/stories';
const URL_MATCH = /#(.*stories\/)(.*)/;

export class StoriesGridView extends DHXView {
    render() {
        this.previousId = null;
        //todo replace to better position
        this.ui = this.root.attachGrid();
        this.ui.editCellHandler = (stage, id, colIndex, newValue, oldValue) => {
            const editorClosed = 2;
            if (stage === editorClosed & newValue !== oldValue) {
                let fieldName = this.ui.getColumnId(colIndex);
                this.getService(MODEL_SERVICE).setFieldValue(id, fieldName, newValue);
            }
            return true;
        }
        this.ui.enableEditEvents(true, false, true);
        this.ui.init();
        this._load(() => {
            this.ui.editCellEvent = this.ui.attachEvent('onEditCell', this.ui.editCellHandler);
        });

        //GLOBAL EVENTS
        this.attachEvent('setFieldValue', (id, field, value) => {
            let fieldIndex = this.ui.getColIndexById(field);
            this.ui.cells(id, fieldIndex).setValue(value);
        });
        this.attachEvent('ToolbarClick', (id) => {
            switch (id) {
                case "add":
                    this.getService(LOCAL_SERVICE_NAME).addRow();
                    break;
                case "del":
                    this.getService(LOCAL_SERVICE_NAME).deleteSelectedRow();
                    break;
            }
        });

        //LOCAL EVENTS
        this.ui.attachEvent('onRowAdded', (id) => {
            this.getService(MODEL_SERVICE).create({
                name: 'Enter name',
                dob: '01/01/1990',
                pos: 'Sales Manager'
            }).then(data => {
                //console.log('onRowAdded', data);
                this.ui.callEvent('onAfterRowAdded', [id, data._id, data]);
            });
        });
        this.ui.attachEvent('onAfterRowAdded', (tempId, serverId, values) => {
            this.ui.changeRowId(tempId, serverId);
            this.ui.cells(serverId, 0).setValue(values.photo);
            this.ui.cells(serverId, 1).setValue(values.name);
            this.ui.cells(serverId, 2).setValue(values.dob);
            this.ui.cells(serverId, 3).setValue(values.pos);
            window.history.replaceState({ type: LOCAL_NAME.toLocaleLowerCase(), serverId: serverId }, `${LOCAL_NAME}: ${serverId}`, `#${LOCAL_NAME.toLocaleLowerCase()}/${serverId}`);
        });
        this.ui.attachEvent('onAfterRowDeleted', (id, pid) => {
            this.getService(MODEL_SERVICE).delete(id)
                .then(data => {
                    //console.log('onAfterRowDeleted', data);
                });
        });
        this.ui.attachEvent('onRowSelect', (id) => {
            let selectedSameRow = this.previousId === id;
            if (!selectedSameRow) {
                this.getService(MODEL_SERVICE).setData(
                    this.getService(LOCAL_SERVICE_NAME).getRowData(id)
                );
                window.history.replaceState({ type: LOCAL_NAME.toLocaleUpperCase(), id: id }, `${LOCAL_NAME}: ${id}`, `#${LOCAL_NAME.toLocaleLowerCase()}/${id}`);
                this.previousId = id;
            }
        });

        //SERVICES
        this.addService(LOCAL_SERVICE_NAME, {
            addRow: (values) => {
                let tempId = this.ui.uid();
                this.ui.addRow(tempId, "");
                this.ui.selectRowById(tempId, true, true, true);
            },
            getRowData: (id) => {
                let data = this.ui.getRowData(id);
                data.id = id;
                return data;
            },
            deleteSelectedRow: () => {
                let id = this.ui.getSelectedRowId();
                let index = this.ui.getRowIndex(id);
                this.ui.deleteRow(id);
                if (index < this.ui.getRowsNum())
                    this.ui.selectRow(index, true);
                else
                    this.ui.selectRow(index - 1, true);
            },
            getAllRowIds: () => {
                return this.ui.getAllRowIds(',').split(',');
            },
            selectFirstRow: () => {
                this.ui.selectRow(0, true);
            },
            selectRowById: (id) => {
                this.ui.selectRowById(id, true, true, true);
            },
        });
    }
    _getDetailView() {
        let url = window.location.href.match(URL_MATCH);
        let rowId = url && url.length === 3 ? url[2] : false;
        return rowId;
    }

    _isValidId(id) {
        let ids = this.getService(LOCAL_SERVICE_NAME).getAllRowIds();
        let search = "" + id;
        return ids.indexOf(search) >= 0;
    }
    _load(callback) {
        this.getService(MODEL_SERVICE).getData().then(
            data => {
                this.ui.parse(data, 'json');
                let rowId = this._getDetailView();
                let isValidId = this._isValidId(rowId);
                if (rowId !== '' && rowId !== false && !isValidId) {
                    dhtmlx.alert(`${rowId.replace(/[^a-z0-9]/gi, '')} is not found`);
                    route(MY_URL);
                } else {
                    if (isValidId) {
                        this.getService(LOCAL_SERVICE_NAME).selectRowById(rowId);
                    } else {
                        this.getService(LOCAL_SERVICE_NAME).selectFirstRow();
                    }
                    callback();
                }
            }
        );
    }
}
