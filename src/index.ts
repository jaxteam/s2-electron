import Application from './application'

new Application().bootstrap()

console.log("node:",process.versions.node)
console.log("Electron",process.versions.electron)
console.log("VERSION",process.versions.modules)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
