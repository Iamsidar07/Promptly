import Prompt from "@/models/Prompt";
import { connectToDatabase } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (req: NextApiRequest, { params }) => {
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