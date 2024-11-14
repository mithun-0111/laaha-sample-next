export const runtime = 'edge'

import { Metadata } from 'next';
import Card from '@/src/components/Cards/Card';

export const metadata: Metadata = {
  title: "Laaha Homepage",
  description: "Laaha is a safe space for women and girls to discuss health, safety, violence, and relationships.",
}

export default async function Home() {

  return (
    <>
      Homepage
      <Card
        item={
          {
            name: 'Technology & Internet',
            node: {
              title: `Let's take a closer look: Types of services for women and girls`,
              read_time: 8,
              image_uri: 'https://laaha.org/sites/default/files/styles/scale_592w/public/2024-06/VSS_M_84_b_ENG-Thumbnail.png?itok=ThrWO1zY',
              type: 'video',
              url: 'https://picsum.photos/id/10/200/300'
            }
          }
        }
      />

      <Card
        variant="side"
        item={
          {
            name: 'Technology & Internet',
            node: {
              title: `Legal Support`,
              read_time: 8,
              image_uri: 'https://laaha.org/sites/default/files/styles/scale_592w/public/2024-06/VSS_M_84_b_ENG-Thumbnail.png?itok=ThrWO1zY',
              type: 'video',
              url: 'https://picsum.photos/id/10/200/300'
            }
          }
        }
      />
    </>
  );
}
