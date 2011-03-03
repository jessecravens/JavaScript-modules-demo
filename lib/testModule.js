require.paths.unshift(__dirname + "/vendor");

// Built in objects
var http = require('http'),
sys = require('sys'),

// Additional 3rd Party Modules
nodeStatic = require('node-static052/lib/node-static');

// Log Loaded Modules
// module is a global node variable
// interchangeable with 'this'
console.info(sty.red('\n-LOADED MODULES-'));
for (var key in module.moduleCache) {
  if (module.moduleCache.hasOwnProperty(key)) {
    console.log(sty.red(module.moduleCache[key].id));
  }
}

function TestModule(options) {	
  // Force the use of new
  // If TestModule() is called without new operator, it will call new on itself
  // from resig - http://ejohn.org/apps/learn
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  
  // Convience variable 
  // this changes based on current Function scope
  // Assign at the beginning of every function
  // Ensures that working on the current object
  var self = this;
  
  // console.info(sty.green(options.port));
  console.log(options.port);
  self.settings = {
    port: options.port
  };

  self.init();	
};


TestModule.prototype.init = function() {
  var self = this;

  self.httpServer = self.createHTTPServer();
  self.httpServer.listen(self.settings.port);
  sys.log('Server started on PORT ' + self.settings.port);
};

TestModule.prototype.createHTTPServer = function() {
  var self = this;
	// Create a static server
	var server = http.createServer(function (request, response){
		var file = new nodeStatic.Server('./public',{
			cache: false		
		});
		request.addListener('end', function(){
			file.serve(request,response);
		});
	});

	return server;  
};

// module.exports = Lib; 
// per CommonJS module specification- http://wiki.commonjs.org/wiki/Modules/1.1
// will be available to code that requires this module

// module is a global node variable
// interchangeable with 'this'

// exports - all variables and objects instantiated in the file
// have local scope, except for those assigned to exports
module.exports = TestModule;