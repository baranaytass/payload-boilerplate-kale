// Simple slug formatting utility
// You might want to use a more robust library like 'slugify'
export const formatSlug = (val: string): string | undefined => {
  if (!val) return undefined

  return val
    .normalize('NFD') // split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-') // separator
}