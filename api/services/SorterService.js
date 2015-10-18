module.exports = {

  sort: function (threads) {
    var sortedThreads = [];

    threads.forEach(function (item) {
      var thread = item.data;
      var entry = {
        subreddits: [{
          name: thread.sr_detail.display_name,
          subscribers: thread.sr_detail.subscribers,
          threadLink: thread.permalink
        }],
        id: thread.id,
        gilded: thread.gilded,
        author: thread.author,
        score: thread.score,
        over_18: thread.over_18,
        commentCount: thread.num_comments,
        isSelf: thread.is_self,
        body: thread.selftext,
        threadLink: thread.permalink,
        link: thread.url,
        title: thread.title
      };
      sortedThreads.push(entry);
    });

    return sortedThreads;
  }

};
