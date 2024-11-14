import { FC } from 'react';
// import { laila } from '@/src/app/[locale]/layout';

type Props = {
  className?: string;
  variant?: 'main' | 'side',
  item: {
    name: string;
    node: {
      title: string;
      read_time: number;
      image_uri: string;
      type: string;
      url: string;
    };
  }
};

const Card: FC<Props> = ({ className, item, variant = 'main' }) => {
  return (
    <div
      className={`item mb-8 w-full md:mb-0`} >
      <a href={`${item.node.url}`} className={`hover:text-primary  ${variant == 'main' ? '' : 'flex'}`}>
        <div className="image_wrapper relative me-4">
          <span className={`icon-${item.node.type}`}></span>
          <img src={item.node.image_uri} alt={item.name} className="card-img mb-6" />
        </div>
        <div className="content">
          <div className="item-category text-primary mb-4 rounded-[0.2rem] bg-light-pink px-3 py-2 inline-block">
            {item.name}
          </div>
          <div className="item-title font-semibold text-xl mb-4 hover:text-primary">{item.node.title}</div>
          <div className="item-duration font-opensans text-sm text-light-gray">{item.node.read_time + 'mins'} </div>
        </div>
      </a>
    </div>
  );
};

export default Card;