"use client"

import Text from "./Text";
import Layout from "./Layout";
import ImageComponent from "./Image";
import './paragraph.scss';
import Accordion from "./Accordion";

const Paragraph = ({ paragraph }: any) => {
  const paragraphTypes: { [key: string]: React.ElementType } = {
    "paragraph--layout": Layout,
    "paragraph--wysiwyg_editor": Text,
    "paragraph--image": ImageComponent,
    "paragraph--faq": Accordion,
  };

  // Make sure paragraph is an array before calling map on it
  if (!Array.isArray(paragraph)) {
    console.error("Expected 'paragraph' to be an array.");
    return null;
  }

  return (
    <>
      {paragraph.map((para, index) => {
        const Component = paragraphTypes[para.type];

        if (!Component) {
          return <div key={index}>Unknown paragraph type: {para.type}</div>;
        }

        return <Component key={index} {...para} />;
      })}
    </>
  );
};

export default Paragraph;
