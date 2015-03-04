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


//bar chart
SS.barChart = function(data){
  $('svg').remove(); //get rid of the previous chart, if there

    var margin = {top: 10, right: 10, bottom: 10, left: 110},
    width = 800 - margin.left - margin.right,
    height = 533 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 150]);

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

var barContainer = chart.selectAll(".barContainer")
    .data(data)
    .enter()
    .append('g').attr('class', 'barContainer')
    .attr("transform", function(d, i){
                        var yTranslate = y(d[1]);
                      return "translate("+ (margin.left + x(d[0]))+","+ yTranslate +")";
                    })
      .attr("x", function(d) { return x.rangeBand() - margin.left/4; })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return height - y(d[1]); });

    barContainer.append("rect")
      .attr("class", "bar")
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d[1]); });

  barContainer.append('text')
    .attr("transform", function(d, i){
                      return "rotate(-90) translate(10, 5)";
                    })
    .attr('dy', '.71em')
    .text(function(d){return d[2];});
  };







  SS.pieChart = function(data){
    $('svg').remove();
    var width = 500,
        height = 500,
        radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { console.log(d); return d[0]; });

var chart = d3.select("#chartContainer").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

   var g = chart.selectAll('.arc')
    .data(pie(data))
    .enter().append('g').attr('class', 'arc');
    
    g.append('path')
    .attr('d', arc)
    .style('fill', function(d){ 
      console.log(d);
      return color(d.data[0]);
    });

    g.append('text')
    .attr('transform', function(d){

        var coords = arc.centroid(d);
        console.log(coords);

      return 'translate(' + arc.centroid(d) +')';
    

    })
    .attr('dy', '.35em')
    .style('text-anchor', 'middle')
    .text(function(d){
      return d.data[0];
    });

/*d3.csv("data.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

});
*/
  };
