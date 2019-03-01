const request = require('request');
const defaultSeason = 2018;

module.exports.leagueList = (req, res) => {
    let leagues = [],
        season = req.query.season || defaultSeason,
        soccerApiOptions = {
            headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
            url: "http://api.football-data.org/v2/competitions/?currentSeason=" + season,
            method: "GET",
            json: {},
            qs: {}
        };

    request(soccerApiOptions, (err, response, body) => {
        if (err) {
            console.log(err);
        } else if (response.statusCode === 200) {
            leagues = body.competitions;

            console.log(leagues);

            res.render('leagues', { title: 'European Football Leagues', leaguedata: leagues, season: season });
        } else {
            console.log(response.statusCode);
        }
    });
};

module.exports.teamsList = (req, res) => {
    let //dataurl = req.query.dataurl,
        season = req.query.season || defaultSeason,
        //leaguename = req.query.league,
        standingsUrl = 'http://api.football-data.org/v2/competitions/' + req.query.id +'/standings',
        // teamApiOptions = {
        //     headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
        //     url: standingsUrl,
        //     method: "GET",
        //     json: {},
        //     qs: {}
        // },
        standingsApiOptions = {
            headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
            url: 'http://api.football-data.org/v2/competitions/' + req.query.id +'/standings',
            method: "GET",
            json: {},
            qs: {}
        },
        //teams = [],
        standings = {};
        //rate = 1,
        // getRate = () => {
        //     request({
        //         url: 'http://www.apilayer.net/api/live?access_key=d7a7fa4cf0a794d3b4d59271547e19d6',
        //         method: 'GET',
        //         json: {},
        //         qs: {}
        //     }, (err, response, body) => {
        //         if (err) {
        //             console.log(err);
        //             return null;
        //         } else if (response.statusCode === 200) {
        //             rate = body.quotes.USDEUR;
        //         } else {
        //             console.log(response.statusCode);
        //             return null;
        //         }
        //     });
        // }

    // request(teamApiOptions, (err, response, body) => {
    //     if (err) {
    //         console.log(err);
    //     } else if (response.statusCode === 200) {
    //         //teams = body.teams;
            
    //     } else {
    //         console.log(response.statusCode);
    //     }
    //});

    request(standingsApiOptions, (err, stResponse, stBody) => {
        if (err) {
            console.log(err);
        } else if (stResponse.statusCode === 200) {
            //console.log(stBody.standings.table);

            let leaguename = stBody.competition.name,
            standingdata = stBody.standings[0].table;
            console.log(standingdata);
            res.render('teams', { title: leaguename, standingdata: standingdata, standingsUrl: standingsUrl, season: season });
        }
    });
};
