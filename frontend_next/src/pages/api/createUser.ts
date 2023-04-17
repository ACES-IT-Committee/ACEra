import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// http://localhost:3000/api/createUser

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });
    res.json(user);
};

export default createUser;
