import { DHXView } from 'dhx-optimus';
import { combo } from 'dhx-optimus';
import route from 'riot-route';

const projectsUrl = 'codebase/projects.json';

export class ProjectsGridView extends DHXView {
  render() {
    // from script
    //let myCombo = new this.root.combo("combo_zone_script", "combo_script", 200, "checkbox"); // make sure you set 4th param to "checkbox"
    //let myCombo = new dhtmlx.dhtmlXCombo("combo_zone", "combo", 230);
    //let combo = this.root.dh.dhtmlxCombo("");

    this.ui = this.root.attachGrid();
    this.ui.enableEditEvents(true, false, true);
    this.ui.init();
    this._load(() => {
      this.ui.cellChangeEvent = this.ui.attachEvent('onCellChanged', this.ui.cellChangedHandler);
    });

    this.ui.attachEvent('onRowSelect', (id) => {
      let rowId = this.getService('ProjectsGridService').getRowData(id);
      this.getService('ProjectsFormService').load(rowId);
      this.getService('ProjectsSalesGraphService').load(rowId.id);
      this.getService('ProjectsSalesGridService').load(rowId.id);
      window.history.replaceState({ type: 'projects', id: id }, `Project: ${id}`, `#projects/${id}`);
    });

    this.ui.cellChangedHandler = (row, col, value) => {
      let name = this.ui.getColumnId(col);
      this.getService('ProjectsFormService').setItemValue(name, value);
    };

    this.addService('ProjectsGridService', {
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
      },
      getStatusList: () => {
        return [
          'Not started',
          'In progress',
          'Waiting',
          'Closed'
        ];
      },
      setCellValue: (id, fieldName, value) => {
        let fieldIndex = this.ui.getColIndexById(fieldName);
        this.ui.detachEvent(this.ui.cellChangeEvent);
        this.ui.cells(id, fieldIndex).setValue(value);
        this.ui.cellChangeEvent = this.ui.attachEvent('onCellChanged', this.ui.cellChangedHandler);
      }
    });

    this._populateCombo(this.ui.getCombo(2));
    //this._populateComboAssignees(this.ui.getCombo(3));
  }

  // _populateComboAssignees(combo) {
  //   // combo.setTemplate({
  //   //   input: "#capital#, #country#",
  //   //   columns: [
  //   //     {header: "&nbsp;",  width:  41, 		option: "#checkbox#"}, // column for checkboxes
  //   //     {header: "&nbsp;",  width:  40, css: "flag",    option: "<img src='#flag#' border='0' style='margin-top: 8px; margin-left: 2px;'>"},
  //   //     {header: "Capital", width:  80, css: "capital", option: "#capital#"},
  //   //     {header: "Country", width: 110, css: "country", option: "#country#"},
  //   //     {header: "Proverb", width: 250, css: "proverb", option: "#proverb#"}
  //   //   ]
  //   // });

  //   this._getAllAssignees().then((assignees) => {
  //     for (let index in assignees) {
  //       combo.put(index, assignees[index], true);
  //       //combo.setChecked(index, true);
  //     }
  //   })
  // }

  _getDetailView() {
    let url = window.location.href.match(/#(.*projects\/)(.*)/);
    let rowId = url && url.length === 3 ? url[2] : false;
    return rowId;
  }

  _isValidId(id) {
    let ids = this.getService('ProjectsGridService').getAllRowIds();
    let search = "" + id;
    return ids.indexOf(search) >= 0;
  }

  _populateCombo(combo) {
    let positions = this.getService('ProjectsGridService').getStatusList();

    for (let index in positions) {
      combo.put(index, positions[index]);
    }
  }
  _load(callback) {
    this.ui.load(projectsUrl, () => {
      let rowId = this._getDetailView();
      let isValidId = this._isValidId(rowId);
      if (rowId !== '' && rowId !== false && !isValidId) {
        dhtmlx.alert(`${rowId.replace(/[^a-z0-9]/gi, '')} is not found`);
        route('/projects');
      } else {
        if (isValidId) {
          this.getService('ProjectsGridService').selectRowById(rowId);
        } else {
          this.getService('ProjectsGridService').selectFirstRow();
        }
        callback();
      }
    }, 'json');
  }

  // _getAllAssignees() {
  //   let assignees = [];
  //   return fetch('./codebase/contacts.json')
  //     .then(response => response.json())
  //     .then((data) => {
  //       for(let contact of data.rows) {
  //         assignees.push(contact.data[1])
  //       }
  //       assignees.sort();
  //       return assignees;
  //     })
  // }
}
