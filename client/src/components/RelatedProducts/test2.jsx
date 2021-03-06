import * as React from 'react'
import Whirligig from 'react-whirligig'

const Slider = () => {
  let whirligig
  const next = () => whirligig.next()
  const prev = () => whirligig.prev()

  return (
    <div>
      <button onClick={prev}>Prev</button>
      <Whirligig
        visibleSlides={3}
        gutter="1em"
        ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
      >
        <img src="http://www.fillmurray.com/400/300" />
        <img src="http://www.fillmurray.com/300/400" />
        <img src="http://www.fillmurray.com/400/200" />
        <img src="http://www.fillmurray.com/200/400" />
        <img src="http://www.fillmurray.com/500/300" />
      </Whirligig>
      <button onClick={next}>Next</button>
    </div>
  )
}

export default Slider;