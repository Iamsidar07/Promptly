import { ReactNode } from "react";
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

export type ProfileProps = {
    isLoading?: boolean;
    userDetails: Creator | any;
    data: Post[];
    handleDelete?: (id: string) => void;
    handleEdit?: (id: string) => void;
}

export interface PromptCardProps {
    data: Post;
    handleTagClick?: (tag: string) => void;
    handleEdit?: (id: string) => void;
    handleDelete?: (id: string) => void;
}

export interface ProviderProps {
    children: ReactNode,
    session: any
}