app.controller( 'collectorFormController', [ '$scope', '$state', function ( $scope, $state )
{


  //$state.go('collector');


  $scope.digest = {
    keywords: [{ value: 'netherlands' }, { value: 'amsterdam' }],
    searchParameters: {
      resultsPerKeyword: 2,
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
      upvotesCount: 0,
      subscriberCount: 0,
      duplicates: {
        filter: true,
        merge: true,
      },
      custom: [
        {term: 'european', title: true, body: true, username: true}
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


  $scope.log = function ( loggable )
  {
    console.log( loggable );
  };


  // Keywords
  $scope.createKeyword = function ()
  {
    if($scope.digest.keywords.length == 10) {
      Materialize.toast('You can only use 10 keywords', 2000);
    } else {
      $scope.digest.keywords.push( { value: '' } );
    }
  };
  $scope.removeKeyword = function ( index )
  {
    $scope.digest.keywords.splice( index, 1 );
  };
  $scope.keywordsCanContinue = function ()
  {
    if ( $scope.digest.keywords.length == 0 )
    {
      return false;
    }

    for ( var i = 0; i < $scope.digest.keywords.length; i++ )
    {
      if ( $scope.digest.keywords[ i ] == '' )
      {
        return false;
      }
    }
    return true;
  };
  $scope.keywordsContinue = function ()
  {
    if ( $scope.keywordsCanContinue() )
    {
      $state.go( 'collector-form.search-parameters' );
    }
  };
  // End keywords


} ] );