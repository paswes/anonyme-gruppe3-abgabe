const express = require('express');
const router = express.Router();
const db = require('../db/index');

// dashboard page
router.get('/dashboard', (req, res) => res.render ('dashboard'));

// choose opponent
router.get('/start', (req, res, next) => {
    const SELECT_USER = 'SELECT * FROM users';

    db.query(SELECT_USER, [], (err, result) => {
        if (err) {
            next(err);
        }
        const opponents = result.rows;
        const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];

        res.render('start', {opponent: randomOpponent});
    })
});

// play round
router.get('/play/:oppId', (req, res, next) => {
    const oppId = req.params.oppId;
    const model = {};

    db
        .query(`SELECT * FROM users WHERE users_pk = ${oppId}`)
        .then(result => {
            if (result.rows.length < 1) {
                next();
            } else {
                model.opponent = result.rows[0];
                return db.query('SELECT * FROM actions');
            }
        })
        .then(result => {
            const data = result.rows;
            model.actions = data.sort(() => .5 - Math.random()).slice(0,3);
            res.render('play', model);
        })
        .catch(err => next(err));

});

router.post('/play/:msgId', (req, res, next) => {
    const msgId = req.params.msgId;

    db
        .query('DELETE FROM actions WHERE actions_pk = $1', [msgId])
        .then(() => {
            res.send('Delete worked..');
        })
        .catch(err => next(err));
});

module.exports = router;
