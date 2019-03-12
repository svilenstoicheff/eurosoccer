const request = require('request');

module.exports.matches = (req, res) => {
    let matchesApiOptions = {
        headers: { "X-Auth-Token": "55e2b001494e4a19b5ea2aa10ada3c7e" },
        url: 'http://api.football-data.org/v2/teams/' + req.query.teamId +'/matches',
        method: "GET",
        json: {},
        qs: {}
    };

    request(matchesApiOptions, (err, matchesResponse, matchesBody) => {
        if (err) {
            console.log(err);
        } else if (matchesResponse.statusCode === 200) {
            let matchData = matchesBody.matches;
            console.log(matchData);
            res.render('matches', {title: 'Matches', matches: matchData, teamName: req.query.teamName});
        }
    });
}