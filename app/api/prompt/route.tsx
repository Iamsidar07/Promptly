import Prompt from "@/models/Prompt";
import { connectToDatabase } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export const GET  = async (req: NextApiRequest) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
      return new Response(JSON.stringify("Unable to fetch prompts"), {status: 500});
        
    }

}