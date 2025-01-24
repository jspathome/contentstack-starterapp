/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { BaseComponentProps } from '../models/BaseComponentProps';
import AtomContentBlock from '../atomic/AtomContentBlock';
//import { addEditableTags } from '@contentstack/utils';

/**
 * Props for the ContentBlock component.
 * 
 * @interface ContentBlockProps
 * @extends {BaseComponentProps}
 * 
 * @property {string} [xbe_title] - Optional title for the content block.
 * @property {string} [xbe_content] - Optional content for the content block.
 */
interface ContentBlockProps extends BaseComponentProps {
    [x: string]: any;
    xbe_title?: string;
    xbe_content?: string;
}

/**
 * A React functional component that renders a content block with a title and content.
 *
 * @component
 * @param {ContentBlockProps} props - The properties object.
 * @param {string} props.xbe_title - The title to be displayed in the content block.
 * @param {string} props.xbe_content - The content to be displayed in the content block.
 * @returns {JSX.Element} The rendered content block component.
 */
const ContentBlock: React.FC<ContentBlockProps> = ({ xbe_content, xbe_title, ...rest }) => {    
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();        
    const [editTagTitle, setEditTagTitle] = useState<string>();        
    const [editTagContent, setEditTagContent] = useState<string>();        

    useEffect(() => {
        setTitle(xbe_title);
        setContent(xbe_content);
        setEditTagTitle(rest.$.xbe_title['data-cslp']);
        setEditTagContent(rest.$.xbe_content['data-cslp']);     
    }, [xbe_title, xbe_content, rest.$]);

    return (
        <>           
            <AtomContentBlock>
                <AtomContentBlock.Title data-cslp={editTagTitle}>
                    {title}
                </AtomContentBlock.Title>
                <AtomContentBlock.Content data-cslp={editTagContent}>
                    <div    dangerouslySetInnerHTML={{ __html: content || '' }} />
                </AtomContentBlock.Content>
            </AtomContentBlock>
        </>

    );
};

export default ContentBlock;