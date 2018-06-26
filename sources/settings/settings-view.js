import { DHXView } from 'dhx-optimus';
import { SettingsDataView } from './settings-data-view';
import { SettingsDetailView } from './settings-detail-view';

export class SettingsView extends DHXView {
  render() {
    this.ui = this.root.attachLayout({
      pattern: '2U',
      cells: [{
        id: 'a',
        header: false
      }, {
        id: 'b',
        header: false,
        width: 330,
      }]
    });
    this.ui.setAutoSize('a', 'a;b');

    this.show(SettingsDataView, this.ui.cells('a'));
    this.show(SettingsDetailView, this.ui.cells('b'));
  }
}
