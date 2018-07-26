import { DHXView } from 'dhx-optimus';

export class SidebarView extends DHXView {
  render() {
    dhtmlXSideBar.prototype.templates.faTiles =
      '<i><div class="dhxsidebar_item_icon #icon#"></div><div class="dhxsidebar_item_text">#text#</div></i>';
    this.ui = this.root.attachSidebar({
      template: 'faTiles'
    });
    this.ui.attachEvent('onSelect', (id) => {

      if(id === 'menu') {
        this.ui.conf.selected = null;
      } else {
        this.ui._setItemInactive('menu');
      }
      this.callEvent('SideBar', [id]);
    });
    this._load();

    this.addService('SidebarService', {
      select: (id) => {
        this.ui.items(id).setActive();
      }
    });
  }

  _load() {
    const struct = {
      items: [
        {
          id: 'menu',
          text: '',
          icon: 'fa fa-bars'
        },
        {
          id: "sep1",
          type: "separator"
        },
        {
          id: 'contacts',
          text: 'Contacts',
          icon: 'fa fa-user'
        },
        {
          id: 'projects',
          text: 'Projects',
          icon: 'fa fa-briefcase'
        },
        {
          id: 'events',
          text: 'Events',
          icon: 'fa fa-calendar-check'
        },
        {
          id: 'settings',
          text: 'Settings',
          icon: 'fa fa-cog'
        },
        {
          id: 'agileboard',
          text: 'Agile board',
          icon: 'fa fa-clipboard-list'
        },
        {
          id: "sep2",
          type: "separator"
        },
        {
          id: 'users',
          text: 'Users',
          icon: 'fa fa-users-cog'
        },
        {
          id: 'about',
          text: 'About',
          icon: 'fa fa-info'
        }
      ]
    };

    this.ui.loadStruct(struct);
  }

}
