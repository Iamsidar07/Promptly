import Prompt from "@/models/Prompt";
import { connectToDatabase } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET  = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});

    } catch (error) {
      return new Response(JSON.stringify("Unable to fetch prompts"), {status: 500});
        
    }

}