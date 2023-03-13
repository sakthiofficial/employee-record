import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { HomeTable } from "./pages/home_page"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RoofingIcon from '@mui/icons-material/Roofing';
import TableViewIcon from '@mui/icons-material/TableView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Logo from "./images/Logo.png";
import { BrowserRouter, Route, Router, Routes, Link } from 'react-router-dom';
import { Attendence } from './pages/Attendence_page';
import { Overview } from './pages/Overview_page';
function App() {
  const [nav, setnav] = useState(true)

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

            </ul>



          </nav> : <nav>
            <ul>
              <li><img src={Logo} alt="" /> </li>

              <li><RoofingIcon className='icon' /></li>
              <li><TableViewIcon className='icon' /></li>
              <li><CalendarMonthIcon className='icon' /> </li>

            </ul>
          </nav>}
        </header>


        <main>
          <Routes>

            <Route path='/' element={<HomeTable />} />
            <Route path='/attendence' element={<Attendence />} />
            <Route path='/overview' element={<Overview />} />


          </Routes>
        </main>

      </div>
    </BrowserRouter>


  );
}
export default App;
