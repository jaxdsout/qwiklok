const mongoose = require('mongoose')
require('dotenv').config()


const database_url =
process.env.NODE_ENV === 'production'
?
process.env.DB_URL
:
//`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9wazp9r.mongodb.net/timepuncherDB?retryWrites=true&w=majority`;
`mongodb+srv://${process.env.SERVERN}:${process.env.SERVERP}@cluster0.9wazp9r.mongodb.net/timepuncherDB?retryWrites=true&w=majority`;
       
mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${database_url}`);
})

mongoose.connection.on('disconnected', () => {
  console.log(`Disconnected from database ${database_url}`);
})

mongoose.connection.on('error', (error) => {
  console.log(`Error connecting to ${database_url}`);
  console.error(error);
})

module.exports = mongoose
