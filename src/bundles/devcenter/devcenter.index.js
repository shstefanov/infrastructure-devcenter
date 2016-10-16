/*
  Built -in modules by infrastructure-webvpack
  require("App")    - namespace that will hold our protptypes
  require("app")    - instance if App.Controllers.AppController
  require("config") - empty object that we can extend
*/

/*
  App
  
  App.config(object) - extends the config with given object
  
  App.config(require.context("./config", true)) - accepts require.context, acts
  //like bulk-require in nodejs and extends the config with result
  
  App.bulk(require.context(folder, true, [/pattern/]) - returns bulkified folder
  
  App.bulk(require.context(folder, true, [/pattern/], function filter(name, context, cb){
    cb(null)   - omit this module from result
    cb("name") - set specific name for this module to mount on the result object
    cb(undefined, value) - keep name, set specific value
  }) - returns bulkified folder
*/

var App = require("App");



// Bulk 'config' folder and assign the result to config
App.config(require.context("./config", true));

// Bulk 'controllers' folder (not recursively) and attach it to App.Controllers
App.Controllers = App.bulk(require.context("./controllers", false));

// Instantiating the app (requires App.Controllers.AppController)
var app = require("app");

// Start the app, giving some refs, needed by appcontroller-ractive

// "routes" is named routces definition. It should look like
/*
  {
    "/":             "homePage",
    "/about"         "aboutPage",
    "/page/:id"      "showPage",   // it will pass params to route handler in order of appearance
    "/users/:id":    ["showUser", "showUserControls"], // It can fire multiple routes on match
  }

*/

app.init({
  App:    App,
  config: require("config"),
  routes: require("./routes.hson"),
}, function(err){
  if(err) throw err;
});






