import { useTranslations } from "next-intl"
import Link from "next/link"

export interface BreadcrumbsProps {
  items: {
    title: string
    url?: string
  }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations()
  if (!items?.length) {
    return null
  }

  items.unshift({
    title: "Home",
    url: "/",
  })

  return (
    <nav className="py-4 text-text bg-shadow-gray rounded-lg my-5">
      <ol className="flex px-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center leading-none truncate text-m">
            {item.url ? (
              <Link href={item.url} passHref legacyBehavior={true}>
                <a className="text-link">{item.title}</a>
              </Link>
            ) : (
              item.title
            )}
            {index !== items.length - 1 && (
              <svg
                className="w-3 h-3 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
