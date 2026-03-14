import {prisma} from "../infrastructure/prisma";
import {CreateUserInput} from "../schemas/user.schema";

export const createUser= async(data: CreateUserInput)=>{
    const extistingUser= await prisma.user.findUnique({
        where:{email:data.email}
    })

    if(extistingUser) throw new Error("User with this email already exists")

    return "ok";

}