import styled from 'styled-components'

import { mediaQueries } from './mediaQueries'

const mediaDisplayMap = ['xs', 'sm', 'md', 'lg', 'xl'].reduce(
  (acc, key, index, arr) => ({
    ...acc,
    [key]: {
      min: index > 0 && mediaQueries[arr[index - 1]].max`display: none`,
      max:
        index < arr.length - 1 &&
        mediaQueries[arr[index + 1]].min`display: none`,
    },
  }),
  {},
)

type MediaQueries = keyof typeof mediaQueries

type MediaDisplayProps = {
  min?: MediaQueries
  max?: MediaQueries
  only?: MediaQueries
}

export const MediaDisplay = styled.div<MediaDisplayProps>`
  display: initial;
  ${({ min }) => min && mediaDisplayMap[min].min};
  ${({ max }) => max && mediaDisplayMap[max].max};
  ${({ only }) => only && mediaDisplayMap[only].max};
  ${({ only }) => only && mediaDisplayMap[only].min};
`
