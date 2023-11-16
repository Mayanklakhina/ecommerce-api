const Cart = require('../models/Cart');

const createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const cartData = await newCart.save();
        res.status(201).json(cartData);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const updateCart = async (req, res) => {
    try {

        const updatedProduct = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedCart);

    } catch (err) {
        return res.status(400).json(err)
    }
}

const deleteCart = async (req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted')

    }catch(err){
        return res.status(400).json(err)
    }
}

const getUserCart = async(req, res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
}

const getAllCart = async(req, res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
}
module.exports = { createCart, updateCart, deleteCart, getUserCart, getAllCart }