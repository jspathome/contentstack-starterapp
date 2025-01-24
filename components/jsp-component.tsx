'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
    name: string;
}

const JspComponent: React.FC<Props> = ({ name }) => {
    const entryUrl = usePathname();
    console.log('entryUrl', entryUrl);


    async function fetchData() {
        try {
            console.log('entryUrl', entryUrl);
           // const items = await getAllComposableHeros(entryUrl);
           // console.log('items', items);

            //if (!bannerRes) throw new Error('Status code 404');
            //setBanner(bannerRes);
            const archivePostRes = [] as any;
            const postsRes = [] as any;

            // bannerRes?.characters?.forEach((superHero: { is_archived: any; }) => {
            //     if (superHero.is_archived) {
            //         archivePostRes.push(superHero);
            //     } else {
            //         postsRes.push(superHero);
            //     }
            // });

            //setArchivePost(archivePostRes);
            //setPosts(postsRes);

        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     onEntryChange(() => fetchData());
    // }, []);


    return (
        <div>
            <h1>Hello, {name}</h1>
        </div>
    );
};

export default JspPage;