import { DHXView } from "dhx-optimus";

let serviceName = 'ContactsModelService';
let controllerName = 'ContactsControllerService';
export class ContactViewModel extends DHXView {
    constructor(parent) {
        super(parent);
        this.data = {};
        this.controller = this.getService(controllerName);
        this.debug = false;
        this.addService(serviceName, {
            setFieldValue: (id, field, value) => {
                if (parent.callEvent('preSetFieldValue', [field, value])) {
                    this.data[field] = value;
                    return this.getService(controllerName).PUT(
                        this.data.id, {
                            [field]:`${value}`
                        }
                    ).then((data) => {
                        parent.callEvent('setFieldValue', [data._id, field, value]);
                        return (data);
                    });
                } else {
                    if (this.debug) console.log(serviceName, 'cancelled setFieldValue', field, value);
                }
            },
            getFieldValue: (field) => {
                return (this.data[field]);
            },
            setData: (data) => {
                this.data = data;
                parent.callEvent('setData', [data]);
            },
            getData: () => {
                return this.getService(controllerName).GET()
                    .then(data => {
                        parent.callEvent('getData', [data]);
                        return (data);
                    });
            },
            create: (data) => {
                return this.getService(controllerName).POST(data)
                    .then(data => {
                        parent.callEvent('create', [data]);
                        return (data);
                    });
            },
            delete: (id) => {
                return this.getService(controllerName).DELETE(id)
                    .then(data => {
                        parent.callEvent('delete', [data]);
                        return (data);
                    });
            }
        });
        this.attachEvent('preSetFieldValue', (field, value) => {
            let oldVal = this.getService(serviceName).getFieldValue(field);
            if (this.debug) console.log(serviceName, 'preSetFieldValue', field, `from:'${oldVal}'`, `to:'${value}'`);
            return true;
        });
        this.attachEvent('setFieldValue', (id, field, value) => {
            if (this.debug) console.log(serviceName, 'setFieldValue', id, field, value);
        });
        this.attachEvent('setData', (data) => {
            if (this.debug) console.log(serviceName, 'setData', data);
        });
        this.attachEvent('getData', (data) => {
            if (this.debug) console.log(serviceName, 'getData', data);
        });
        this.attachEvent('create', (data) => {
            if (this.debug) console.log(serviceName, 'create', data);
        });
    }

    render() {
        //
    }
}