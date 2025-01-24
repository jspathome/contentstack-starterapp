import React from 'react';

/**
 * Props for the Condition component.
 * 
 * @interface ConditionProps
 * @property {boolean} select - A boolean value to determine the condition.
 * @property {React.ReactNode} children - The content to be rendered based on the condition.
 */
interface ConditionProps {
    select: boolean;
    children: React.ReactNode;
}

export const Condition: React.FC<ConditionProps> = ({ select, children }) => {
    return <>{select ? children : null}</>;
};


