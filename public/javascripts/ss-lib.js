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
/*SS.euroRate;
SS.convertEurUsd = function(){

}*/


SS.getLeagueStandings = function(URL){
	//console.log(URL);
	$.ajax({
  		url: URL, 
 		headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
 		dataType: 'json'
 		}).done(function(data){
 			//console.log(data);
        $('#standings table tbody').html('');
        $('#leagueName').text(data.leagueCaption + ' standings');
 		$.each(data.standing, function(i, team){
  							$('#standings table tbody').append('<tr><td>'+team.position+'</td><td>'+ 
                  team.teamName +'</td><td>'+
                  team.playedGames + '</td><td>'+
                  team.points + '</td><td>'+
                  team.goals + '</td><td>'+
                  team.goalsAgainst + '</td><td>'+
                  team.goalDifference + '</td><td>'+
                    '<a href="#" class="games-scores" data-games-url="'+team._links.team.href+'"></a>'
                                                               +'</td></tr>');
  						  }); 
                $('#standings').show();
                $('.games-scores').on('click', function(e){
                    var url = $(e.target).attr('data-games-url') + '/fixtures';
                    SS.getGamesPlayed(url);
                    
                });
	}).fail( function(){
		console.log('error');
	});
};


SS.getGamesPlayed = function(URL){
    //console.log(URL);
    $('#gamesPlayed').remove();
    $.ajax({
        url: URL, 
        headers: {"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
        dataType: 'json' 
    })
    .done(function(data){
        console.log(data);
        var gameGridRows = '';
            
        $.each(data.fixtures, function(i, item){
            var date = new Date(item.date).toLocaleDateString(),
                score = function(){
                    if(item.result.goalsHomeTeam === -1 || item.result.goalsAwayTeam === -1){
                        return "pending";
                    }else {
                        return item.result.goalsHomeTeam + ':'+ item.result.goalsAwayTeam;
                    }
                    
                }, 
                row = '<tr><td>'+ item.homeTeamName + '</td><td>'+ item.awayTeamName + 
                        '</td><td>'+ score() +
                        '</td><td class="date">'+ date + '</td></tr>';
                gameGridRows += row;
            
        });
        
        var gamegrid = '<section id="gamesPlayed" class="box"><a href="#" class="close">x</a><table><thead><tr><th>home</th><th>away</th><th>score</th><th>date</th></tr></thead><tbody>' + gameGridRows +'</tbody></table><section>';
        $('body').append(gamegrid);
        $('#gamesPlayed').css('position', 'absolute').css('top', '30px').css('left',"100px").fadeIn();
        $('#gamesPlayed a').on('click', function(e){
            $(e.target).parent().hide();
        });
        
    })
    .fail(function(){
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
    .style('text-anchor', 'end')
    .text(function(d){
      return d.data[2];
    });
  };

SS.pieChartWithLabels = function(playerdata){


  var svg = d3.select("body")
  .append("svg")
  .append("g")

svg.append("g")
  .attr("class", "slices");
svg.append("g")
  .attr("class", "labels");
svg.append("g")
  .attr("class", "lines");

var width = 960,
    height = 450,
  radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

var arc = d3.svg.arc()
  .outerRadius(radius * 0.8)
  .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };

var domainArray = [];
for(var i=0; i < playerdata.length; i++){
  domainArray.push(playerdata[i][2]);
}
var color = d3.scale.ordinal()
  .domain(domainArray)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

function randomData (){
  var labels = color.domain();
  return labels.map(function(label){
    return { label: label, value: Math.random() }
  });
}

change(randomData());

d3.select(".randomize")
  .on("click", function(){
    change(randomData());
  });


function change(data) {

  /* ------- PIE SLICES -------*/
  var slice = svg.select(".slices").selectAll("path.slice")
    .data(pie(data), key);

  slice.enter()
    .insert("path")
    .style("fill", function(d) { return color(d.data.label); })
    .attr("class", "slice");

  slice   
    .transition().duration(1000)
    .attrTween("d", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    })

  slice.exit()
    .remove();

  /* ------- TEXT LABELS -------*/

  var text = svg.select(".labels").selectAll("text")
    .data(pie(data), key);

  text.enter()
    .append("text")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data.label;
    });
  
  function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  text.transition().duration(1000)
    .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate("+ pos +")";
      };
    })
    .styleTween("text-anchor", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start":"end";
      };
    });

  text.exit()
    .remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  var polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(data), key);
  
  polyline.enter()
    .append("polyline");

  polyline.transition().duration(1000)
    .attrTween("points", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), outerArc.centroid(d2), pos];
      };      
    });
  
  polyline.exit()
    .remove();
};

};
