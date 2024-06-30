const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const personModel = require('./Model/PersonModel')


passport.use(new LocalStrategy(async (username,password,done)=>{
    try {
        console.log("received crediential",username,password);
        const user = await personModel.findOne({username:username})
      if(!user)
        return done(null,false,{message:"Username not found"})
    const passwordMatch = user.password === password ? true:false
    // const passwordMatch = await user.comparePassword(password)


    if(passwordMatch){
        return done(null,user)
    }else{
        return done(null,false,{message:"password not match"})
    }

    } catch (error) {
    return done(error)    
    }
}))

module.exports = passport