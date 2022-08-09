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

export interface Article {
    category: string;
    description: string;
    guid: string;
    link: string;
    media:string;
    pubDate: string;
    title: string;
}

export interface ArticleResponse {
    description: string;
    item: Article[];
    lastBuildDate: string;
    link: string;
    title: string;
}

export interface Media {

}