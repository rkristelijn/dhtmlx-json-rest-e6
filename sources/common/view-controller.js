import { DHXView } from "dhx-optimus";

const SERVICE_NAME = 'UsersControllerService';///todo: not hardcoded
const API_URL = 'api/users';///todo: not hardcoded
const DEBUG = true;

export class ViewController extends DHXView {
    constructor(parent) {
        super(parent);
        this.addService(SERVICE_NAME, {
            GET: () => {
                if (parent.callEvent('preGET')) {
                    return fetch(`${API_URL}`, {
                        headers: { 'Content-Type': 'application/json' },
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
                    return fetch(`${API_URL}`, {
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(response => {
                            parent.callEvent('POST', [response]);
                            return (response);
                        });
                }
            },
            PUT: (id, data) => {
                if (parent.callEvent('prePUT', [data])) {
                    return fetch(`${API_URL}/${id}`, {
                        headers: {'Content-Type': 'application/json'},
                        method: 'PUT',
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(response => {
                            parent.callEvent('PUT', [id, response]);
                            return (response);
                        });
                }
            },
            DELETE: (id) => {
                if (parent.callEvent('preDELETE', [id])) {
                    return fetch(`${API_URL}/${id}`, {
                        headers: {'Content-Type': 'application/json'},
                        method: 'DELETE'
                    })
                        .then(response => {
                            parent.callEvent('DELETE', [id, response]);
                            return (response);
                        });
                }
            }
        });
        this.attachEvent('preGET', () => {
            if (DEBUG) console.log(SERVICE_NAME, 'preGET');
            return true;
        });
        this.attachEvent('prePOST', (data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'prePOST', data);
            return true;
        });
        this.attachEvent('prePUT', (id, data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'prePUT', id, data);
            return true;
        });
        this.attachEvent('preDELETE', (id) => {
            if (DEBUG) console.log(SERVICE_NAME, 'preDELETE', id);
            return true;
        });
        this.attachEvent('GET', (data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'GET', data);
        });
        this.attachEvent('POST', (data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'POST', data);
        });
        this.attachEvent('PUT', (id, data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'PUT', id, data);
        });
        this.attachEvent('DELETE', (id, data) => {
            if (DEBUG) console.log(SERVICE_NAME, 'DELETE', id, data);
        });
    }

    render() {
        //
    }
}