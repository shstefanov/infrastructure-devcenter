var Bundler = require("infrastructure-webpack/Bundler");

module.exports = Bundler.extend("DevCenterBundler", {
  "name": "devcenter",
  
    
  // Set entry points
  "entry": ["./devcenter.index.js", "./devcenter.index.less"],
  
  // Where will be the output
  "output": "devcenter.bundle.js",
  
  // Where the styles will be written
  "styleFilename": "devcenter.bundle.css",
  
  // Chunks = extract some packages in separate bundle
  "chunks": {
    "vendor": {
      "output": "devcenter.vendor.js",  // the bundle target file
      "modules": [
        "ractive-adaptors-backbone",
        "infrastructure-appcontroller-ractive",
        "infrastructure-appcontroller-ractive/ractive-backbone-view",
        "infrastructure-socketio/client",
        "underscore",
        "backbone",
        "ractive/ractive.runtime.js",
        "socket.io-client/socket.io.js"
      ]
    }
  },

  // Custom loaders
  "loaders": [

  ],

  // "config": {
  // },


  // Some custom aliases
  // For example require("View") will resolve specified module
  "alias": {
    "View": "infrastructure-appcontroller-ractive/ractive-backbone-view"
  },

  
  
  // Dump specific files from styles and send them to specific folder
  // meanwhile updating the urls in code
  // "scrapeRactiveTemplatesImages": true, this option will dump resources (images) from .ractive.html and .ractive.jade
  "fileLoaders": {
    "images": {
      "extensions": ["gif", "jpe?g", "png", "svg", "bmp" ],
      "inlineLimit": 1,
      "name": "images/[hash].[ext]"
    },
    "fonts": {
      "extensions": ["woff", "eot", "ttf", "woff2" ],
      "inlineLimit": 1,
      "name": "fonts/[hash].[ext]"
    }
  },
  
  // individual options that overrides the main config option
  // "sourceMap": true, 
  // "progress": true,  
});
