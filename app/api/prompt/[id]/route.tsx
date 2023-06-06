import Prompt from "@/models/Prompt";
import { Params } from "@/types";
import { connectToDatabase } from "@/utils/database";
import { NextRequest } from "next/server";


export const GET = async (req: NextRequest, { params }: Params) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({
            // select all the prompt with this id of creator
            creator: id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify("Unable to fetch prompts"), { status: 500 });

    }

}