require.paths.unshift(__dirname + "/vendor");

// built in objects
var http = require('http'),
nodeStatic = require('node-static052/lib/node-static');

console.info('\n-----------------------------------require.paths-----------------------------------------------');

for (var key in require.paths) {
  if (require.paths.hasOwnProperty(key)) {
    console.log(require.paths[key]);
  }
}

console.info('\n-----------------------------------LOADED MODULES-----------------------------------------------');

for (var key in module.moduleCache) {
  if (module.moduleCache.hasOwnProperty(key)) {
    console.log(module.moduleCache[key].id);
  }
}

var server = http.createServer(function (request, response){
	var file = new nodeStatic.Server('./public',{
		cache: false		
	});
	request.addListener('end', function(){
		file.serve(request,response);
	});
});

server.listen(8124);

