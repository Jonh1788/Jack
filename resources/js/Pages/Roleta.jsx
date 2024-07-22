import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '0' , style: { backgroundColor: '#123040', textColor: 'white' }, image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true}},
  { option: '1', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '2', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '3', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '4', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '5', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '6', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '7', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '8', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '9', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
  { option: '10', image:{ uri: 'image.png', offsetX: -40, offsetY: 0, sizeMultiplier: 0.5, landscape: true} },
]

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  return (
    <>
        <div className='h-max w-max rotate-[-45deg] mt-24'>
        <Wheel
            
            
            mustStartSpinning={mustSpin}
            prizeNumber={0}
            data={data}
            innerRadius={60}
            outerBorderWidth={0}
            radiusLineWidth={0}
            perpendicularText={true}
            textDistance={70}
            disableInitialAnimation={true}
            pointerProps={{
                src: 'pointer.svg',
                style: {rotate: '45deg', transform: 'translate(-30%, 0)'}
            }}
            onStopSpinning={() => {
            setMustSpin(false);
            }}
        />

        </div>

 
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  )
}