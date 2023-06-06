import User from "@/models/User";
import { connectToDatabase } from "@/utils/database"
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { email } = await req.json();
    try {
        await connectToDatabase();
        const user = User.findOne({ email });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json('Unable to fetch profile', { status: 500 });
        
    }
}