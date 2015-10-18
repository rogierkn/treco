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
          resultsPerKeyword: 2,
          sortMethod: {
            value: 2,
            options: ["relevance", "hot", "top", "new", "comments"]
          },
          timePeriod: {
            value: 2,
            options: ["hour", "day", "week", "month", "year", "all"]
          }
        },
        filterRules: {
          upvotesCount: 0,
          subscriberCount: 0,
          duplicates: {
            filter: true,
            merge: true,
          },
          custom: [
            {term: 'european', title: true, body: true, username: true}
          ]
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
          categorise: false,
          translations: {
            on: 'on'
          },
          nonParticipatingLinks: true
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

