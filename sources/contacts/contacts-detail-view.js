import { DHXView } from 'dhx-optimus';

export class ContactsDetailView extends DHXView {
  render() {
    this.ui = this.root.attachForm([
      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 160 },
      { type: "container", name: "photo", label: "", inputWidth: 160, inputHeight: 160, offsetTop: 20, offsetLeft: 65 },
      { type: "input", name: "name", label: "Name", offsetTop: 20 },
      { type: "container", name: "maillink" },
      { type: "input", name: "email", label: "E-mail", validate: "ValidEmail" },
      { type: "input", name: "phone", label: "Phone" },
      { type: "input", name: "company", label: "Company" },
      { type: "combo", name: "pos", label: "Position", options: this._generateOptions() },
      { type: "calendar", name: "dob", label: "Date of Birth", dateFormat: "%d/%m/%Y" },
      { type: "input", name: "info", label: "Additional info <br>(No HTML Allowed)", rows: 3 },
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true, className: 'input-read-only' }
    ]);

    this.attachEvent('setData', (data) => {
      console.log('form', data);
      let src = data.photo.match(/src=\"([^\"]*)\"/)[1];
      this.ui.getContainer('maillink').innerHTML = `<a href="mailto:${data.email}">Send Mail</a>`;
      this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/contacts/big/${src.match(/[^\/]*$/)[0]}" border="0" class="form_photo">`;
      this.ui.setFormData(data);
    });
    this.attachEvent('setFieldValue', (id, field, value) => {
      console.log('form', id, field, value);
      switch (field) {
        case 'pos':
          if (!isNaN(parseInt(value))) this.ui.getCombo('pos').selectOption(value);
          break;
        default:
          this.ui.setItemValue(field, value);
          break;
      }

    })

    // this.ui.attachEvent('onValidationError', (id, index, value) => {
    //   console.log('ContactsDetailView:ValidationError', id, index, value);
    //   return true;
    // });
    this.ui.attachEvent('onChange', (field, value) => {
      let id = this.ui.getFormData().id;
      this.getService('ContactsModelService').setFieldValue(id, field, value);
      //this.getService('ContactsGridService').setCellValue(rowId, fieldName, value);
    });

    // this.addService('ContactsFormService', {
    //   // load: (data) => {
    //   //   let src = data.photo.match(/src=\"([^\"]*)\"/)[1];
    //   //   this.ui.getContainer('maillink').innerHTML = `<a href="mailto:${data.email}">Send Mail</a>`;
    //   //   this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/contacts/big/${src.match(/[^\/]*$/)[0]}" border="0" class="form_photo">`;
    //   //   this.ui.setFormData(data);
    //   // },
    //   setItemValue: (name, value) => {
    //     // switch (name) {
    //     //   case 'pos':
    //     //     if (!isNaN(parseInt(value))) this.ui.getCombo('pos').selectOption(value);
    //     //     break;
    //     //   default:
    //     //     this.ui.setItemValue(name, value);
    //     //     break;
    //     // }
    //   }
    // });
  }

  _generateOptions() {
    let options = [];
    let positions = this.getService('ContactsGridService').getPositions();

    for (let position of positions) {
      options.push({ text: position, value: position });
    }
    return options;
  }
}
