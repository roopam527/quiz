 const express = require('express');
 const mongoose = require('mongoose');
 const path = require('path');
 const cors = require('cors')
 const cookieSession = require('cookie-session');
 const passport = require('passport')
 const app = express(); 
 const bodyParser= require('body-parser');
 require('./models/User');

 const passportConfig = require('./services/passport')

 
 

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }));
 mongoose.connect("mongodb://roopam:roopam1@ds231228.mlab.com:31228/quiz",{ useNewUrlParser: true } )


// app.use(express.bodyParser());
app.use(cors());
 app.use(
     cookieSession({
         maxAge: 30 * 25 * 60 * 60 * 1000,
         keys : ["abvvdsnjaj"],
         path:"/",
         domain:"localhost:5500"
     })
 )
 app.use(passport.initialize());
 
 app.use(passport.session());
 


 require('./routes/authRoutes')(app);



//  app.use(express.static(path.join(__dirname, 'frontend')));


//  app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '..','frontend', 'index.html'));
//   });

const PORT = process.env.PORT || 5000
 app.listen(PORT,()=>{
     console.log("Server is listening at port "+ PORT)
 }) 