var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Game = mongoose.model('Game');

module.exports = function (app) {
	app.use('/api/games/', router);
};

var getGames = function (req, res) {
	Game.find().populate('players').exec(function(err, games) {
		if (err)
			return res.send(err);
		else
			return res.json(games);
	});
};

var postGame = function (req, res) {
	var game = new Game(req.body);
	game.players[0] = req.user;

	game.save(function (err) {
		if (err)
			return res.status(422).send(err);
		else
			return res.json(game);
	});
};

var getGame = function (req, res) {
	Game.findById(req.params.game_id).populate('players').exec(function (err, game) {
		if (err)
			return res.send(err);
		else
			return res.json(game);
	});
};

var deleteGame = function (req, res) {
	Game.remove({
		_id: req.params.game_id
	}, function (err) {
		if (err)
			return res.send(err);
		else
			return res.json({status: 'OK'});
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		console.log(req);
		return next();
	}
	else
		return res.status(401).send({ status: "Not logged in." });
}

router.get('/', getGames);
router.post('/create', isLoggedIn, postGame);
router.delete('/delete/:game_id', deleteGame);