module.exports = {

  start: function (parameters) {
    CollectorService.collect(parameters, this.processThreads);
  },

  processThreads: function (apiThreads, parameters) {
    apiThreads = SorterService.sort(apiThreads);
    apiThreads = FilterService.filter(apiThreads, parameters.filterRules);

    // Only categorise if user wants it
    if (parameters.markup.categorise) {
      apiThreads = CategoriserService.categorise(apiThreads, parameters.categories);
    }

    var postBuilder = new PostBuilderService();
    postBuilder
      .text("Last month's top posts mentioning the Netherlands in some way.").newLine()
      .text("This is an automated post, therefore not all entries might be correct. Contact /u/jesuisroger with any complaints or suggestions.").newLine()
      .newLine();

    if(parameters.markup.categorise) {
      postBuilder.monthlyDigestListCategorised(apiThreads, parameters.markup);
    } else {
      postBuilder.monthlyDigestList(apiThreads, parameters.markup);
    }

    console.log(postBuilder.get());


  }

};
