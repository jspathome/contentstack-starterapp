import React from 'react';
import { BaseComponentProps } from '../models/BaseComponentProps';
import Placeholder from '../components/Placeholder';
import { XBE_Page } from '../models/Page';

/**
 * Props for the PageFullWidth component.
 * 
 * @interface PageFullWidthProps
 * @extends {BaseComponentProps}
 * 
 * @property {XBE_Page} [page] - Optional page data of type XBE_Page.
 */
interface PageFullWidthProps extends BaseComponentProps {
    page?: XBE_Page;    
}

/**
 * PageFullWidthLayout is a React functional component that renders a full-width page layout.
 * It takes a `page` prop and passes it to a `Placeholder` component.
 *
 * @component
 * @param {PageFullWidthProps} props - The props for the component.
 * @param {Object} props.page - The page data to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const PageFullWidthLayout: React.FC<PageFullWidthProps> = ({ page  }) => {
    return (
        <div className=''>
            <Placeholder placeholderName='xbe_placeholder_main' page={page} />
        </div>
    );
};

export default PageFullWidthLayout;