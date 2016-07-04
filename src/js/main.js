var $ = require('./vendors/jquery-2.1.4.js');

var App = {};
App.model = require('./model/appModel');
App.view = require('./view/appView');

App.init = function () {
  App.model.getItemsData();
};

$(document).ready(App.init);
