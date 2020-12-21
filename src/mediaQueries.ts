import { css } from 'styled-components'

const breakpoints = {
  xs: 0, // em
  sm: 30, // em
  md: 53.125, // em
  lg: 65.625, // em
}

const xlBreakpoint = 87.5 // em

type MediaQuery = {
  min: Function
  max: Function
  only: Function
}

type MediaQueries = {
  xs: MediaQuery
  sm: MediaQuery
  md: MediaQuery
  lg: MediaQuery
  xl: MediaQuery
}

type EitherOrBoth<T1, T2> = T1 | T2 | (T1 & T2)

type MediaQueryOpts = EitherOrBoth<{ min: number }, { max: number }> | {}

const mediaQueryCss = (opts: MediaQueryOpts) => {
  const minWidth = 'min' in opts ? `(min-width: ${opts.min}em)` : ''
  const maxWidth = 'max' in opts ? `(max-width: ${opts.max}em)` : ''

  const screenMediaQuery = [minWidth, maxWidth].filter(Boolean).join(' and ')
  if (!screenMediaQuery) {
    return css
  }

  const printMinWidth = 'min' in opts ? `(min-width: ${opts.min}px)` : ''
  const printMaxWidth = 'max' in opts ? `(max-width: ${opts.max}px)` : ''
  const printMediaQuery = [printMinWidth, printMaxWidth]
    .filter(Boolean)
    .join(' and ')

  return (...styles: ReadonlyArray<any>) => css`
    @media only screen and ${screenMediaQuery},
      @media only print and ${printMediaQuery} {
      ${(css as any)(...styles)};
    }
  `
}

const createMediaQuery = (opts: MediaQueryOpts): MediaQuery => ({
  min: mediaQueryCss('min' in opts ? { min: opts.min } : {}),
  max: mediaQueryCss('max' in opts ? { max: opts.max } : {}),
  only: mediaQueryCss(opts),
})

export const mediaQueries: MediaQueries = {
  xs: createMediaQuery({ max: breakpoints.sm - 0.001 }),
  sm: createMediaQuery({ min: breakpoints.sm, max: breakpoints.md - 0.001 }),
  md: createMediaQuery({ min: breakpoints.md, max: breakpoints.lg - 0.001 }),
  lg: createMediaQuery({ min: breakpoints.lg, max: xlBreakpoint - 0.001 }),
  xl: createMediaQuery({ min: xlBreakpoint }),
}
