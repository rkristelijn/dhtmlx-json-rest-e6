import { DHXView } from 'dhx-optimus';
import { ViewModel } from './agile-board-view-model';
import { ViewController } from './agile-board-view-controller';

import {StoriesGridView} from './agile-board-grid-view';
import {AgileBoardDetailView} from './agile-board-detail-view';

export class AgileBoardView extends DHXView {
    render() {
        this.ui = this.root.attachLayout({
            pattern: '3J',
            cells: [
                { id: 'a', text: 'Stories', collapsed_text: 'Stories' },
                { id: 'b', header: false, width: 500 },
                { id: 'c', header: false, height: 250 }
            ]
        });
        this.ui.setAutoSize("a;c", "a;b");
        this.show(ViewModel, this.ui.cells('a'));
        this.show(ViewController, this.ui.cells('a'));
        this.show(StoriesGridView, this.ui.cells('a'));
        this.show(AgileBoardDetailView, this.ui.cells('b'));
    }
}
