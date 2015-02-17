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
      var playerList = document.querySelector('table.playerList tbody');
      $(playerList).html('');

      //get the player data
            $.ajax({
              url: data._links.players.href, 
              headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
              dataType: 'json'
            }).done(function(teams_data){
              console.log(teams_data);
              $('table.playerList tbody').html('');
              $.each(teams_data.players, function(i, player){
                console.log(player);
                function formatDate(datestr){
                    var rawDate = new Date(datestr.replace(/-/g, '/')), 
                        rawMonth = rawDate.getMonth(), 
                        rawDay = rawDate.getDay(), 
                        rawYear = 1900+ rawDate.getYear();
                        if (rawDay.length === 1){
                          rawDay = '0' + rawDay;
                        }
                        return rawMonth + '/' + rawDay + '/' + rawYear;

                }
                $('table.playerList tbody').append('<tr><td>'+ 
                  player.name + '</td><td>' + 
                  player.position + '</td><td>' + 
                  player.jerseyNumber + '</td><td>'+ 
                  formatDate(player.dateOfBirth) + '</td><td>' + 
                  player.nationality + '</td><td>' + 
                  player.contractUntil + '</td><td>'+ 
                  player.marketValue +'</td></tr>');
                 $('body,html').animate({scrollTop: $('section.teamInfo').offset().top - 30});
              });
              
            });

      //jQuery for now
          $('a.seePlayers').on('click', function(){
            $.ajax({
              url: data._links.players.href, 
              headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
              dataType: 'json'
            }).done(function(teams_data){
              console.log(teams_data);
              $('table.playerList tbody').html('');
              $.each(teams_data.players, function(i, player){
                console.log(player);
                $('table.playerList tbody').append('<tr><td>'+ player.name + '</td><td>' + player.position + '</td><td>' + player.jerseyNumber + '</td><td>'+ player.dateOfBirth + '</td><td>' + player.nationality + '</td><td>' +player.contractUntil + '</td><td>'+ player.marketValue +'</td></tr>');
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



// add format() to Date
Date.prototype.format = function (formatString) {
    var out = new String();
    var token = ""
    for (var i = 0; i < formatString.length; i++) {
        if (formatString.charAt(i) == token.charAt(0)) {
            token = token.concat(formatString.charAt(i));
            continue;
        }
        out = out.concat(this.convertToken(token));
        token = formatString.charAt(i);
    }
    return out + this.convertToken(token);
};

// internal call to map tokens to the date data
Date.prototype.convertToken = function (str) {
    switch (str.charAt(0)) {
        case 'y': // set year
            if (str.length > 2)
                return this.getFullYear();
            return this.getFullYear().toString().substring(2);
        case 'd': // set date
            return Date.zeroPad(this.getDate(), str.length);
        case 'D': // set day in year
            return this.getYearDay();
        case 'a':
            return this.getHours() > 11 ? "PM" : "AM";
        case 'H': // set hours
            return Date.zeroPad(this.getHours(), str.length);
        case 'h':
            return Date.zeroPad(this.get12Hours(), str.length);
        case 'm': // set minutes
            return Date.zeroPad(this.getMinutes(), 2);
        case 's': // set secondes
            return Date.zeroPad(this.getSeconds(), 2);
        case 'S': // set milisecondes
            return Date.zeroPad(this.getMilliseconds(), str.length);
        case 'x': // set epoch time
            return this.getTime();
        case 'Z': // set time zone
            return (this.getTimezoneOffset() / 60) + ":" +
      Date.zeroPad(this.getTimezoneOffset() % 60, 2);
        case 'M': // set month
            if (str.length > 3) return this.getFullMonthName();
            if (str.length > 2) return this.getShortMonthName();
            return Date.zeroPad(this.getMonth() + 1, str.length);
        case 'E': // set dow
            if (str.length > 3) return this.getDOWName();
            if (str.length > 1) return this.getShortDOWName();
            return this.getDay();
        default:
            return str;
    }
};

// helper function to add required zero characters to fixed length fields
Date.zeroPad = function (num, width) {
    num = num.toString();
    while (num.length < width)
        num = "0" + num;
    return num;
};
