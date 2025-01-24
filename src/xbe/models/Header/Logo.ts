export interface Logo {
    uid: string;
    _version: number;
    parent_uid: string;
    title: string;
    content_type: string;
    file_size: string;
    filename: string;    
    is_dir: boolean;
    tags: string[];   
    url: string;
  }