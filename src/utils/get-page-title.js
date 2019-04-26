import defaultSettings from '@/settings'

const title = defaultSettings.title || '在线考勤管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
