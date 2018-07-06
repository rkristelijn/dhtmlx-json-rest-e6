import { DHXView } from 'dhx-optimus';
import route from 'riot-route';

const contactsUrl = 'api/contacts';

export class ContactsGridView extends DHXView {
  render() {
    this.ui = this.root.attachGrid();
    this.ui.enableEditEvents(true, false, true);
    this.ui.enableValidation(true);
    this.ui.setColValidators(",NotEmpty,ValidDate,,ValidEmail,ValidNumeric,");
    this.ui.init();
    this._load(() => {
      this.ui.editCellEvent = this.ui.attachEvent('onEditCell', this.ui.editCellHandler);
    });

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
    this.ui.attachEvent('onRowAdded', (id) => {
      fetch(`${contactsUrl}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then(response => response.json())
        .then(response => {
          this.ui.callEvent('onAfterRowAdded', [id, response._id, response]);
        })
    });

    this.ui.editCellHandler = (stage, rowId, colIndex, newValue, oldValue) => {
      const beforeStart = 0;
      const editorOpened = 1;
      const editorClosed = 2;

      if (stage === editorClosed & newValue !== oldValue) {
        let fieldName = this.ui.getColumnId(colIndex);
        let request = `{"${fieldName}":"${newValue}"}`;
        fetch(`${contactsUrl}/${rowId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: request
        })
          .then(response => response.json())
          .then(response => {
            this.getService('ContactsFormService').setItemValue(fieldName, response[fieldName]);
          })

        return true;
      }
    }
    this.attachEvent('ToolbarClick', (id) => {
      this.getService('ContactsGridService').addRow();
    });
    this.ui.attachEvent('onAfterRowAdded', (tempId, serverId, values) => {
      this.ui.changeRowId(tempId, serverId);
      this.ui.cells(serverId, 0).setValue(values.photo);
      this.ui.cells(serverId, 1).setValue(values.name);
      this.ui.cells(serverId, 2).setValue(values.dob);
      this.ui.cells(serverId, 3).setValue(values.pos);

      window.history.replaceState({ type: 'contact', serverId: serverId }, `Contact: ${serverId}`, `#contacts/${serverId}`);
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
        let oldValue = this.ui.cells(id, fieldIndex).getValue();
        this.ui.cells(id, fieldIndex).setValue(value);
        this.ui.callEvent('onEditCell', [2, id, fieldIndex, value, oldValue]);
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
      },
      addRow: (values) => {
        let tempId = this.ui.uid();
        this.ui.addRow(tempId, "");
        this.ui.selectRowById(tempId, true, true, true);
      }
    });

    this._populateCombo(this.ui.getCombo(3));
    this.previousId = null;

    this.ui.attachEvent('onRowSelect', (id) => {
      let selectedSameRow = this.previousId === id;
      if (!selectedSameRow) {
        this.getService('ContactsFormService').load(
          this.getService('ContactsGridService').getRowData(id)
        );
        window.history.replaceState({ type: 'contact', id: id }, `Contact: ${id}`, `#contacts/${id}`);
        this.previousId = id;
      }
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

  _load(callback) {
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
        callback();
      }
    }, 'json');
  }
}
