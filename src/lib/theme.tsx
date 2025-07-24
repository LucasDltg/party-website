import { cookies } from 'next/headers'

export const THEME_COOKIE_NAME = 'theme'

export async function getTheme(): Promise<'light' | 'dark' | 'system'> {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_COOKIE_NAME)?.value as
    | 'light'
    | 'dark'
    | 'system'
  return theme || 'system'
}
