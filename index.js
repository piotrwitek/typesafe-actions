'use strict';

// This determines which build to use based on the `NODE_ENV` of your end user.
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/typesafe-actions.cjs.production.js');
} else {
  module.exports = require('./dist/typesafe-actions.cjs.development.js');
}
