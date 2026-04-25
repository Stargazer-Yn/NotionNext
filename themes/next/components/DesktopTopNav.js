import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useNextGlobal } from '..'
import CONFIG from '../config'
import DarkModeButton from './DarkModeButton'

const DesktopTopNav = props => {
  const { customNav, customMenu, postCount } = props
  const { locale } = useGlobal()
  const { searchModal } = useNextGlobal()

  const archiveSlot = (
    <span className='ml-1 bg-gray-600 rounded text-gray-100 px-1 text-xs'>
      {postCount}
    </span>
  )

  const defaultLinks = [
    { id: 1, icon: 'fas fa-home', name: locale.NAV.INDEX, href: '/', show: true },
    {
      id: 2,
      icon: 'fas fa-th',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('NEXT_MENU_CATEGORY', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('NEXT_MENU_TAG', null, CONFIG)
    },
    {
      id: 4,
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      slot: archiveSlot,
      show: siteConfig('NEXT_MENU_ARCHIVE', null, CONFIG)
    }
  ]

  let links = defaultLinks
  if (customNav) links = defaultLinks.concat(customNav)
  if (siteConfig('CUSTOM_MENU')) links = customMenu

  const showSearch = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal?.current?.openSearch()
    }
  }

  return (
    <nav className='hidden lg:flex sticky top-0 z-40 w-full bg-gray-900 dark:bg-gray-950 text-white items-center px-6 h-12 shadow-md'>
      <SmartLink
        href='/'
        className='font-serif text-base font-semibold text-white hover:text-gray-300 transition-colors mr-8 whitespace-nowrap'>
        {siteConfig('TITLE')}
      </SmartLink>

      <ul className='flex items-center gap-1 flex-1'>
        {links?.map((link, idx) =>
          link?.show ? (
            <li key={idx}>
              <SmartLink
                href={link.href}
                className='flex items-center gap-1.5 px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors'>
                <i className={`${link.icon} text-xs`} />
                {link.name}
                {link.slot}
              </SmartLink>
            </li>
          ) : null
        )}
      </ul>

      <div className='flex items-center gap-1 text-gray-300'>
        <button
          onClick={showSearch}
          className='p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors'>
          <i className='fas fa-search text-sm' />
        </button>
        <DarkModeButton />
      </div>
    </nav>
  )
}

export default DesktopTopNav
