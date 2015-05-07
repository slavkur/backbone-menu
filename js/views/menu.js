'use strict';
define([
  "jquery",
  "underscore",
  "backbone",
  "hbs!views/templates/menu"
], function($, _, Backbone, menuTemplate) {
  return Backbone.View.extend({
    events: {
      'click .add-item': 'addItem',
      'keyup .name': 'formChange',
      'keyup .price': 'formChange'
    },
      
    initialize: function(options) {
      this.items = JSON.parse(window.localStorage.items || '[]');
      this.itemsIterator = parseInt(window.localStorage.itemsIterator) || 1;
      if(this.items.length === 0) {
        // make sure we have default values to show on menu, and cache it
        this.items = [{
          id: this.itemsIterator,
          name: "Макароны",
          price: 115
        }, {
          id: ++this.itemsIterator,
          name: "Салат столичный",
          price: 30
        }];
        window.localStorage.itemsIterator = ++this.itemsIterator;
        window.localStorage.items = JSON.stringify(this.items);
      }
    },

    render: function() {
      this.$el.html(menuTemplate({
        items: this.items
      }));

      return this;
    },

    cleanup: function() {
      this.undelegateEvents();
    },

    addItem: function(e) {
      this.items.push({
        id: this.itemsIterator,
        name: this.$('.name').val(),
        price: this.$('.price').val()
      });
      window.localStorage.items = JSON.stringify(this.items);
      window.localStorage.itemsIterator = ++this.itemsIterator;
      this.render();
    },

    formChange: function() {
      // due to input type=number, validation passes correctly
      if(this.$('.name').val().length > 0 && this.$('.price').val().length > 0) {
        this.$('.add-item').removeAttr('disabled');
      } else {
        this.$('.add-item').attr('disabled', 'disabled');
      }
    }

  });
});
