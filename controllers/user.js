const User = require('../models/User');
const bcrypt = require('bcryptjs')

//update a user
const updateUser = async (req, res) => {
    if(req.body.password) {
        const salt  =  await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword
    }
    try {
        const updatedData = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedData);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteUser = async(req, res)=> {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');

    }catch(err) {
        return res.status(500).json(err);
    }
}


const getUser = async(req, res)=> {
    try{
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);

    }catch(err) {
        return res.status(500).json(err);
    }
}

const getUsers = async(req, res)=> {
    try{
        const users = await User.find();
        return res.status(200).json(users);

    }catch(err) {
        return res.status(500).json(err);
    }
}
module.exports = { updateUser, deleteUser, getUser, getUsers }