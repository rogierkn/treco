module.exports = {

  sortMapping: ['relevance', 'hot', 'top', 'new', 'comments'],
  timeMapping: ['hour', 'day', 'week', 'month', 'year', 'all'],

  limit: function (amount) {
    try {
      return Math.min(100, parseInt(amount));
    } catch (err) {
      console.log("Invalid amount for search limiting");
      return 25;
    }
  },

  sort: function (sort) {
    try {
      return this.sortMapping[parseInt(sort)];
    } catch (err) {
      console.log("Invalid mapping for search sort algorithm");
      return 'top';
    }
  },

  time: function (time) {
    try {
      return this.timeMapping[parseInt(time)];
    } catch (err) {
      console.log("Invalid mapping for search time algorithm");
      return 'week';
    }
  },

  upvotes: function (count) {
    try {
      return Math.max(parseInt(count), 0);
    } catch (err) {
      return 0;
    }
  },

  subscribers: function (count) {
    try {
      return Math.max(parseInt(count), 0);
    } catch (err) {
      return 0;
    }
  },

  duplicateEnabled: function (duplicateFilterEnabled) {
    try {
      return Boolean(duplicateFilterEnabled);
    } catch (err) {
      return true;
    }
  },

  duplicateMerge: function (duplicateFilterMerge) {
    try {
      return Boolean(duplicateFilterMerge);
    } catch (err) {
      return true;
    }
  },

  category: function (category) {
    try {
      return Boolean(category);
    } catch (err) {
      return true;
    }
  }


};
