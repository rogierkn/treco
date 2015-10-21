/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  digestCount: function (req, res) {
        Digest.count().exec(function (error, count) {
      res.json({
        count: count
      });
    });
  },

  digestIncrease: function (req, res) {
    console.log("DigestIncrease websock");
    Digest.create().exec(function (err, created) {
      Digest.count().exec(function (err, count) {
        sails.sockets.blast("digestCount", {
          count: count
        });
      });
    });
  },


    startSearch: function(req, res) {
        DigestService.start(req);
    }




};

