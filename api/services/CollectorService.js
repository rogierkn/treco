module.exports = {

    collect: function (req, digestService) {

        var parameters = req.body;


        var keywordsCount = parameters.keywords.length;

        // Limit to max 10 keywords
        keywordsCount = Math.min (keywordsCount, 10);

        var threads = [];
        var counter = 0;

        req.socket.emit ('searchUpdate', { text: 'Searching for keywords' });

        for (var i = 0; i < keywordsCount; i++) {
            console.log ("On keyword:" + parameters.keywords[i].value);

            // API Call
            sails.redditAPI ('/search').listing ({
                include_facets: true,
                limit: ApiParamValidatorService.limit (parameters.searchParameters.resultsPerKeyword),
                q: parameters.keywords[i].value,
                restrict_sr: false,
                sort: ApiParamValidatorService.sort (parameters.searchParameters.sortMethod.value),
                sr_detail: true,
                syntax: 'lucene',
                t: ApiParamValidatorService.time (parameters.searchParameters.timePeriod.value)

            }).then (function (response) {


                // Add found threads to array
                var count = response.allChildren.length;
                for (var j = 0; j < count; j++) {
                    threads.push (response.allChildren[j]);
                }
                counter++;

                req.socket.emit('searchUpdate', { text: 'Found threads for ' + counter + ' keywords', subText: keywordsCount - counter + ' keywords remaining'});


                // If done
                if (counter == keywordsCount) {
                    console.log ("Search has finished");
                    console.log ("Threads: " + threads.length);
                    req.socket.emit ('searchUpdate', { text: 'Found ' + threads.length + ' threads' });
                    digestService (req, threads, parameters);
                }
            });
        }

    }

};
