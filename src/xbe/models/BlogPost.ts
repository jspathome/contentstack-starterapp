import { BaseEntry } from '@contentstack/delivery-sdk'
import { TeamMember } from './TeamMember';

/**
 * Represents a blog post entry.
 * 
 * @extends BaseEntry
 * 
 * @property {string} title - The title of the blog post.
 * @property {string} url - The URL of the blog post.
 * @property {string} xbe_header_image - The header image URL for the blog post.
 * @property {string} xbe_publish_date - The publish date of the blog post.
 * @property {string} xbe_blog_content - The content of the blog post.
 * @property {TeamMember} xbe_blog_author - The author of the blog post.
 * @property {boolean} xbe_blog_archived - Indicates if the blog post is archived.
 */
export interface BlogPost extends BaseEntry {
  title : string;
  url : string;
  xbe_header_image : string;
  xbe_publish_date  : string;
  xbe_blog_content  : string;
  xbe_blog_author   : TeamMember;
  xbe_blog_archived : boolean;
}