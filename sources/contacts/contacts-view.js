import { DHXView } from 'dhx-optimus';
import { ContactsGridView } from './contacts-grid-view';
import { ContactsDetailView } from './contacts-detail-view';

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
    this.show(ContactsGridView, this.ui.cells('a'));
    this.show(ContactsDetailView, this.ui.cells('b'));
  }
}
