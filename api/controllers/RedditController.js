/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  digestCount: function (req, res) {
    DigestService.start(
      {
        keywords: [{ value: 'netherlands' }, { value: 'amsterdam' }],
        searchParameters: {
          resultsPerKeyword: 25,
          sortMethod: {
            value: 2,
            options: [0, 1, 2, 3, 4]
          },
          timePeriod: {
            value: 2,
            options: [0, 1, 2, 3, 4, 5]
          }
        },
        filterRules: {
          upvotesCount: 0,
          subscriberCount: 0,
          duplicates: {
            filter: true,
            merge: true,
          }
        },
        categories: {
          pictures: true,
          gifs: true,
          videos: true,
          links: true,
          self: true,
        },
        // Todo implement below
        markup: {
          categorise: true,
          translations: {
            found: 'found',
            on: 'on'
          },
        },
      }
    );

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
  }

};

