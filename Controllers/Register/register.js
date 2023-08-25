const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const errors = {
    email: 'Email already exists',
    no_name:'Name is required',
    no_email:'Email is required',
    no_password:'Password is required',
    no_password2:'Confirm Password is required',
    password_mismatch:'Passwords do not match',
    invalid_email:'Invalid Email',
}

const register = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name) {
        errors.push({ msg: errors.no_name });
    }
    if (!email) {
        errors.push({ msg: errors.no_email });
    }
    if (!password) {
        errors.push({ msg: errors.no_password });
    }
    if (!password2) {
        errors.push({ msg: errors.no_password2 });
    }
    if (password !== password2) {
        errors.push({ msg: errors.password_mismatch });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: errors.email });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        await newUser.save()
                        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
                        newUser.jwt = token;
                        await newUser.save()
                        req.session.user = newUser;
                        res.status(200).JSON.Stringify({ message: 'User created successfully' });
                    });
                });
            }
        });
    }
}
module.exports = register;
