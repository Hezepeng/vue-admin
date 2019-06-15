import defaultSettings from '@/settings'

const title = defaultSettings.title || '外贸公司人事管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
