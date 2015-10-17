module.exports = {
  categorise: function (threads) {
    var collection = {
      pictures: [],
      gifs: [],
      videos: [],
      links: [],
      self: []
    };

    // Todo allow disable of certain categories

    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];
      thread.type = this.determineType(thread);

      switch (thread.type) {
        case "PIC":
          collection.pictures.push(thread);
          break;
        case "GIF":
          collection.gifs.push(thread);
          break;
        case "VID":
          collection.videos.push(thread);
          break;
        case "LINK":
          collection.links.push(thread);
          break;
        case "SELF":
          collection.self.push(thread);
          break;
      }
    }

    return collection;
  },

  determineType: function (thread) {
    // All types of posts we know of
    var linkTypes = {
      GIF: ['.gif', '.gifv'],
      PIC: ['.png', '.jpg', '.jpeg', 'imgur.com', 'photo', 'image'],
      VID: ['youtube.com', 'youtu.be', 'liveleak.com', 'streamable.com']
    };

    // If thread is selfpost return SELF
    if (thread.isSelf) {
      return "SELF";
    }

    // Check for each type we know of that can exist
    for (var linkType in linkTypes) {
      for (var type in linkTypes[linkType]) {
        if (thread.link.toLowerCase().indexOf(linkTypes[linkType][type]) > -1) {
          return linkType;
        }
      }
    }

    // Default return LINK if no match has been found
    return 'LINK';
  }

};
