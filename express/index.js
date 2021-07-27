const express = require('express')
const path = require('path')
var cors = require('cors')
//const PORT = process.env.PORT || 5000
const PORT = 5001

var productsRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var commentaryRouter = require('./routes/commentary');

var connection = require('./models/index');

express()
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api/v1/product', productsRouter)
  .use('/api/v1/category', categoryRouter)
  .use('/api/v1/commentary', commentaryRouter)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/db'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
