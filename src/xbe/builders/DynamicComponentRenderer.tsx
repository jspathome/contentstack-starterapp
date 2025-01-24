import React from 'react';
import { componentBuilder } from '../components/componenstMap';

/**
 * Props for the DynamicComponentRenderer component.
 *
 * @interface DynamicComponentRendererProps
 * @property {string} moduleName - The name of the module to be dynamically rendered.
 * @property {Record<string, any>} props - The properties to be passed to the dynamically rendered module.
 */
interface DynamicComponentRendererProps {
  moduleName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

/**
 * DynamicComponentRenderer is a React functional component that dynamically renders
 * a component based on the provided module name and props.
 *
 * @param {DynamicComponentRendererProps} props - The properties for the component.
 * @param {string} props.moduleName - The name of the module to be dynamically rendered.
 * @param {object} props.props - The properties to be passed to the dynamically rendered component.
 *
 * @returns {JSX.Element | null} The dynamically rendered component or null if the component is not found.
 */
const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({ moduleName, props }) => {
  const Component = componentBuilder.getModuleFactory()(moduleName);
  if (!Component) return <> <NoComponentFound moduleName={moduleName} /></>
  return Component ? <Component {...props} /> : null;
};

/**
 * A functional component that displays an error message when a specified module component is not found.
 *
 * @param {Object} props - The props object.
 * @param {string} props.moduleName - The name of the module for which the component was not found.
 * @returns {JSX.Element} A styled div element containing the error message.
 */
const NoComponentFound: React.FC<{ moduleName: string }> = ({ moduleName }) => {
  return <div className='bg-red-500 rounded-lg border-double text-white p-5'>Error no component found for &apos;{moduleName}&apos;</div>;
}

/**
 * DynamicComponentRenderer is a component responsible for rendering dynamic components
 * based on the provided configuration or props.
 *
 * @component
 * @example
 * // Example usage:
 * <DynamicComponentRenderer config={config} />
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.config - The configuration object for rendering components.
 * @returns {JSX.Element} The rendered dynamic component.
 */
export default DynamicComponentRenderer;
