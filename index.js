var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const { default: mongoose } = require('mongoose')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
PORT = 4000


const cunnectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://akuriamffish2021:pWARoXBLUJ4Es2Gs@cluster0.uihwd8p.mongodb.net/kyc")
        console.log("Db is cunnect")
    } catch (error) {
        console.log(error)
    }
}

const userSchema = new mongoose.Schema({
    Fonturl: {
        type: String
    },
    Backurl: {
        type: String
    },
    Fullurl: {
        type: String
    },
    Acn: {
        type: String
    },
    Email: {
        type: String
    },
    Name: {
        type: String
    },
    Polygon: {
        type: String
    },
    Refer: {
        type: String
    },
    Talygram: {
        type: String
    },
    Talygram2: {
        type: String
    },
    Tweter: {
        type: String
    },
    Date: {
        type: String
    },

})
const userMOdel = mongoose.model('users', userSchema)

app.post('/users', async (req, res) => {
    try {
        const user = req.body;

        console.log(user)
        const newUser = userMOdel({
            Fonturl: user.Fonturl,
            Backurl: user.Backurl,
            Fullurl: user.Fullurl,
            Date: user.Date,
            Acn: user.Acn,
            Email: user.Email,
            Name: user.Name,
            Polygon: user.Polygon,
            Talygram: user.Talygram,
            Talygram2: user.Talygram2,
            Tweter: user.Tweter,
        })
        await newUser.save();
        res.send(newUser)
    } catch (error) {
        console.log(error)
    }
})


app.get('/alluser', async (req, res) => {
    try {
        const findUser = await userMOdel.find({});
        console.log(findUser)
        if (findUser) {
            res.status(200).send(findUser)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(502).send(error)
    }
})



app.get('/', function (req, res) {
    res.send('hello world')
})


app.listen(PORT, async () => {
    await cunnectDb()
    console.log(`http://localhost${PORT}`)
})