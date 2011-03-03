require.paths.unshift(__dirname + "/vendor");


// built in objects
var http = require('http'),
sys = require('sys'),
app = require('express/lib/express'),
faye = require('Faye 0.5.2/faye-node'),
sty = require('sty/lib/sty'),
// styout = require('styout/lib/styout'),
cs = require('coffee-script/lib/coffee-script'),
//evnts = require('events').EventEmitter,
nodeStatic = require('node-static/lib/node-static');
console.info('-----------------------------------console API-----------------------------------------------');

console.dir(console);
// console.info('using current require.paths: ' + require.paths + '\n');

console.info('\n-----------------------------------require.paths-----------------------------------------------');

for (var key in require.paths) {
  if (require.paths.hasOwnProperty(key)) {
    console.log(require.paths[key]);
  }
}

console.info('\n-----------------------------------other paths names-----------------------------------------------');
console.info('file served (__filename): ' + __filename);
console.info('from directory (__dirname): ' + __dirname);
// console.dir(module.moduleCache);

console.info('\n-----------------------------------LOADED MODULES-----------------------------------------------');

for (var key in module.moduleCache) {
  if (module.moduleCache.hasOwnProperty(key)) {
    console.log(module.moduleCache[key].id);
  }
}

// console.log "#{sty.red 'WARNING:'} Color is #{sty.green 'awesome!'}"
// console.dir(sty.parse)
// console.log sty.parse 'You are being'

// console.dir(evnts);


var server = http.createServer(function (request, response){
		
	// event listener  - 'end' custom event 
	request.addListener('end', function(){
		
		// .writeHead() takes integer for respnse code, and a HASH
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		
		// deliver string to the browser
		// inspect -prints representation of request object
		response.write(sys.inspect(request));
		
		// close connnection to the client
		response.end();
	});
	
	// event listener  - 'error' custom event 
	request.addListener('error', function(){
		console.log('error-----------------------');
	});
			
}).listen(8124);

// process is similar to the window object in the DOM
// process object emits an event when receives a signal 
process.on('SIGINT', function(){
	// console.info('\n');
	console.log('\nSIGINT - signal interrupt event');
	process.exit(0);
});


// require.paths.unshift(__dirname + "/vendor");

// process.addListener('uncaughtException', function (err, stack) {
//   console.log('------------------------');
//   console.log('Exception: ' + err);
//   console.log(err.stack);
//   console.log('------------------------');
// });
// 
// var LiveStats = require('./lib/livestats');
// 
// new LiveStats({
//   port: 8124,
//   geoipServer: {
//       hostname: 'geoip.peepcode.com'
//     , port: 80
//   }
// });
