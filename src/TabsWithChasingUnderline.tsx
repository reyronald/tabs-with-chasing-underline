/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import { ArrowUp } from './icons'
import { MediaDisplay } from './MediaDisplay'
import { mediaQueries } from './mediaQueries'
import { color, font } from './theme'

const i18n = { t: (value: string) => value }

const PDPTabsContainer = styled.div`
  border-bottom: 1px solid ${color.borderGray};
  color: ${color.primary};
  font-family: ${font.bold};
  background: ${color.background};
  font-size: 16px;
  line-height: 1.44;
  position: sticky;
  top: 0;
  z-index: 2;
`

const TabList = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 980px;
  margin: 0 auto;
`

const Tab = styled.div`
  text-decoration: none;
  color: ${color.primary};
  font-weight: 600;
  :visited {
    color: inherit;
  }
  :hover {
    background: ${color.background3};
  }
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }

  position: relative;

  ${mediaQueries.sm.max`padding: 13px 10px;`}
  ${mediaQueries.md.min`padding: 21px 20px;`}
`

const Underline = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  height: 5px;
  width: 1px;
  background: ${color.primary};
  z-index: 2;

  transition: transform 1s cubic-bezier(0, 1.2, 0.175, 0.9), opacity 0.3s ease;
  transform-origin: center left;

  opacity: ${($) => ($.visible ? 1 : 0)};
`

const Top = styled.div<{ visible: boolean }>`
  position: absolute;
  right: 0;
  padding: inherit;
  height: 100%;
  display: flex;

  transition: opacity 0.3s ease;
  opacity: ${($) => ($.visible ? 1 : 0)};

  a {
    cursor: pointer;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    width: 67px;
    height: 46px;
    background: ${color.background3};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto 0;
  }

  span {
    margin-top: -5px;
  }
`

const topGutter = 100

type SectionId = 'details' | 'overview' | 'example-scenario' | 'faqs'

export const TabsWithChasingUnderline: React.FC<{}> = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const borderRef = React.useRef<HTMLDivElement>(null)

  useScrollWhenLocationChanges()

  const scrollY = useGetScrollY()
  const activeSection = useGetActiveSection()

  const container = containerRef.current
  const border = borderRef.current
  useMoveUnderline({ activeSection, container, border })

  return (
    <PDPTabsContainer ref={containerRef}>
      <TabList role="tablist">
        <Underline ref={borderRef} visible={activeSection != null} />

        <Tab
          id="tab-details"
          role="tab"
          aria-selected={activeSection === 'details'}
          aria-controls="details"
          tabIndex={0}
          as={Link}
          to="#details"
        >
          {i18n.t('Details')}
        </Tab>
        <Tab
          id="tab-overview"
          role="tab"
          aria-selected={activeSection === 'overview'}
          aria-controls="overview"
          tabIndex={0}
          as={Link}
          to="#overview"
        >
          {i18n.t('Overview')}
        </Tab>
        <Tab
          id="tab-example-scenario"
          role="tab"
          aria-selected={activeSection === 'example-scenario'}
          aria-controls="example-scenario"
          tabIndex={0}
          as={Link}
          to="#example-scenario"
        >
          {i18n.t('Example')}
        </Tab>
        <Tab
          id="tab-faqs"
          role="tab"
          aria-selected={activeSection === 'faqs'}
          aria-controls="faqs"
          tabIndex={0}
          as={Link}
          to="#faqs"
        >
          {i18n.t('FAQs')}
        </Tab>

        <MediaDisplay min="sm">
          <Top visible={scrollY > topGutter}>
            <Link to="#">
              <ArrowUp size={25} />
              <span>{i18n.t('Top')}</span>
            </Link>
          </Top>
        </MediaDisplay>
      </TabList>
    </PDPTabsContainer>
  )
}

function useScrollWhenLocationChanges(): void {
  const location = useLocation()
  React.useEffect(() => {
    const id = location.hash.replace('#', '')
    if (id) {
      const section = document.getElementById(id)
      if (section) {
        window.scroll({
          top: section.offsetTop - topGutter + 10,
          behavior: 'smooth',
        })
      }
    } else {
      window.scroll({ top: 0, behavior: 'smooth' })
    }
  }, [location])
}

function useHandleScrollChange(handleScrollChange: () => void): void {
  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollChange)
    window.addEventListener('resize', handleScrollChange)

    handleScrollChange()

    return () => {
      window.removeEventListener('scroll', handleScrollChange)
      window.removeEventListener('resize', handleScrollChange)
    }
  }, [handleScrollChange])
}

function useGetScrollY(): number {
  const [scrollY, setScrollY] = React.useState(window.scrollY)

  const handleScrollChange = React.useCallback(
    function handleScrollChange(): void {
      setScrollY(window.scrollY)
    },
    [],
  )

  useHandleScrollChange(handleScrollChange)

  return scrollY
}

function useGetActiveSection(): SectionId | null {
  const [activeSection, setActiveSection] = React.useState<SectionId | null>(
    'details',
  )

  const handleScrollChange = React.useCallback(
    function handleScrollChange(): void {
      const mostRecentlyRevealedSection = getActiveSection([
        'details' as const,
        'overview' as const,
        'example-scenario' as const,
        'faqs' as const,
      ])
      setActiveSection(mostRecentlyRevealedSection)
    },
    [],
  )

  useHandleScrollChange(handleScrollChange)

  return activeSection
}

function getActiveSection(
  elementsIds: ReadonlyArray<SectionId>,
): SectionId | null {
  const elements = elementsIds
    .map((elementId) => document.getElementById(elementId))
    .filter((el): el is HTMLElement => Boolean(el))

  const orderedBottomToTop = elements.sort((a, b) => b.offsetTop - a.offsetTop)

  const activeSection = orderedBottomToTop.find((element) => {
    const { scrollY } = window
    return scrollY >= element.offsetTop - topGutter
  })

  return activeSection ? (activeSection.id as SectionId) : null
}

function getTranslateX(el: HTMLElement): number {
  const computedStyle = window.getComputedStyle(el)
  const matrix = computedStyle.transform || computedStyle.webkitTransform

  const matrixValues = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ')
  const xValue = matrixValues?.[4]
  const x = xValue ? Number.parseFloat(xValue) : 0
  return x
}

type useMoveUnderlineArgs = {
  activeSection: SectionId | null
  container: HTMLDivElement | null
  border: HTMLDivElement | null
}

function useMoveUnderline(args: useMoveUnderlineArgs): void {
  const { activeSection, container, border } = args

  const handleScrollChange = React.useCallback(
    function handleScrollChange(): void {
      if (activeSection && container && border) {
        const activeTabPanelElement = container.querySelector(
          `[aria-controls="${activeSection}"]`,
        )
        if (activeTabPanelElement) {
          const targetBoundingRect = activeTabPanelElement.getBoundingClientRect()
          const borderboundingRect = border.getBoundingClientRect()
          const translateX = getTranslateX(border)
          const x =
            targetBoundingRect.left - borderboundingRect.left + translateX
          const w = targetBoundingRect.width
          requestAnimationFrame(() => {
            if (border) {
              border.style.transform = `translate(${x}px) scale(${w}, 1)`
            }
          })
        }
      }
    },
    [activeSection, container, border],
  )

  useHandleScrollChange(handleScrollChange)
}
