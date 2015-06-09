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
      //console.log(data);
      $scope.teamName = data.name;
      
      var teamMarketValue = data.squadMarketValue, 
          teamBackgroundImg = data.crestUrl;

          console.log(teamBackgroundImg);
                if(typeof SS.rate !== 'undefined' && teamMarketValue !== null && teamMarketValue !== '' && teamMarketValue !== 'undefined'){
                  teamMarketValue = parseInt(teamMarketValue.replace(/,/g, '')) * SS.rate;
                  teamMarketValue = Math.round(teamMarketValue / 1000) * 1000;
                  teamMarketValue = teamMarketValue.toLocaleString();
                }


      $scope.teamMarketValue = '$' +teamMarketValue;


      $scope.teamInfo = true;
      var playerList = document.querySelector('table.playerList tbody'),
          playersUrl = data._links.players.href;
      
      $(playerList).html('');

      //get the player data
            $.ajax({
              url: playersUrl, 
              headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
              dataType: 'json'
            }).done(function(teams_data){
              //console.log(teams_data);
              $('table.playerList tbody').html('');

              SS.playerValues = [];

              $.each(teams_data.players, function(i, player){
                //console.log(player);
                
                var playerMarketValue = player.marketValue, 
                    playerNumber = player.jerseyNumber,
                    playerName = player.name;
                if(typeof SS.rate !== 'undefined' && playerMarketValue !== null && playerMarketValue !== '' && playerMarketValue !== 'undefined'){
                  playerMarketValue = parseInt(player.marketValue.replace(/,/g, '')) * SS.rate;
                  playerMarketValue = Math.round(playerMarketValue / 1000) * 1000;


                  SS.playerValues.push([playerNumber, playerMarketValue, playerName]);
                  playerMarketValue = '$' + playerMarketValue.toLocaleString();
                }

                

                $('table.playerList tbody')
                .append('<tr><td>'+ 
                  player.name + '</td><td>' + 
                  player.position + '</td><td>' + 
                  player.jerseyNumber + '</td><td>'+ 
                  SS.formatDate(player.dateOfBirth) + '</td><td>' + 
                  player.nationality + '</td><td>' + 
                  SS.formatDate(player.contractUntil) + '</td><td>'+ 
                  playerMarketValue +'</td></tr>');

                 

              });

                              
                
                //for mobile - scroll to the players table
                var playersOffset =  $('section.teamInfo').offset().top;
                 if(playersOffset >  600){
                  $('body,html').animate({scrollTop: playersOffset});   
                 }
                
              
              $('#teamInfoId').css('background-image', 'url('+teamBackgroundImg+')');

                //console.log(SS.playerValues);

              SS.barChart(SS.playerValues);
             //SS.pieChart(SS.playerValues);
              //SS.pieChartWithLabels(SS.playerValues);
                $('#standings').hide();
            });

      //jQuery for now
          //unbind first
          $('a.seePlayers').off();
          //bind
          $('a.seePlayers').on('click', function(){
            $.ajax({
              url: playersUrl, 
              headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
              dataType: 'json'
            }).done(function(teams_data){
              //console.log(teams_data);
              $('table.playerList tbody').html('');
              $.each(teams_data.players, function(i, player){

                var playerMarketValue = player.marketValue;
                if(typeof SS.rate !== 'undefined' && playerMarketValue !== null && playerMarketValue !== '' && playerMarketValue !== 'undefined'){
                  playerMarketValue = parseInt(player.marketValue.replace(/,/g, '')) * SS.rate;
                  playerMarketValue = Math.round(playerMarketValue / 1000) * 1000;
                  playerMarketValue = '$' + playerMarketValue.toLocaleString();
                }

                $('table.playerList tbody').append('<tr><td>'+ 
                  player.name + '</td><td>' + 
                  player.position + '</td><td>' + 
                  player.jerseyNumber + '</td><td>'+ 
                  SS.formatDate(player.dateOfBirth) + '</td><td>' + 
                  player.nationality + '</td><td>' +
                  SS. formatDate(player.contractUntil) + '</td><td>'+ 
                  playerMarketValue +'</td></tr>');
              });
            });
          });

    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
      console.log(status);
    });
 	}; //end getTeamsData





$scope.getRate = function(){
  //$http.jsonp('http://www.apilayer.net/api/live?access_key=d7a7fa4cf0a794d3b4d59271547e19d6&callback=JSON_CALLBACK?')
  //.success(function(data, status, headers, config) {
        SS.rate = document.getElementById('teamsContainer').getAttribute('data-rate');
   //     console.log(data);
   // })
  //.error(function(data, status, headers, config) {
  //    console.log(status);
  //  });
}();
















 
 }); //end controller Teams

  $(document).ready(function(){

    $('a.standings').on('click', function(e){
      e.preventDefault();
      var url = $(e.target).attr('data-standings');
      console.log(url);
      SS.getLeagueStandings(url);

    });

    $('a#showChart').on('click', function(){
      $('#teamInfoId').hide();
      $('#chartContainer').show();
    });
    $('#playerDetails').on('click', function(){
      $('#teamInfoId').show();
      $('#chartContainer').hide();
    });

 //render the standings table      
 if($('#teamsContainer').length > 0 && $('#teamsContainer').attr('data-standingsurl').length > 0){
     SS.getLeagueStandings($('#teamsContainer').attr('data-standingsurl'));
 }
    
  /*** way to call the API with jQuery - not used

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