import { DHXView } from 'dhx-optimus';
import { ProjectsSalesGraphView } from './projects-sales-graph-view';
import { ProjectsSalesGridView } from './projects-sales-grid-view'

export class ProjectsSubView extends DHXView {
  render() {
    this.ui = this.root.attachTabbar({
      arrows_mode: "auto",
      tabs: [
        { id: "statsGraph", text: "Graph", selected: 1 },
        { id: "statsData", text: "Data", selected: 0 }
      ]
    });

    this.show(ProjectsSalesGraphView, this.ui.cells('statsGraph'));
    this.show(ProjectsSalesGridView, this.ui.cells('statsData'));
  }
}
