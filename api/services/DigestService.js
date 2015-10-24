module.exports = {

    start: function (req) {
        CollectorService.collect (req, this.processThreads);
    },

    processThreads: function (req, apiThreads, parameters) {



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
            .text("Collection of threads").newLine().newLine();


        if (parameters.markup.categorise) {
            postBuilder.monthlyDigestListCategorised (apiThreads, parameters.markup);
        } else {
            postBuilder.monthlyDigestList (apiThreads, parameters.markup);
        }

        postBuilder.newLine().newLine().text(MarkdownService.link("http://ikwistgeendomeinnaam.eu/" ,"Treco for reddit") + ", built by /u/jesuisroger");





        req.socket.emit('searchFinished', {
            markdown: postBuilder.get()
        });

        Digest.create().exec(function () {
            Digest.count().exec(function (err, count) {
                sails.sockets.blast("digestCount", {
                    count: count
                });
            });
        });


    }

};
