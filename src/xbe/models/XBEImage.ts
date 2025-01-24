import { BaseEntry } from "@contentstack/delivery-sdk";

/**
 * Represents an image entry in the XBE system.
 * 
 * @extends BaseEntry
 * 
 * @property {string} filename - The name of the file.
 * @property {string} url - The URL where the image is located.
 * @property {string} file_size - The size of the file.
 * @property {string} content_type - The MIME type of the file.
 * @property {string} xbe_profile_photo - The profile photo associated with the XBE entry.
 */
export interface XBEImage extends BaseEntry {
    filename : string;
    url: string;
    file_size: string;	
    content_type: string;
    xbe_profile_photo: string;
  }