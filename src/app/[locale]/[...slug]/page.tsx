export const runtime = 'edge'

import { drupal } from "@/src/lib/drupal"
import { getParams } from "@/src/lib/getparams"
import Paragraph from "@/src/components/Paragraph/Paragraph"
import { defaultLocale } from "@/site.config"
import NotFound from "@/src/components/NotFound"
import { Breadcrumbs } from "@/src/components/Breadcrumb"

type NodePageParams = {
  locale: string,
  slug: string[]
}
type NodePageProps = {
  params: NodePageParams
  searchParams: { [key: string]: string | string[] | undefined }
}


async function getNode(slug: string[], locale:string) {
  const path = `/${slug.join("/")}`
  try {
    const node = await drupal.getResourceByPath(path, {
      locale,
      defaultLocale: defaultLocale,
      params: getParams("node--page")
    });
    return node;
  } catch(error) {
    // If getNode throws an error, tell Next.js the path is 404.
    console.error(error);
  }
}

export default async function NodePage({
  params: { locale, slug },
}: NodePageProps) {

  let paragraphContent;
  try {
    const node = await getNode(slug, locale);
    if(node)
      paragraphContent = node;
  } catch (error) {
    // If getNode throws an error, tell Next.js the path is 404.
    console.error(error);
  }

  return (
    <>
      <Breadcrumbs items={[
        { title: paragraphContent?.title },
      ]} />
      {paragraphContent ?
        (
          <Paragraph paragraph={paragraphContent.field_content} /> 
        ) :
        <NotFound />
      }
    </>
  )
}
