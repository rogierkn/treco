module.exports = {
  categorise: function (threads, rules) {
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
          if (ApiParamValidatorService.category(rules.pictures.enabled)) {
            collection.pictures.push(thread);
          }
          break;
        case "GIF":
          if (ApiParamValidatorService.category(rules.gifs.enabled)) {
            collection.gifs.push(thread);
          }
          break;
        case "VID":
          if (ApiParamValidatorService.category(rules.videos.enabled)) {
            collection.videos.push(thread);
          }
          break;
        case "LINK":
          if (ApiParamValidatorService.category(rules.links.enabled)) {
            collection.links.push(thread);
          }
          break;
        case "SELF":
          if (ApiParamValidatorService.category(rules.self.enabled)) {
            collection.self.push(thread);
          }
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
