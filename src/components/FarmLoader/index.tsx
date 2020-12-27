import React from 'react'
import styled, { keyframes } from 'styled-components'

import logo from '../../assets/images/logo.png'

import CardIcon from '../CardIcon'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
        <StyledLogo src={logo} alt="ChocoSwap" />
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledLogo = styled.img`
  width: 3rem;
  height: 4rem;
  position: relative;
  animation: 1s ${spin} infinite;
`

const StyledText = styled.div`
  color: ${props => props.theme.text1};
`

export default Loader
