var express = require('express');
var request = require("request");
var bodyParser = require('body-parser')

var endpoint = 'http://localhost:5000/api/v1/';
//var endpoint = 'https://djangoapipecadoseli.herokuapp.com/api/v1/';

var Product = require("../models/product");
var Category = require("../models/category");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true})); 

router.get('/', async (req, res, next) => {
    const products = await Product.find();
    res.send(products)
});

router.get('/filter/:id', async (req, res, next) => {
    let filter = req.params.id;
    const products = await Product.find({name: { "$regex": filter, "$options": "i" }})
    res.send(products)
});

router.get('/:id', async (req, res, next) => {
    const product = await Product.findOne({productID: req.params.id});
    res.send(product);
});

router.post('/sales/', async (req, res, next) => {
    
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    request.post(endpoint+'order/month/',
        {
            headers: {Authorization: req.headers.authorization},
            json: {'startdate': startdate, 'enddate': enddate}
        },
        (error, response, body) => {
            if(!error){
                if(body && body.length != 0){
                    products = [];

                    body.forEach(async detail => {
                        let product = await Product.findOne({productID: detail.product});
                        let category = await Category.findOne({categoryID: product.categoryID});

                        products.push({
                            productID: product.productID,
                            categoryname: category.categoryname,
                            name : product.name,
                            unitPrice : product.unitPrice,
                            url_image : product.url_image,
                            sales: detail.maxquantity,
                        });
                    
                        if(products.length == body.length) {
                            res.status = 200;
                            res.send(products);
                        }
                    });
                } else {
                    res.status = 200
                    res.send([]);
                }
                console.log('GET /api/v1/product/order/month/ status: 200')
            }
            else {
                res.status = 403
                res.send('Error');
            }
        }
    );
});

router.post('/create/', async (req, res, next) => {
    let categoryID = req.body.categoryID;
    let name = req.body.name;
    let description = req.body.description;
    let unitPrice = req.body.unitPrice;
    let url_image = req.body.url_image;

    request.post(endpoint+'create_product/',
        {
            headers: {Authorization: req.headers.authorization},
            json: {'categoryID': categoryID, 'name': name}
        },
        (error, response, body) => {
            if(body.productID){
                Product.create({
                    productID: body.productID,
                    categoryID: categoryID,
                    name: name,
                    description: description,
                    unitPrice: unitPrice,
                    url_image: url_image
                }, (err, newProduct) => {
                    if(err) {
                        res.status = 403;
                        res.send(err);
                    } else {
                        res.status = 201;
                        res.send(newProduct);
                    }
                });
            } else {
                res.status = 403
                res.send('Error');
            }
        }
    );
});

module.exports = router;