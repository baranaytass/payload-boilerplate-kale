import { describe, it, expect } from 'vitest'
import { formatSlug } from './formatSlug'

describe('formatSlug', () => {
  it('lowercases and joins words with hyphens', () => {
    expect(formatSlug('Hello World')).toBe('hello-world')
  })

  it('transliterates Turkish characters', () => {
    // ı and İ have no decomposed form, so NFD alone silently dropped them:
    // "Işık" used to become "sk" and "Hakkında" became "hakknda".
    expect(formatSlug('Işık ve Gölge')).toBe('isik-ve-golge')
    expect(formatSlug('Şirket Hakkında')).toBe('sirket-hakkinda')
    expect(formatSlug('Peyzaj Çözümleri')).toBe('peyzaj-cozumleri')
    expect(formatSlug('Bahçe Düzenleme')).toBe('bahce-duzenleme')
    expect(formatSlug('Yeşilköy İstanbul')).toBe('yesilkoy-istanbul')
  })

  it('handles other non-ASCII Latin letters', () => {
    expect(formatSlug('Über Größe')).toBe('uber-grosse')
  })

  it('collapses punctuation and whitespace into single separators', () => {
    expect(formatSlug('Ağaç & Çim')).toBe('agac-cim')
    expect(formatSlug('  Trim  Me  ')).toBe('trim-me')
  })

  it('does not leave leading or trailing separators', () => {
    expect(formatSlug('--Hello--')).toBe('hello')
    expect(formatSlug('...Title!')).toBe('title')
  })

  it('returns undefined when nothing usable remains', () => {
    expect(formatSlug('')).toBeUndefined()
    expect(formatSlug('!!!')).toBeUndefined()
  })
})
