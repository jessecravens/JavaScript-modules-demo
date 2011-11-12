require.paths.unshift(__dirname + "/vendor");

// Require sty for Color and more for console output
sty = require('sty/lib/sty');

// Require a custom module.
var ArticleProvider = require('./lib/articleprovider-memory');
var TestModule = require('./lib/testModule');



console.info(sty.yellow('\n-require.paths-'));
for (var key in require.paths) {
  if (require.paths.hasOwnProperty(key)) {
    console.log(sty.yellow(require.paths[key]));
  }
}

console.info(sty.red('\n-LOADED MODULES-'));

for (var key in module.moduleCache) {
  if (module.moduleCache.hasOwnProperty(key)) {
    console.log(sty.red(module.moduleCache[key].id));
  }
}


// Pass in options as a hash
new TestModule({
	port:8124
});

new ArticleProvider();
