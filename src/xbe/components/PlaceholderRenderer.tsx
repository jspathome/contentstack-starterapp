/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DynamicComponentRenderer from '../builders/DynamicComponentRenderer';
import { XBE_Placeholder } from '../models/Placeholder';

/**
 * Props for the PlaceholderRenderer component.
 * 
 * @interface PlaceholderRendererProps
 * @property {XBE_Placeholder} placeholder - The placeholder object to be rendered.
 */
interface PlaceholderRendererProps {
  placeholder: XBE_Placeholder;
}

/**
 * PlaceholderRenderer is a React functional component that renders a list of dynamic components.
 * It takes a `placeholder` prop which contains an array of components to be rendered.
 * Each component is rendered using the `DynamicComponentRenderer` with the appropriate props.
 *
 * @param {PlaceholderRendererProps} props - The props for the PlaceholderRenderer component.
 * @param {Object} props.placeholder - The placeholder object containing components to be rendered.
 * @param {Array} props.placeholder.components - An array of components to be rendered.
 * @returns {JSX.Element} The rendered list of dynamic components.
 */
const PlaceholderRenderer: React.FC<PlaceholderRendererProps> = ({ placeholder }) => {
  return (
    <div>
      {placeholder.components?.map((component: any, componentIndex: number) => {  
            const key = Object.keys(component)[0];
            const attr = component[key];
            return (
              <DynamicComponentRenderer
                key={`${placeholder.uid}-${componentIndex}`}
                moduleName={Object.keys(component)[0]}
                props={attr}
              />
            );
          })}
      
    </div>
  );
};

export default PlaceholderRenderer;