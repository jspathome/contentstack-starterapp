"use client"
//import { PortfolioHeaderModel } from "@/models/HeaderModel";
import { useEffect } from "react";

/**
 * A React functional component that renders a custom 500 error page.
 * This page is displayed when there is a server error.
 *
 * @returns {JSX.Element} The JSX code for the 500 error page.
 *
 * @example
 * <Page />
 *
 * @remarks
 * The component currently includes commented-out code for potential future use:
 * - `usePathname` to get the current path.
 * - `onEntryChange` to trigger a data fetch when an entry changes.
 * - `console.log` to log the entry URL.
 *
 * @component
 */
export default function Page() {
    useEffect(() => {
        //onEntryChange(() => fetchData());
        //console.log("entryUrl", entryUrl);
    }, []);

    return (
        <>
            <h1>500 page</h1>
            <h1>Als je dit lees. Dan is er echt iets niet goed gegaan.</h1>
        </>
    );
}