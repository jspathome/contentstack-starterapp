import { BaseEntry } from '@contentstack/delivery-sdk'

/**
 * Represents a team member with various attributes.
 * 
 * @interface TeamMember
 * @extends BaseEntry
 * 
 * @property {string} title - The title or position of the team member.
 * @property {string} url - The URL associated with the team member.
 * @property {string} xbe_bio - The biography of the team member.
 * @property {string} function_description - The description of the team member's function or role.
 * @property {string} xbe_profile_photo - The URL to the profile photo of the team member.
 */
export interface TeamMember extends BaseEntry {
  title : string;
  url: string;
  xbe_bio: string;	
  function_description: string;
  xbe_profile_photo: string;
}