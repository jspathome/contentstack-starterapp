
import { Track } from '@/models/mtb/track';
import Link from 'next/link';
import React from 'react';

interface TrackListProps {
    data: Track[];
}

const TrackList: React.FC<TrackListProps> = (props) => {
    // Implement your component logic here

    return (
        <div>
           <ul>                
                {props.data?.map((track, index) => (
                    <li key={index}>
                        <Link legacyBehavior href={track.url}>
                        <a>
                         <h2>{track.title}</h2>
                        </a>
                        </Link>
                        {/* <p>{track.description}</p>
                        <p>{track.city}</p>
                        <p>{track.province}</p>
                        <p>{track.country}</p> */}
                        {/* <img src={track.} alt={track.title} /> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;