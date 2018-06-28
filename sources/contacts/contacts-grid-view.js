import { DHXView } from 'dhx-optimus';
import route from 'riot-route';

const contactsUrl = 'codebase/contacts.json';

export class ContactsGridView extends DHXView {
  render() {
    this.ui = this.root.attachGrid();
    this.ui.enableEditEvents(true, false, true);
    this.ui.enableValidation(true);
    this.ui.setColValidators(",NotEmpty,ValidDate,,ValidEmail,ValidNumeric,");
    this.ui.init();
    this._load();

    this.ui.confirm = {
      show: (type, title, message, cb) => {
        dhtmlx.message({
          type: type,
          title: title + this.boxCounter,
          text: message,
          callback: function (r) { cb(r); }
        });
        return true;
      }
    }

    this.ui.attachEvent('onValidationError', (row, col, value) => {
      switch (col) {
        case 1:
          this.ui.confirm.show('alert-warning', 'Wrong field Value', `Value in ${row},${col} should not be empty<br>Press enter`,
            (r) => { this.ui.selectCell(row - 1, col, true, true, true); }
          );
          return true;
          break;
        case 2:
          let parts = value.split('/');
          if (parts.length !== 3) {
            this.ui.confirm.show('alert-warning', 'Wrong field Value', `Value in ${row},${col} should not be dd/mm/yyyy<br>Press enter`,
              (r) => { this.ui.selectCell(row - 1, col, true, true, true); }
            );
            return true;
          }
          let dt = new Date(parts[2], parts[1] - 1, parts[0], 0, 0, 0);
          if (dt === 'Invalid Date') return true;
          if (!(dt === 'Invalid Date') && dt.getDate() === parseInt(parts[0]) && (dt.getMonth() + 1) === parseInt(parts[1]) && dt.getFullYear() === parseInt(parts[2])) {
            return false;
          } else {
            this.ui.confirm.show('alert-warning', 'Wrong field Value', `Value in ${row},${col} should not be dd/mm/yyyy<br>${value} is not a date<br>Press enter`,
              (r) => { this.ui.selectCell(row - 1, col, true, true, true); }
            );
            return true;
          }
          break;
      }
    });
    this.ui.cellChangeEvent = this.ui.attachEvent('onCellChanged', (row, col, value) => {
      console.log('ContactsGridView:onCellChanged', row, col, value);
    });

    this.addService('ContactsGridService', {
      selectFirstRow: () => {
        this.ui.selectRow(0, true);
      },
      selectRow: (id) => {
        this.ui.selectRow(id);
      },
      setCellValue: (id, fieldName, value) => {
        let fieldIndex = this.ui.getColIndexById(fieldName);
        this.ui.cells(id, fieldIndex).setValue(value);
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
      },
      getPositions: () => {
        return [
          "Accountant",
          "Back-end Developer",
          "Business Analyst",
          "Chief Engineer",
          "Chief Executive Officer (CEO)",
          "Chief Information Officer (CIO)",
          "Chief Information Security Officer (CISO)",
          "Chief Privacy Officer (CPO)",
          "Front-end Developer",
          "Full-stack Web Developer",
          "HR Manager",
          "Marketing Specialist",
          "Product Manager",
          "Project Manager",
          "QA Engineer",
          "Sales Manager",
          "Web Developer"
        ];
      }
    });

    this._populateCombo(this.ui.getCombo(3));

    this.ui.attachEvent('onRowSelect', (id) => {
      this.getService('ContactsFormService').load(
        this.getService('ContactsGridService').getRowData(id)
      );
      window.history.replaceState({ type: 'contact', id: id }, `Contact: ${id}`, `#contacts/${id}`);
    });
  }

  _populateCombo(combo) {
    let positions = this.getService('ContactsGridService').getPositions();

    for (let index in positions) {
      combo.put(index, positions[index]);
    }
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
