import { BaseEntry } from "@contentstack/delivery-sdk";

/**
 * Represents an image with its dimensions, filename, URL, and additional parameters.
 * 
 * @typedef {Object} Image
 * @property {any} height - The height of the image.
 * @property {any} width - The width of the image.
 * @property {string} filename - The filename of the image.
 * @property {string} url - The URL where the image is located.
 * @property {AdditionalParam} $ - Additional parameters associated with the image.
 */
export interface Image extends BaseEntry {
    height: string;
    width: string;
    filename: string;
    url: string;
}