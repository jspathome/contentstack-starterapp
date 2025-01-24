"use client"
import { contentstackService, onEntryChange } from "@/xbe/services/ContentstackService ";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { XBE_Page } from "@/xbe/models/Page";
import PageRenderer from "@/xbe/components/PageRenderer";
import Skeleton from "react-loading-skeleton";
//import { HeaderModel } from "@/xbe/models/Header/Header";

/**
 * The `Page` component is responsible for fetching and rendering the page layout based on the current URL path.
 * It uses the `usePathname` hook to get the current URL and fetches the corresponding page data from the `contentstackService`.
 * 
 * If the page data is found, it sets the page layout state with the fetched data.
 * If the page data is not found, it sets the page layout state with a "Page Not Found" template.
 * If there is an error during the fetch, it sets the page layout state with an "Error" template.
 * 
 * The component uses the `onEntryChange` function to re-fetch the page data when there are changes.
 * 
 * @returns {JSX.Element} The rendered page layout or a skeleton loader while the data is being fetched.
 */
export default function Page() {
  const entryUrl = usePathname();
  const [getPageLayout, setPageLayout] = useState<XBE_Page>();
  const router = useRouter();

  /**
   * Fetches page data based on the provided entry URL.
   * 
   * This function uses the `contentstackService` to find a page by its URL. 
   * If the page is found, it sets the page layout with the retrieved page data.
   * If the page is not found, it sets the page layout to a "Page Not Found" template.
   * In case of an error during the fetch operation, it sets the page layout to an "Error" template with the error message.
   * 
   * @async
   * @function fetchPageData
   * @returns {Promise<void>} A promise that resolves when the page data has been fetched and the layout has been set. 
   */
  async function fetchPageData() {
    contentstackService.findPageByUrl(entryUrl).then((page) => {
      //console.log("page content", page);
      if (page) setPageLayout(page);
      if (!page) router.push('/404');
    }).catch((error) => {
      console.error("Error fetching page data", error);
      router.push('/500');
    });
  }

  useEffect(() => {
    onEntryChange(() => fetchPageData());
  }, []);

  return getPageLayout ? (
    <PageRenderer page={getPageLayout} />
  ) : (
    <Skeleton count={1} height={300} />
  );

}