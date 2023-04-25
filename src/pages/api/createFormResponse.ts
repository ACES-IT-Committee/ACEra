import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

// http://localhost:3000/api/createFormResponse

// ERRORS:
// 1- "INVALID_EMAIL" -> IF THE EMAIL ENTRY IS NOT UNIQUE
// 2- "UNKNOWN_ERROR" -> IF ANY OTHER ERROR IS ENCOUNTERED
// SUCCESS:
// 1- "SUCESS" -> IF THE FIELDS ARE COMPLETE AND SOUND

const createFormResponse = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === "POST") {
        try {
            const prisma = new PrismaClient();
            const {
                name,
                email,
                phone,
                school,
                major,
                gradYear,
                experience,
                workshops,
            } = req.body;
            const formResponse = await prisma.response.create({
                data: {
                    name,
                    email,
                    phone,
                    school,
                    major,
                    gradYear,
                    experience,
                    workshops,
                },
            });
            res.json("SUCESS");
        } catch (err) {
            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                err.code === "P2002"
            ) {
                res.json("INVALID_EMAIL");
            } else res.json("UNKNOWN_ERROR");
        }
    } else {
        res.status(405).json(`Method ${req.method} is not POST`);
    }
};

export default createFormResponse;
