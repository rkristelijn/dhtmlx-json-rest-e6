import { DHXView } from 'dhx-optimus';
import route from 'riot-route';

const contactsUrl = 'codebase/contacts.json';

export class ContactsGridView extends DHXView {
  render() {
    this.ui = this.root.attachGrid();
    this.ui.init();
    this._load();

    this.ui.attachEvent('onRowSelect', (id) => {
      this.getService('ContactsFormService').load(
        this.getService('ContactsGridService').getRowData(id)
      );
    })

    this.addService('ContactsGridService', {
      selectFirstRow: () => {
        this.ui.selectRow(0, true);
      },
      selectRow: (id) => {
        this.ui.selectRow(id);
      },
      selectRowById: (id) => {
        this.ui.selectRowById(id, true, true, true);
      },
      getRowData: (id) => {
        let data = this.ui.getRowData(id);
        data.id = id;
        return data;
      },
      getAllRowIds: () => {
        return this.ui.getAllRowIds(',').split(',');
      }
    });
  }

  _getDetailView() {
    let url = window.location.href.match(/#(.*contacts\/)(.*)/);
    let rowId = url && url.length === 3 ? url[2] : false;
    return rowId;
  }

  _isValidId(id) {
    let ids = this.getService('ContactsGridService').getAllRowIds();
    let search = "" + id;
    return ids.indexOf(search) >= 0;
  }

  _load() {
    this.ui.load(contactsUrl, () => {
      let rowId = this._getDetailView();
      let isValidId = this._isValidId(rowId);
      if (rowId !== '' && rowId !== false && !isValidId) {
        dhtmlx.alert(`${rowId.replace(/[^a-z0-9]/gi, '')} is not found`);
        route('/contacts');
      } else {
        if (isValidId) {
          this.getService('ContactsGridService').selectRowById(rowId);
        } else {
          this.getService('ContactsGridService').selectFirstRow();
        }
      }
    }, 'json');
  }
}
