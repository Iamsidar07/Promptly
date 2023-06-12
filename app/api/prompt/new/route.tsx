import PromptModel from '@/models/Prompt';
import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';
export const POST = async (req: Request) => {
    const {prompt,tags,userId} = await req.json();
    try {
        await connectToDatabase();
        const newPrompt = new PromptModel({
            prompt,
            tags,
            creator: userId
        });
        await newPrompt.save();
        return NextResponse.json(newPrompt, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json('Failed to create a new prompt', { status: 500 });

    }
}