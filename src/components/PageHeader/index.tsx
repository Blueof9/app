import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon?: string
  icon1?: string
  wordmark?: string
  subtitle?: string
  title?: string
  isMMS?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, icon1, wordmark, subtitle, title, isMMS }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        {!title ? (
          <Title>
            <UniIcon>
              <img src={icon} alt="logo" />
            </UniIcon>
            <TitleText>
              <img style={{ marginLeft: '4px' }} src={wordmark} alt="ChocoFactorySwap" />
            </TitleText>
          </Title>
        ) : (
          <FarmTitle>
            {!isMMS ? (
              <CoinIcon>
                <img src={icon} alt="coin logo" />
                <img src={icon1 || 'https://bscscan.com/token/images/binance_32.png'} alt="bnb" />
              </CoinIcon>
            ) : (
              <MMSIcon src={icon} alt="MMS" />
            )}
            <TitleString>{title}</TitleString>
          </FarmTitle>
        )}

        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  padding-top: ${props => props.theme.spacing[1]}px;
  margin: 0 auto;
`

const FarmTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: auto;
  :hover {
    cursor: pointer;
  }

  /* ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    align-self: center;
  `}; */
`

const MMSIcon = styled.img`
  width: 5rem;
  height: 6rem;
`

const TitleString = styled.strong`
  color: ${({ theme }) => theme.text1};
  font-size: 30px;
`

const TitleText = styled.div`
  width: fit-content;
  white-space: nowrap;
  img {
    height: 3rem;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      img {
        height: 1.7rem;
      }
  `};
`

const CoinIcon = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-15deg);
  }
  img {
    width: 6rem;
    height: 6rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img {
      width: 4rem;
      height: 4rem;
    }
  `};
`

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
