/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    digestCount: function (req, res) {
        Digest.count ().exec (function (error, count) {
            req.socket.emit ('digestCount', {
                count: count
            });
        });
    },


    startSearch: function (req, res) {
        DigestService.start (req);
    }


};

