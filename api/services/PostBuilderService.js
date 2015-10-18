var postBuilder = function () {

  this.post = "";

  return this;
};

postBuilder.prototype.get = function () {
  return this.post;
};

postBuilder.prototype.newLine = function () {
  this.post += MarkdownService.newLine;
  return this;
};

postBuilder.prototype.text = function (string) {
  this.post += string;
  return this;
};


postBuilder.prototype.monthlyDigestList = function (threads, markup) {
  var string = "\r\n";


  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];

    // NSWF tag if necessary
    var over18 = "";
    if (thread.over_18) {
      over18 = "`NSFW`";
    }
    // Create strings
    var contentLink = "[" + MarkdownService.link(thread.link, "LINK") + "]";
    var commentLink = "[" + MarkdownService.link(thread.threadLink, thread.title, markup.nonParticipatingLinks) + "]";
    var subreddits = "";

    // If thread is a dupe
    if (threads[i].subreddits.length > 1) {
      for (var x = 0; x < thread.subreddits.length; x++) {
        // If first item, add no comma
        subreddits += ((x === 0) ? '' : ', ') +
          MarkdownService.link(
            thread.subreddits[x].threadLink,
            MarkdownService.subreddit(thread.subreddits[x].name),
            markup.nonParticipatingLinks
          );
      }
    }
    else {
      subreddits = MarkdownService.link(
        thread.subreddits[0].threadLink,
        MarkdownService.subreddit(thread.subreddits[0].name),
        markup.nonParticipatingLinks
      )
      ;
    }

    // Glue together
    string += "* " + over18 + contentLink + " " + commentLink + " " + markup.translations.on + " " + subreddits + "\r\n";
  }


  this.post += string;

  return this;
};

postBuilder.prototype.monthlyDigestListCategorised = function (categories, markup) {
  var string = "";

  for (var category in categories) {
    string += "\n**" + category.toUpperCase() + "**" + MarkdownService.newLine + "\r\n";
    var threads = categories[category];
    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];

      // NSWF tag if necessary
      var over18 = "";
      if (thread.over_18) {
        over18 = "`NSFW`";
      }
      // Create strings
      var contentLink = "[" + MarkdownService.link(thread.link, thread.type) + "]";
      var commentLink = "[" + MarkdownService.link(thread.threadLink, thread.title, markup.nonParticipatingLinks) + "]";
      var subreddits = "";

      // If thread is a dupe
      if (threads[i].subreddits.length > 1) {
        for (var x = 0; x < thread.subreddits.length; x++) {
          // If first item, add no comma
          subreddits += ((x === 0) ? '' : ', ') +
            MarkdownService.link(
              thread.subreddits[x].threadLink,
              MarkdownService.subreddit(thread.subreddits[x].name),
              markup.nonParticipatingLinks
            );
        }
      }
      else {
        subreddits = MarkdownService.link(
          thread.subreddits[0].threadLink,
          MarkdownService.subreddit(thread.subreddits[0].name),
          markup.nonParticipatingLinks
        );
      }

      // Glue together
      string += "* " + over18 + contentLink + " " + commentLink + " " + markup.translations.on + " " + subreddits + "\r\n";
    }
  }

  this.post += string;

  return this;
};

module.exports = postBuilder;
