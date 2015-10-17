module.exports = {


  filter: function (threads, filterRules) {

    threads = this.upvotesFilter(threads, filterRules);

    threads = this.subscribersFilter(threads, filterRules);

    threads = this.sameIdFilter(threads);

    if (ApiParamValidatorService.duplicateEnabled(filterRules.duplicates.filter)) {
      threads = this.duplicatesFilter(threads, filterRules);
    }

    return threads;
  },

  upvotesFilter: function (threads, filterRules) {
    return threads.filter(function (thread) {
      // Min upvotes
      return thread.score >= ApiParamValidatorService.upvotes(filterRules.upvotesCount);
    });
  },

  subscribersFilter: function (threads, filterRules) {
    return threads.filter(function (thread) {
      // Min subscribers
      // First element of array because no check for dupes done yet
      return thread.subreddits[0].subscribers >= ApiParamValidatorService.subscribers(filterRules.subscriberCount);
    });
  },

  sameIdFilter: function (threads) {
    var count = threads.length;

    // Already looped over Ids
    var ids = [];
    // Ids that are dupes
    var duplicateIdx = [];
    for (var i = 0; i < count; i++) {
      // If id already exists, add to dupe array
      if (ids.indexOf(threads[i].id) !== -1) {
        duplicateIdx.push(i);
        // if not exists, now it will exist
      } else {
        ids.push(threads[i].id);
      }
    }

    // Loop over dupes their indexes, and remove at that index
    for (i = 0; i < duplicateIdx.length; i++) {
      threads.splice(duplicateIdx[i], 1);
    }

    return threads;
  },

  duplicatesFilter: function (threads, filterRules) {
    var ids = [];

    var mergeDupes = ApiParamValidatorService.duplicateMerge(filterRules.duplicates.merge);

    // Identify dupes
    for (var i = 0; i < threads.length; i++) {

      var mainThread = threads[i];

      // ID already passed sometime
      if (ids.indexOf(mainThread.id) != -1) continue;

      for (var j = 0; j < threads.length; j++) {
        // Skip if same
        if (j == i) continue;

        var loopThread = threads[j];

        // ID already passed sometime
        if (ids.indexOf(loopThread.id) != -1) continue;

        if (loopThread.link == mainThread.link) {
          if (mergeDupes) {
            for (var z = 0; z < loopThread.subreddits.length; z++) {
              threads[i].subreddits.push(loopThread.subreddits[z]);
            }
          }
          ids.push(loopThread.id);
        }
      }
    }

    // Remove dupes
    for (var x = threads.length - 1; x >= 0; x--) {
      if (ids.indexOf(threads[x].id) != -1) {
        threads.splice(x, 1);
      }
    }

    return threads;
  }


};
