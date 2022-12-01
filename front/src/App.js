import './App.css'
import Home from "./pages/Home";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Login from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Last from "./pages/Last";

function App() {
  return (
          <BrowserRouter>
            <Routes>
              <Route path='/' element = {<Home/>}/>
              <Route path='/signin' element = {<Login/>}/>
              <Route path='/signup' element = {<SignUp/>}/>
              <Route path='/last' element = {<Last/>}/>
              <Route path='*' element={<Home/>}/>
            </Routes>
          </BrowserRouter>
  )
}

export default App;
