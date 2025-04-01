const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
async function createUser(req, res){
    try{
        const {username, password, email, age, admin} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(username, hashedPassword, email, age, admin);
        const user = await db.getUserByEmail(email);
        res.json({message: 'you have been created sucessufull', ...user})
    }catch(e){
        res.json({error: e});
    }
}

async function loginUser(req, res){
    const {email, password} = req.body;
    const user = await db.getUserByEmail(email);
    if(user){
        const match = await bcrypt.compare(password, user.password)
        if(match){
            const token = jwt.sign(
                {userId: user.id},
                process.env.SECRET_JWT,
                {expiresIn: '24h'},
            )
            res.json({token});
            return;
        }
    }
    res.status(404).json({error: 'User not found!'});

}

async function getUserById(req, res){
    res.json(req.user);
}

async function getUserByEmail(req, res){
    const {email} = req.params;
    const user = await db.getUserByEmail(email);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({error: 'User not found!'});
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
    getUserByEmail,
}