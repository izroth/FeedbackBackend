const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const errors = {
    email_not_found: 'Email not found',
    password_incorrect: 'Password incorrect',
    no_email: 'Email is required',
    no_password: 'Password is required',
    invalid_email: 'Invalid Email',
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ msg: errors.no_email });
    }
    if (!password) {
        errors.push({ msg: errors.no_password });
    }
    if (errors.length > 0) {
        res.render('login', {
            errors,
            email,
            password
        });
    }
    else {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                errors.push({ msg: errors.email_not_found });
                res.render('login', {
                    errors,
                    email,
                    password
                });
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name
                        };
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {
                               
                                expiresIn:  3600  
                            },
                            (err, token) => {
                                if (err) {
                                    res.status(500).json({
                                        error: "Error signing token",
                                        raw: err
                                    });
                                }
                                else {
                                    res.cookie('jwt', token, { httpOnly: true, secure: false });
                                    res.redirect('/dashboard');
                                }
                            }
                        );
                    }
                    else {
                        errors.push({ msg: errors.password_incorrect });
                        res.render('login', {
                            errors,
                            email,
                            password
                        });
                    }
                });
            }
        });
    }
}
module.exports = login;