module.exports = {

  start: function (parameters) {
    CollectorService.collect(parameters, this.processThreads);
  },

  processThreads: function (apiThreads, parameters) {
    apiThreads = SorterService.sort(apiThreads);
    apiThreads = FilterService.filter(apiThreads, parameters.filterRules);
    categorisedThreads = CategoriserService.categorise(apiThreads);

    var postBuilder = new PostBuilderService();
    var string = postBuilder
      .text("Last month's top posts mentioning the Netherlands in some way.").newLine()
      .text("This is an automated post, therefore not all entries might be correct. Contact /u/jesuisroger with any complaints or suggestions.").newLine()
      .newLine()
      .monthlyDigestList(categorisedThreads)
      .get();

    console.log(string);


  }

};
