// AMD module loader: http://requirejs.org/docs/node.html
var requirejs = require('requirejs');
requirejs.config({
  packages: [
  { 
      name: 'ndeflibrary', // default 'packagename'
      location: './dist',  // relative path
      main: 'ndeflibrary'  // default 'main' 
  }]
})

// require tje lib as an AMD module
let ndefLibrary = requirejs('ndeflibrary');

// exports to node when the object is available
module.exports = ndefLibrary;