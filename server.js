const express = require('express');
// const env = require('dotenv').config();
const app = express();
const ejsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride("_method"))

const userRouter = require("./routers/userRouter")
app.use("/users", userRouter);

const projectRouter = require("./routers/projectRouter")
app.use("/projects", projectRouter)

const punchRouter = require("./routers/timepunchRouter")
app.use("/timepunch", punchRouter)


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')} CONNECTED`);
});