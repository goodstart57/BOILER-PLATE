const express = require('express')
const app = express()
const port = 3000

// [body-parser]
const bodyParser = require('body-parser');
// [model]
const { User } = require("./models/User");

// [body-parser] application/x-www-form-urlencoded ������ �����͸� �м��ؼ� ������ �� �ְ� ����
app.use(bodyParser.urlencoded({extended: true}));
// [body-parser] application/json ������ �����͸� �м��ؼ� ������ �� �ְ� ����
app.use(bodyParser.json());

// [mongoose]
var mkey = process.env.mkey
const mongoose = require('mongoose')
// [mongoose] mongodb ����
mongoose.connect(`mongodb+srv://chicken:${mkey}@cluster0.3vo5a.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// [route] index
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// [route] ȸ������
app.post('/register', (req, res) => {
    // ȸ������ ������ DB�� �Է�

    const user = new User(req.body) // body-parser ����
    user.save((err, doc) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            sucess: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

