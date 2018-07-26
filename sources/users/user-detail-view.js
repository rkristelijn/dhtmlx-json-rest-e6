import { DHXView } from 'dhx-optimus';

const MODEL_SERVICE = 'UsersModelService';

export class UsersDetailView extends DHXView {
    render() {
        this.ui = this.root.attachForm([
            { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 270 },
            { type: "input", name: "username", label: "Username", offsetTop: 20 },
            { type: "input", name: "password", label: "Password" },
            { type: "combo", name: "roles", label: "Roles", comboType: 'checkbox'},
            { type: "calendar", name: "endDate", label: "End Date", dateFormat: "%d/%m/%Y" },
            { type: "input", name: "info", label: "Information", rows: 20 },
            { type: "input", name: "created", label: "Created", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "updated", label: "Updated", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "updatedBy", label: "Updated By", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "createdBy", label: "Created By", attributes: ["readonly"], readonly: true, className: 'input-read-only' },
            { type: "input", name: "id", label: "Id", attributes: ["readonly"], readonly: true, className: 'input-read-only' }
        ]);
        this.ui.statusList = [];

        this.attachEvent('setData', (data) => {
            if (this.ui.statusList.length === 0) {
                this.ui.statusList = this._getCombo('roles');
                this.ui.getCombo('roles').addOption(this.ui.statusList);
            }
            //checked combo
            let combo = this.ui.getCombo('roles');
            let values = data.roles.split(', ');
            combo.forEachOption(function (item) {
                let index = combo.getIndexByValue(item.value);
                if (values.indexOf(item.value) == -1) {
                    combo.setChecked(index, false);
                } else {
                    combo.setChecked(index, true);
                }
            });
            this.ui.setFormData(data);
        });
        this.attachEvent('setFieldValue', (id, field, value) => {
            switch (field) {
                case 'roles':
                    break;
                default:
                    this.ui.setItemValue(field, value);
                    break;
            }
        });
        this.ui.attachEvent('onChange', (field, value) => {
            let id = this.ui.getFormData().id;
            this.getService(MODEL_SERVICE).setFieldValue(id, field, value);
        });

        this.combo = this.ui.getCombo('roles');

        this.combo.attachEvent('onCheck', (value, state) => {
            let rowId = this.ui.getFormData().id;
            let newValue = this.combo.getChecked().join(', ');
            this.getService(MODEL_SERVICE).setFieldValue(rowId, 'roles', newValue);
        });
    }

    _getCombo(name) {
        let options = [];
        let customerOptions = this.getService(MODEL_SERVICE).getPickList(name);
        console.log(customerOptions);
        if (customerOptions) {
            for (let option of customerOptions) {
                options.push([option.id, option.value, "", null, true]);
            }
        }
        return options;
    }
}
