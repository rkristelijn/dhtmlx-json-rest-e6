import { DHXView } from 'dhx-optimus';

const eventsUrl = 'codebase/events.json';

export class EventsDataView extends DHXView {
  render() {
    this.ui = this.root.attachDataView({
      type: {
        template: "<div class='event_image'><img src='codebase/imgs/events/#image#' border='0' ondragstart='return false;'></div>" +
          "<div class='event_title'>#title#</div>" +
          "<div class='event_date'>#dateString#</div>" +
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

    this.addService('EventsDataService', {
      select: (id) => {
        this.ui.select(id);
      },
      exists: (id) => {
        return this.ui.exists(id);
      }
    });

    this.ui.attachEvent('onXLE', () => {
      let id = this._getDetailView();
      let exists = this.getService('EventsDataService').exists(id);
      if(!exists) this.ui.select(this.ui.first());
      else this.ui.select(id);
    });
    this.ui.attachEvent('onAfterSelect', (id) => {
      let data = this.ui.get(id);
      this.getService('EventsFormService').load(data);
      window.history.replaceState({ type: 'events', id: id }, `Event: ${id}`, `#events/${id}`);
    });
    this._load();
  }
  _getDetailView() {
    let url = window.location.href.match(/#(.*events\/)(.*)/);
    let rowId = url && url.length === 3 ? url[2] : false;
    return rowId;
  }

  _load() {
    this.ui.load(eventsUrl, 'json');
  }
}
