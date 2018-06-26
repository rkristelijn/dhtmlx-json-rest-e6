import { DHXView } from 'dhx-optimus';

const eventsUrl = 'codebase/settings.json';

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

    this.ui.attachEvent("onXLE", () => {
      this.ui.select(this.ui.first());
    });
    this.ui.attachEvent('onAfterSelect', (id) => {
      this.getService('ContactsFormService').loadStruct(id);
    });
    this._load();
  }

  _load() {
    this.ui.load(eventsUrl, 'json');
  }
}
