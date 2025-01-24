/* eslint-disable @typescript-eslint/no-explicit-any */
import * as contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { ContentTypeCollection, Region } from 'contentstack';
import { XBE_Page } from '../models/Page';
import { addEditableTags } from '@contentstack/utils';
import { ContentstackServiceConstants } from './ContentstackServiceConstants';
import { HeaderModel } from '../models/Header/Header';

/**
 * Parameters for retrieving an entry from Contentstack.
 * 
 * @interface GetEntryParams
 * 
 * @property {string} contentTypeUid - The unique identifier for the content type.
 * @property {string} entryUid - The unique identifier for the entry.
 * @property {string[]} [referenceFieldPath] - Optional array of reference field paths.
 * @property {string[]} [jsonRtePath] - Optional array of JSON RTE paths.
 */
interface GetEntryParams {
    contentTypeUid: string;
    entryUid: string;
    referenceFieldPath?: string[];
    jsonRtePath?: string[];
}

/**
 * Configuration object for rendering options.
 * 
 * @property {Object} span - Configuration for rendering span elements.
 * @property {Function} span.span - Function to render span elements.
 * @param {any} node - The current node being rendered.
 * @param {Function} next - Function to render the children of the current node.
 * @returns {any} The rendered output of the children nodes.
 */
const renderOption = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    span: (node: any, next: (children: any[]) => any) => next(node.children),
};

/**
 * Service class for interacting with Contentstack.
 * 
 * This service provides methods to fetch entries from Contentstack and 
 * initialize the Contentstack Live Preview.
 * 
 * @class ContentstackService
 * @property {contentstack.Stack} Stack - The Contentstack stack instance.
 * @property {boolean} liveEdit - Flag indicating if live edit is enabled.
 * @property {string} apikey - The Contentstack API key.
 * @property {string} deliveryToken - The Contentstack delivery token.
 * @property {Region} region - The Contentstack region.
 * 
 * @constructor
 * Initializes the ContentstackService with environment variables and sets up the Contentstack stack instance.
 * 
 * @method getEntry
 * Fetches an entry from Contentstack.
 * 
 * @template T
 * @param {GetEntryParams} params - The parameters for fetching the entry.
 * @returns {Promise<T>} - A promise that resolves to the fetched entry.
 * 
 * @method findEntryByUrl
 * Finds an entry by URL across all content types.
 * 
 * @param {string} url - The URL to search for.
 * @returns {Promise<any | null>} - A promise that resolves to the found entry or null if not found.
 */
class ContentstackService {
    private Stack: contentstack.Stack;
    private liveEdit: boolean;
    // private livePreview: boolean;
    private apikey: string;
    private deliveryToken: string;
    private region: Region;

    /**
     * Initializes a new instance of the ContentstackService class.
     * 
     * This constructor sets up the Contentstack Stack and Live Preview configurations
     * using environment variables. It supports different regions (EU and US) and 
     * enables live editing if specified.
     * 
     * Environment Variables:
     * - CONTENTSTACK_API_KEY: The API key for Contentstack.
     * - CONTENTSTACK_DELIVERY_TOKEN: The delivery token for Contentstack.
     * - CONTENTSTACK_REGION: The region for Contentstack (EU or US).
     * - CONTENTSTACK_LIVE_EDIT_TAGS: Enables live edit tags if set to "true".
     * - CONTENTSTACK_ENVIRONMENT: The environment for Contentstack.
     * - CONTENTSTACK_BRANCH: The branch for Contentstack.
     * - CONTENTSTACK_PREVIEW_HOST: The host for Contentstack preview.
     * - CONTENTSTACK_PREVIEW_TOKEN: The preview token for Contentstack.
     * - CONTENTSTACK_API_HOST: The API host for Contentstack (optional).
     * - CONTENTSTACK_APP_HOST: The app host for Contentstack (optional).
     */
    constructor() {
        this.apikey = process.env.CONTENTSTACK_API_KEY || 'NOKEYFOUND';
        this.deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN || 'NOKEYFOUND';
        this.region = process.env.CONTENTSTACK_REGION === 'EU'
            ? Region.EU
            : process.env.CONTENTSTACK_REGION === 'US'
                ? Region.US
                : Region.US;

        this.liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

        this.Stack = contentstack.Stack({
            api_key: this.apikey,
            delivery_token: this.deliveryToken,
            environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
            region: this.region,
            branch: process.env.CONTENTSTACK_BRANCH,
            live_preview: {
                enable: this.liveEdit,
                host: process.env.CONTENTSTACK_PREVIEW_HOST as string,
                preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN as string,
            },
        });

        if (process.env.CONTENTSTACK_API_HOST) {
            this.Stack.setHost(process.env.CONTENTSTACK_API_HOST);
        }

        ContentstackLivePreview.init({
            stackSdk: this.Stack,
            stackDetails: {
                apiKey: process.env.CONTENTSTACK_API_KEY as string,
                environment: process.env.CONTENTSTACK_ENVIRONMENT as string,
                branch: process.env.CONTENTSTACK_BRANCH,
            },
            clientUrlParams: {
                host: process.env.CONTENTSTACK_APP_HOST,
            },
            enable: this.liveEdit,
            mode: 'builder',
            ssr: false,
        });
    }

