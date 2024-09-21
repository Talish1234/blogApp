const reshandler = require('../lib/reshandler.js');
const prisma = require('./../lib/prisma.js');
const bcrypt = require('bcryptjs');

const getUsers = async (req,res) => {
try {
    const user = await prisma.user.findMany({
        select: {
        id: true,
        email: true,
        username:true,
        bio:true,
        location:true,
        profile:true,
        date:true,
        createdAt:true
      },
    take:5});
    return reshandler(res,user,false,'success',200);
} catch (error) {
    res.status(500).json({
        message:error.message,
        error:true
    });
}
}

const getUser = async (req,res) => {
    const userId = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select: {
                password:false
          }});
        return reshandler(res,user,false,'success',200);
    } catch (error) {
        res.status(500).json({
            message:error.message,
            error:true
        });
    }
}

const createUser = async (req,res) => { 
const {email,username,password,profile,date,bio,location} = req.body;

try{
if(!email)
return reshandler(res,null,true,'Provide Email',400);
if(!password)
return reshandler(res,null,true,'Provide Password',400);
if(!username)
return reshandler(res,null,true,'Provide Username',400);
if(!date)
return reshandler(res,null,true,'Provide Birth Date',400);

const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
    data:{
        username,
        email,
        password:hashedPassword,
        date,
        ...(profile && {profile}),
        ...(location && {location}),
        ...(bio && {bio}),
         }
});
return reshandler(res,user,false,'Success',200);
}catch(error){
    res.status(500).json({
        message:error.message,
        error:true
    });
}
}

const updateUser = async (req,res) => {
    const {username,bio,location,profile,date,password} = req.body;
    
    let hashedPassword = undefined;
    if(password)
    hashedPassword = await bcrypt.hash(password, 10);
    try{
    const user = await prisma.user.update({
        where:{
            id:req.userId
        },
        data:{
            username,
            bio,
            location,
            profile,
            ...(date && {date}),
            ...(password && {password:hashedPassword})
        }
    });
    return reshandler(res,user,false,'Success',200);
    }catch(error){
        res.status(500).json({
            message:error.message,
            error:true
        });
    }  
}


module.exports = {getUser,getUsers,createUser,updateUser};