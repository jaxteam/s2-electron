const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');
module.exports = {
  packagerConfig: {
    name: "Sino Studio",
    appVersion: "0.1.0-beta",
    executableName:"sino",
    overwrite:true,
    icon: "./icon/ico.icns",
    platform: ['win32', "darwin", "linux"]
  },
  electronRebuildConfig: {
    "debug": true,
    "types": [
      "prod",
      "dev"
    ]
  },
  makers: [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "electron"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ]
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        // background: './assets/dmg-background.png',
        format: 'ULFO'
      }
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ],
  publishers: [],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        "mainConfig": "./webpack.main.config.js",
        "renderer": {
          "config": "./webpack.renderer.config.js",
          "entryPoints": [
            {
              "html": "./src/index.html",
              "js": "./src/renderer.ts",
              "name": "main_window",
              "preload": {
                "js": "./src/preload.ts"
              }
            }
          ]
        }
      }
    ]
  ],
  hooks: {},
  buildIdentifier: process.env.IS_BETA ? 'beta' : 'prod',
  packagerConfig: {
    appBundleId: fromBuildIdentifier({ beta: 'com.beta.bintools', prod: 'com.bintools' })
  }
}