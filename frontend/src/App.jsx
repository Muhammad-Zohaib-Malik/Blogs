import {Route,Routes} from 'react-router-dom'
import AuthForm from './pages/AuthForm'

const App = () => {
  return (
   <div className='w-screen h-screen'>
   <Routes >
    <Route path='/'></Route>
    <Route path='/signin' element={<AuthForm  type={"signin"}/>}/>
    <Route path='/signup' element={<AuthForm type={"signup"}/>} />


   </Routes>
   
   </div>
  )
}

export default App