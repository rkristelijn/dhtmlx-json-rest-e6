import { DHXView } from 'dhx-optimus';
import { ContactsGridView } from './contacts-grid-view';
import { ContactsDetailView } from './contacts-detail-view';

export class ContactsView extends DHXView {
  render() {
    //this.ui = this.root.attachHTMLString('<div class="work_in_progress">Contact Dashboard</div>');
    this.ui = this.root.attachLayout({
      pattern: '2U',
      cells: [{
        id: 'a',
        //text: "Text",     // header text
        //collapsed_text: "Text 2",   // header text for a collapsed cell
        header: false     // hide header on init
        //width: 100,        // cell init width
        //height: 100,        // cell init height
        //collapse: true        // collapse on init
      }, {
        id: 'b',
        //text: "Text",     // header text
        //collapsed_text: "Text 2",   // header text for a collapsed cell
        header: false,     // hide header on init
        width: 300,        // cell init width
        //height: 100,        // cell init height
        //collapse: true        // collapse on init
      }]
    });
    this.show(ContactsGridView, this.ui.cells('a'));
    this.show(ContactsDetailView, this.ui.cells('b'));
  }
}
