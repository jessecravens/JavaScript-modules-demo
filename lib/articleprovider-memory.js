var articleCounter = 1;

ArticleProvider = function(){};

ArticleProvider.prototype.dummyData = [];

// findAll() - perform the callback method on the entire dummyData set
// param: callback - usually response.render

ArticleProvider.prototype.findAll = function(callback) {
  	// console.log('inside findall() - callback variable: ' + callback + ' this will get passed the dummData object')
	callback( null, this.dummyData )
};

// findById() - perform the callback method on the dummyData by id
// param: id - the primary key - set to iterative portalCounter
// param: callback - usually response.render

ArticleProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

ArticleProvider.prototype.save = function(articles, callback) {

  console.log('save');

  var article = null;

  console.log('generating an article array - typeof ' + typeof(articles.length))
	
  if( typeof(articles.length)=="undefined")

  articles = [articles];

  for( var i =0;i< articles.length;i++ ) {
    article = articles[i];
    article._id = articleCounter++;
    article.created_at = new Date();
  
    console.log('this.dummyData.length: ' + this.dummyData.length)
    this.dummyData[this.dummyData.length]= article;
  }

  // console.log(this.dummyData)
  callback(null, articles);
};

/* Lets bootstrap with dummy data */
new ArticleProvider().save([
  {name: 'Post one', body: 'Body one'},
  {name: 'Post two', body: 'Body two'},
  {name: 'Post three', body: 'Body three'}
], function(error, articles){});

module.exports = ArticleProvider;