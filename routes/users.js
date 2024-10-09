const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');

const { validateUser } = require('../validation/ValidateUser');
const { validateLogin } = require('../validation/LoginValidation');
const { editUser } = require('../validation/EditUser');
const User = require('../models/User');


// Register Method Route
router.post('/register', async (req, res) => {
    // const user = {
    //     email: 'example@example.com',
    //     username: 'Emaple',
    //     password: '123456',
    //     role: 'user',
    //     status: 'active',
    //     ipAddress: '192.168.1.1',
    //     // expirationDate: new Date('2025-12-31'),
    //     // createdAt: new Date(),
    //     // updatedAt: new Date()
    // };

    try {
        validateUser(req.body);
        const saveData = new User(req.body);
        try {
            const result = await saveData.save();
            return res.send({ message: "Success", data: result })
        } catch (error) {
            throw new Error('Email already exists.')
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

// Login Method Route
router.post('/login', async (req, res) => {
    try {
        // const { email, password } = req.body;
        validateLogin(req.body)
        // if (email == '' || email === null || email === undefined) {
        //     return res.send({ message: 'Email is required.' })
        // }
        // if (password == '' || password === null || password === undefined) {
        //     return res.send({ message: 'Password is required.' })
        // }
        // 1. Authenticate email & password.
        // if(email)
        const userData = await User.findOne({ email: req.body.email }).select('email password username').lean();
        if (req?.body?.email != userData?.email) {
            return res.send({ message: 'Invalid email' });
        }
        // const dbPassword = await bcrypt.compare(req.body.password, userData?.password);
        // if (!dbPassword) {
        //     return res.send({ message: 'Invalid password' });
        // }
        // // 2. Generate jwt token.
        // // var secret = 'TOPSECRETTTTT';

        // // 2.0 encode
        // let token1 = '';
        // jwt.encode('any', req?.body?.email, function (err, token) {
        //     if (err) {
        //         console.error(err.name, err.message);
        //     } else {
        //         token1 = token
        //         console.log('tokenEncode', token);
        //     }
        // })

        // // 3. Return token and user Credentials.
        delete userData.password; 
        return res.send({ message: 'Successful', data: { userData: userData } })

    } catch (error) {
        console.log("from catch", error);
        return res.status(400).send({ message: error.message })
    }
})

router.post('/edit-user', async (req, res) => {
    try {
        // const { email, password } = req.body;
        editUser(req.body)
        // if (email == '' || email === null || email === undefined) {
        //     return res.send({ message: 'Email is required.' })
        // }
        // if (password == '' || password === null || password === undefined) {
        //     return res.send({ message: 'Password is required.' })
        // }
        // 1. Authenticate email & password.
        // if(email)
        // const userData = await User.findOne({ _id: req.body._id }).select('email password');
        
        const userData = await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

        // if (req?.body?._id != userData?._id) {
        //     return res.send({ message: 'Invalid user' });
        // }
        // const dbPassword = await bcrypt.compare(req.body.password, userData?.password);
        // if (!dbPassword) {
        //     return res.send({ message: 'Invalid password' });
        // }
        return res.send({ message: 'Successful', data: { userData: userData } })

    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
})

router.get('/delete-user/:id', async (req, res) => {
    try {
        if (req?.params?.id == '' || req?.params?._id === null || req?.params?.id === undefined) {
            return res.send({ message: 'ID is required.' })
        }
        const userData = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.send({ message: 'Successful' })

    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
})

router.get('/users-overview', async (req, res) => {
    try {
        // editUser(req.body)
        // if (req?.body?._id == '' || req?.body?._id === null || req?.body?._id === undefined) {
        //     return res.send({ message: 'Id is required.' })
        // }
        // const userData = await User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        const userData = await User.aggregate([
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 }
              }
            },
            {
              $group: {
                _id: null,
                statuses: {
                  $push: {
                    status: "$_id",
                    count: "$count"
                  }
                }
              }
            }
          ])
        return res.send({ message: 'Successfull', data: userData })
        // let arrays = [];
        // for (const element of [{status: 'active', index: 1 }, {status: 'inactive', index: 2 },{status: 'inactive',index:3 },{status: 'banned', index: 4 }]) {
        //     const user = {
        //         email: `example${element['index']}@example.com`,
        //         username: `Emaple${element['index']}`,
        //         password: '123456',
        //         role: 'user',
        //         status: `${element['status']}`,
        //         ipAddress: '192.168.1.1',
        //         // expirationDate: new Date('2025-12-31'),
        //         // createdAt: new Date(),
        //         // updatedAt: new Date()
        //     };
        //     arrays.push(user);
        // }
        // const result = await User.insertMany(arrays);
        //      console.log(arrays)
            // const saveData = new User(user);

    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
})

module.exports = router;