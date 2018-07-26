import { DHXView } from 'dhx-optimus';

export class LoginDetailView extends DHXView {
    render() {
        this.ui = this.root.attachForm([
            { type: 'settings', position: 'label-left' },
            {
                type: 'fieldset', name: 'login', label: 'Login', list: [
                    { type: 'settings', position: 'label-left', labelWidth: 110, inputWidth: 160 },
                    { type: 'input', name: 'username', label: 'Username' },
                    { type: 'password', name: 'password', label: 'Password' },
                    { type: 'button', name: 'login', value: 'Login' }
                ]
            }
        ]);

        this.ui.attachEvent('onButtonClick', (name) => {
            switch(name) {
                case 'login':
                    console.log('logging in...');
                    this.getService('LoginViewControllerService').login({
                        username:'test',
                        password:'test'
                    })
                break;
            }
        })
    }
}
