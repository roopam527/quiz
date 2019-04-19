 
 const passport = require('passport');
 
 const LocalStrategy = require('passport-local').Strategy;

 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');

 const User = mongoose.model('users');

passport.serializeUser((user,done)=>{

    done(null,user.id)//user.id is a user id in our db
})

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id)
    done(null,user)
})


passport.use(
  new LocalStrategy( async (username, password, done) => {
    // Match user
   
    const user = await  User.findOne({ username: username})
   
      if (!user) {
        return done(null, false, { error: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {error: 'Password incorrect' });
        }
      });
    
  })
);



