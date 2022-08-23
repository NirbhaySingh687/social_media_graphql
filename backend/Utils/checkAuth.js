const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server")

module.exports = (context) => {
    // context = { ...headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        // Bearer ....
        const token = authHeader.split("Bearer ")[1];
        if(token){
            try{
                 const user =jwt.verify(token, "superSecretPassword");
                 return user;
            }catch(err){
                throw new AuthenticationError("Invalid/Expired token")
            }
        }
        throw new Error('Authentication token must be start with Bearer');
    }
    throw new Error('Authorization header must be provided')
}