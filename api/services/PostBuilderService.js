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
        string += this.threadLine(thread, markup);

    }


    this.post += string;

    return this;
};

postBuilder.prototype.monthlyDigestListCategorised = function (categories, markup) {
    var string = "\r\n";

    for (var category in categories) {

        var threads = categories[category];
        // If category has no threads, skip
        if (threads.length == 0) {
            continue;
        }
        string += "\n**" + category.toUpperCase () + "**" + MarkdownService.newLine + "\r\n";
        for (var i = 0; i < threads.length; i++) {
            var thread = threads[i];
            string += this.threadLine(thread, markup);
        }

    }

    this.post += string;

    return this;
};

postBuilder.prototype.threadLine = function(thread, markup) {
  var over18 = "";
  if (thread.over_18) {
    over18 = "`NSFW`";
  }
  // Create strings
  var contentLink = "[" + MarkdownService.link (thread.link, thread.type == undefined ? "LINK" : thread.type) + "]";
  var commentLink = "[" + MarkdownService.redditLink (thread.threadLink, thread.title, markup.nonParticipatingLinks) + "]";
  var subreddits  = "";

  // If thread is a dupe
  if (thread.subreddits.length > 1) {
    for (var x = 0; x < thread.subreddits.length; x++) {
      // If first item, add no comma
      subreddits += ((x === 0) ? '' : ', ') +
        MarkdownService.link (
          thread.subreddits[x].threadLink,
          MarkdownService.subreddit (thread.subreddits[x].name)
        );
    }
  }
  else {
    subreddits = MarkdownService.link (
      thread.subreddits[0].threadLink,
      MarkdownService.subreddit (thread.subreddits[0].name)
    )
    ;
  }

  // Glue together
  return "* " + over18 + contentLink + " " + commentLink + " " + markup.translations.on + " " + subreddits + "  \r\n";
};

module.exports = postBuilder;
