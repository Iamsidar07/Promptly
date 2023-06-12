import Prompt from '@/models/Prompt';
import { Params } from '@/types';
import { connectToDatabase } from '@/utils/database';

export const GET = async ({ params }: Params) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({
            // select all the prompt with this id of creator
            creator: id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Unable to fetch prompts"), { status: 500 });

    }

}