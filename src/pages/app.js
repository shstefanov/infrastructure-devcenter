
var Page = require("infrastructure-express/Page");

module.exports = Page.extend("DevCenterPage", {
	root: "/editor",
	"GET *": "#devcenter.mustache"
});