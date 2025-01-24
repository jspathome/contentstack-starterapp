import { XbePageReference } from "./XbePageReference";

export interface XbeMenuItem {
    _content_type_uid: string;
    uid: string;
    title: string;
    xbe_enabled: boolean;
    xbe_page_reference: XbePageReference[];
    xbe_sub_items: XbePageReference[];
    tags: string[];
    locale: string;
    _version: number;
  }