app.controller( 'collectorFormController', [ '$scope', '$state', function ( $scope, $state )
{


  //$state.go('collector');


  $scope.digest = {
    keywords: [ { value: '' } ],
    searchParameters: {
      resultsPerKeyword: 25,
      sortMethod: {
        value: 2,
        options: [ 0, 1, 2, 3, 4 ]
      },
      timePeriod: {
        value: 2,
        options: [ 0, 1, 2, 3, 4, 5 ]
      }
    },
    filterRules: {
      upvotesCount: 0,
      subscriberCount: 0,
      duplicates: {
        filter: true,
        merge: true,
      }
    }
  };


  $scope.log = function ( loggable )
  {
    console.log( loggable );
  };


  // Keywords
  $scope.createKeyword = function ()
  {
    $scope.digest.keywords.push( { value: '' } );
    $scope.log( $scope.digest.keywords );
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
