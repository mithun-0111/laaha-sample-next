import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export function getParams(resourceType: string, fieldMachineName?: string) {
  const apiParams = new DrupalJsonApiParams();

  if (resourceType === "menu_link_content--menu_link_content") {
    return apiParams.addInclude(['field_icon']).addFields("menu_link_content--menu_link_content", [
      "title,url,route,attributes,parent,expanded,field_icon",
    ])
  }

  if( resourceType === "block-basic") {
    return apiParams.addFields(fieldMachineName ? fieldMachineName : '' , [
      "body",
    ])
  }

  if(resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content",
        "field_content.field_single_image.field_media_image",
        "field_content.paragraph_type"
      ])
      .addFields("node--page", [
        "title",
        "uid",
        "path",
        "status",
        "field_content",
        "layout"
      ]);
  }

  return apiParams.getQueryObject()
}
