const prisma = require("../lib/prisma");
const reshandler = require("../lib/reshandler");

const createreview = async (req,res) => {
const id = req.params.id;
const userID = req.userId;
const {text} = req.body;

try {
    const review = await prisma.review.create({
        data:{
            postID:id,
            userID,
            text
        }
    });

    return reshandler(res,review,false,'success',200);
} catch (error) {
    return reshandler(res,null,true,error.message,500);
}
}

module.exports = {createreview};