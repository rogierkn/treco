app.controller ('collectorFormController', ['$scope', '$state', '$sce', function ($scope, $state) {

    $scope.searchStatus = {
        text: 'Submitting to server...',
        subText: ''
    };

    $scope.results = {
        markdown: ''
    };

    $scope.digest = {
        keywords: [{ value: 'netherlands' }, { value: 'amsterdam' }],
        searchParameters: {
            resultsPerKeyword: 25,
            sortMethod: {
                value: 2,
                options: ["relevance", "hot", "top", "new", "comments"]
            },
            timePeriod: {
                value: 2,
                options: ["hour", "day", "week", "month", "year", "all"]
            }
        },
        filterRules: {
            upvotesCount: 500,
            subscriberCount: 50000,
            duplicates: {
                filter: true,
                merge: true
            },
            custom: [
                { term: 'european', title: true, body: true, username: true }
            ]
        },
        categories: {
            pictures: { enabled: true },
            gifs: { enabled: true },
            videos: { enabled: true },
            links: { enabled: true },
            self: { enabled: true }
        },
        markup: {
            categorise: true,
            nonParticipatingLinks: true,
            translations: {
                on: 'on'
            }

        }
    };

    $scope.digestReset = function () {
        $scope.digest = {
            keywords: [{ value: '' }],
            searchParameters: {
                resultsPerKeyword: 25,
                sortMethod: {
                    value: 2,
                    options: ["relevance", "hot", "top", "new", "comments"]
                },
                timePeriod: {
                    value: 2,
                    options: ["hour", "day", "week", "month", "year", "all"]
                }
            },
            filterRules: {
                upvotesCount: 500,
                subscriberCount: 50000,
                duplicates: {
                    filter: true,
                    merge: true
                },
                custom: [
                    { term: '', title: true, body: true, username: true }
                ]
            },
            categories: {
                pictures: { enabled: true },
                gifs: { enabled: true },
                videos: { enabled: true },
                links: { enabled: true },
                self: { enabled: true }
            },
            markup: {
                categorise: true,
                nonParticipatingLinks: true,
                translations: {
                    on: 'on'
                }
            }
        }
    };

    $scope.digestReset();


    // Keywords
    $scope.createKeyword       = function () {
        if ($scope.digest.keywords.length == 10) {
            Materialize.toast ('You can only use 10 keywords', 2000);
        } else {
            $scope.digest.keywords.push ({ value: '' });
        }
    };
    $scope.removeKeyword       = function (index) {
        $scope.digest.keywords.splice (index, 1);
    };
    $scope.keywordsCanContinue = function () {
        if ($scope.digest.keywords.length == 0) {
            return false;
        }

        for (var i = 0; i < $scope.digest.keywords.length; i++) {
            if (!$scope.digest.keywords[i].value) {
                return false;
            }
        }
        return true;
    };
    $scope.keywordsContinue    = function () {
        if ($scope.keywordsCanContinue ()) {
            $state.go ('collector-form.searchParameters');
        }
    };
    // End keywords


    // searchParameters
    $scope.searchParametersCanContinue = function () {
        // Out of range
        if ($scope.digest.searchParameters.resultsPerKeyword <= 0 || $scope.digest.searchParameters.resultsPerKeyword > 100) {
            return false;
        }

        // Out of range
        if ($scope.digest.searchParameters.sortMethod < 0 || $scope.digest.searchParameters.sortMethod > 4) {
            return false;
        }

        // Out of range
        if ($scope.digest.searchParameters.timePeriod < 0 || $scope.digest.searchParameters.timePeriod > 5) {
            return false;
        }

        return true;
    };
    $scope.searchParametersContinue    = function () {
        if ($scope.searchParametersCanContinue ()) {
            $state.go ('collector-form.filterRules');
        }
    };
    // End searchParameters


    // Filters
    $scope.filtersCanContinue = function () {
        if ($scope.digest.filterRules.upvotesCount < 0 || $scope.digest.filterRules.upvotesCount > 50000) {
            return false;
        }

        if ($scope.digest.filterRules.subscriberCount < 0 || $scope.digest.filterRules.subscriberCount > 30000000) {
            return false;
        }

        if (!$scope.digest.filterRules.duplicates.filter && $scope.digest.filterRules.duplicates.merge) {
            $scope.digest.filterRules.duplicates.merge = false;
        }

        return true;
    };
    $scope.filtersContinue    = function () {
        if ($scope.filtersCanContinue ()) {
            $state.go ('collector-form.customFilters');
        }
    };
    // End Filters


    // Custom Filters
    $scope.createCustomFilter       = function () {
        if ($scope.digest.filterRules.custom.length == 20) {
            Materialize.toast ('You can only use 20 custom filters', 2000);
        } else {
            $scope.digest.filterRules.custom.push ({ term: '', title: true, body: true, username: true });
        }
    };
    $scope.removeCustomFilter       = function (index) {
        $scope.digest.filterRules.custom.splice (index, 1);
    };
    $scope.customFiltersCanContinue = function () {
        if ($scope.digest.filterRules.custom.length == 0) {
            return true;
        }

        for (var i = 0; i < $scope.digest.filterRules.custom.length; i++) {
            if (!$scope.digest.filterRules.custom[i].term) {
                return false;
            }
        }
        return true;
    };
    $scope.customFiltersContinue    = function () {
        if ($scope.customFiltersCanContinue ()) {
            $state.go ('collector-form.categories');
        }
    };
    // End Custom Filters

    // Categories
    $scope.categoriesCanContinue = function () {
        for (var cat in $scope.digest.categories) {
            if ($scope.digest.categories[cat].enabled === true) {
                return true;
            }
        }
        return false;
    };
    $scope.categoriesContinue    = function () {
        if ($scope.customFiltersCanContinue ()) {
            $state.go ('collector-form.markup');
        }
    };
    // End Categories

    // Markup
    $scope.startSubmit = function () {
        io.socket.post ('/reddit/startSearch', $scope.digest);
        $state.go ('collector-form.status');
    };
    // End Markup


    var clipboard;
    var hasListener = false;
    io.socket.on ('searchUpdate', function (data) {
        $scope.searchStatus = data;
        $scope.$apply ();
    });
    io.socket.on ('searchFinished', function (data) {
        $scope.results = data;
        $scope.$apply ();
        $state.go ('collector-form.results');


        var clipboard = new Clipboard ('#copyBtn');

        if(!hasListener) {
            hasListener = true;
            clipboard.on ('success', function (e) {
                Materialize.toast ('Copied to clipboard!', 1500);
            });

            clipboard.on ('error', function (e) {
                Materialize.toast ('Ctrl + C to copy!', 3000);
            });

        }


    });


}]);
