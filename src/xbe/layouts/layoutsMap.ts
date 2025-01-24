/* eslint-disable @typescript-eslint/no-explicit-any */
import LayoutBuilder from "../builders/LayoutBuilder";
import PageFullWidth from "./PageFullWidth";
import PageHalfWidth from "./PageHalfWidth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * A map that associates layout names with their corresponding layout configurations.
 * The key is a string representing the layout name, and the value can be of any type.
 */
const layouts = new Map<string,any>();

layouts.set('xbe_page_full_width', PageFullWidth);
layouts.set('xbe_page_half_width', PageHalfWidth);

export const layoutBuilder = new LayoutBuilder({ Layouts: layouts });
export const layoutFactory = layoutBuilder.getLayoutFactory();
