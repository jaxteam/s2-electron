/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// import './index.css';
// import ReactDOM from 'react-dom'
// import { createElement } from 'react';
// import { Provider } from 'react-redux';
// import App from './renderer/app';
// import store from './shared/store'

// function Main(){
//     return createElement(Provider,{store:store},createElement(App))
// }

// document.addEventListener('DOMContentLoaded', function(event) {
//   ReactDOM.render(createElement(Main),document.getElementById("root"))
// })
import call from 'electron-call'
import { IDbsdk } from './main/bridge'

const dbsdk = call.use<IDbsdk>('dbsdk')

//@ts-ignore
window.dbsdk = dbsdk
// const dmconfig={
//   host: "192.168.3.128",
//   port: "5237",
//   drivername: "dm.jdbc.driver.DmDriver",
//   url: "jdbc:dm://192.168.3.128:5237",
//   user: "SYSAUDITOR",
//   password: "SYSAUDITOR"
// }

require("s2-gui")

// console.log('👋 This message is being logged by "renderer.js", included via webpack');
