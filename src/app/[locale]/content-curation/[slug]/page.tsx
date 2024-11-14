"use client"

export const runtime = 'edge';

import GridCard from "@/src/components/Cards/GridCard";
// import { laila } from "../../layout";
import { getContentCurationData } from "@/src/lib/apis";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Pagination from "@/src/components/Pagination";

const ContentCuration = () => {
  const initialData = {
    pageNumber: 1,
    sortBy: 'latest',
    filterType: '',
  }
  const {slug} = useParams();
  const locale = useLocale();
  const t = useTranslations();
  const [contentCurationData, setContentCurationData] = useState<any>({});
  const [contentParam, setContentParam] =  useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tabs = [
    { name: 'All', module_type: '' },
    { name: 'Modules', module_type: 'scorm' },
    { name: 'Videos', module_type: 'video' },
    { name: 'Podcasts', module_type: 'podcast' },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].module_type);
  const {pageNumber, filterType, sortBy} = contentParam;
  const [currentPage, setCurrentPage] = useState<number>(1);
  let totalItems = 50;
  let itemsPerPage = 10;

  const handleClick = (module_type:string) => {
    setSelectedTab(module_type);
    setContentParam((prev:any) => ({...prev, filterType:module_type}))
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = event.target.value;
    setContentParam((prev) => ({
      ...prev,
      sortBy: sortByValue,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setContentParam((prev) => ({
      ...prev,
      pageNumber: page,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (slug && locale) {
        try {
          const contentCuration = await getContentCurationData(slug as string, locale as string, pageNumber, filterType, sortBy);
          setContentCurationData(contentCuration.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [slug, locale, contentParam]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    'taxonomy-block': { title, description, bgimage, video_url, resource_count } = {},
    'content-curation-view-block': contentCurationBlocks,
  } = contentCurationData;

  return (
    <div className="content-curation mb-8">
      <div
        className='curation-block py-8 mb-6 flex flex-wrap gap-6 items-center'
        style={ bgimage && {
          background: `url(${bgimage}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
      >
        <div className={`curation-info ${video_url ? 'flex-[0_0_100%] lg:flex-[0_0_50%] lg:max-w-[calc(50%-1rem)]' : 'mx-auto text-center'}`}>
          <div className="resource-count mb-4">{resource_count} Resources available</div>
          <h1 className={`title mb-2 tracking-tight `}>
            {title}
          </h1>
          <div className="subtitle text-color-neutral">
            {description}
          </div>
        </div>
        {
          video_url && (
            <div className="intro-video flex-[0_0_100%] lg:flex-[0_0_50%] lg:max-w-[calc(50%-1rem)]">
              <video className="max-w-full w-full" width={640} height={360} controls muted loop autoPlay playsInline>
                <source src={video_url} type="video/mp4" />
              </video>
            </div>
          )
        }
      </div>

      <div className="tabs mb-8 flex flex-wrap justify-between">
        <div className="tab-row flex gap-6 lg:gap-8 mb-4 lg:mb-0">
          {tabs.length > 0 && tabs.map((tab) => (
            <button
              key={tab.module_type}
              onClick={() => handleClick(tab.module_type)}
              className={tab.module_type === selectedTab ? 'active text-primary' : 'hover:text-primary'}
            >
              {t(tab.name)}
            </button>
          ))}
        </div>
        <div className="sort flex items-center gap-6">
          <span> {t('Sort By:')} </span>
          <select className="pe-8" onChange={handleChange}>
            <option value="latest">{t('Latest')}</option>
            <option value="oldest">{t('Oldest')}</option>
          </select>
        </div>
      </div>

      <div className="content-cards flex flex-wrap gap-8 pb-12">
        {contentCurationBlocks && contentCurationBlocks.map((item: any, index: number) => (
          <GridCard key={index} className="lg:max-w-[calc(25%-1.5rem)] md:max-w-[calc(50%-1rem)] flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]" item={item} />
        ))}
      </div>
      {totalItems > itemsPerPage &&
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      }
    </div>
  );
};

export default ContentCuration;
