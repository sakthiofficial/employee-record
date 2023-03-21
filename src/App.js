import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { HomeTable } from "./pages/home_page"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoofingIcon from '@mui/icons-material/Roofing';
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Logo from "./images/Logo.png";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { BrowserRouter, Route, Router, Routes, Link, useNavigate } from 'react-router-dom';
import { Attendence } from './pages/Attendence_page';
import { Overview } from './pages/Overview_page';
import { Signup } from './user_pages/signup';
import { Login } from './user_pages/login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
function App() {
  const [nav, setnav] = useState(false)

  return (
    <BrowserRouter>

      <div className="App">

        <header onMouseEnter={() => setnav(true)} onMouseLeave={() => setnav(false)}>

          {nav ? <nav>
            <ul>
              <Link to="/"><li > <span className="logos" ><img src={Logo} alt="" /></span>e manager</li></Link>
              <Link to="/"><li><span className="logos"><RoofingIcon className='icon' /></span>home</li></Link>
              <Link to="/overview"><li><span className="logos"><TableViewIcon className='icon' /></span>overview</li></Link>
              <Link to="/attendence"><li><span className="logos"><CalendarMonthIcon className='icon' /></span>attendence</li></Link>
              {localStorage.getItem("username") ? <Link to="/login"><li onClick={() => {

                localStorage.removeItem("username")
              }} ><span className="logos"><PowerSettingsNewIcon className='icon' /></span>Log Out</li></Link> : <> <Link to="/login"><li><span className="logos"><PowerSettingsNewIcon className='icon' /></span>Login</li></Link>
                <Link to="/signup"><li><span className="logos"><ExitToAppIcon className='icon' /></span>SignUp</li></Link></>
              }



            </ul>



          </nav> : <nav>
            <ul>
              <li><img src={Logo} alt="nav-logo" /> </li>

              <li><RoofingIcon className='icon' /></li>
              <li><TableViewIcon className='icon' /></li>
              <li><CalendarMonthIcon className='icon' /> </li>
              <li><PowerSettingsNewIcon className='icon' /></li>
              {localStorage.getItem("username") ? null : <li><ExitToAppIcon className='icon' /></li>}


            </ul>
          </nav>}
        </header>


        <main>
          <Routes>

            <Route path='/' element={
              <ProductPage>
                <HomeTable />
              </ProductPage>
            } />
            <Route path='/attendence' element={
              <ProductPage>
                <Attendence />
              </ProductPage>} />
            <Route path='/overview' element={
              <ProductPage>
                <Overview />
              </ProductPage>} />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />





          </Routes>
        </main>

      </div>
    </BrowserRouter>


  );
}
function ProductPage({ children }) {
  let navigate = useNavigate()
  if (localStorage.getItem("username")) {
    return children

  } else {
    navigate("/login")
  }

}
export default App;
