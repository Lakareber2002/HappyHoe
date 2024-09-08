//dependence
// const express = require('express');
// const app = express('path');
// const path = require('path');

//instantiations
//const port =300;


//configurations
//import routes
// const studyRoutes = require('./routes/studyRoutes')

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));



//set the views path

//app.set('views', path.join(__dirname, 'views'))



//middleware
//app.use(express.urlencoded({ extended: true }));

//routes
//use imported routes
// app.use('/',studyRoutes)

// app.use((req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
//   });

  //Simple request time logger for a specific route
// app.use('/home', (req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
//   });
  
//Routes
  //use routes/imported routes
  //app.use('/',studyRoutes)

// app.get('*', (req, res) => {
//   res.send('error! page does not exist');
// })
 

// app.listen(3000, () => console.log('listening on port 3000'));