import { DHXView } from 'dhx-optimus';
import { ViewModel } from '../common/view-model';
import { ViewController } from '../common/view-controller';
import { UsersGridView } from './users-grid-view';
import { UsersDetailView } from './user-detail-view';

export class UsersView extends DHXView {
  render() {
    this.ui = this.root.attachLayout({
      pattern: '2U',
      cells: [{
        id: 'a',
        header: false
      }, {
        id: 'b',
        header: false,
        width: 500,
      }]
    });
    this.ui.setAutoSize('a', 'a;b');
    this.show(ViewModel, this.ui.cells('a'));
    this.show(ViewController, this.ui.cells('a'));
    this.show(UsersGridView, this.ui.cells('a'));
    this.show(UsersDetailView, this.ui.cells('b'));
  }
}
