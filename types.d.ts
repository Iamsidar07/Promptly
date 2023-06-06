export interface Prompt {
    prompt: string;
    tags: string;
}

export interface Post  {
    _id: string;
    prompt: string;
    tags: string;
    creator: Creator;
}
interface Creator  {
    _id: string;
    image: string;
    username: string;
    email: string;
}

export interface Params {
    params:{
        id: string;
    }
}