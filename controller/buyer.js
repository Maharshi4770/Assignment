const { buyerModel } = require('../models/buyer')
const jwt = require('jsonwebtoken');
const { JWT_BUYER_SECRET } = require("../config")
const bcrypt = require('bcrypt');
const { z } = require('zod');


async function signup(req, res) {
    const requirebody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(7).max(15)
            .refine(val => /[A_Z]/.test(val), {
                msg: 'password must include lowercase letter'
            })
            .refine(val => /[a-z]/.test(val), {
                msg: 'Password must include Uppercase letter'
            })
            .refine(val => /[^A-Za-z0-9]/.test(val), {
                message: 'Must include a special character',
            }),
    })

    const { success, data, error } = requirebody.safeParse(req.body);

    if (!success) {
        res.json({
            msg: 'Incorrect Format',
            error: error,
        });
    }

    const { username, password } = req.body;

    try {
        const existingUser = await buyerModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: 'User already exists' });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await buyerModel.create({
            username,
            password: hashedpassword
        });
        return res.json({
            msg: 'You are signedUp'
        });
    } catch (e) {
        return res.status(500).json({
            msg: 'Internal server error',
            error: e.message
        });
    }
}

async function signin(req, res) {
    const { username, password } = req.body;

    const user = await buyerModel.findOne({
        username: username
    })

    if (!username) {
        res.status(202).json({
            msg: 'user is not available'
        })
        return
    }


    const passwordmatch = await bcrypt.compare(password, user.password);

    if (passwordmatch) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_BUYER_SECRET)

        res.json({ token: token })
    }
    else {
        res.json({
            msg: 'Invalid login credentials'
        })
    }
}


module.exports = {
    signup,
    signin
}