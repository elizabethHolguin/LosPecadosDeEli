var express = require('express');
var request = require("request");
var bodyParser = require('body-parser')

var endpoint = 'http://localhost:5000/api/v1/';
//var endpoint = 'https://djangoapipecadoseli.herokuapp.com/api/v1/';

var Category = require("../models/category");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true})); 

router.get('/', async (req, res, next) => {
    const categories = await Category.find();
    console.log(categories);
    res.send(categories);
});

router.get('/:id', async (req, res, next) => {
    const category = await Category.findOne({categoryID: req.params.id});
    res.send(category);
});

router.post('/create/', async (req, res, next) => {
    let categoryname = req.body.categoryname;
    let description = req.body.description;

    request.post(endpoint+'create_category/',
        {
            headers: {Authorization: req.headers.authorization},
            json: {'categoryname': categoryname}
        },
        (error, response, body) => {
            if(body.categoryID){
                Category.create({
                    categoryID: body.categoryID,
                    categoryname: categoryname,
                    description: description
                }, (err, newCategory) => {
                    if(err)
                        res.send(err)
                    else
                        res.send(newCategory);
                });
            } else {
                res.status = 403
                res.send('Error');
            }
        }
    );
});

module.exports = router;