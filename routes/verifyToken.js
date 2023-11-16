const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader) { 
     const token = authHeader.split(" ")[1];
       jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=> {
        if(err)  return res.status(403).json('token is not valid')

        req.user = user
        next()
       })
    }else {
        return res.status(400).json('you are not authenticated')
    }
}

// function to check wheather the token is related to clients or admin 

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            // (client || admin)
            next();
        }else {
            return res.status(403).json("you are not allowed to do that!")
        }
    })
}

//this is for product routes and controllers because only admin can do CRUD
const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin) {
            next();
        }else {
            return res.status(403).json("you are not allowed to do that!")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}