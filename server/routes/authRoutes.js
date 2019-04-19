const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('users');
const salt = bcrypt.genSaltSync(10);
module.exports = (app) =>{



  app.post('/auth/login', 
  passport.authenticate('local'),
  function(req, res) {
    return res.status(200).send({username:req.body.username});
   });

  app.post('/auth/register', async(req, res) =>{
    const { username,email,password } = req.body
    console.log(username,email,password)
    let user = await User.findOne({username})

    if(!user){

    user = await new User({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,salt)
    }).save().catch((err)=>{
        console.log(err)
    })
    return res.status(200).send({username});
    }
   return res.status(501).send({error:"this email is already registered"})
  });

app.get('/api/logout',requireLogin,(req,res)=>{
    req.logout();
    res.send(req.user);
})

app.get('/api/current_user',requireLogin,(req,res)=>{
    res.send(req.user)
})

app.get('/api/get_all_users',async (req,res)=>{
  let users = await User.find({})
  users = users.map((user)=>{
    const {username,email,c,cpp,java,common} = user
    if(username === "admin"){
      return null
    }
        return { username,email,c,cpp,java,common }
  })
  res.send(users);
})

app.delete('/api/delete_users/:username',async (req,res)=>{
  await User.deleteOne({username:req.params.username}) 
  res.status(200).send({message:"done"});
})

app.post('/api/add_user_points/:category/:username/:points',async (req,res)=>{
  let user = await User.findOne({username:req.params.username})
  user[req.params.category] = req.params.points;
  user.save();
  res.status(200).send({message:"done"});
})


}