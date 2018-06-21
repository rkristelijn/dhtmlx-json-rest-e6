import { DHXView } from 'dhx-optimus';

import { TopbarView } from './topbar/topbar-view.js';
import { SidebarView } from './sidebar/sidebar-view.js';
import { AboutView } from '../about/about-view.js';
import { ProjectsView } from '../projects/projects-view.js';
import { ContactsView } from '../contacts/contacts-view.js';
import { EventsView } from '../events/events-view.js';
import { SettingsView } from '../settings/settings-view.js';

import route from 'riot-route';

export class TopView extends DHXView {
  render() {
    //router
    let dhxTop = this;
    route(function (id) {
      dhxTop.getService('SidebarService').select(id || 'contacts');
      switch (id) {
        case 'contacts':
          dhxTop.getService('ToolbarService').setText('Contacts');
          dhxTop.show(ContactsView, 'right');
          break;
        case 'projects':
          dhxTop.show(ProjectsView, 'right');
          dhxTop.getService('ToolbarService').setText('Projects');
          break;
        case 'events':
          dhxTop.getService('ToolbarService').setText('Events');
          dhxTop.show(EventsView, 'right');
          break;
        case 'settings':
          dhxTop.getService('ToolbarService').setText('Settings');
          dhxTop.show(SettingsView, 'right');
          break;
        case 'about':
          dhxTop.getService('ToolbarService').setText('About');
          dhxTop.show(AboutView, 'right');
          break;
        default:
          dhxTop.getService('ToolbarService').setText('Contacts');
          dhxTop.show(ContactsView, 'right');
          break;
      }
    });
    route.start(true);

    this.ui = this.root.attachLayout({
      pattern: '2U',
      cells: [{
        id: 'a',
        text: "Menu",     // header text
        collapsed_text: "Main Menu, click to uncollapse...",   // header text for a collapsed cell
        header: false,     // hide header on init
        width: 100,        // cell init width
        //height: 100,        // cell init height
        //collapse: true        // collapse on init
      }, {
        id: 'b',
        //text: "Text",     // header text
        //collapsed_text: "Text 2",   // header text for a collapsed cell
        header: false,     // hide header on init
        //width: 300,        // cell init width
        //height: 100,        // cell init height
        //collapse: true        // collapse on init
      }]
    });

    this.ui.attachEvent("onCollapse", (name) => {
      console.log(name);
      this.ui.cells(name).expand();
      if (this.ui.cells(name).getWidth() <= 50) {
        this.ui.cells(name).setText('Menu');
        this.ui.cells(name).setWidth(200);
      } else {
        this.ui.cells(name).setText('.')
        this.ui.cells(name).setWidth(50);
      }
      return false;
    });

    this.show(TopbarView, this.ui);
    this.show(SidebarView, this.ui.cells('a'));

    this.ui.cells('a').setWidth(200);

    this.addSlot('right', this.ui.cells('b'));

    this.attachEvent('SideBar', (id) => {
      route(id);
    });

    //this.show(ProjectsView, 'right');

  }
}
