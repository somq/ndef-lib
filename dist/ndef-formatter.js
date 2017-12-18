// AMD module loader: http://requirejs.org/docs/node.html
var requirejs = require('requirejs');

// config to let requirejs know what is the node base url
requirejs.config({
  baseUrl: __dirname
});

// require the lib as an AMD module
let ndefLibrary = requirejs('ndeflibrary');

// exports to node when the object is available
module.exports = ndefLibrary;
