import React from 'react';
import { Condition } from './Condition';
import { Else } from './Else';

/**
 * Props for the Present component.
 * 
 * @interface PresentProps
 * @property {React.ReactNode} children - The content to be displayed within the Present component.
 * @property {boolean} select - A flag indicating whether the present is selected.
 */
interface PresentProps {
    children: React.ReactNode;
    select: boolean;
}

/**
 * Present component that conditionally renders its children based on the `select` prop.
 *
 * @component
 * @param {PresentProps} props - The props for the Present component.
 * @param {React.ReactNode} props.children - The children elements to be rendered.
 * @param {boolean} props.select - A boolean that determines which set of children to render.
 * 
 * @returns {JSX.Element} The rendered children based on the `select` prop.
 *
 * @example
 * <Present select={true}>
 *   <Condition>Condition Content</Condition>
 *   <Else>Else Content</Else>
 * </Present>
 */
export const Present: React.FC<PresentProps> = ({ children, select }) => {
    const childrenArray = React.Children.toArray(children);

    const conditionChildren = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === Condition
    );

    const elseChildren = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === Else
    );

    return <>{select ? conditionChildren : elseChildren}</>;
};

