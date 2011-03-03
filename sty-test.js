require.paths.unshift(__dirname + "/vendor");

var http = require('http'),
sty = require('sty/lib/sty');

console.info(sty.yellow('\n-----------------------------------require.paths------------------------------------------------'));

for (var key in require.paths) {
  if (require.paths.hasOwnProperty(key)) {
    console.log(sty.yellow(require.paths[key]));
  }
}

console.info(sty.red('\n-----------------------------------LOADED MODULES-----------------------------------------------'));

for (var key in module.moduleCache) {
  if (module.moduleCache.hasOwnProperty(key)) {
    console.log(sty.red(module.moduleCache[key].id));
  }
}

