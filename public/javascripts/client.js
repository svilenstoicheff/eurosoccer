angular.module('Soccer', []);

angular.module('Soccer')
  .controller('Teams', function($scope){
  	console.log('inside Teams');

  	$scope.getTeamsData = function(){
  		alert('here');
  	};
console.log($scope);

  //		$http.get(url).
  //success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
  //  console.log(data);
  //}).
  //error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  //});

  });

  $(document).ready(function(){
  	$('.teamBadge, .teamName').on('click', function(e){
  		var url = $(this).attr('href');
  		e.preventDefault();
  		$('ul.playerList').html('');
  			$.ajax({
  				url: url, 
  				headers:{"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
  				dataType: 'json'
  			}).done(function(data){
  				console.log(data);
  				$('section.teamInfo h2').html(data.name);
  				$('section.teamInfo .marketValue').html(data.squadMarketValue);
  				$('section.teamInfo').show();

  				$('a.seePlayers').on('click', function(){
  					$.ajax({
  						url: data._links.players.href, 
  						headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
  						dataType: 'json'
  					}).done(function(teams_data){
  						console.log(teams_data);
  						$.each(teams_data.players, function(i, player){
  							$('ul.playerList').append('<li>'+ player.name +'</li>');
  						});
  						
  					});
  				});

  			});

  		//alert(url);
  	});
  });
