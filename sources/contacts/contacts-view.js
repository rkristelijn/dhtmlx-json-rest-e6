import { DHXView } from 'dhx-optimus';
import { ContactsGridView } from './contacts-grid-view';
import { ContactsDetailView } from './contacts-detail-view';
import { ContactViewModel } from './contacts-view-model';
import { ContactViewController } from './contacts-view-controller';

export class ContactsView extends DHXView {
  render() {
    this.ui = this.root.attachLayout({
      pattern: '2U',
      cells: [{
        id: 'a',
        header: false
      }, {
        id: 'b',
        header: false,
        width: 300,
      }]
    });
    this.ui.setAutoSize('a', 'a;b');
    this.show(ContactViewModel, this.ui.cells('a'));
    this.show(ContactViewController, this.ui.cells('a'));
    this.show(ContactsGridView, this.ui.cells('a'));
    this.show(ContactsDetailView, this.ui.cells('b'));
  }
}
