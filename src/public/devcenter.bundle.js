webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	module.exports = __webpack_require__(13);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Main App namespace
	var helpers = __webpack_require__(17);
	var _ = __webpack_require__(7);

	var App = module.exports = {
	  
	  bulk: function(context, iterator){
	    var result = {};
	    return _.chain( context.keys() )
	      .filter(function(path){ return !!path.match(/\.[a-z]{2,6}$/i); }) // Omits module path without extensions
	      .map(function(path){
	        var prop_path = path.replace(/^\.\//, "").replace(/\.js$/i, "");
	        var  prop_name, module;
	        if(iterator){
	          var cb_called = false;
	          iterator(prop_path, context, function(name, mod){
	            cb_called = true;
	            prop_name = name, module = arguments.length < 2 ? (name === null ? module : context(path)) : mod;
	          });
	          if(prop_name === null) return null;
	          if(!cb_called) module = context(path);
	          if(prop_name === undefined) prop_name = prop_path;
	        }
	        else{
	          prop_name = prop_path, module = context(path);
	        }
	        return [prop_name, module];
	     }).filter(_.isArray).object().value();
	  },

	  config: function(conf){
	    var config = __webpack_require__(3);
	    _.extend(config, typeof conf === "function" ? App.bulk(conf, function(name, context, cb){
	      cb(name.replace(/\.(js|json|yml|hson)$/i, ""));
	    }) : conf );
	  }

	};


/***/ },
/* 7 */
1,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {"container":"#main-container","debug":true,"pushState":true}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {"/":"setContext","/:screen":"setContext","/:screen/:tab":"setContext","/:screen/:tab/:context":"setContext","/:screen/:tab/:context/:action":"setContext"}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var App = __webpack_require__(6);

	module.exports = new App.Controllers.AppController();

	var config = __webpack_require__(3);

	if(config.debug === true) {
		window.app    = module.exports; 
		window.App    = App;
		window.config = config;
	}

/***/ },
/* 17 */
[29, 7],
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./app.hson": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 18;


/***/ },
/* 19 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 19;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

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

	var App = __webpack_require__(6);



	// Bulk 'config' folder and assign the result to config
	App.config(__webpack_require__(18));

	// Bulk 'controllers' folder (not recursively) and attach it to App.Controllers
	App.Controllers = App.bulk(__webpack_require__(19));

	// Instantiating the app (requires App.Controllers.AppController)
	var app = __webpack_require__(16);

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
	  config: __webpack_require__(3),
	  routes: __webpack_require__(15),
	}, function(err){
	  if(err) throw err;
	});








/***/ }
]);