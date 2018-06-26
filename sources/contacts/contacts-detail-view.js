import { DHXView } from 'dhx-optimus';

export class ContactsDetailView extends DHXView {
  render() {
    this.ui = this.root.attachForm([
      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 160 },
      { type: "container", name: "photo", label: "", inputWidth: 160, inputHeight: 160, offsetTop: 20, offsetLeft: 65 },
      { type: "input", name: "name", label: "Name", offsetTop: 20 },
      { type: "input", name: "dob-json", label:"JSON"},
      { type: "input", name: "email", label: "E-mail" },
      { type: "input", name: "phone", label: "Phone" },
      { type: "input", name: "company", label: "Company" },
      //{ type: "calendar", name: "dob", label: "Date of Birth", dateFormat:"%m-%d-%Y"},
      { type: "calendar", name: "dob", label: "Date of Birth"},
      { type: "input", name: "info", label: "Additional info" },
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true }
    ]);
    this.addService('ContactsFormService', {
      load: (data) => {
        let src = data.photo.match(/src=\"([^\"]*)\"/)[1];
        let dob = new Date(data.dob);
        data.dob = this._getDateString(dob);
        this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/contacts/big/${src.match(/[^\/]*$/)[0]}" border="0" class="form_photo">`;
        this.ui.setFormData(data);
        this.ui.setItemValue('dob-json', dob.toJSON());
      }
    });
  }

  //The default date format in dhtmlxCalendar is '%Y-%m-%d'.
  _getDateString(date) {
    return date.getFullYear() + '-'
    + ('0' + (date.getMonth()+1)).slice(-2)  + '-'
    + ('0' + date.getDate()).slice(-2);
  }
}
