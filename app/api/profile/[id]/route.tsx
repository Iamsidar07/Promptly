import User from "@/models/User";
import { Params } from "@/types";
import { connectToDatabase } from "@/utils/database"
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: Params) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const user =await User.findById(id);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json('Unable to fetch profile', { status: 500 });

    }
}
