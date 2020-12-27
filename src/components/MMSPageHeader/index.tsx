import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Spacer from '../Spacer'

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
    <Container size="md">
      <StyledPageHeader>
        <FarmTitle>
			<MainTitleString>{title}</MainTitleString>
		    <StyledSubtitle>Staking Token</StyledSubtitle>
            <CoinIcon>
                <img src={icon} alt="coin logo" />
				<Spacer size="sm" />
				<TitleString>{subtitle}</TitleString>
            </CoinIcon>            
        </FarmTitle>        
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
  margin: 0 auto;
`

const FarmTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


const TitleString = styled.strong`
  color: ${({ theme }) => theme.text1};
  font-size: 20px; 
`

const MainTitleString = styled.strong`
  color: ${({ theme }) => theme.text1};
  font-size: 30px; 
  margin-bottom: 30px;
`


const CoinIcon = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }
`

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
`

export default PageHeader
