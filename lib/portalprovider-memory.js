var portalCounter = 1;

PortalProvider = function(){};

PortalProvider.prototype.dummyData = [];

// findAll() - perform the callback method on the entire dummyData set
// param: callback - usually response.render

PortalProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

// findAll() - perform the callback method on the dummyData by id
// param: id - the primary key - set to iterative portalCounter
// param: callback - usually response.render

PortalProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

// save() - assign portals into memory as JavaScript Objects
// param: portals - can be an array of portal objects or single object
// param: callback - usually blind function for errors

PortalProvider.prototype.save = function(portals, callback) {
  var portal = null;

  // if a portal object make an array of one
  if( typeof(portals.length)=="undefined")
    // console.log('generating a portal array')
	portals = [portals];

  for( var i =0;i< portals.length;i++ ) {
    portal = portals[i];
    portal._id = portalCounter++;
    portal.created_at = new Date();
	
	// set a dummyData property equal to the portal data
    this.dummyData[this.dummyData.length]= portal;
  }
  callback(null, portals);
};

// BOOTSTRAP 
// with one Portal object

new PortalProvider().save({
"code": 0,
"command": "",
"action": "",
"type": "ClientCommandObject",
"childrenType": "Portal",
"domAlias": "",
"message": null,
"root": "",
"authRules": "",
"id": "",
"children": [{  // start Portal
    "maxPages": 4,
    "removable": false,
    "type": "Portal",
    "childrenType": "TabContainer",
    "disableAjax": false,
    "gadgetCategories": "Investorview Dashboard",
    "editSettings": true,
    "addPages": true,
    "authRules": "",
    "dragDrop": true,
    "loggingSubType": "minor",
    "id": "CpHome",
    "version": "1",
    "editPages": true,
    "domAlias": "",
    "root": "portalContent",
    "maxGadgetsPerPage": 12,
    "children": [{ // start TabContainer
        "type": "TabContainer",
        "childrenType": "TabPage",
        "domAlias": "",
        "position": -1,
        "tabNavCSSOverride": "",
        "authRules": "",
        "id": "B2YZ258L1IYFHTY1B4CEO",
        "children": [{	// start TabPage
            "removable": true,
            "theme": "",
            "type": "TabPage",
            "childrenType": "",
            "defaultPageLink": true,
            "position": 0,
            "purgeObject": false,
            "authRules": "",
            "editTabLink": false,
            "id": "cpHomeTab",
            "version": "1",
            "selected": true,
            "removed": false,
            "label": "My Accounts",
            "domAlias": "",
            "mandatory": false,
            "defaultPage": true,
            "children": [],
            "addWidgetAllowed": false,
            "layoutType": "full"
        },
        {	// start TabPage
            "removable": true,
            "theme": "theme-yellow",
            "type": "TabPage",
            "childrenType": "Column",
            "defaultPageLink": true,
            "position": 1,
            "purgeObject": false,
            "authRules": "",
            "editTabLink": true,
            "id": "4WZGBLID1N04DW61B4CEO",
            "version": "1",
            "selected": false,
            "removed": false,
            "label": "Investments",
            "domAlias": "",
            "mandatory": false,
            "defaultPage": false,
            "children": [{  //start Gadget
                "type": "Column",
                "childrenType": "Gadget",
                "domAlias": "",
                "position": 0,
                "authRules": "",
                "id": "B2H74NE6EOVSINPG02Z",
                "children": [{
                    "childrenType": "",
                    "title": "Yield Curve",
                    "position": 0,
                    "authRules": "",
                    "id": "CC9LIZ211IQ4XXFG3V6NV",
                    "height": "410",
                    "rpcRelayURL": "",
                    "gadgetType": "YieldCurve",
                    "buttonPrefs": true,
                    "movable": true,
                    "hasChrome": true,
                    "renamable": true,
                    "addAgain": false,
	                    "userPrefs": [{
	                        "enumValue": [],
	                        "defaultValue": "Yield Curve",
	                        "required": "true",
	                        "datatype": "string",
	                        "name": "title",
	                        "displayName": "Title"
	                    }],
                    "removable": true,
                    "type": "Gadget",
                    "buttonDestroy": true,
                    "renderType": "IFRAME",
                    "category": "Investorview Dashboard",
                    "previewURL": "http://google.com",
                    "purgeObject": false,
                    "screenshot": "",
                    "buttonCollapse": true,
                    "version": "1",
                    "thumbnail": "http://google.com",
                    "selectedPrefs": [],
                    "removed": false,
						"gadgetContentType": {
						    "href": "http://google.com",
						    "type": "url",
						    "cdata": null
						},
                    "domAlias": "",
                    "collapsed": false,
                    "mid": "CC9LIZ211IQ4XXFG3V6NV",
                    "description": "Yield Curve",
                    "scrolling": null,
                    "authorEmail": "",
                    "children": null,
                    "author": ""
                }], //end Gadget
                "version": "1"
            },  //end Column
            {
                "type": "Column",
                "childrenType": "Gadget",
                "domAlias": "",
                "position": 1,
                "authRules": "",
                "id": "9S7T0EY6IUTNK9PG02Z",
                "children": [],
                "version": "1"
            }],  //end Column
            "addWidgetAllowed": true,
            "layoutType": "2colR"
        }], // end TabPage
        "addTabAllowed": true,
        "version": "1" 
    }],  //end TabContainer
    "loggingType": "error",
    "minimizable": true,
    "dashboardCategories": ""
}],  //end Portal
"version": "1" //end CCO
}, function(error, portals){});

module.exports = PortalProvider;