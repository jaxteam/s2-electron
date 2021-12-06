module.exports = {
  packagerConfig: {
    name: "sino-studio",
    appVersion: "0.1.0-beta",
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
  buildIdentifier: 'sino'
}