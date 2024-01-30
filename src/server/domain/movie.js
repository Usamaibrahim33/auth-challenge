import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const createNewMovieDb = async (title, description, runtimeMins, userName) => {
    console.log(userName) 
    return await prisma.movie.create({
        data: {
            title: title,
            description: description,
            runtimeMins: runtimeMins,
            user: {
                connect: { username: userName }
            }
        },
        include: {
            user: true
        }
    })
}

const getAllMoviesDb = async (username) => {
   return await prisma.movie.findMany({
    where : {
        username: username
    }
   })
}




const deleteMovieByIdDb = async (userId, userName) => {
    console.log(userId, userName)
    return await prisma.movie.delete({
        where: {
            id: userId
        },
    });
}




export { createNewMovieDb, getAllMoviesDb, deleteMovieByIdDb};