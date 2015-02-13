var request = require('request');
	

module.exports.leagueList = function(req, res){

var leagues = [], 
		soccerApiOptions = {
			headers:{"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
    		url: "http://api.football-data.org/alpha/soccerseasons/", 
    		method: "GET", 
    		json: {}, 
    		qs: {}
		};

	
request(soccerApiOptions, function(err, response, body){
    if(err){
        console.log(err);
    } else if (response.statusCode === 200) {
    		leagues = body;
    		console.log(leagues);
    		res.render('leagues', { title: 'European Football Leagues', leaguedata: leagues });

    } else {
        console.log(response.statusCode);
    }
});


};

module.exports.teamsList = function(req, res){
	var dataurl = req.query.dataurl,
		leaguename = req.query.league, 
		teamApiOptions = {
			headers:{"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
    		url: dataurl, 
    		method: "GET", 
    		json: {}, 
    		qs: {}
		},
		teams = [];
		

	request(teamApiOptions, function(err, response, body){
    if(err){
        console.log(err);
    } else if (response.statusCode === 200) {
       
    	teams = body.teams; 
    	
    	res.render('teams', {title: leaguename, teamdata: teams});

    } else {
        console.log(response.statusCode);
    }
});
	
		
};


