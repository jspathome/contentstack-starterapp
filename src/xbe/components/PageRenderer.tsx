/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { XBE_Page } from '../models/Page';
import { layoutBuilder } from '../layouts/layoutsMap';

/**
 * Props for the PageRenderer component.
 * 
 * @interface PageRendererProps
 * @property {XBE_Page} [page] - Optional page data to be rendered.
 */
interface PageRendererProps {
  page?: XBE_Page;
}

/**
 * PageRenderer component is responsible for rendering the appropriate layout
 * based on the provided page's templateId. It uses the layoutBuilder to get
 * the corresponding layout factory and renders the layout with the given page
 * data.
 *
 * @param {PageRendererProps} props - The properties for the PageRenderer component.
 * @param {Object} props.page - The page object containing the templateId and other page data.
 * @returns {JSX.Element} The rendered layout component or an error message if no layout is found.
 */
const PageRenderer: React.FC<PageRendererProps> = ({ page }) => {
  const Layout = layoutBuilder.getLayoutFactory()(page?.templateId || ''); 
  if (!Layout) return <>Error no layout found for {page?.templateId}</>
  return Layout ? <Layout page={page} /> : null;  
};

export default PageRenderer;
