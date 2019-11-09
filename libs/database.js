module.exports = client => {
  const mongodb = require('mongodb')

  mongodb.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, databaseClient) => {
    if (err) throw err
    client.database = databaseClient.db('FarmCord')
  })
}
