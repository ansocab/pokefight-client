import React, { useState, useEffect, useRef } from 'react'
import FOG from 'vanta/dist/vanta.fog.min'
// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag
 
export default function VantaFog (props) {
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(FOG({
        el: myRef.current
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return <div ref={myRef} className="vanta-background"></div>
}