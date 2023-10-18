// REQUIREMENTS
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

app.use(auth(config));
app.use(jwtCheck);



// ROUTERS

app.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("index", { 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user, 
  })
})

app.get("/secured", requiresAuth(), (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render("secured", { 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user, 
  })
})

// const userRouter = require("./routers/userRouter")
// app.use("/users", userRouter);

// const projectRouter = require("./routers/projectRouter")
// app.use("/projects", projectRouter)

// const punchRouter = require("./routers/timepunchRouter")
// app.use("/timepunch", punchRouter)


// START SERVER
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')} CONNECTED`);
});