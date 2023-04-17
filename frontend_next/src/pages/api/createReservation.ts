import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// http://localhost:3000/api/createReservation

const createReservation = async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();
    const { user_id, workshop_id } = req.body;
    const reservation = await prisma.user_reservation.create({
        data: {
            user_id,
            workshop_id,
        },
    });
    res.json(reservation);
};

export default createReservation;
