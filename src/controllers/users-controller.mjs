import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";
import UserRepository from "../repositories/users-repositories.mjs";

export const addUser = catchErrorAsync(async(req,res,next) => {

    const user = await new userRepository().add(req.body);

    res.status(201).json({
        status: "success",
        statusCode:201,
        data: { user: user}
    });
})

export const listUsers = catchErrorAsync(async(req,res,next) => {
    const users = await new UserRepository().list();

    res.status(200).json({
        status: "success",
        statusCode:200,
        data: { users: users}
    })
})