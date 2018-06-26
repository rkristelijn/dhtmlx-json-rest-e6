import { DHXView } from 'dhx-optimus';
import { ProjectsGridView } from './projects-grid-view';
import { ProjectsDetailView } from './projects-detail-view';
import { ProjectsSubView } from './projects-sub-view';

export class ProjectsView extends DHXView {
  render() {
    this.ui = this.root.attachLayout({
      pattern: '3J',
      cells: [{
        id: 'a',
        header: false
      }, {
        id: 'b',
        header: false,
        width: 300
      }, {
        id: 'c',
        height: 250
      }]
    });
    console.log(this.ui.listAutoSizes());
    this.ui.setAutoSize("a;c", "a;b");

    this.show(ProjectsGridView, this.ui.cells('a'));
    this.show(ProjectsDetailView, this.ui.cells('b'));
    this.show(ProjectsSubView, this.ui.cells('c'));
  }
}
