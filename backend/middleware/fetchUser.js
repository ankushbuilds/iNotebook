const jwt = require("jsonwebtoken");
const JWT_SECRET = "iNotebook@123"; //defining a constant variable JWT_SECRET which will be used as the secret key for signing JSON Web Tokens (JWTs) for authentication purposes
const fetchUser = (req, res, next) => {

    // Get the user from the jwt token and add id to req object
    try {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"});
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();   //calling next function i.e async function
}
    catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}


module.exports = fetchUser;