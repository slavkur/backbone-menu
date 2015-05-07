'use strict';
define([
  "jquery",
  "handlebars",
  "backbone",
  "views/menu",
  "views/item"
], function($, Handlebars, Backbone, Menu, Item) {

  Handlebars.registerHelper('link', function(id, name) {
    id = Handlebars.Utils.escapeExpression(id);
    name  = Handlebars.Utils.escapeExpression(name);

    var result = '<a href="#' + (['item/'+ id, name.toLowerCase().replace(' ', '-')].join('-')) + '">' + name + '</a>';
    return new Handlebars.SafeString(result);
  });

  var Router = Backbone.Router.extend({
    routes: {
      "": "menu",
      "item/:name": "item"
    },

    menu: function() {
      this.cleanup();
      this.view = new Menu({
        el: $('#content')
      }).render();
    },

    item: function(path) {
      path = path.split('-');
      this.cleanup();
      this.view = new Item({
        el: $('#content'),
        id: parseInt(path[0])
      }).render();
    },

    initialize: function() {
      this.view = null;
    },

    cleanup: function() {
      if(this.view)
        this.view.cleanup();
      this.view = null;
    }

  });

  window.Router = new Router();
  Backbone.history.start({
    hashChange: true,
    pushState: false
  });
});