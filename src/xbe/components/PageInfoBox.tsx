/* eslint-disable @typescript-eslint/no-explicit-any */
import { XBE_Page } from '@/xbe/models/Page';
import React from 'react';

/**
 * Props for the PageInfoBox component.
 * 
 * @interface PageInfoBoxProps
 * @property {XBE_Page} [page] - Optional page information to be displayed in the PageInfoBox.
 */
interface PageInfoBoxProps {
   page?: XBE_Page;
}


/**
 * PageInfoBox component displays detailed information about a page.
 * 
 * @component
 * @param {PageInfoBoxProps} props - The props for the PageInfoBox component.
 * @param {Object} props.page - The page object containing information to display.
 * @param {string} props.page.url - The URL of the page.
 * @param {string} props.page.uid - The unique identifier of the page.
 * @param {string} props.page.templateId - The template ID of the page.
 * @param {string} props.page.title - The title of the page.
 * @param {string} props.page.locale - The locale of the page.
 * @param {Array} [props.page.placeholders] - An optional array of placeholders for the page.
 * @param {string} props.page.placeholders[].name - The name of the placeholder.
 * @param {Array} props.page.placeholders[].value - The value of the placeholder, which is an array of items.
 * 
 * @returns {JSX.Element} The rendered PageInfoBox component.
 */
const PageInfoBox: React.FC<PageInfoBoxProps> = ({ page }) => {
   if (!page) return <></>;
   return (
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
         <div className="px-4 py-5 sm:px-6 text-bold" >
            PageInfo
         </div>
         <div className="px-4 py-5 sm:p-6">
            {page && <p>url : {page.url}</p>}
            {page && <p>id : {page.uid}</p>}
            {page && <p>Page type : {page.templateId}</p>}
            {page && <p>title : {page.title}</p>}
            {page && <p>locale : {page.locale}</p>}
         </div>
         {/* Placeholders weergeven */}
         {page.placeholders && page.placeholders.length > 0 && (
            <div className="mt-4">
               <h3 className="font-bold">Placeholders</h3>
               <ul className="mt-2 list-disc list-inside">
                  {page.placeholders.map((placeholder, index) => (
                     <li key={index}>
                        <>
                           <strong>{placeholder.name}:</strong>
                           { placeholder.components?.map((item: any, index: number) => {                              
                              //console.log("item",item.name,);                              
                              return (
                                 <div key={index} className="mt-4">
                                    <p><strong>{Object.keys(item)[0]}</strong></p>                                                                        
                                 </div>
                              );
                           })}
                        </>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>





   );
};

/**
 * PageInfoBox component.
 * 
 * This component is responsible for displaying information in a box format on a page.
 * It can be used to highlight important information or provide additional context to the user.
 * 
 * @component
 * @example
 * // Example usage:
 * <PageInfoBox>
 *   This is some important information.
 * </PageInfoBox>
 */
export default PageInfoBox;