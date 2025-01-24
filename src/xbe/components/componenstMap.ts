import ComponentBuilder from "../builders/ComponentBuilder";
import CallToAction from "./CallToAction";
import ContentBlock from "./ContentBlock";
import ContentCard from "./ContentCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * A map that holds component names as keys and their corresponding component instances as values.
 * 
 * @type {Map<string, any>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components = new Map<string,any>();

components.set('content_card', ContentCard);
components.set('content_block', ContentBlock);
components.set('call_to_action', CallToAction);

/**
 * An instance of `ComponentBuilder` initialized with the provided components.
 * This builder is used to construct and manage components within the application.
 */
export const componentBuilder = new ComponentBuilder({ components });
/**
 * A factory function that returns a module instance.
 * This function is obtained from the `componentBuilder` object.
 */
export const moduleFactory = componentBuilder.getModuleFactory();
