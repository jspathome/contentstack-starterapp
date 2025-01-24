import { Seo } from "@/models/Seo";
import { BaseEntry } from "@contentstack/delivery-sdk";
import { XBE_Placeholder } from "./Placeholder";

export interface XBE_Page extends BaseEntry {    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    placeholders?: XBE_Placeholder[];
    uid: string;
    templateId: string;
    url: string;
    seo: Seo;
  }