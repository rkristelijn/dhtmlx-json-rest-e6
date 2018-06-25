import { DHXView } from 'dhx-optimus';

const eventsUrl = 'codebase/events.json';

export class EventsDataView extends DHXView {
  render() {
    this.ui = this.root.attachDataView({
      type: {
        template: "<div class='event_image'><img src='codebase/imgs/events/#image#' border='0' ondragstart='return false;'></div>" +
          "<div class='event_title'>#title#</div>" +
          "<div class='event_date'>#date#</div>" +
          "<div class='event_place'>#place#</div>",
        margin: 10,
        padding: 20,
        height: 300,
        width: 204
      },
      drag: false,
      select: true,
      edit: false
    });

    this.ui.attachEvent("onXLE", () => {
      this.ui.select(this.ui.first());
    });
    this.ui.attachEvent('onAfterSelect', (id) => {
      let data = this.ui.get(id);
      this.getService('EventsFormService').load(data);
    });
    this._load();
  }

  _load() {
    this.ui.load(eventsUrl, 'json');
  }
}
