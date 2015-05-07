requirejs.config({
  "baseUrl": "js",
  paths: {
    "jquery": "lib/jquery.min",
    "less": "lib/less.min",
    "underscore": "lib/underscore-min",
    "backbone": "lib/backbone-min",
    "handlebars": "lib/handlebars-v1.3.0",
    "hbs": "lib/require/hbs",
    "text": "lib/require/text"
  },
  shim: {
    "handlebars": {
      exports: "Handlebars"
    }
  },
  "hbs": {
    templateExtension: ".html",
    disableI18n: true
  }
});

requirejs(['main', 'less']);