/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {


  var Snoocore = require('snoocore');

  var account = {
    key: '_Oy-gmAd4kJNHQ',
    secret: 'szTJrGpv08N2lXWRXlo_IfpEd60',
    username: 'nederbot',
    password: 'rawr123'
  };

  sails.redditAPI = new Snoocore(
    {
      userAgent: '/u/' + account.username + ' /r/thenetherlands bot@0.1 (contact: /u/jesuisroger)',
      oauth: {
        type: 'script',
        key: account.key,
        secret: account.secret,
        username: account.username,
        password: account.password,
        scope: [ 'identity', 'edit', 'flair', 'history', 'read', 'save', 'submit', 'vote' ]
      }
    }
  );


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
