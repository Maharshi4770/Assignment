const { farmerModel } = require('../models/farmer')
const jwt = require('jsonwebtoken');
const {JWT_FARMER_SECRET} = require("../config")
const bcrypt = require('bcrypt');
const { z } = require('zod');

async function signup(req,res){
        const requirebody = z.object({
            username: z.string().min(3).max(10),
            Address: z.string(),
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
    
        const {success, data, error} = requirebody.safeParse(req.body);
    
        if(!success){
            res.json({
                msg: 'Incorrect Format',
                error: error,
            });
        }
    
        const {username, password, Address} = req.body;
    
        try {
            const existingUser = await farmerModel.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ msg: 'User already exists' });
            }
            const hashedpassword = await bcrypt.hash(password, 10);
            await farmerModel.create({
                username,
                Address,
                password: hashedpassword
            });
            return res.json({
                msg: 'You are signedUp'
            });
        }catch(e){
            return res.json({
                msg: 'User already exists'
            })
        }
}

async function signin(req,res){
    const {username, password} = req.body;

    const user = await farmerModel.findOne({
        username: username
    })

    if(!username){
        res.status(202).json({
            msg: 'user is not available'
        })
        return 
    }


    const passwordmatch = await bcrypt.compare(password, user.password);

   if(passwordmatch){
        const token = jwt.sign({
            id: user._id,
        },JWT_FARMER_SECRET)

    res.json({token: token})
    }
    else{
        res.json({
            msg: 'Invalid login credentials'
        })
    }
}

module.exports = {
    signup,
    signin
}