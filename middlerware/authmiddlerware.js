const jwt = require('jsonwebtoken');
const reshandler = require('../lib/reshandler');

const authmiddleware = async (req,res,next) => {
    const cookie = await req.cookies.token;
    if(!cookie)
    return reshandler(res,null,true,'Loggin first!',400);
    
    try{
        jwt.verify(cookie, process.env.SECRET, async (err,payload)=> {

            if(err)
            return reshandler(res,null,true,'Invalid User',401);
            req.userId = payload.id;
            next();
            })
    }catch(error){
        return reshandler(res,null,true,error.message,500);
    }
}

module.exports = {authmiddleware};