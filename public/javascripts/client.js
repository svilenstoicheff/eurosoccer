angular.module('Soccer', []);

angular.module('Soccer')
  .controller('Teams', function($scope, $http){
  	//console.log('inside Teams');
    //$scope.teamName = "test";

  	$scope.getTeamsData = function(url){
  	//alert(url);
    $http.defaults.headers.get = { 'X-Auth-Token' : '55e2b001494e4a19b5ea2aa10ada3c7e' }
    $http.get(url).
    success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
      console.log(data);
      $scope.teamName = data.name;
      $scope.teamMarketValue = data.squadMarketValue;
      $scope.teamInfo = true;
      var playerList = document.querySelector('ul.playerList');
      $(playerList).html('');
      //console.log(playerList);
      

      //jQuery for now
          $('a.seePlayers').on('click', function(){
            $.ajax({
              url: data._links.players.href, 
              headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
              dataType: 'json'
            }).done(function(teams_data){
              $('ul.playerList').html('');
              $.each(teams_data.players, function(i, player){
                $('ul.playerList').append('<li>'+ player.name +'</li>');
              });
              
            });
          });


    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
      console.log($scope.teamName);
  	};
//console.log($scope);

 
  });

  $(document).ready(function(){
  /*
  	$('.teamName').on('click', function(e){
  		var url = $(this).attr('href');
  		e.preventDefault();
  		$('ul.playerList').html('');
  			$.ajax({
  				url: url, 
  				headers:{"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
  				dataType: 'json'
  			}).done(function(data){
  				$('section.teamInfo h2').html(data.name);
  				$('section.teamInfo .marketValue').html(data.squadMarketValue);
  				$('section.teamInfo').show();

  				$('a.seePlayers').on('click', function(){
  					$.ajax({
  						url: data._links.players.href, 
  						headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
  						dataType: 'json'
  					}).done(function(teams_data){
              $('ul.playerList').html('');
  						$.each(teams_data.players, function(i, player){
  							$('ul.playerList').append('<li>'+ player.name +'</li>');
  						});
  						
  					});
  				});
  			});
  	});

    */
  });
