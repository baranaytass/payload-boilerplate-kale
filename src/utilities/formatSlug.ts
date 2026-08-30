/**
 * Characters that Unicode decomposition does not strip to ASCII.
 *
 * NFD splits accented Latin letters into base + combining mark, which handles
 * ç, ö, ü, é and friends. It does not help for letters that are their own
 * codepoint: Turkish dotless ı and dotted İ, or German ß. Without this map
 * those characters are dropped outright - "Işık" became "sk" and
 * "Hakkında" became "hakknda".
 */
const CHARACTER_MAP: Record<string, string> = {
  ı: 'i',
  İ: 'i',
  ş: 's',
  Ş: 's',
  ğ: 'g',
  Ğ: 'g',
  ç: 'c',
  Ç: 'c',
  ö: 'o',
  Ö: 'o',
  ü: 'u',
  Ü: 'u',
  ß: 'ss',
  æ: 'ae',
  Æ: 'ae',
  ø: 'o',
  Ø: 'o',
  å: 'a',
  Å: 'a',
  đ: 'd',
  Đ: 'd',
  ł: 'l',
  Ł: 'l',
}

/**
 * Turn a title into a URL-safe slug.
 *
 * Returns undefined for input that contains no usable characters, so callers
 * can fall back rather than store an empty slug.
 */
export const formatSlug = (val: string): string | undefined => {
  if (!val) return undefined

  const slug = val
    .replace(/[ıİşŞğĞçÇöÖüÜßæÆøØåÅđĐłŁ]/g, (char) => CHARACTER_MAP[char] ?? char)
    .normalize('NFD')
    // Drop the combining marks NFD just separated out.
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    // No leading or trailing separators.
    .replace(/^-+|-+$/g, '')

  return slug || undefined
}