    /**
     * Fetches an entry from the Contentstack service.
     *
     * @template T - The type of the entry to be returned.
     * @param {GetEntryParams} params - The parameters for fetching the entry.
     * @param {string} params.contentTypeUid - The UID of the content type.
     * @param {string} params.entryUid - The UID of the entry.
     * @param {string} [params.referenceFieldPath] - The path to the reference field to include.
     * @param {string[]} [params.jsonRtePath] - The paths to the JSON RTE fields to convert to HTML.
     * @returns {Promise<T>} A promise that resolves to the fetched entry.
     */
    public async getEntry<T>({ contentTypeUid, entryUid, referenceFieldPath, jsonRtePath }: GetEntryParams): Promise<T> {
        return new Promise((resolve, reject) => {
            const entry = this.Stack.ContentType(contentTypeUid).Entry(entryUid);
            if (referenceFieldPath) entry.includeReference(referenceFieldPath);

            entry.toJSON().fetch().then
                ((result) => {
                    if (jsonRtePath) {
                        Utils.jsonToHTML({
                            entry: result,
                            paths: jsonRtePath,
                            renderOption,
                        });
                    }
                    resolve(result as T);
                },
                    (error: object) => {
                        reject(error);
                    }
                );
        });
    }

    /**
     * Finds an entry by URL across all content types.
     * 
     * @param {string} url - The URL to search for.
     * @returns {Promise<any | null>} - A promise that resolves to the found entry or null if not found.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findEntryByUrl(url: string): Promise<any | null> {
        try {
            // Step 1: Get all content types uids
            // const contentTypesResponse : ContentTypeCollection = await this.Stack.getContentTypes();
            // const contentTypes = contentTypesResponse.content_types;
            const uids = await this.GetAllContentTypeUids();
            // Step 2: Loop through each content type and search for the entry with the given URL
            for (const uid of uids || []) {
                try {
                    const entriesResponse = await this.Stack.ContentType(uid)
                        .Query()
                        .where('url', url)
                        .toJSON()
                        .find();
                    const entries = entriesResponse[0];
                    if (entries && entries.length > 0) {
                        //console.log(`Entry found in content type: ${uid}`);                       
                        return entries[0];
                    }
                } catch (error) {
                    console.error(`Error searching in content type ${uid}:`, error);
                }
            }
            return null;
        } catch (error) {
            console.error("Error fetching content types:", error);
            return null;
        }
    }


    /**
     * Finds a page by its URL.
     *
     * This method searches through all content types to find an entry with the given URL.
     * If found, it maps the entry to an `XBE_Page` object and returns it.
     *
     * @param {string} url - The URL of the page to find.
     * @returns {Promise<XBE_Page | null>} A promise that resolves to the found page or null if not found.
     *
     * @throws Will log an error if there is an issue fetching content types or searching within a content type.
     */
    public async findPageByUrl(url: string): Promise<XBE_Page | null> {
        try {
            // Step 1: Get all content types uids
            // const contentTypesResponse : ContentTypeCollection = await this.Stack.getContentTypes();
            // const contentTypes = contentTypesResponse.content_types;            
            const uids = await this.GetAllContentTypeUids();
            // Step 2: Loop through each content type and search for the entry with the given URL
            for (const uid of uids || []) {
                try {
                    const entriesResponse = await this.Stack.ContentType(uid)
                        .Query()
                        .where('url', url)
                        .toJSON()
                        .find();
                    const entries = entriesResponse[0];
                    if (entries && entries.length > 0) {
                        if (this.liveEdit) addEditableTags(entries[0], uid, true, entries[0].locale);
                        const obj = this.MapToPage(entries[0], uid, url);
                        return obj;
                    }
                } catch (error) {
                    console.error(`Error searching in content type ${uid}:`, error);
                }
            }
            return null;
        } catch (error) {
            console.error("Error fetching content types:", error);
            return null;
        }
    }

