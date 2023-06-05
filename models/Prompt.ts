import { model, Schema, models } from "mongoose";

const PromptSchema = new Schema({
    prompt: {
        type: String,
        required: [true, 'prompt is required']
    },
    tags: {
        type: String,
        required: [true, 'tags is required'],
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
