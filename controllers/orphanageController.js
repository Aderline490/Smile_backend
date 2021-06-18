const express = require('express');
const router = express.Router();
const Orphanage = require('../models/orphanageModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    let { name, email, country, password, official_doc } = req.body;
    const Salt = bcrypt.genSaltSync(10);
    const Hash = bcrypt.hashSync(`${password}`, Salt);
    Orphanage.find({ email: email })
        .then(async (users) => {
            if (users.length > 0) {
                res.status(400).json({ error: `*${email} had already taken, please try different email address*` })
                return;
            } else {
                let insertUser = new Orphanage({
                    name: name,
                    email: email,
                    country: country,
                    password: Hash,
                    officialDoc: official_doc
                });

                insertUser.save()
                    .then(async (saved) => {
                        let token = await jwt.sign({ id: saved._id, name: saved.names, email: saved.email }, "mysecretkey123");
                        res.json({ error: token });
                        return;
                    })
                    .catch(err => console.log(err))
            }
        })
});

router.post('/login', (req, res) => {
    let {
        email,
        password
    } = req.body;
    Orphanage.find({
        email: email
    })
    .then(async(users) => {
        if (users.length > 0) {
            let dbpassword = users[0].password;

            let isValid = bcrypt.compareSync(`${password}`, dbpassword);

            if (isValid) {
                let token = await jwt.sign({
                    id: users[0]._id, name: users[0].name, email: users[0].email
                }, "mysecretkey123");
                res.status(200).json({
                    error: token
                });
                return;
            } else {
                res.status(401).json({
                    error: true
                })
                return;
            }
        } else {
            res.status(401).json({
                error: true
            })
            return;
        }
    })
});

module.exports = router;

