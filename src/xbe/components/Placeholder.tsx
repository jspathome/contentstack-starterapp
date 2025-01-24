/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { XBE_Page } from '../models/Page';
import PlaceholderRenderer from './PlaceholderRenderer';
import { XBE_Placeholder } from '../models/Placeholder';

/**
 * Props for the Placeholder component.
 *
 * @interface PlaceholderProps
 * @property {string} placeholderName - The name of the placeholder.
 * @property {XBE_Page} [page] - Optional page object associated with the placeholder.
 */
interface PlaceholderProps {
  placeholderName: string;
  page?: XBE_Page;
}

/**
 * Placeholder component that renders a placeholder based on the provided placeholder name and page data.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.placeholderName - The name of the placeholder to be rendered.
 * @param {Object} props.page - The page object containing placeholders.
 * @returns {JSX.Element} The rendered placeholder component.
 *
 * @example
 * <Placeholder placeholderName="header" page={pageData} />
 */
const Placeholder: React.FC<PlaceholderProps> = ({placeholderName, page }) => {

    //console.log('Placeholder', placeholderName, page);
    const placeholder = page?.placeholders?.filter((placeholder: XBE_Placeholder) => placeholder.uid === placeholderName)[0];
    //console.log('Placeholder', placeholder);

  return (
    <div>
      {placeholder && (
        <React.Fragment key={placeholder.uid}>
          <PlaceholderRenderer placeholder={placeholder} />        
        </React.Fragment>
      )}
    </div>
  );
};
export default Placeholder;
