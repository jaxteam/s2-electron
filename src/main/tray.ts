import { Menu, MenuItem } from "electron"

const menu = new Menu()
menu.append(
  new MenuItem({
    label: 'DataSource',
    submenu: [{
      role: 'help',
      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      click: () => { console.log('Electron rocks!') }
    }]
  })
)

Menu.setApplicationMenu(menu)