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