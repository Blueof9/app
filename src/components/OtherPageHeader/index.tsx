import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  wordmark?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ wordmark, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        {!title ? (
          <Title>
            <TitleText>
              <img style={{ marginLeft: '4px' }} src={wordmark} alt="ChocoFactorySwap" />
            </TitleText>
          </Title>
        ) : (
          <FarmTitle>
            <TitleString>{title}</TitleString>
          </FarmTitle>
        )}

      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[4]}px;
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


/*const StyledSubtitle = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`*/

export default PageHeader
