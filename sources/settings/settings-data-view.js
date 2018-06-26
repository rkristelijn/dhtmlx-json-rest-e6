import { DHXView } from 'dhx-optimus';
import route from 'riot-route';

const settingsUrl = 'codebase/settings.json';

export class SettingsDataView extends DHXView {
  render() {
    this.ui = this.root.attachDataView({
      type: {
        template: "<div style='position:relative;'>" +
          "<div class='settings_image'><img src='codebase/imgs/settings/#image#' border='0' ondragstart='return false;'></div>" +
          "<div class='settings_title'>#title#" +
          "<div class='settings_descr'>#descr#</div>" +
          "</div>" +
          "</div>",
        margin: 10,
        padding: 20,
        height: 120
      },
      autowidth: 2,
      drag: false,
      select: true,
      edit: false
    });
    this.addService('SettingsDataService', {
      select: (id) => {
        this.ui.select(id);
      }
    });
    this.ui.attachEvent("onXLE", () => {
      let id = this._getDetailView();
      if(!id) this.ui.select(this.ui.first());
      else this.ui.select(id);
    });
    this.ui.attachEvent('onAfterSelect', (id) => {
      let isValidId = this._isValidId(id);
      if (!isValidId) {
        dhtmlx.alert(`${rowId.replace(/[^a-z0-9]/gi, '')} is not found`);
      } else {
        this.getService('SettingsFormService').loadStruct(id);
        window.history.replaceState({ type: 'settings', id: id }, `Settings: ${id}`, `#settings/${id}`);
      }
    });
    this._load();
  }
  _getDetailView() {
    let url = window.location.href.match(/#(.*settings\/)(.*)/);
    let rowId = url && url.length === 3 ? url[2] : false;
    return rowId;
  }
  _load() {
    this.ui.load(settingsUrl, 'json');
  }
  _isValidId(id) {
    let ids = ['contacts', 'events', 'projects', 'configuration', 'exportprint', 'notifications', 'statistics', 'removeworkspace'];
    let search = "" + id;
    return ids.indexOf(search) >= 0;
  }
}
