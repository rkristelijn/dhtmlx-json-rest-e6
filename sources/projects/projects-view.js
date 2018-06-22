import { DHXView } from 'dhx-optimus';
import { ProjectsGridView } from './projects-grid-view';
import { ProjectsDetailView } from './projects-detail-view';

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
        width: 330
        //fix_size: [true, true]
      }, {
        id: 'c',
        header: false,
        height: 350,
      }]
    });
    this.show(ProjectsGridView, this.ui.cells('a'));
    this.show(ProjectsDetailView, this.ui.cells('b'));

    //todo: next should be in separate file
    this.tabs = this.ui.cells('c').attachTabbar({
      arrows_mode: "auto",
      tabs: [
        { id: "stats", text: "Stats", selected: 1 }
      ]
    });
    this.chart = this.tabs.tabs("stats").attachChart({
      view: "bar",
      value: "#sales#",
      gradient: "rising",
      radius: 0,
      legend: {
        width: 75,
        align: "right",
        valign: "middle",
        template: "#month#"
      }
    });
  }
}
