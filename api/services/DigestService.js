module.exports = {

    start: function (req) {
        CollectorService.collect (req, this.processThreads);
    },

    processThreads: function (req, apiThreads, parameters) {

        console.log("Found " + apiThreads.length + " threads");

        // Sort threads by categories
        apiThreads = SorterService.sort (apiThreads);

        // Filter
        var originalThreadCount = apiThreads.length;
        apiThreads = FilterService.filter (apiThreads, parameters.filterRules);
        req.socket.emit('searchUpdate', {text: 'Filtered ' + (originalThreadCount - apiThreads.length) + ' threads', subText: apiThreads.length + ' threads remaining'});


        // Only categorise if user wants it
        if (parameters.markup.categorise) {

            apiThreads = CategoriserService.categorise (apiThreads, parameters.categories);
        }

        var postBuilder = new PostBuilderService ();
        postBuilder
            .text ("Last month's top posts mentioning the Netherlands in some way.").newLine ()
            .text ("This is an automated post, therefore not all entries might be correct. Contact /u/jesuisroger with any complaints or suggestions.").newLine ()
            .newLine ();

        if (parameters.markup.categorise) {
            postBuilder.monthlyDigestListCategorised (apiThreads, parameters.markup);
        } else {
            postBuilder.monthlyDigestList (apiThreads, parameters.markup);
        }

        console.log (postBuilder.get ());


    }

};
