import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';




function App() {

 const [weight , setweight]=useState('')
 const [height , setheight]=useState('')
 const [bmi , setbmi]=useState(0)
 const [wclass , setwclass]=useState('')
 const [wcc , setwcc]=useState('text-light')
 const [isweight , setisweight]=useState(true)
 const [isheight , setisheight]=useState(true)

    
   const validate=(e)=>{
    console.log(e.target.name);
    console.log(e.target.value);

    
    
    if(!!e.target.value.match('^[0-9 .]*$')){

     if(e.target.name=='weight'){

       setweight(e.target.value)
       setisweight(true)
     }
     
     else{

       setheight(e.target.value)
       setisheight(true)
     }




    }
    else{

     if(e.target.name=='weight'){

       setweight(e.target.value)
       setisweight(false)
     }
 
     else{

       
      setheight(e.target.value)
      setisheight(false)
     }

    }


    
}

const resethandle = ()=>{
 console.log("inside the function");
 
 setweight("")
 setheight("")
 setbmi(0)
 setwclass('')
 setwcc('text-light')


 setisweight(true)
 setisheight(true)
 
}

const Calcul = () => {
  if (!height || !weight) {
    toast.info('please enter the values');
  } else {
    const calculatedBMI = Math.round(weight /((height/100 ) ** 2) * 10) / 10;
    setbmi(calculatedBMI);

   
    if (calculatedBMI <= 18.5) {
      setwclass("Under Weight");
      setwcc('text-primary')
    } else if (calculatedBMI > 18.5 && calculatedBMI <= 25) {
      setwclass("Healthy Weight");
      setwcc('text-success')
      
    } else if (calculatedBMI > 25 && calculatedBMI <= 30) {
      setwclass("Over Weight");
      setwcc('text-warning')
    } else {
      setwclass("Obesity");
      setwcc('text-danger')
    }
  }
};
  

  return (
    <>

<div style={{height:'100vh'}} className='bg-dark w-100 d-flex justify-content-center align-items-center'>
      <div style={{width:'500px'}} className='p-5 bg-light  rounded'>
      <h1 className='text-center'>BODY MASS INDEX CALCULATOR</h1>
      <p className='text-center'>Know your Weight Class</p>
      <div style={{height:'150px'}} className='bg-dark rounded d-flex justify-content-center align-items-center flex-column'>
        <h1 className='text-light'>{bmi}</h1>
        
        <h2 className={wcc}>{wclass} <FontAwesomeIcon icon={faWeightScale} size="lg" /> </h2>
      </div>
      <div>
        <div className="my-3"><TextField name='weight' value={weight} onChange={(e)=>validate(e)} id="outlined-basic" label="Wheight in Kg" variant="outlined" className='w-100' />
        {!isweight &&   <span className='text-danger'>invalid input</span> }
        
        </div>
        <div className="mb-3"><TextField name='height' value={height} onChange={(e)=>validate(e)} id="outlined-basic" label="Height in cm" variant="outlined" className='w-100'/>
        {!isheight &&   <span className='text-danger'>invalid input</span> }

        </div>
        
        
        </div>
        <div className='mb-3 d-flex justify-content-between'> 
          <Button style={{width:'190px', height:'60px'}} onClick={Calcul} variant="contained" color='success' disabled={isweight && isheight ? false : true}>Calculate</Button>
        <Button style={{width:'190px', height:'60px'}}   variant="contained" color='warning' onClick={resethandle}>Reset</Button>
        </div>
       
      </div>
     
     </div>
     <ToastContainer position='top-center' autoClose={2000} theme='colored'/>
   
    </>
  )
}

export default App
