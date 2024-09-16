export type Artwork = {
    id: string;
    name: string;
    status: string;
    useCase: string;
    tags: string[];
    comicRoles: string; // Consider parsing this JSON string into a proper type
    llama: string[];
    imageUrl: string;
    redrawList: string; // Consider parsing this JSON string
    font: string;
    fontSize: number;
    prompt: string;
    linkFileId: string;
    lang: string;
    queueNumber: number;
    failedCode: number;
    seed: number;
    preset: string;
    layout: string;
    comicData: string; // Consider parsing this JSON string into a proper type
    characterData: null | any; // Replace 'any' with a more specific type if known
    description: null | string;
    generator_spec: string; // Consider parsing this JSON string into a proper type
    createdAt: string;
    updatedAt: string;
    userId: string;
    playgroundId: null | string;
    bubble: string;
    isPublished: boolean;
    showCaption: boolean;
    failedMessage: null | string;
    templatePrompt: string; // Consider parsing this JSON string into a proper type
    priority: number;
    isDeleted: number;
    taskId: string;
    User: {
        name: string;
        image: string;
        bio: string;
        email: string;
    };
};