
module.exports = function(cb){
  return function(err, env){
    if(err) return cb(err, env);
    cb(null, env);

    if(env.config.mode && ( env.config.mode !== "production" || !env.config.dev_center ) ){
      init(env.config.dev_center, env);
    }
  }
};





function init(options, env){
  env.i.do("log.sys", "Dev Center", "Starting");
  var infrastructure = require("infrastructure");
  var helpers = env.helpers;

  // stop node - env.i.do([name, "__run", "stop"].join("."), function(){} );
  var port = options.port || 8999;

  infrastructure({ 
    rootDir: __dirname,
    process_mode: "cluster", 
    
    structures: {
      log: helpers.resolve(env.config, "structures.log"),
      pages: {
        engine: "infrastructure-express/engine",
        path: "src/pages",
      },
      bundles: {
        engine: "infrastructure-webpack/engine",
        loader: "infrastructure-webpack/loader",
        path: ["src/bundles", "*/*.webpack.js"],
      }
    },
    
    http: {
      port:    port,
      favicon: "src/public/fav.ico",
      morgan:  false,
      static: {
        "/public":   "src/public"
      } 
    },
    
    views:{
      path:        "src/templates",
      view_engine: "mustache",
      cache:       false
    },

    webpack: {
      watch:  true,
      buildDestination: "./src/public",
      publicPath: "/public"
    }

  }, function(err, env){
    env.i.do("log.sys", "Dev Center", "Started at http://localhost:" + port + "/editor");
  });
}
