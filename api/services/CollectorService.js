module.exports = {

  collect: function(parameters, digestService) {

    console.log("Starting collect");


    var keywordsCount = parameters.keywords.length;

    var threads = [];
    var counter = 0;

    for (var i = 0; i < keywordsCount; i++) {
      console.log("On keyword:" + parameters.keywords[i].value);

      // API Call
      sails.redditAPI ('/search').listing ({
        include_facets: true,
        limit: ApiParamValidatorService.limit(parameters.searchParameters.resultsPerKeyword),
        q: parameters.keywords[i].value,
        restrict_sr: false,
        sort: ApiParamValidatorService.sort(parameters.searchParameters.sortMethod.value),
        sr_detail: true,
        syntax: 'lucene',
        t: ApiParamValidatorService.time(parameters.searchParameters.timePeriod.value)

      }).then (function (response) {


        // Add found threads to array
        var count = response.allChildren.length;
        for (var j = 0; j < count; j++) {
          threads.push (response.allChildren[j]);
        }
        counter++;

        // If done
        if(counter == keywordsCount) {
          console.log("Search has finished");
          digestService(threads, parameters);
        }
      });
    }

  }

};
