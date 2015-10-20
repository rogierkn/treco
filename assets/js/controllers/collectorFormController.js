app.controller ('collectorFormController', ['$scope', '$state', function ($scope, $state) {


    //$state.go('collector');


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
                merge: true,
            },
            custom: [
                { term: 'european', title: true, body: true, username: true }
            ]
        },
        categories: {
            pictures: true,
            gifs: true,
            videos: true,
            links: true,
            self: true,
        },
        // Todo implement below
        markup: {
            categorise: false,
            translations: {
                on: 'on'
            },
            nonParticipatingLinks: true
        },
    };


    $scope.log = function () {
        console.log ($scope.digest.filterRules.custom);
    };


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
    $scope.filtersCanContinue = function() {
        if($scope.digest.filterRules.upvotesCount < 0 || $scope.digest.filterRules.upvotesCount > 50000) {
            return false;
        }

        if($scope.digest.filterRules.subscriberCount < 0 || $scope.digest.filterRules.subscriberCount > 30000000) {
            return false;
        }

        if(!$scope.digest.filterRules.duplicates.filter && $scope.digest.filterRules.duplicates.merge) {
            $scope.digest.filterRules.duplicates.merge = false;
        }

        return true;
    };
    $scope.filtersContinue = function() {
        if($scope.filtersCanContinue()) {
            $state.go('collector-form.customFilters');
        }
    }
    // End Filters


    // Custom Filters
    $scope.createCustomFilter       = function () {
        if ($scope.digest.filterRules.custom.length == 20) {
            Materialize.toast ('You can only use 20 custom filters', 2000);
        } else {
            $scope.digest.filterRules.custom.push ({ term: '', title: true, body: true, username: true });
        }
    };
    $scope.removeCustomFilter = function (index) {
        $scope.digest.filterRules.custom.splice (index, 1);
    };
    $scope.customFiltersCanContinue = function () {
        if ($scope.digest.filterRules.custom.length == 0) {
            return false;
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
            throw "Implement filter continue";
            //$state.go ('collector-form.search-parameters');
        }
    };
    // End Custom Filters

}]);
