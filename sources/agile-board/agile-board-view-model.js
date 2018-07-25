import { DHXView } from "dhx-optimus";

const SERVICE_NAME = 'AgileBoardModelService';
const CONTROLLER_NAME = 'AgileBoardControllerService';
const DEBUG = true;

let pickLists = {};

export class ViewModel extends DHXView {
    constructor(parent) {
        super(parent);
        this.data = {};
        
        this.addService(SERVICE_NAME, {
            setFieldValue: (id, field, value) => {
                if (parent.callEvent('preSetFieldValue', [id, field, value])) {
                    this.data[field] = value;
                    return this.getService(CONTROLLER_NAME).PUT(
                        this.data.id, {
                            [field]: `${value}`
                        }
                    ).then((data) => {
                        parent.callEvent('setFieldValue', [data._id, field, value]);
                        parent.callEvent('setFieldValue', [data._id, 'updated', data.updated]);
                        parent.callEvent('setFieldValue', [data._id, 'version', data.num]);
                        return (data);
                    });
                } else {
                    if (DEBUG) console.log(SERVICE_NAME, 'cancelled setFieldValue', field, value);
                }
            },
            getFieldValue: (field) => {
                return (this.data[field]);
            },
            setData: (data) => {
                this.data = data;
                parent.callEvent('setData', [data]);
            },
            getPickList(name) {
                return pickLists[name];
            },
            getData: () => {
                return this.getService(CONTROLLER_NAME).GET()
                    .then(data => {
                        parent.callEvent('getData', [data]);
                        this.populatePickLists(data);
                        return (data);
                    });
            },
            create: (data) => {
                return this.getService(CONTROLLER_NAME).POST(data)
                    .then(data => {
                        parent.callEvent('create', [data]);
                        return (data);
                    });
            },
            delete: (id) => {
                return this.getService(CONTROLLER_NAME).DELETE(id)
                    .then(data => {
                        parent.callEvent('delete', [data]);
                        return (data);
                    });
            }
        });
        this.attachEvent('preSetFieldValue', (field, value) => {
            let oldVal = this.getService(SERVICE_NAME).getFieldValue(field);
            if (DEBUG) console.log(SERVICE_NAME, 'preSetFieldValue', field, `from:'${oldVal}'`, `to:'${value}'`);
            return true;
        });
        this.attachEvent('setFieldValue', (id, field, value) => {
            if (DEBUG) console.log(SERVICE_NAME, 'setFieldValue', id, field, value);
        });
        this.attachEvent('setData', (data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'setData', data);
        });
        this.attachEvent('getData', (data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'getData', data);
        });
        this.attachEvent('create', (data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'create', data);
        });
    }

    render() {}
    populatePickLists(data) {
        for (let head of data.head) {
            if (head.options) {
                pickLists[head.id] = head.options;
            }
        }
    }
}