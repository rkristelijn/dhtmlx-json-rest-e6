import { DHXView } from 'dhx-optimus';

export class ProjectsSalesView extends DHXView {
  render() {
    this.ui = this.root.attachForm([
      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 160 },
      { type: "container", name: "photo", label: "", inputWidth: 160, inputHeight: 160, offsetTop: 20, offsetLeft: 65 },
      { type: "input", name: "name", label: "Name", offsetTop: 20 },
      { type: "input", name: "email", label: "E-mail" },
      { type: "input", name: "phone", label: "Phone" },
      { type: "input", name: "company", label: "Company" },
      { type: "input", name: "info", label: "Additional info" },
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true }
    ]);
    this.addService('ContactsFormService', {
      load: (data) => {
        let src = data.photo.match(/src=\"([^\"]*)\"/)[1];
        this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/contacts/big/${src.match(/[^\/]*$/)[0]}" border="0" class="form_photo">`;
        this.ui.setFormData(data);
      }
    });
  }
}
