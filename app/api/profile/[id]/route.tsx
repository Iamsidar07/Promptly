import User from "@/models/User";
import { connectToDatabase } from "@/utils/database"
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }) => {
    const { id } = params;
    console.log({id})
    try {
        await connectToDatabase();
        const user =await User.findById(id);
        console.log({user})
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json('Unable to fetch profile', { status: 500 });

    }
}
