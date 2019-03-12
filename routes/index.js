var express = require('express'), 
	router = express.Router(), 
    ctrl = require('../controllers/leagues');
    ctrlMatches = require('../controllers/matches');

//request(soccerApilOptions, function(err, response, body){
  //  if(err){
   //     console.log(err);
    //} else if (response.statusCode === 200) {
        //console.log(body);

    //	leagues = body; 
    //   	console.log(leagues);

    //} else {
     //   console.log(response.statusCode);
    //}
//});

/* GET home page. */
//router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Leagues', servicebody: leagues });
//});

/* GET teams page */

router.get('/', ctrl.leagueList);
router.get('/teams', ctrl.teamsList);
router.get('/matches', ctrlMatches.matches);

module.exports = router;
