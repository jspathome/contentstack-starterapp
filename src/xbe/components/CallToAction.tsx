/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

/**
 * Props for the CallToAction component.
 * 
 * @property {string} [xbe_title] - The title of the call to action.
 * @property {string} [xbe_sub_title] - The subtitle of the call to action.
 * @property {string} [xbe_description] - The description of the call to action.
 * @property {string} [xbe_content] - The content of the call to action.
 * @property {string} [xbe_primary_action_link] - The URL for the primary action link.
 * @property {string} [xbe_primary_action_title] - The title for the primary action link.
 * @property {any} [x: string] - Any additional properties.
 */
interface CalllToActionProps {
    [x: string]: any;
    xbe_title?: string;
    xbe_sub_title?: string;
    xbe_description?: string;
    xbe_content?: string;
    xbe_primary_action_link?: string;
    xbe_primary_action_title?: string;
}

/**
 * CallToAction component renders a call-to-action section with a title, subtitle, and a primary action button.
 *
 * @component
 * @param {CallToActionProps} props - The properties object.
 * @param {string} props.xbe_title - The main title text to be displayed.
 * @param {string} props.xbe_sub_title - The subtitle text to be displayed.
 * @param {string} props.xbe_primary_action_title - The text for the primary action button.
 * @returns {JSX.Element} The rendered CallToAction component.
 */
const CallToAction: React.FC<CalllToActionProps> = ({ xbe_title, xbe_sub_title, xbe_primary_action_title, ...rest }) => {
    //console.log('CallToAction: ', xbe_title, xbe_sub_title, xbe_primary_action_title, rest.$);
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-1 sm:px-6 sm:py-1 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 data-cslp={rest.$.xbe_title['data-cslp']} className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        {xbe_title}
                    </h2>
                    <p  data-cslp={rest.$.xbe_sub_title['data-cslp']}
                        className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300">
                        {xbe_sub_title}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a 
                            data-cslp={rest.$.xbe_primary_action_title['data-cslp']}
                            href="#"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            {xbe_primary_action_title}
                        </a>
                        {/* <a href="#" className="text-sm/6 font-semibold text-white">
                            Learn more <span aria-hidden="true">→</span>
                        </a> */}
                    </div>
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                    >
                        <circle r={512} cx={512} cy={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;