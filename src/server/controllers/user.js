import { config } from 'dotenv';
config();
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import  {createNewUser, getUserByUsername } from '../domain/user.js';

const secretKey = process.env.JWT_SECRET;
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 12);

    try {
        const foundUser = await getUserByUsername(username);
        if(foundUser) {
            console.log('found user inside if', foundUser)
            return res.json({error: "user already exist"});
        }
        const usersaved = await createNewUser(username, hashedPassword);
        console.log('new user', usersaved);
        console.log('found user ouside if', foundUser)

        return res.status(201).json({"message" : "registration successfully!"});

    } catch (error) {
        console.log(error);
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await getUserByUsername(username);

        if(!foundUser) {
            return res.status(401).json({"error" : "user does not exist!"});
        }

        const passwordMatched = await compare(password, foundUser.password);

        if(!passwordMatched) {
            return res.status(401).json({"error2" : "username or password doesnt match"});
        }

        const token = await jwt.sign({username: foundUser.username}, secretKey);
        return res.status(200).json({ redirect: "http://localhost:5173/create-movie", token: token});

    } catch (error) {
        console.log(error);
    }
};







export {registerUser, loginUser};