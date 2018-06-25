import { DHXView } from 'dhx-optimus';

export class EventsDetailView extends DHXView {
  render() {
    this.ui = this.root.attachForm([
      { type: "settings", position: "label-left", labelWidth: 110, inputWidth: 160 },
      { type: "container", name: "photo", label: "", inputWidth: 200, inputHeight: 200, offsetTop: 20, offsetLeft: 65 },
      { type: "input", name: "image", label: "Image", offsetTop: 20 },
      { type: "input", name: "title", label: "Title" },
      { type: "input", name: "date", label: "Date" },
      { type: "input", name: "place", label: "Place" },
      { type: "input", name: "lat", label: "Latitude" },
      { type: "input", name: "lng", label: "Longitude" },
      { type: "input", name: "id", label: "RowId", attributes: ["readonly"], readonly: true }
    ]);
    this.addService('EventsFormService', {
      load: (data) => {
        this.ui.getContainer('photo').innerHTML = `<img src="codebase/imgs/events/${data.image}" border="0" class="form_photo">`;
        this.ui.setFormData(data);
      }
    });
  }
}
