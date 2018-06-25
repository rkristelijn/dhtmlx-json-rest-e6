import { DHXView } from 'dhx-optimus';

const graphUrl = './codebase/chart/';

export class ProjectsSalesGraphView extends DHXView {
  render() {
    this.ui = this.root.attachChart({
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
    this.addService('ProjectsSalesGraphService', {
      load: (id) => {
        this._load(id);
      }
    });
  }

  _load(id) {
    this.ui.clearAll();
    this.ui.load(`${graphUrl}${id}.json`, 'json');
  }
}
