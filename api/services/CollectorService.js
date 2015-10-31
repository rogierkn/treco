module.exports = {

    collect: function (req, callback) {

        var parameters = req.body;


        var keywordsCount = parameters.keywords.length;

        // Limit to max 10 keywords
        keywordsCount = Math.min (keywordsCount, 10);

        sails.log(req.ip + "| keywords: [" + parameters.keywords.join(', ') + "]");

        var threads = [];
        var counter = 0;

        req.socket.emit ('searchUpdate', { text: 'Searching for keywords', subText: '' });

        for (var i = 0; i < keywordsCount; i++) {
            // API Call
            sails.redditAPI ('/search').listing ({
                include_facets: true,
                limit: ApiParamValidatorService.limit (parameters.searchParameters.resultsPerKeyword),
                q: parameters.keywords[i].value.toLowerCase(),
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


                var text = 'Found threads for ' + counter + ' keyword' + (counter === 1 ? '' : 's');
                var subText = keywordsCount - counter + ' keyword' + (keywordsCount - counter === 1 ? '' : 's') + ' remaining';

                req.socket.emit('searchUpdate', { text: text, subText: subText});


                // If done
                if (counter == keywordsCount) {
                    sails.log(req.ip + "| found " + threads.length + " threads");

                    req.socket.emit ('searchUpdate', { text: 'Found ' + threads.length + ' thread' + (threads.length === 1 ? '' : 's'), subText: '' });
                    callback (req, threads, parameters);
                }
            });
        }

    }

};
