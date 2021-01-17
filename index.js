const express = require('express')
const app = express()
const port = 3000

// [body-parser]
const bodyParser = require('body-parser');
// [model]
const { User } = require("./models/User");

// [body-parser] application/x-www-form-urlencoded 형태의 데이터를 분석해서 가져올 수 있게 세팅
app.use(bodyParser.urlencoded({extended: true}));
// [body-parser] application/json 형태의 데이터를 분석해서 가져올 수 있게 세팅
app.use(bodyParser.json());

// [mongoose]
var mkey = process.env.mkey
const mongoose = require('mongoose')
// [mongoose] mongodb 연결
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

// [route] 회원가입
app.post('/register', (req, res) => {
    // 회원가입 정보를 DB에 입력

    const user = new User(req.body) // body-parser 사용됨
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

