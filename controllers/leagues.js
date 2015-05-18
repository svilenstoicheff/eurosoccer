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
    		res.render('leagues', { title: 'European Football Leagues', leaguedata: leagues });
    } else {
        console.log(response.statusCode);
    }
});


};

module.exports.teamsList = function(req, res){
	var dataurl = req.query.dataurl,
		leaguename = req.query.league,
        standingsUrl = dataurl.replace(/teams/,'leagueTable'), 
		teamApiOptions = {
			headers:{"X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e"}, 
    		url: dataurl, 
    		method: "GET", 
    		json: {}, 
    		qs: {}
		},
		teams = [];
	function getRate () {
        
            request({
            url: 'http://www.freecurrencyconverterapi.com/api/v3/convert?q=EUR_USD&compact=y', 
            method: 'GET', 
            json:{}, 
            qs:{}
        }, function(err, response, body){
                if(err){
                    console.log(err);
                    return null;
                } else if (response.statusCode === 200) {
            
                    
                    return body.EUR_USD.val;

                } else {
                    console.log(response.statusCode);
                    return null;
                }   

            }); 
       
        
    }


//console.log(getRate());

	request(teamApiOptions, function(err, response, body){
    if(err){
        console.log(err);
    } else if (response.statusCode === 200) {
       
    	teams = body.teams;
        
        console.log(teams);
    	
    	res.render('teams', {title: leaguename, teamdata: teams, standingsUrl: standingsUrl, rate: getRate()});

    } else {
        console.log(response.statusCode);
    }
});
	
		
};


