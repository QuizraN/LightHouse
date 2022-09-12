import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
function Confetti() {
  const [windowDimension, setwindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [btn,setBtn]=useState(true)
  const detectSize = () => {
    setwindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  document.addEventListener("click", myFunction);

function myFunction() {
    setBtn(false)
}
  return (
    <>
    
    {
        btn&&
    
      <ReactConfetti width={windowDimension.width} height={windowDimension.height} 
      tweenDuration={10}/>
    }
    </>
  );
}

export default Confetti;
