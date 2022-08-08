import { Post } from "./post.model";

export interface Feed {
    author: string;
    description: string;
    image: string;
    link: string;
    title: string;
    url: string;
}

export interface FeedResponse {
    feed: Feed;
    items: Post[];
    status: string;
}

export interface FeedModel {
    title: String,
    slug:String
}