require.paths.unshift(__dirname + "/vendor");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Core Node.js Libraries
var http = require('http'),
sys = require('sys'),

// 3rd Party Libraries
sty = require('sty/lib/sty'),
haml = require('haml/lib/haml'),
jade = require('jade/lib/jade'),
express = require('express/lib/express'),
jsdom = require("jsdom/lib/jsdom"),
mongoose = require('mongoose/lib/mongoose'),
io = require('socket.io/lib/io'),

// other variables for Models
db,
Student;

// Connect to MongoDB - UNECESSARY
// mongodb-connection = require('node-mongodb-native/lib/mongodb/connection'),
// replaced with db = mongoose.connect(app.set('db-uri'));
// mongoose.connect('mongodb://localhost:27017/first');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BOOTSTRAPPING LOGS

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Websockets with Socket.io

// server = http.createServer(function(req, res){
//     // your normal server code
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>Hello Socket.io</h1>');
// });
// 
// server.listen(80);
// 
// // socket.io, I choose you
// var socket = io.listen(server);
// 
// socket.on('connection', function(client){
//   // new client is here!
//   client.on('message', function(){ … })
//   client.on('disconnect', function(){ … })
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Simple JSDOM example
jsdom.env("http://nodejs.org/dist/", [
  'http://code.jquery.com/jquery-1.5.min.js'
], function(errors, window) {
  console.log("there have been", window.$("a").length, "nodejs releases!");
});

// Run some jQuery on a html fragment
jsdom.env('<p><a class="the-link" href="http://jsdom.org>JSDOM\'s Homepage</a></p>', [
  'http://code.jquery.com/jquery-1.5.min.js'
], function(errors, window) {
  console.log("contents of a.the-link:", window.$("a.the-link").text());
});

// Print all of the news items on hackernews
jsdom.env('http://news.ycombinator.com/', [
  'http://code.jquery.com/jquery-1.5.min.js'
], function(errors, window) {
  var $ = window.$;

  console.log('HN Links');
  $('td.title:not(:last) a').each(function() {
    console.log(' -', $(this).text());
  });
});

// // Print all the urls from hresumes 'in the wild' list
// jsdom.env('http://microformats.org/wiki/hresume-examples-in-wild', [
//   'http://code.jquery.com/jquery-1.5.min.js'
// ], function(errors, window) {
//   var $ = window.$;
// 
//   console.log('hResumes in the Wild');
//   var hResumeArray = new Array();
//     
//   $('.entry-content > ul > li > a[rel="nofollow"]').each(function() {
// 	hResumeArray.push($(this).attr("title"));
// 	// console.log($(this).attr("title"))
//   });
// 
//   console.log('Found ' + hResumeArray.length + ' hResumes');
// 
// 
// 	$.each(hResumeArray, function(i, val) {
// 		console.log('Inpsecting: ' + val);
// 		
// 		jsdom.env(val, [
// 		  'http://code.jquery.com/jquery-1.5.min.js'
// 		], function(errors, window) {
// 		
// 			if (window) {
// 				
// 				// hResume schema - -----------
// 				// summary. optional. text.
// 				// contact info. required. MUST use hCard; SHOULD use <address> + hCard.
// 				// experience. optional. One or more hcalendar events with the class name 'experience', with an embedded hCard indicating the job title, name of company, address of company etc.
// 				// education. optional One or more hcalendar events with the class name 'education', with an embedded hCard indicating the name of school, address of school etc.
// 				// skills. optional. phrases or keywords using the rel-tag microformat with the class name 'skill'.
// 				// affiliations. optional. the class name affiliation along with an hcard of the organization
// 				// publications. optional. One or more citations. Use cite tag. 
// 
// 				console.log(window.$('head > title').text()); 
// 				console.log(val, " has ", window.$("a").length, " links on this page.");
// 				 
// 		        // console.log(window.$('.email').attr("href")); 
// 				
// 			}
// 			else{
// 				return 'no window';
// 			}
// 		});
// 		
// 	});
// 
// // var a = $('.entry-content > ul > li > a.external');
// // var title = $('.entry-content > ul > li > a.external').attr("title");
// // console.log(a);
// // console.log(title);
// 
// 
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONFIGURE ExpressJS Application

