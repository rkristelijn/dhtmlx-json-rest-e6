import { DHXView } from 'dhx-optimus';
import { EventsDataView } from './events-data-view';
import { EventsDetailView } from './events-detail-view';

export class EventsView extends DHXView {
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
    this.show(EventsDataView, this.ui.cells('a'));
    this.show(EventsDetailView, this.ui.cells('b'));
  }
}
