import { DHXView } from 'dhx-optimus';

export class ProjectsDetailView extends DHXView {
  render() {
    this.ui = this.root.attachForm([
      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 160 },
      { type: "container", name: "photo", label: "", inputWidth: 160, inputHeight: 160, offsetTop: 20, offsetLeft: 65 },
      { type: "calendar", name: "due", label: "Due date", offsetTop: 20, dateFormat: "%d/%m/%Y"},
      { type: "input", name: "project", label: "Project" },
      { type: "combo", name: "status", label: "Status", options: this._generateOptions()},
      { type: "input", name: "assign", label: "Assigned to" },
      { type: "input", name: "info", label: "Additional info<br>(HTML Allowed)", rows:3},
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true, className: 'input-read-only' }
    ]);
    this.addService('ProjectsFormService', {
      load: (data) => {
        this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/projects/project.png" border="0" class="form_photo">`;
        this.ui.setFormData(data);
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
}
