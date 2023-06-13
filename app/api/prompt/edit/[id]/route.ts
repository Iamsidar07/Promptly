import PromptModel from '@/models/Prompt';
import { Params } from '@/types';
import { connectToDatabase } from '@/utils/database';
import { NextResponse } from 'next/server';

//Get (reads prompt)
export const GET = async (req:Request,{ params }: Params) => {
    const { id } = params;
    try {
        await connectToDatabase();
        const prompt = await PromptModel.findById(id).populate('creator');
        if (!prompt) {
            return NextResponse.json('Prompt not found', { status: 404 });
        }
        return NextResponse.json(prompt, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(`Failed to create a new prompt with id:${id}`, { status: 500 });
    }
}

// PATCH (updates prompt)
export const PATCH = async (req: Request, { params }: Params) => {
    const { tags, prompt } = await req.json();
    const { id } = params;
    try {
        await connectToDatabase();
        const existingPrompt = await PromptModel.findByIdAndUpdate(id, { tags, prompt });
        return NextResponse.json(existingPrompt, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(`Failed to update prompt with id:${id}`, { status: 500 });
    }
}

// DELETE (deletes prompt)
export const DELETE = async ({ params }: Params) => {
    const { id } = params;
    try {
        await connectToDatabase();
        await PromptModel.findByIdAndRemove(id);
        return NextResponse.json('Deleted successfull', { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(`Failed to delete with id:${id}`, { status: 500 });

    }
}