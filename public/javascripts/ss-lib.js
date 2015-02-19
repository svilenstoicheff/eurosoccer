//JS lib functions
var SS = SS || {};
SS.formatDate = function (datestr){
        if (datestr === null || datestr === '' || datestr === undefined){
          return '';
        }
          var formattedDateStr = datestr.replace(/-/g, '/'),
              rawDate = new Date(formattedDateStr), 
              oldDate = rawDate.toLocaleDateString().split('/'),
              newDate = '';

              for(var i = 0; i < oldDate.length; i++){
                if (oldDate[i].length === 1) {
                  oldDate[i] = '0' + oldDate[i];
                }
                newDate += oldDate[i] + '/';
              }
          var lastChar = newDate.length - 1;
          if (newDate.charAt(lastChar) === '/'){
            newDate = newDate.substr(0, lastChar);
          }
        return newDate;
      }
SS.euroRate;
SS.convertEurUsd = function(){

}

SS.getLeagueStandings = function(URL){
	console.log(URL);
	$.ajax({
  		url: URL, 
 		headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
 		dataType: 'json'
 		}).done(function(data){
        $('#standings tbody').html('');
 		$.each(data.standing, function(i, team){
  							$('#standings tbody').append('<tr><td>'+ team.teamName +'</td></tr>');
  						});
	});
};