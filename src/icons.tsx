import * as React from 'react'
import styled from 'styled-components'

type IconProps = {
  size?: number
  width?: number
  height?: number
  color?: string
  fillColor?: string
  style?: React.CSSProperties
  className?: string
}

export const TurnRightSvg = styled.svg`
  transform: rotate(90deg);
`

export const ArrowUp: React.FC<IconProps> = ({
  size,
  color,
  className,
  style,
}) => (
  <TurnRightSvg
    width={size}
    height={size}
    className={className}
    style={style}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
  >
    <path
      fill={color}
      d="M20.613 9.56a1.444 1.444 0 0 0 0-2.12 1.643 1.643 0 0 0-2.237 0l-7.912 7.5a1.444 1.444 0 0 0 0 2.12l7.912 7.5c.617.586 1.62.586 2.237 0a1.444 1.444 0 0 0 0-2.12L13.82 16l6.793-6.44z"
    />
  </TurnRightSvg>
)
