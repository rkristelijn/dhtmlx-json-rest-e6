import { DHXView } from 'dhx-optimus';

export class ContactsDetailView extends DHXView {
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
    //this.ui.setSizes = this.centerForm;
    this.addService('ContactsFormService', {
      load: (data) => {
        let src = data.photo.match(/src=\"([^\"]*)\"/)[1];
        this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/contacts/big/${src.match(/[^\/]*$/)[0]}" border="0" class="form_photo">`;
        this.ui.setFormData(data);
      }
    });
  }

  centerForm() {
    this.ui.cont.parentNode.style.overflow = "auto";
    this.ui.cont.style.height = "auto";
    this.ui.cont.style.overflow = "hidden";
    this.ui.cont.style.marginLeft = "0px";
    this.ui.cont.style.marginBottom = "20px";
    this.ui.cont.style.width = "100%";
    let w1 = this.ui.cont.offsetWidth;
    this.ui.cont.style.width = "auto";
    this.ui.cont.style.marginLeft = Math.max(0, Math.round(w1 / 2 - this.ui.cont.offsetWidth / 2)) + "px";
    t = null;
  }
}
