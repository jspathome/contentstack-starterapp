import React from 'react';
import { BaseComponentProps } from '../models/BaseComponentProps';
import Placeholder from '../components/Placeholder';
import { XBE_Page } from '../models/Page';

/**
 * Props for the PageHalfWidth component.
 *
 * @interface PageHalfWidthProps
 * @extends {BaseComponentProps}
 * 
 * @property {XBE_Page} [page] - Optional page data of type XBE_Page.
 */
interface PageHalfWidthProps extends BaseComponentProps {
    page?: XBE_Page;
}

/**
 * A React functional component that renders a page layout with two placeholders side by side.
 * Each placeholder is rendered within a separate `div` element.
 *
 * @component
 * @param {PageHalfWidthProps} props - The props for the component.
 * @param {Object} props.page - The page object passed to the placeholders.
 * @returns {JSX.Element} The rendered component.
 */
const PageHalfWidthLayout: React.FC<PageHalfWidthProps> = ({ page }) => {
    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-1">
                        <div className="p-0 rounded">
                            <Placeholder placeholderName='xbe_placeholder_left' page={page} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-1">
                        <div className="p-0 rounded">
                            <Placeholder placeholderName='xbe_placeholder_right' page={page} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageHalfWidthLayout;