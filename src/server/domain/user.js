import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const createNewUser = async (username, password) => {
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
}

const getUserByUsername = async (username) => {
    return await prisma.user.findUnique({
        where: {username: username}
    })
}

export {createNewUser, getUserByUsername};