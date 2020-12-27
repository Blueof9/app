import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  let width: number
  switch (size) {
    case 'sm':
      width = 1200 / 2
      break
    case 'md':
      width = (1200 * 2) / 3
      break
    case 'lg':
    default:
      width = 1200
  }
  return <StyledContainer width={width}>{children}</StyledContainer>
}

interface StyledContainerProps {
  width: number
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${props => props.width}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  width: 100%;
`

export default Container
