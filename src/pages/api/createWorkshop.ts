import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// http://localhost:3000/api/createWorkshop

const createWorkshop = async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();
    const { name } = req.body;
    const workshop = await prisma.workshop.create({
        data: {
            name,
        },
    });
    res.json(workshop);
};

export default createWorkshop;
