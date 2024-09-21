const reshandler = require('../lib/reshandler');
const prisma = require('./../lib/prisma.js');

const getTopPosts = async (req, res) => {
    try {
        const topPosts = await prisma.post.findMany({
            orderBy: {
                views: 'desc',
            },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
            take: 5,
        });
        return reshandler(res, topPosts, false, 'success', 200);
    } catch (error) {
        return reshandler(res, null, true, error.message, 500);
    }
};

const getPosts = async (req,res) => {
    try {
    
    const page =  (req.query.page)?parseInt(req.query.page):1;
  
    const catogries = req.query.catogries || undefined;
    const pageSize = 7; 
    
    const posts = await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where:{
        catogries
      },
      include:{
        user:{
            select:{
                username:true
            }
        }
      }
    });
    
    return reshandler(res,posts,false,'success',200);

    } catch (error) {
        return reshandler(res,null,true,error.message,500);
    }
}

const getPost = async (req,res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
              id
            },
            include: {
              description: true, 
              user: {
                select: {
                  username: true
                }
              },
              reviews: {
                select: {
                  text: true,
                  createdAt: true,
                  user: {
                    select: {
                      username: true,
                      profile: true
                    }
                  }
                }
              }
            }
          });
          
    await prisma.post.update({
        where:{
            id
        },
        data:{
            views:(post.views+1)
        }
    })
    return reshandler(res,post,false,'success',200);
    } catch (error) {
        return reshandler(res,null,true,error.message,500);
    }
}

const createPost = async (req,res) => {

const userId = req.userId;
const {title,coverImage,description,summary,catogries} = req.body;
if(!title)
return reshandler(res,null,true,'Provide title',400);

if(!catogries)
return reshandler(res,null,true,'Provide catagrie',400);

try{
const post = await prisma.post.create({
    data:{
        title,
        views:0,
        ...(coverImage && {coverImage}),
        description:{
          create:{
          ...(description && {desc:description})
          }
      },
        ...(summary && {summary}),
        catogries,
        userId
    }
})

return reshandler(res,post,false,200);

}catch(error){
return reshandler(res,null,true,error.message,500);
}

}

const myPost = async (req,res) => {
  const userId = req.userId;
 
  try {  
    const posts = await prisma.post.findMany({
      where:{
      userId
      },
      include:{
        user:{
            select:{
                username:true
            }
        }
      }
    });
    return reshandler(res,posts,false,'success',200);

    } catch (error) {
        return reshandler(res,null,true,error.message,500);
    }
}

const EditorPost = async (req,res) => {
  const userId = req.params.id;
 
  try {  
    const posts = await prisma.post.findMany({
      where:{
      userId
      },
      include:{
        user:{
            select:{
                username:true
            }
        }
      }
    });
    (posts)
    return reshandler(res,posts,false,'success',200);

    } catch (error) {
        return reshandler(res,null,true,error.message,500);
    }
}

module.exports = {createPost,getTopPosts,getPosts,getPost,myPost,EditorPost};