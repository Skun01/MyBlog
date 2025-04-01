const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../db/queries');

const otps = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT
}

passport.use(
    new JwtStrategy(otps, async (jwtPayLoad, done)=>{
        const user = await db.getUserById(jwtPayLoad.userId);
        if(user){
            return done(null, user);
        }
        return done(null, false);
    })
)

module.exports = passport;