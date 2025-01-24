import { Logo } from "./Logo";
import { XbeMenuItem } from "./XbeMenuItem";

export interface HeaderModel {
    uid: string;
    _version: number;
    locale: string;
    _in_progress: boolean;
    created_at: string;
    created_by: string;
    logo: Logo;
    tags: string[];
    title: string;
    updated_at: string;
    updated_by: string;
    xbe_main_navigation: XbeMenuItem[];
  }