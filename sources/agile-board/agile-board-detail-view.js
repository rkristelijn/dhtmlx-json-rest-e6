import { DHXView } from 'dhx-optimus';

const MODEL_SERVICE = 'AgileBoardModelService';

export class AgileBoardDetailView extends DHXView {
    render() {
        this.ui = this.root.attachForm([
            { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 270 },
            { type: "input", name: "name", label: "Story", offsetTop: 20 },
            { type: "combo", name: "status", label: "Status", options: this._getCombo('status') },
            { type: "calendar", name: "due", label: "Due", dateFormat: "%d/%m/%Y" },
            { type: "input", name: "desc", label: "Description", rows: 20 },
            { type: "input", name: "created", label: "Created", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "updated", label: "Updated", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "version", label: "Version", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true, className: 'input-read-only' }
        ]);
        this.ui.statusList = [];

        this.attachEvent('setData', (data) => {
            if (this.ui.statusList.length === 0) {
                this.ui.statusList = this._getCombo('status');
                this.ui.getCombo('status').addOption(this.ui.statusList);
            }
            this.ui.setFormData(data);
        });
        this.attachEvent('setFieldValue', (id, field, value) => {
            switch (field) {
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

    _getCombo(name) {
        let options = [];
        let customerOptions = this.getService(MODEL_SERVICE).getPickList(name);
        if (customerOptions) {
            for (let option of customerOptions) {
                options.push([option.id, option.value, "", null, true]);
            }
        }
        return options;
    }
}
