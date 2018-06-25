import { DHXView } from 'dhx-optimus';

const gridBaseUrl = 'codebase/chart/';

export class ProjectsSalesGridView extends DHXView {
  render() {
    this.ui = this.root.attachGrid();
    this.ui.init();
    this.addService('ProjectsSalesGridService', {
      load: (id) => {
        this._load(id);
      }
    });
  }

  _load(id) {
    this.ui.load(`${gridBaseUrl}${id}_grid.json`, 'json');
  }
}
