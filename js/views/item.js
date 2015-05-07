'use strict';
define([
  "jquery",
  "underscore",
  "backbone",
  "hbs!views/templates/item"
], function($, _, Backbone, itemTemplate) {
  return Backbone.View.extend({
    events: {
      'click .save-item': 'saveItem',
      'click .delete-item': 'deleteItem',
      'keyup .name': 'formChange',
      'keyup .price': 'formChange'
    },
      
    initialize: function(options) {
      this.id = options.id;
      this.items = JSON.parse(window.localStorage.items || '[]');
      this.item = _.find(this.items, function(item, index) {
        if(item.id === this.id) {
          this.index = index;
          return true;
        }
      }, this);
    },

    render: function() {
      this.$el.html(itemTemplate({
        name: this.item.name,
        price: this.item.price 
      }));
      this.formChange();

      return this;
    },

    cleanup: function() {
      this.undelegateEvents();
    },

    formChange: function() {
      // due to input type=number, validation passes correctly
      if(this.$('.name').val().length > 0 && this.$('.price').val().length > 0) {
        this.$('.save-item').removeAttr('disabled');
      } else {
        this.$('.save-item').attr('disabled', 'disabled');
      }
    },

    saveItem: function() {
      this.items[this.index] = {
        id: this.id,
        name: this.$('.name').val(),
        price: parseInt(this.$('.price').val())
      };   
      window.localStorage.items = JSON.stringify(this.items);
      window.Router.navigate('/', {trigger: true});
    },

    deleteItem: function() {
      this.items.splice(this.index, 1);
      window.localStorage.items = JSON.stringify(this.items);
      window.Router.navigate('/', {trigger: true});
    },
  });
});
