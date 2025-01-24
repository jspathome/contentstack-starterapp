'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { usePathname } from 'next/navigation';
import { getPageRes, getTrackRes, metaData } from '@/helper';
import { BlogPosts, Page } from '@/typescript/pages';
import { onEntryChange } from '@/contentstack-sdk';
import RenderComponents from '@/components/render-components';
import { Track } from '@/models/mtb/track';


export default function TrackDetail() {
    const entryUrl = usePathname();
    console.log("entryUrl", entryUrl);  
    const [track, setTrack] = useState<Track>();
    const [page, setPage] = useState<Page>();
    const [getTrackDetailPage, setTrackDetailPage] = useState({ banner: page, track: track });

    async function fetchData() {
        try {
            const trackRes = await getTrackRes(entryUrl);
            console.log("trackRes", trackRes);
            const bannerRes = await getPageRes('/mtbtracks');
            console.log("bannerRes", bannerRes);
            if (!trackRes) throw new Error('Status track: ' + 404);
            //if (!bannerRes) throw new Error('Status banner: ' + 404);
            setTrack(trackRes);
            setPage(bannerRes);
            setTrackDetailPage({ banner: bannerRes, track: trackRes });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log("useEffect >>>>");
        onEntryChange(() => fetchData());
    }, []);

    const data = getTrackDetailPage;
    console.log("data", data);
        
    return (
        <>
            {/* {blogPost?.seo && blogPost.seo.enable_search_indexing && metaData(blogPost.seo)} */}
            {data.banner ? (
                <RenderComponents
                    pageComponents={data.banner.page_components}
                    blogPost
                    contentTypeUid='track'
                    entryUid={data.banner?.uid}
                    locale={data.banner?.locale}
                />
            ) : (
                <Skeleton height={400} />
            )}
            <div className='blog-container'>
                <article className='blog-detail'>
                    {data.track && data.track.title ? (
                        <h2>{data.track.title}</h2>
                    ) : (
                        <h2>
                            <Skeleton />
                        </h2>
                    )}
                </article>
                {/* <div className='blog-column-right'>
                    <div className='related-post'>
                        {banner && banner?.page_components[2].widget ? (
                            <h2 {...banner?.page_components[2].widget.$?.title_h2 as {}}>
                                {banner?.page_components[2].widget.title_h2}
                            </h2>
                        ) : (
                            <h2>
                                <Skeleton />
                            </h2>
                        )}
                        {post && post.related_post ? (
                            <ArchiveRelative
                                {...post.$?.related_post}
                                blogs={post.related_post}
                            />
                        ) : (
                            <Skeleton width={300} height={500} />
                        )}
                    </div>
                </div> */}
            </div>
        </>
    );
}