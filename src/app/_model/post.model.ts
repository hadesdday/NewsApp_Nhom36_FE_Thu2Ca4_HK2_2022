export interface Post {
    author: string;
    categories: Array<string>;
    content: string;
    description: string;
    enclosure: Enclosure;
    guid: string;
    link: string;
    pubDate: string;
    thumbnail: string;
    title: string;
}

export interface Enclosure {
    link: string;
}

export interface PostListResponse {
    posts: Post[];
}

export interface PostResponse {
    post: Post;
}