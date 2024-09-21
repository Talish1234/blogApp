const jwt = require('jsonwebtoken');
const reshandler = require('../lib/reshandler');
const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');

const login = async (req,res) => {
    const {username,password} = req.body;
    try{
    if(!username || !password)
    return reshandler(res,null,true,'Provide username or password',400);
    const user  = await prisma.User.findUnique({
        where:{
            username
        }
    });
    if(!user)
    return reshandler(res,null,true,'Invalid user',400);
    const isPassword = await bcrypt.compare(password,user.password);

    if(!isPassword)
    return reshandler(res,null,true,'Wrong password',400);
    
    const token = jwt.sign({
        id: user.id
      },process.env.SECRET, { expiresIn: 1000*60*60*24*30});
    
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    }).status(200).json({
        token,
        user,
        error: false
    });
}catch(error){
return reshandler(res,null,true,error.message,500);
}
}

const logout = (req, res) => {
    try{
    res.clearCookie("token").status(200).json({
        message: "Logout successfully",
        error: "false",
        success: "true"
    });
}catch(err){
    res.json(error.message);
}
}

module.exports = {login,logout}