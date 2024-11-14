const BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

export const getContentCurationData = async (name:string, locale:string, pageNumber:number, filterType:string, sortBy:string) => {
  try {
    const response = await fetch(`${BASE_URL}/${locale}/api/v1/content_curation/${name}?page=${pageNumber}${filterType ? `&type=${filterType}`: ''}&sort=${sortBy}`);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error);
  }
}
