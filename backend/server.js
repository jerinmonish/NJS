require('dotenv').config()
// console.log(process.env)
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// MIDDLEWARE
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/assets/'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Routes
const homeRoutes = require('./routes/home');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');

//Main direction
app.use('/api', homeRoutes, categoryRoutes, productRoutes, userRoutes, cartRoutes);
app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//DB connection
const db = require('./db/db');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})


//Port config
const PORT = process.env.PORT || 5000;

//DB sync which happens once, since its synchronus.
//db.sync({ force: true }).then(() => {
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));