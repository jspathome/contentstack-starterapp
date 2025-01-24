/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from "./action";
import { ComponentAdditionalParam } from "./ComponentAdditionalParam";
import { Image } from "./Image";


type Employee = {
    image: Image;
    name: string;
    designation: string;
    $: ComponentAdditionalParam;
}

type BucketList = [
    BucketArray: {
        title_h3: string;
        description: string;
        url: string;
        call_to_action: Action;
        icon: Image;
        $: ComponentAdditionalParam;
    }
]

type Card = [
    cardArray: {
        title_h3: string;
        description: string;
        call_to_action: Action;
        $: ComponentAdditionalParam;
    }
]

type Article = {
    href: string;
    title: string;
    $: ComponentAdditionalParam;
}

type FeaturedBlog = [
    BlogArray: {
        title: string;
        featured_image: Image;
        body: string;
        url: string;
        $: ComponentAdditionalParam;
    }
]

type Widget = {
    title_h2: string;
    type?: string;
    $: ComponentAdditionalParam;
}

export type Component = {
    description: any;
    superheroes: any;
    hero_banner: Banner;
    section?: SectionProps;
    section_with_buckets?: SectionWithBucket;
    from_blog?: FeaturedBlogData;
    section_with_cards?: Cards;
    section_with_html_code?: AdditionalParamProps;
    our_team?: TeamProps;
    widget?: Widget;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList;
    description: string;
    $: ComponentAdditionalParam;
}

export type Cards = {
    cards: Card;
}

export type Banner = {
    banner_title: string;
    banner_description: string;
    bg_color: string;
    call_to_action: Action;
    banner_image: Image;
    text_color: string;
    $: ComponentAdditionalParam;
}

export type AdditionalParamProps = {
    html_code_alignment: string;
    title: string;
    $: ComponentAdditionalParam;
    description: string;
    html_code: string;
}

export type SectionProps = {
    title_h2: string;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: ComponentAdditionalParam;
}

export type TeamProps = {
    title_h2: string;
    description: string;
    $: ComponentAdditionalParam;
    employees: [Employee];
}

export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: ComponentAdditionalParam;
}

export type RenderProps = {
    blogPost?: boolean;
    contentTypeUid: string;
    entryUid: string;
    locale: string;
    pageComponents: Component[];
}