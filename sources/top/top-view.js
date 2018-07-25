import { DHXView } from 'dhx-optimus';

import { TopbarView } from './topbar/topbar-view.js';
import { SidebarView } from './sidebar/sidebar-view.js';
import { AboutView } from '../about/about-view.js';
import { ProjectsView } from '../projects/projects-view.js';
import { ContactsView } from '../contacts/contacts-view.js';
import { EventsView } from '../events/events-view.js';
import { SettingsView } from '../settings/settings-view.js';
import { AgileBoardView } from '../agile-board/agile-board-view';

import route from 'riot-route';

export class TopView extends DHXView {
  render() {
    //router
    let dhxTop = this;
    let collapsed = true;
    route(function (id) {
      switch (id) {
        case 'menu':
          //
          break;
        case 'contacts':
          dhxTop.getService('ToolbarService').setText('Contacts');
          dhxTop.getService('SidebarService').select('contacts');
          dhxTop.show(ContactsView, 'right');
          break;
        case 'projects':
          dhxTop.getService('ToolbarService').setText('Projects');
          dhxTop.getService('SidebarService').select('projects');
          dhxTop.show(ProjectsView, 'right');
          break;
        case 'events':
          dhxTop.getService('ToolbarService').setText('Events');
          dhxTop.getService('SidebarService').select('events');
          dhxTop.show(EventsView, 'right');
          break;
        case 'settings':
          dhxTop.getService('ToolbarService').setText('Settings');
          dhxTop.getService('SidebarService').select('settings');
          dhxTop.show(SettingsView, 'right');
          break;
        case 'about':
          dhxTop.getService('ToolbarService').setText('About');
          dhxTop.getService('SidebarService').select('about');
          dhxTop.show(AboutView, 'right');
          break;
        case 'agileboard':
          dhxTop.getService('ToolbarService').setText('Agile Board');
          dhxTop.getService('SidebarService').select('agileboard');
          dhxTop.show(AgileBoardView, 'right');
          break;
        default:
          dhxTop.getService('ToolbarService').setText('Contacts');
          dhxTop.getService('SidebarService').select('contacts');
          dhxTop.show(ContactsView, 'right');
          break;
      }
    });
    route.start(true);

    this.ui = this.root.attachLayout({
      pattern: '2U',
      cells: [{
        id: 'a',
        header: false,
        width: 34,
        fix_size: [true, null]
      }, {
        id: 'b',
        header: false,
      }]
    });

    this.show(TopbarView, this.ui);
    this.show(SidebarView, this.ui.cells('a'));

    this.addSlot('right', this.ui.cells('b'));

    this.attachEvent('SideBar', (id) => {
      switch (id) {
        case 'menu':
          dhxTop.ui.cells('a').setWidth(collapsed ? 200 : 34);
          collapsed = !collapsed;
          break;
        default:
          route(id);
          break;
      }
    });
  }
}
