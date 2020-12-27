import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${({ theme }) => theme.bg1};
  box-shadow: rgba(0, 0, 1, 0.15) 0px 2px 10px;
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
