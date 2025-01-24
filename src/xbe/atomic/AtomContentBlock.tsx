/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, ReactElement } from 'react';

/**
 * Props for the Title component.
 * 
 * @interface TitleProps
 * @property {ReactNode} children - The content to be rendered inside the title component.
 * @property {any} [key] - Additional properties that can be passed to the title component.
 */
interface TitleProps {
    children: ReactNode;
    [key: string]: any;
}

interface ContentProps {
    children: ReactNode;
    [key: string]: any;
}

/**
 * A functional component that renders its children inside an <h1> element
 * with predefined styling for text size, font weight, and margin bottom.
 *
 * @param {ReactNode} children - The content to be displayed inside the <h1> element.
 * @returns {JSX.Element} The rendered <h1> element with the provided children.
 */
const Title: React.FC<TitleProps> = ({ children, ...rest }) => <h1 className="text-2xl font-bold mb-2" {...rest}>{children}</h1>;

/**
 * A functional component that wraps its children in a div with a bottom margin.
 *
 * @param {ReactNode} children - The content to be wrapped inside the div.
 * @returns {JSX.Element} A div element with a bottom margin containing the children.
 */
const Content: React.FC<ContentProps> = ({ children, ...rest }) => <div className="mb-4" {...rest}>{children}</div>;

/**
 * A functional component that renders its children inside a div element.
 *
 * @component
 * @param {ReactNode} children - The content to be rendered inside the div.
 * @returns {JSX.Element} A div element containing the children.
 */
//const Image: React.FC<{ children: ReactNode }> = ({ children }) => <div className="">{children}</div>;

// const Image: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
//     <img src={src} alt={alt} className="w-full rounded-md" />
// );

/**
 * Props for the AtomContentBlock component.
 *
 * @interface AtomContentBlockProps
 * @property {ReactNode} children - The content to be rendered within the block.
 */
interface AtomContentBlockProps {
    children: ReactNode;
}

/**
 * A React functional component that renders a content block with a title, content, and image.
 * It expects children components of specific types: Title, Content, and Image.
 * 
 * @component
 * @example
 * ```tsx
 * <AtomContentBlock>
 *   <AtomContentBlock.Title>Title Text</AtomContentBlock.Title>
 *   <AtomContentBlock.Content>Content Text</AtomContentBlock.Content>   
 * </AtomContentBlock>
 * ```
 * 
 * @param {AtomContentBlockProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the content block.
 * 
 * @returns {JSX.Element} The rendered content block component.
 * 
 * @property {typeof Title} Title - The Title subcomponent.
 * @property {typeof Content} Content - The Content subcomponent.
 * @property {typeof Image} Image - The Image subcomponent.
 */
const AtomContentBlock: React.FC<AtomContentBlockProps> & {
    Title: typeof Title;
    Content: typeof Content;
    //Image: typeof Image;
} = ({ children }) => {
    const title = React.Children.map(children, (child) =>
        (child as ReactElement).type === Title ? child : null
    );
    const content = React.Children.map(children, (child) =>
        (child as ReactElement).type === Content ? child : null
    );

    return (
        <div className="p-4 border rounded-md shadow-md mt-2 mb-2">
            {title}
            <div>{content}</div>
        </div>
    );
};

AtomContentBlock.Title = Title;
AtomContentBlock.Content = Content;

export default AtomContentBlock;