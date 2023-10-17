const mongoose = require('mongoose')


const connectionString =
                  process.env.NODE_ENV === 'production'
                  ?
                  process.env.DB_URL
                  :
                  'mongodb://localhost/express-books-api';



mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${connectionString}`);
})


mongoose.connection.on('disconnected', () => {
  console.log(`Disconnected from database ${connectionString}`);
})


mongoose.connection.on('error', (error) => {
  console.log(`Error connecting to ${connectionString}`);
  console.error(error);
})

module.exports = mongoose