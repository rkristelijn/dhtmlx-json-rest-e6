import { DHXView } from 'dhx-optimus';
import { LoginDetailView } from './login-detail-view';
import { LoginViewController } from './login-view-controller';

export class LoginView extends DHXView {
    render() {
        this.ui = this.root.attachLayout({
            pattern: '1C',
            cells: [{
                id: 'a',
                header: false
            }]
        });

        // this.addSlot('right', this.ui.cells('a'));
        this.show(LoginDetailView, this.ui.cells('a'));
        this.show(LoginViewController, this.ui.cells('a'));
    }
}
