import {Route,Routes} from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AddBlog from './pages/AddBlog'

const App = () => {
  return (
   <div className='w-screen h-screen overflow-x-hidden'>
    <Navbar/>
   <Routes >
    <Route path='/'></Route>
    <Route path='/homepage' element={<HomePage/>}/>
    <Route path='/add-blog' element={<AddBlog/>}/>
    <Route path='/signin' element={<AuthForm  type={"signin"}/>}/>
    <Route path='/signup' element={<AuthForm type={"signup"}/>} />
   </Routes>
   
   </div>
  )
}

export default App