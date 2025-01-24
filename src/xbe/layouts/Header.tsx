/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { contentstackService } from "../services/ContentstackService ";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { HeaderModel } from "../models/Header/Header";

/**
 * Combines multiple class names into a single string.
 * Filters out any falsey values (false, undefined, null, 0, NaN, or an empty string).
 *
 * @param {...(string | boolean | undefined)[]} classes - The class names to combine.
 * @returns {string} The combined class names as a single string.
 */
// function classNames(...classes: (string | boolean | undefined)[]) {
//     return classes.filter(Boolean).join(' ')
// }

export default function Header() {
    const [getHeader, setHeader] = useState<HeaderModel | null>(null);

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const response: HeaderModel | null = await contentstackService.getHeader();
                setHeader(response);
                // response.xbe_main_navigation
                //     .filter((menuItem) => menuItem.xbe_page_reference != null)
                //     .map((menuItem) => {
                //         console.log('menuItem', menuItem.xbe_page_reference[0].title);
                //     });
            }
            catch (error) {
                console.error("Error fetching header:", error);
            }
        };

        fetchHeader();
    }, []);

    if (!getHeader) {
        return <div>Loading...</div>;
    }

    return (
        <></>
        // <Disclosure as="nav" className="border-b border-gray-200 bg-white">
        //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        //         <div className="flex h-16 justify-between">
        //             <div className="flex">
        //                 <div className="flex shrink-0 items-center">
        //                     <img
        //                         alt="Your Company"
        //                         src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        //                         className="block h-8 w-auto lg:hidden"
        //                     />
        //                     <img
        //                         alt="Your Company"
        //                         src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        //                         className="hidden h-8 w-auto lg:block"
        //                     />
        //                 </div>
        //                 <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">

        //                 </div>
        //             </div>
        //             <div className="hidden sm:ml-6 sm:flex sm:items-center">
        //                 <button
        //                     type="button"
        //                     className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //                 >
        //                     <span className="absolute -inset-1.5" />
        //                     <span className="sr-only">View notifications</span>
        //                     <BellIcon aria-hidden="true" className="h-6 w-6" />
        //                 </button>

        //                 {/* Profile dropdown */}
        //                 <Menu as="div" className="relative ml-3">
        //                     {/* <div>
        //                         <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        //                             <span className="absolute -inset-1.5" />
        //                             <span className="sr-only">Open user menu</span>
        //                             <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
        //                         </MenuButton>
        //                     </div> */}
        //                     {/* <MenuItems
        //                         transition
        //                         className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        //                     >
        //                         {userNavigation.map((item) => (
        //                             <MenuItem key={item.name}>
        //                                 <a
        //                                     href={item.href}
        //                                     className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
        //                                 >
        //                                     {item.name}
        //                                 </a>
        //                             </MenuItem>
        //                         ))}
        //                     </MenuItems> */}
        //                 </Menu>
        //             </div>
        //             <div className="-mr-2 flex items-center sm:hidden">
        //                 {/* Mobile menu button */}
        //                 <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        //                     <span className="absolute -inset-0.5" />
        //                     <span className="sr-only">Open main menu</span>
        //                     <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
        //                     <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
        //                 </DisclosureButton>
        //             </div>
        //         </div>
        //     </div>

        //     <DisclosurePanel className="sm:hidden">
        //         <div className="space-y-1 pb-3 pt-2">
        //             {getHeader?.xbe_main_navigation.map((menuItem) => (
        //                 <DisclosureButton
        //                     key={menuItem.uid}
        //                     as="a"
        //                     //href={menuItem.xbe_page_reference[0].url}
        //                     href={"#"}
        //                     //aria-current={menuItem.current ? 'page' : undefined}
        //                     className={'block border-l-4 py-2 pl-3 pr-4 text-base font-medium border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'}
        //                 // className={classNames(
        //                 //     item.current
        //                 //         ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
        //                 //         : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
        //                 //     'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
        //                 // )}
        //                 >
        //                     {/* {menuItem.xbe_page_reference[0].title} */}
        //                     xxxxxx
        //                 </DisclosureButton>


        //             ))}
        //         </div>

        //     </DisclosurePanel>
        // </Disclosure>
    );
}


// {getHeader?.xbe_main_navigation.map((menuItem) => (
//     <a
//         key={0}
//         //href={menuItem.xbe_page_reference[0].url}
//         // aria-current={menuItem.current ? 'page' : undefined}
//         className={"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"}
//     // className={classNames(
//     //     menuItem.current
//     //         ? 'border-indigo-500 text-gray-900'
//     //         : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
//     //     'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
//     // )}
//     >
//         {/* {menuItem.xbe_page_reference[0].xbe_title} */}
//         {
//             // JSON.stringify(menuItem)
//         }
//     </a>
// ))}