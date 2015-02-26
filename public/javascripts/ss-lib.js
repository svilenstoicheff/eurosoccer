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
	//console.log(URL);
	$.ajax({
  		url: URL, 
 		headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
 		dataType: 'json'
 		}).done(function(data){
 			//console.log(data);
        $('#standings table tbody').html('');
        $('#leagueName').text(data.leagueCaption);
 		$.each(data.standing, function(i, team){
  							$('#standings table tbody').append('<tr><td>'+team.position+'</td><td>'+ 
                  team.teamName +'</td><td>'+
                  team.playedGames + '</td><td>'+
                  team.points + '</td><td>'+
                  team.goals + '</td><td>'+
                  team.goalsAgainst + '</td><td>'+
                  team.goalDifference + '</td></tr>');
  						  }); 
                $('#standings').show();
	}).fail( function(){
		console.log('error');
	});
};

SS.barChart = function(data){

    var margin = {top: 20, right: 20, bottom: 30, left: 110},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);

x.domain(data.map(function(d){ return d[0]}));
y.domain([0, d3.max(data, function(d){return d[1]})]);


var xAxis = d3.svg.axis().scale(x).orient("bottom");

var yAxis = d3.svg.axis().scale(y).orient("left");

var chart = d3.select("#chartContainer").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

//x axis
chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+margin.left+"," + height + ")")
      .call(xAxis);
//y axis
chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+margin.left+",0)")  
      .call(yAxis);

chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("transform", function(d, i){
                      return "translate("+ (margin.left + x(d[0]))+", 0)";
                    })
      .attr("x", function(d) { return x.rangeBand() - margin.left/4; })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return height - y(d[1]); });

//not sure why this is here
function type(d) {
    d[0] = +d[0]; // coerce to number
    return d;
  }

/*
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);




  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });

      */



}