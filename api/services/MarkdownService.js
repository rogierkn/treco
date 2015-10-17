module.exports = {
  newLine: "&nbsp;  \n",
  space: "&nbsp;",

  link: function (link, text) {
    return '[' + text + '](' + link + ' )';
  },

  list: function (items) {
    var string = "\n";
    for (var i = 0; i < items.length; i++) {
      string += "* " + items[i] + "\n";
    }
    return string + "\n";
  },

  linksList: function (categories) {
    var string = "\n";

    for (var category in categories) {
      string += "\n**" + category + "**  \n"
      var links = categories[category];
      for (var link in links) {
        string += "* " + links[link] + "  \n";
      }
    }

    return string + "&nbsp;  \n"
  },

  subreddit: function (subreddit) {
    return "/r/" + subreddit;
  }

};
