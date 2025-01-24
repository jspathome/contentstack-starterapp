/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Represents additional parameters for an action.
 * 
 * @property {string} url - The URL associated with the action.
 * @property {object} title - The title object associated with the action.
 */
type AdditionalParam = {
    url: string;
    title: object;
}

/**
 * Represents an action with a title, a hyperlink reference, and additional parameters.
 * 
 * @typedef {Object} Action
 * @property {string} title - The title of the action.
 * @property {string} href - The hyperlink reference associated with the action.
 * @property {AdditionalParam} $ - Additional parameters for the action.
 */
export type Action = {
    title: string;
    href: string;
    $: AdditionalParam;
}

