var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'plantilla1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test'
  },

  test: {
    root: rootPath,
    app: {
      name: 'plantilla1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/plantilla1-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'plantilla1'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/plantilla1-production'
  }
};

module.exports = config[env];
