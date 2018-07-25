import { DHXView } from 'dhx-optimus';

const MODEL_SERVICE = 'AgileBoardModelService';

export class AgileBoardDetailView extends DHXView {
  render() {
    this.ui = this.root.attachForm([

      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 270 },
      { type: "input", name: "name", label: "Story", offsetTop: 20 },
      { type: "combo", name: "status", label: "Status" },
      { type: "calendar", name: "due", label: "Due", dateFormat: "%d/%m/%Y" },
      { type: "input", name: "desc", label: "Description", rows: 20 },
      { type: "input", name: "created", label: "Created", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true, className: 'input-read-only' }
    ]);

    this.attachEvent('setData', (data) => {
      this.ui.setFormData(data);
    });
    this.attachEvent('setFieldValue', (id, field, value) => {
      switch (field) {
        // case 'pos':
        //   if (!isNaN(parseInt(value))) this.ui.getCombo('pos').selectOption(value);
        //   break;
        default:
          this.ui.setItemValue(field, value);
          break;
      }
    });
    this.ui.attachEvent('onChange', (field, value) => {
      let id = this.ui.getFormData().id;
      this.getService(MODEL_SERVICE).setFieldValue(id, field, value);
    });
  }
}
