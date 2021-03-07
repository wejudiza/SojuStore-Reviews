import React, {useState} from 'react'

function ZoomedImg(props) {
  const [bgPosition, setBgPosition] = useState('0% 0%')

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setBgPosition(`${x}% ${y}%`)
  }

  return (
    <div>
      <figure onMouseMove={handleMouseMove.bind(this)} style={{ backgroundPosition: bgPosition }}>
      <img className="expanded-img" src={props.thumbs[props.index].url} onClick={() => props.setZoom(!props.zoom)} ></img>
      </figure>
    </div>
  )
}

export default ZoomedImg