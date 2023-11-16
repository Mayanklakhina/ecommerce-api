const express = require('express');
const port = 8000;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order')

const app = express();

mongoose.connect("mongodb://localhost/ecommerceDB", {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : true})
.then(()=> {
    console.log("Connected to MongoDB!")
}).catch((err)=> {
    console.log(`Error in connecting to db ${err}`)
})

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes)

app.listen(process.env.PORT || port, (err)=> {
    if(err) {
        console.log(`Error in running the server ${err}`)
    }
    console.log(`Server is running on port : ${port}`)
})