    /**
     * Retrieves all content type UIDs from the Contentstack stack.
     *
     * @returns {Promise<string[] | null>} A promise that resolves to an array of content type UIDs, or null if an error occurs.
     *
     * @throws Will log an error message to the console if fetching content types fails.
     */
    public async GetAllContentTypeUids(): Promise<string[] | null> {
        try {
            // Step 1: Get all content types
            const contentTypesResponse: ContentTypeCollection = await this.Stack.getContentTypes();
            const contentTypes = contentTypesResponse.content_types;

            // Map contentTypes to extract only the `uid` properties
            const uids: string[] = contentTypes.map((contentType: { uid: string }) => contentType.uid);
            return uids;
        } catch (error) {
            console.error("Error fetching content types:", error);
            return null;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /**
     * Maps an object to an XBE_Page.
     *
     * @param object - The object containing page data.
     * @param templateId - The template ID for the page.
     * @param url - The URL of the page.
     * @returns An XBE_Page object with the mapped data.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private MapToPage(object: any, templateId: string, url: string): XBE_Page {

        const placeholders = Object.keys(object)
            .filter((key) => key.toLowerCase().includes('placeholder'))
            .map((key) => ({ uid: key, name: key, components: object[key] }));

        return {
            url: url,
            templateId: templateId,
            seo: {
                meta_title: object?.seo?.meta_title || '',
                enable_search_indexing: object?.seo?.enable_search_indexing || false,
            },
            placeholders: placeholders,

            // ================ base fields =================
            _version: object._version,
            locale: object.locale,
            uid: object.uid,
            ACL: object.ACL,
            _in_progress: object._in_progress,
            created_at: object.created_at,
            created_by: object.created_by,
            tags: object.tags,
            title: object.title,
            updated_at: object.updated_at,
            updated_by: object.updated_by,
            publish_details: object.publish_details,
        };
    }

    private MapToHeader(json: any): HeaderModel {
    return {
        uid: json.uid,
        _version: json._version,
        locale: json.locale,
        _in_progress: json._in_progress,
        created_at: json.created_at,
        created_by: json.created_by,
        logo: {
            ...json.logo,
            publish_details: { ...json.logo.publish_details },
        },
        tags: json.tags,
        title: json.title,
        updated_at: json.updated_at,
        updated_by: json.updated_by,
        xbe_main_navigation: json.xbe_main_navigation.map((menuItem: any) => ({
            ...menuItem,
            //xbe_page_reference: menuItem.xbe_page_reference.map((pageRef: any) => ({
            //    ...pageRef,
                //seo: { ...pageRef.seo },
                // xbe_placeholder_main: pageRef.xbe_placeholder_main.map((placeholder: any) => ({
                //     content_block: placeholder.content_block
                //         ? { ...placeholder.content_block, _metadata: { ...placeholder.content_block._metadata } }
                //         : undefined,
                //     call_to_action: placeholder.call_to_action
                //         ? {
                //             ...placeholder.call_to_action,
                //             _metadata: { ...placeholder.call_to_action._metadata },
                //         }
                //         : undefined,
                // })),
                //publish_details: { ...pageRef.publish_details },
            //})),
            //xbe_sub_items: menuItem.xbe_sub_items.map((subItem: any) => ({
            //    ...subItem,
                //publish_details: { ...subItem.publish_details },
            //})),
           // publish_details: { ...menuItem.publish_details },
        })),
    };
}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /**
     * Fetches the header content from the Contentstack service.
     *
     * This method queries the Contentstack service for the header content type,
     * including references to various related fields such as 'xbe_logo', 
     * 'xbe_main_navigation', 'xbe_main_navigation.xbe_menu_item', 
     * 'xbe_main_navigation.xbe_page_reference', and 'xbe_main_navigation.xbe_sub_items'.
     * The result is then mapped to a `Header` object.
     *
     * @returns {Promise<Header | null>} A promise that resolves to a `Header` object if the fetch is successful,
     * or `null` if an error occurs.
     *
     * @throws {Error} If there is an issue fetching the content type from Contentstack.
     */
    public async getHeader(): Promise < HeaderModel | null > {

    try {
        const headerResponse = await this.Stack.ContentType(ContentstackServiceConstants.HEADER_MODELTYPE_UID).Query()
            .includeReference(['xbe_logo', 'xbe_main_navigation', 'xbe_main_navigation.xbe_menu_item', 'xbe_main_navigation.xbe_page_reference', 'xbe_main_navigation.xbe_sub_items'])
            .toJSON()
            .find();

        const header = headerResponse[0];
        console.log('>>>>>>> Header:', header[0]);
        const obj = this.MapToHeader(header[0]);
        console.log('>>>>>>> Header obj:', obj);
        return obj;
    } catch(error: any) {
        console.error(`Error fetching content type ${ContentstackServiceConstants.HEADER_MODELTYPE_UID}:`, error);
        return null;
    }

    // return new Promise((resolve, reject) => {
    //     const query = this.Stack.ContentType(ContentstackServiceConstants.HEADER_MODELTYPE_UID).Query();
    //     //query.includeReference(['logo', 'menu_items']);
    //     query.toJSON().fetch().then
    //         ((result) => {                 
    //             console.log('>>>>>>> Header:', result);
    //             //resolve(result as T);
    //         },
    //             (error: object) => {
    //                 reject(error);
    //             }
    //         );
    // });
}

}

export const contentstackService = new ContentstackService();
export const { onEntryChange } = ContentstackLivePreview;


