import { DHXView } from 'dhx-optimus';
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
      getRowData: (id) => {
        let data = this.ui.getRowData(id);
        data.id = id;
        return data;
      }
    });
  }

  _load() {
    this.ui.load(contactsUrl, () => {
      this.getService('ContactsGridService').selectFirstRow();
    }, 'json');
  }
}
