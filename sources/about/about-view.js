import { DHXView } from 'dhx-optimus';
var about = require('./about-template.html');

export class AboutView extends DHXView {
  render() {
    this.ui = this.root.attachHTMLString(about({
      name: 'DHTMLX ES6 Demo',
      author: 'Remi Kristelijn',
      version: '1.4'
    }
    ));
  }
}
