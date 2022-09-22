import React from 'react'
import background from "../img/background.jpg"
function Home() {
  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat", backgroundSize:"contain", objectFit:"cover", height:600,width:600}}>  
    </div>
  );
}

export default Home