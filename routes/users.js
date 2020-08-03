const express = require('express');
const router = express.Router();
const db = require('../db/index');

// login page
router.get('/login', (req, res) => res.render ('login'));

// register page
router.get('/register', (req, res) => res.render ('register'));

// register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    const INSERT_USER = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    let errors = [];

    // check required inputs
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'All fields required.' });
    }

    // check matching passwords
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match.' });
    }

    // check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters long.' });
    }

    // check errors
    if (errors.length > 0) {
        res.render('register', { errorMsg: errors });
    } else {
        db
            .query(INSERT_USER, [name, email, password])
            .then(() => {
                req.flash('registerSuccessMsg', 'Successfully registered. Login now.');
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));
    }
});

// login
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    const SELECT_USER = 'SELECT * FROM users WHERE email = $1';

    db.query(SELECT_USER, [email], (err, result) => {
        if (err) {
            next(err);
        }

        if (result.rows.length > 0) {
            const userEmail = result.rows[0].email;
            const userPassword = result.rows[0].password;

            // check mail and password exists
            if (userEmail == email && userPassword == password) {
                res.redirect('/game/dashboard');
            } else {
                req.flash('loginErrorMsg', 'Login Error, try again!');
                res.redirect('/users/login');
            }
        }
    })
});

module.exports = router;
