const express = require('express')
const app = express()
const port = 3000

// mongoose
var mkey = process.env.mkey
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://chicken:${mkey}@cluster0.3vo5a.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

