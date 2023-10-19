// REQUIREMENTS
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
require('dotenv').config()



// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

// ROUTERS
const loginRouter = require("./routers/loginRouter")
app.use("/", loginRouter)

const userRouter = require("./routers/userRouter")
app.use("/user", userRouter);


// START SERVER
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')} CONNECTED`);
});