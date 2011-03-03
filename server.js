require.paths.unshift(__dirname + "/vendor");

// Require sty for Color and more for console output
sty = require('sty/lib/sty');

// Require a custom module.
var ArticleProvider = require('./lib/articleprovider-memory');
var TestModule = require('./lib/testModule');

// Log all require.paths
console.info(sty.yellow('\n-require.paths-'));
for (var key in require.paths) {
  if (require.paths.hasOwnProperty(key)) {
    console.log(sty.yellow(require.paths[key]));
  }
}

// Pass in options as a hash
new TestModule({
	port:8124
});

new ArticleProvider();