var app = require('express/lib/express').createServer();

app.configure('development', function() {
  app.set('db-uri', 'mongodb://localhost/first-development');
  app.use(express.errorHandler({ dumpExceptions: true }));
});

app.configure('test', function() {
  app.set('db-uri', 'mongodb://localhost/first-test');
});

app.configure('production', function() {
  app.set('db-uri', 'mongodb://localhost/first-production');
});

// CONFIGURE THE EXPRESS APPLICATION 
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyDecoder());
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));
	app.set('view engine', 'jade');
	app.set('view options', {
	    layout: true
	});
	app.set('views', __dirname + '/views');	
	console.log(sty.green(app.settings.views));
});

var models = require('./models');
	// Define Models
	models.defineModels(mongoose, function() {
  
	// not sure if this is necessary
	// app.Student = Student = mongoose.model('Student');
  
	// this does make the connection - other above is unecessary
	db = mongoose.connect(app.set('db-uri'));
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Require custom modules
// var TestModule = require('./lib/testModule');

var ArticleProvider = require('./lib/articleprovider-memory');
var PortalProvider = require('./lib/portalprovider-memory');
// var PageProvider = require('./lib/pageprovider-mongodb');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Simple Test Object
Obj = function(){
	return {
  		'name': 'Yo Mama',
		'body': 'testing'
	}
};

// Mongoose Models
// Models will be located in models.js later

console.info(sty.red('\n-MONGOOSE DEMO START-'));

var Schema = mongoose.Schema

var TestModel = new Schema({
    name     : String
  , body     : String
  , date     : Date
});

// Missing from the documentation - must include 2 params 
// params(name of Model, and Schema to use)

mongoose.model('TestModel', TestModel);
 
// REMEMBER - not clear in the Mongoose documentation
// This defines the model
// mongoose.model('User', UserSchema)
// This retrieves it after its defined
// mongoose.model('User')

// We can then instantiate it, and save it:
// set up a reference first
var testModel = mongoose.model('TestModel');
var testModelinstance = new testModel();

// assign values
testModelinstance['name'] = 'Yo Name';
testModelinstance['body'] = 'Yo Body';
testModelinstance['date'] = Date();

// log the object
console.dir(testModelinstance)

// save to db
testModelinstance.save();

console.log('find: ' + testModel.find({}, function (err, docs) {}))
console.log(testModel.find({}, function (err, docs) {}))

// console.log(testModel.find())
// console.log(TestModel.find())

console.info(sty.red('\n-MONGOOSE DEMO END-'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Students

// Model: Student
Student = new Schema({
  'firstName': { type: String, index: true },
  'lastName': String,
  'grade': Number
});

// mongoose.model('Student', Student);
student = mongoose.model('Student');

app.get('/students', function(req, res) {
  
  var s = new student();

  console.log(student.find({}, function (err, docs) {}))

  student.find({}, function(err, docs) {
         res.render('students/index.jade', {
           locals: { 
   			title: 'Students List',
   			students: docs
   			}
         });
      });
  });

// app.get('/students.:format?', function(req, res) {  
//   student.find(function(err, students) {    
// 	switch (req.params.format) {
//       case 'json':
//         res.send(students.map(function(s) {
//           return s.toObject();
//         }));
//       break;
// 
//       default:
//         res.render('students/index.jade', {
//           locals: { 
// 			title: 'Students List',
// 			students: students
// 			}
//         });
//     }
//   });
// });

app.get('/students/new', function(req, res) {
  res.render('students/new.jade', {
    locals: { s: new student()}
  });
});

app.post('/students/new', function(req, res){
	
	var s = new student();
		
	// assign values
	s['firstName'] = req.body.s['firstName'];
	s['lastName'] = req.body.s['lastName'];

	// log the object
	console.dir(s)

	// save to db
	s.save(function(error, s) {
		res.redirect('/students');
	});
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  MongoDB and Jade templating Example
//  Instantiate a new PageProvider
// var pageProvider = new PageProvider(); 

// Get all the articles and render index template

// app.get('/pages', function(req, res){
//   console.info(sty.yellow('\n-GET /pages-'));
//   pageProvider.findAll(function(error, dummyData){
// 	//
//   })
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Simple Routing Examples

// app.get('/', function(req, res){
//     res.send('\n-hello world\n');
// });

app.get('/', function(req, res){

	console.info(sty.yellow('\n- GET ROOT - test.jade'));
	
	var moduleArray = new Array();
	for (var key in module.moduleCache) {
	  if (module.moduleCache.hasOwnProperty(key)) {
	    moduleArray.push(module.moduleCache[key].id)	
	  }
	}	
	res.render('test.jade', {
    locals: {
		title: 'JavaScript Module Demo App',
		subtitle: '[ExpressJS, MongoDB, Socket.io, Jade, JSDOM, YUI3, JQuery, Raphael]',
		modules: moduleArray	
	}
  });
});

// mirror req params in browser
app.get('/new/:id', function(req, res){
  	console.log(req.params);
	res.send(req.params.id)
});

// use curl to watch translation of name value pairs to JSON
// curl -d "name=Rafael%20Sagula&body=3320780" http://localhost:8124/j
app.post('/j', function(req, res){
  res.send(req.body);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  'In Memory' DataStore and Jade templating Example
//  Instantiate a new ArticleProvider
var articleProvider = new ArticleProvider(); 


// Get all the articles and render index template

app.get('/articles', function(req, res){
  console.info(sty.yellow('\n-GET /articles-'));
  articleProvider.findAll(function(error, dummyData){
	  res.render('articles/index', {		
	        locals: {
	          title: 'Articles',
	          articles: dummyData
	        }
	      });
	console.log(dummyData);	
  })
});

// Get the new.jade template - pass a new Obj as locals object

app.get('/articles/new', function(req, res){
	console.info(sty.yellow('\n-GET /articles/new-'));
	res.render('articles/new.jade', {
    locals: new Obj()
  });
});

//  Post values from new.jade template

app.post('/articles/new', function(req, res){
	
	/////////////////////////////////////////////////////
	console.info(sty.yellow('\n-POST REQUEST HEADERS-'));

	for (var key in req.headers) {
	  if (req.headers.hasOwnProperty(key)) {
	    console.log(req.headers[key]);
	  }
	}
	console.info(sty.yellow('req.body: ' + req.body));
	/////////////////////////////////////////////////////
	
	articleProvider.save({
	  name: req.body.locals['name'],
	  body: req.body.locals['body']
	}, function(error, docs) {
		res.redirect('/articles');
	});	
});

// Simple findById Example

app.get('/articles/:id', function(req, res){
  console.info(sty.yellow('\n-GET /articles/:id-'));
  articleProvider.findById(function(error, dummyData){
	  res.render('articles/index', {		
	        locals: {
	          title: 'Articles',
	          articles: dummyData
	        }
	      });
	console.log(dummyData);	
  })
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  Demonstrate Complex In Memory Data for Browser Parsing / Or SS DOM Creation with JSDOM/YUI3
//  Instantiate a new PortalProvider
//  Portal Provider will provide the complex portal object

var portalProvider = new PortalProvider(); 

app.get('/portals', function(req, res){
  portalProvider.findAll(function(error, data){
	  res.render('portals/index', {		
	        locals: {
	          title: 'EntPortal',
	          portals: data
	        }
	      });
	console.log(data);	
  })
})

app.get('/portals/new', function(req, res) {
  res.render('portals/new.jade', {
    locals: { 
		title: 'New Portal',
		test: 'test'	
	}
  });
});

// Return the Portal JSON to the client
// CURRENTLY NOT WORKING - toObject() isnt working
app.get('/portals.:format?', function(req, res) {
  portalProvider.findAll(function(error, portals){
    switch (req.params.format) {
      case 'json':
        res.send(portals.map(function(data) {
            console.log('data = ' + data)
			return data.toObject();
        }));
      break;

      default:
        res.render('portals/index.jade', {
            locals: {
	          title: 'EntPortal',
	          portals: data
	        }
        });
    }
  });
});

if (!module.parent) {
  app.listen(8124);
  console.log('Express server listening on port %d, environment: %s', app.address().port, app.settings.env)
  console.log('Using Express %s, Jade %s', express.version, jade.version);
}