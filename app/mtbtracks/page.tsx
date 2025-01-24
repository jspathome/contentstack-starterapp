'use client';

import React, { useState, useEffect } from 'react';
import { onEntryChange } from '../../contentstack-sdk';
import BlogList from '../../components/blog-list';
import RenderComponents from '../../components/render-components';
import { getPageRes, getBlogListRes, metaData, getAllTracks } from '../../helper';

import ArchiveRelative from '../../components/archive-relative';
import Skeleton from 'react-loading-skeleton';
import { Page, PostPage, PageUrl, Context } from "../../typescript/pages";
import { usePathname } from 'next/navigation';
import TrackList from '@/components/trackList';
import { Track } from '@/models/mtb/track';

export default function Tracks() {
    const entryUrl = usePathname();

    const [tracks, setTracks] = useState<Track[]>();
    //const [posts, setPosts] = useState<PostPage>();
    
    async function fetchData() {
        try {
            const tracksRes = await getAllTracks();

            if (!tracksRes) throw new Error('Status code 404');

            console.log(">>>>> tracksRes", tracksRes[0]);
            if (tracksRes && tracksRes.length > 0) {
                setTracks(tracksRes[0] as Track[]);
            }

            console.log("tracks", tracks);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onEntryChange(() => fetchData());
    }, []);

    return (
        <>            
            <TrackList data={tracks || []} /> 
          
        </>
    );
}