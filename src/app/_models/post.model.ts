export interface PostModel {
    guid: string;
    link: string;
    pubDate: string;
    category: string;
    title: string;
    description: string;
    content: string;
    image_url: string;
}

export interface PostListResponse {
    posts: PostModel[];
}

export interface PostResponse {
    post: PostModel;
}