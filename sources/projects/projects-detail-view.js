import { DHXView } from 'dhx-optimus';

export class ProjectsDetailView extends DHXView {
  render() {
    this.ui = this.root.attachForm([
      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 160 },
      { type: "container", name: "photo", label: "", inputWidth: 160, inputHeight: 160, offsetTop: 20, offsetLeft: 65 },
      { type: "calendar", name: "due", label: "Due date", offsetTop: 20, dateFormat: "%d/%m/%Y" },
      { type: "input", name: "project", label: "Project" },
      { type: "combo", name: "status", label: "Status", options: this._generateOptions() },
      {
        type: "combo", name: "assign", label: "Assigned to", comboType: 'checkbox', options: [
          { value: 'Steve Anderson', text: 'Steve Anderson' },
          { value: 'Margaret Black', text: 'Margaret Black' },
          { value: 'Jake Peterson', text: 'Jake Peterson' },
          { value: 'Bill Jackson', text: 'Bill Jackson' },
          { value: 'John Woken', text: 'John Woken' },
          { value: 'Jennifer Miles', text: 'Jennifer Miles' },
          { value: 'Cortny Barrens', text: 'Cortny Barrens' },
          { value: 'Edward Eden', text: 'Edward Eden' },
          { value: 'Andrew Scott', text: 'Andrew Scott' },
          { value: 'Jane Wilson', text: 'Jane Wilson' },
          { value: 'Alan Robbinson', text: 'Alan Robbinson' },
          { value: 'William Parson', text: 'William Parson' },
          { value: 'Charlotte Wolks', text: 'Charlotte Wolks' },
          { value: 'Pamela Worner', text: 'Pamela Worner' },
          { value: 'Ralf Ross', text: 'Ralf Ross' },
          { value: 'Dan Witley', text: 'Dan Witley' },
          { value: 'Anna Harrison', text: 'Anna Harrison' }
        ]
      },
      //{ type: "combo", name: 'assign', label: 'Assigned to', comboType: 'checkbox', options: this._getAllAssignees() },
      { type: "input", name: "info", label: "Additional info<br>(HTML Allowed)", rows: 3 },
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true, className: 'input-read-only' }
    ]);

    //this.assignees = this._getAllAssignees();

    this.ui.attachEvent('onChange', (fieldName, value) => {
      // console.log('onChange', fieldName, value);
      let rowId = this.ui.getFormData().id;
      switch (fieldName) {
        case "assign":
          break;
        default:
          //newValue = value;
          this.getService('ProjectsGridService').setCellValue(rowId, fieldName, newValue);
      }
    });

    this.combo = this.ui.getCombo('assign');

    this.combo.attachEvent('onCheck', (value, state) => {
      let rowId = this.ui.getFormData().id;
      //console.log('onCheck', value, state, rowId);
      let newValue = this.combo.getChecked().join(', ');
      this.getService('ProjectsGridService').setCellValue(rowId, 'assign', newValue);
    });

    this.addService('ProjectsFormService', {
      load: (data) => {
        this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/projects/project.png" border="0" class="form_photo">`;
        let assigneesCombo = this.ui.getCombo('assign');
        let checkedAssignees = data.assign.split(', ');

        assigneesCombo.forEachOption(function (item) {
          let index = assigneesCombo.getIndexByValue(item.value);
          if (checkedAssignees.indexOf(item.value) == -1) {
            assigneesCombo.setChecked(index, false);
          } else {
            assigneesCombo.setChecked(index, true);

          }
        });

        // for (let item of checkedAssignees) {
        //   let index = assigneesCombo.getIndexByValue(item);
        //   assigneesCombo.setChecked(index, true);
        // }

        this.ui.setFormData(data);
      },
      setItemValue: (name, value) => {
        switch (name) {
          case 'status':
            this.ui.getCombo('status').selectOption(value);
            break;
          default:
            this.ui.setItemValue(name, value);
            break;
        }
      }
    });
  }

  _generateOptions() {
    let options = [];
    let positions = this.getService('ProjectsGridService').getStatusList();

    for (let position of positions) {
      options.push({ text: position, value: position });
    }
    return options;
  }

  async _getAllAssignees() {
    let assignees = await (await fetch('./codebase/contacts.json')
      .then(response => response.json())
      .then((data) => {
        let assignees = [];
        console.log('resolving');
        for (let contact of data.rows) {
          console.log(contact.data[1]);
          assignees.push({ text: contact.data[1], value: contact.data[1], checked: false });
        }
        assignees.sort();
        console.log('returning 1', assignees);
        return assignees;
      }));
    console.log('returning 2', assignees);
    return assignees;
  }
}
