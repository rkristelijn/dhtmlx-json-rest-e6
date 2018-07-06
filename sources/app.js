import 'less/app.less';

import { DHXApp } from 'dhx-optimus';
import { TopView } from './top/top-view.js';


class MyApp extends DHXApp {
  constructor(config) {
    super(config);
  }
  render() {
    this.show(TopView);
  }
}

window.MyApp = MyApp;
