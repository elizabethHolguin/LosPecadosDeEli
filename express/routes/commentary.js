var express = require('express');
var request = require("request");
var bodyParser = require('body-parser')

var endpoint = 'http://localhost:5000/api/v1/';
//var endpoint = 'https://djangoapipecadoseli.herokuapp.com/api/v1/';

var Commentary = require("../models/commentary");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/:id', async (req, res, next) => {
    const comment = await Commentary.findOne({commentaryID: req.params.id});
    res.send(comment);
});

router.post('/create/', async (req, res, next) => {
    let userID = req.body.userID;
    let creation_date = req.body.creation_date;
    let email = req.body.email;
    let city = req.body.city;
    let date_birth = req.body.date_birth;
    let content = req.body.content;

    request.post(endpoint+'commentary_create/',
        {
            json: {'userID': userID, 'creation_date': creation_date, }
        },
        (error, response, body) => {
            if(body.commentaryID){
                Commentary.create(
                    {
                        commentaryID: body.commentaryID,
                        creation_date: creation_date,
                        email: email,
                        city: city,
                        date_birth: date_birth,
                        content: content,
                    }
                , (err, newcommentary) => {
                    if(err)
                        res.send(err)
                    else
                        res.send(newcommentary);
                });
            } else {
                res.status = 403
                res.send('Error');
            }
        }
    );
});

module.exports = router;