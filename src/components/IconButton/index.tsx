import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { darken } from 'polished'
import styled from 'styled-components'

interface IconButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  to?: string
}

const IconButton: React.FC<IconButtonProps> = ({ children, disabled, onClick, to }) => {
  const location = useLocation()
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {!!to ? (
        <StyledLink
          to={{
            pathname: to,
            search: location.search
          }}
        >
          {children}
        </StyledLink>
      ) : (
        children
      )}
    </StyledButton>
  )
}

interface StyledButtonProps {
  disabled?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${props => props.theme.primary1};
  border: 0;
  border-radius: 28px;
  box-shadow: 6px 6px 12px ${props => props.theme.bg1}, -12px -12px 24px ${props => props.theme.bg1};
  color: ${props => (!props.disabled ? 'white' : '#ddd')};
  cursor: pointer;
  display: flex;
  font-weight: 700;
  height: 56px;
  justify-content: center;
  letter-spacing: 1px;
  outline: none;
  padding: 0;
  margin: 0;
  pointer-events: ${props => (!props.disabled ? undefined : 'none')};
  text-transform: uppercase;
  width: 56px;
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default IconButton
