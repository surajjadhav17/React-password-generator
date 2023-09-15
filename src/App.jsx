import { useState,useCallback ,useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length, setlength] = useState(8)
  const [numberallow, setnumberallow] = useState(false)
  const [charallow, setcharallow] = useState(false)
  const [password, setpassword] = useState()

const passwordgenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numberallow){
    str+="0123456789"
  }
  if(charallow){
    str+="!@#$%^&*<>?"
  }
  for (let index = 1; index <=length; index++) {
    let char=Math.floor(Math.random()  * str.length +1)
    console.log(char);

    pass+=str.charAt(char)

    setpassword(pass);
  }
},[numberallow,charallow,length,setpassword])
  
// passwordgenerator()

const copypasswordtoclipboard= useCallback(()=>{
  passuseref.current?.select()
  passuseref.current?.setSelectionRange(0,50)


   window.navigator.clipboard.writeText(password)
},[password])
  

useEffect(()=>{passwordgenerator()},[length,charallow,numberallow ,passwordgenerator])

const passuseref=useRef(null);


return (
    <>
     
    <div className='w-full  max-w-md  mx-auto rounded-lg p-2 my-8  text-orange-500 bg-gray-800'>

      Password generator

      <div className='flex mt-2'> 

        <input 
        type="text" 
        value={password}
        className='outline-none rounded-lg w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passuseref}
        />

        <button className='bg-blue-500 rounded-lg text-white px-2 mx-1 hover:bg-blue-700 '  
        onClick={copypasswordtoclipboard}
        >Copy</button>
      </div>

      <div className=' flex text-sm gap-x-2 mt-2'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
        
        />
        <label>length({length})</label>

        <input type="checkbox"
         defaultChecked={numberallow}
        className='cursor-pointer'

         id='numberInput'
         onChange={()=>{
          setnumberallow((prev)=>!prev)
         }}
        />
        <label>Number</label>

        <input type="checkbox"
         defaultChecked={charallow}
        className='cursor-pointer'

         id='charInput'
         onChange={()=>{
        setcharallow((prev)=>!prev)
         }}
        />
        <label>Character</label>

      </div>
    </div>
    
    
    </>
  )
}

export default App
