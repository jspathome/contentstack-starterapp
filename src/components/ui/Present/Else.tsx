import React from 'react';

/**
 * A React functional component that renders its children.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be rendered inside the component.
 * @returns {JSX.Element} The rendered children elements.
 */
export const Else: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

