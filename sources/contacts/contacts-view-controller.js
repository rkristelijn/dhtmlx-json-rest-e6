import { DHXView } from "dhx-optimus";

let serviceName = 'ContactsControllerService';
let url = 'api/contacts';
export class ContactViewController extends DHXView {
    constructor(parent) {
        super(parent);
        this.debug = true;
        this.addService(serviceName, {
            GET: () => {
                if (parent.callEvent('preGET')) {
                    return fetch(`${url}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then((response) => {
                            parent.callEvent('GET', [response]);
                            return (response);
                        })
                }
            },
            POST: (data) => {
                if (parent.callEvent('prePOST', [data])) {
                    fetch(`${url}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: data
                    })
                        .then(response => response.json())
                        .then(response => {
                            parent.callEvent('POST', [response]);
                        });
                }
            },
            PUT: (id, data) => {
                if (parent.callEvent('prePUT', [data])) {
                    console.log('sending...', data);
                    return fetch(`${url}/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'PUT',
                        body: data
                    })
                        .then(response => response.json())
                        .then(response => {
                            parent.callEvent('PUT', [id, response]);
                            return (response);
                        });
                }
            },
            DELETE: (id) => {
                if (parent.callEvent('preDELETE', [data])) {
                    fetch(`${url}/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'DELETE'
                    })
                        .then(response => {
                            parent.callEvent('DELETE', [id, response]);
                        });
                }
            }
        });
        this.attachEvent('preGET', () => {
            if (this.debug) console.log(serviceName, 'preGET');
            return true;
        });
        this.attachEvent('prePOST', (data) => {
            if (this.debug) console.log(serviceName, 'prePOST', data);
            return true;
        });
        this.attachEvent('prePUT', (id, data) => {
            if (this.debug) console.log(serviceName, 'prePUT', id, data);
            return true;
        });
        this.attachEvent('preDELETE', (id) => {
            if (this.debug) console.log(serviceName, 'preDELETE', id);
            return true;
        });
        this.attachEvent('GET', (data) => {
            if (this.debug) console.log(serviceName, 'GET', data);
        });
        this.attachEvent('POST', (data) => {
            if (this.debug) console.log(serviceName, 'POST', data);
        });
        this.attachEvent('PUT', (id, data) => {
            if (this.debug) console.log(serviceName, 'PUT', id, data);
        });
        this.attachEvent('DELETE', (id, data) => {
            if (this.debug) console.log(serviceName, 'DELETE', id, data);
        });
    }

    render() {
        //
    }
}