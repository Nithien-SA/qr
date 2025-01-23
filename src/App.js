import React, { useState } from 'react'
import './App.css'
import image from './image.png'
const App = () => {

  const [img, setImg] = useState(image);
  const [load, setLoad] = useState(false)
  const [qrdata, setQrData] = useState("")
  const [size, setSize] = useState(150)

  function qrGen(){
    try{
      setLoad(true)
      const url = 'https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrdata)}&size=${size}x${size}';
      setImg(url)
    }catch(error){
      alert('Error in generating the qr-code')
    }finally{
      setLoad(false)
    }
    
  }

  function handleQrData(data){
    setQrData(data)
  }

  function handleSize(data){
    setSize(data) 
  }
  return (
    <div className='App'>
      <h1>QR-CODE GENERATOR</h1>
      { load && <p>Please Wait!</p>}
      <img src={img} className='qr-img'></img>

      <label className='qr-label'>Link</label>
      <input type='text' id='link-input' placeholder='Enter url here' onChange={(e) => handleQrData(e.target.value)}></input>

      <label className='input-label'>
        Imagesize(e.g:150)
      </label>
      <input type='text' id='size-input' placeholder='Enter image size' onChange={(e) => handleSize(e.target.value)}></input>

      <button className='gen-btn' onClick={qrGen}>Generate</button>

      <button className='download' onClick={ ()=>{
        const link =document.createElement("a");
        link.href = img
        link.download = "code.png"
        link.click()
      }}>Download Qr Code</button>

    </div>
  )
}

export default App;