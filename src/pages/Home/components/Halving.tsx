import React from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'

const Balances: React.FC = () => {	

  const startTime = 1604062800
 
  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds, days } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <StyledInfo>
        Block rewards halving in {days} days + {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </StyledInfo>
    )
  }
  
  const isHalving = startTime * 1000 - Date.now() <= 0

  return (
		<StyledWrapper>
			{isHalving ? '' : <Countdown date={new Date(startTime * 1000)} renderer={renderer} /> }
		</StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  align-items: center;
  display: column;
  width: 100%;
  @media (max-width: 768px) {
	padding: 0px;
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
  @media (max-width: 1170px) {
    flex-flow: column nowrap;
  }
`

const StyledInfo = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 35px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  text-align: center;
  @media (max-width: 768px) {
	  padding: 0px 10px;
	  font-size: 30px;
  }
`

export default Balances
