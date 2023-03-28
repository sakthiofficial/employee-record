import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Home } from './Home';
import { ListItem } from './product_pages/ListItem';
import { Contact } from './user_info/Contact';
import { Rent } from './order_page/Rent';
import { Children, createContext, useState } from 'react';
import { About } from './About';
import { CartItems } from './order_page/CartItems';
import { Rental } from './order_page/Rental';
import { Cameras } from './product_pages/Cameras';
import { Gagets } from './product_pages/Gagets';
import { Producted } from './product_pages/Producted';
import { Login } from './user_info/Login';
import { Signup } from './user_info/signup';
// import { ProductSignIN } from './ProductSignIN';
import { ProductLogOut } from './ProductLogOut';
import { Input } from '@mui/material';



export const user = createContext()

export const cartContext = createContext()


function App() {
  let [cart, setcart] = useState(false)
  const [logIn, setlogIn] = useState(false)
  const [cartItem, setcartItem] = useState([])

  return (
    <cartContext.Provider value={[cartItem, setcartItem]}>
      <user.Provider value={[logIn, setlogIn]}>

        <div className="App" >

          <BrowserRouter>
            <div className="nav-bar">
              <div className="nav-bar_stage1">
                <div className="nav-bar_stage1_logo">
                  <img src="https://amazepxm.com/amaze-demo/images/logo_1.png" alt="" onClick={() => <Navigate to="/" />} />
                </div>
                <div className="nav-bar_stage1_searchbar">
                  <InputBox />

                </div>
              </div>
              <div className="nav-bar_stage2">
                <div className="nav-bar_stage2_route1">
                  <Link to="/items">products</Link>
                  <Link to="/">offers</Link>
                  <Link to="/about">about</Link>
                  <Link to="/contact">contact us</Link>
                  <ProductSignIN logIn={logIn} setlogIn={setlogIn}>  <Link to="/signup">sign up</Link>
                    <Link className="login" to="/login">log in</Link></ProductSignIN>
                  <ProductLogOut>
                    <Link className="login" to="/logOut">log Out</Link>
                  </ProductLogOut>

                </div>
                <div className="nav-bar_stage2_route2">



                  <Link to="/rental">rented</Link>
                  <button onClick={() => setcart(!cart)}><ShoppingCartOutlinedIcon /></button>

                </div>



              </div>
            </div>
            <div className='dummy'>

            </div>
            {cart ? <div className="cart">
              <CartItems setlogIn={setlogIn} />
            </div> : null}
            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/items' element={
                <Producted logIn={logIn}>
                  <ListItem />
                </Producted>}
              />
              <Route path='/contact' element={<Contact />} />
              <Route path='/rent/:product/:id' element={<Producted logIn={logIn}><Rent /></Producted>} />
              <Route path='/about' element={<About />} />
              <Route path='/rental' element={<Producted logIn={logIn}><Rental /></Producted>} />
              {/* <Route path='/cameras' element={<Cameras />} /> */}
              <Route path='/:item' element={<Producted logIn={logIn}><Gagets /></Producted>} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/logout' element={<LogOut />} />











            </Routes>
          </BrowserRouter>
        </div>

      </user.Provider>
    </cartContext.Provider>
  );
}
function InputBox() {
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)
  const [val, setval] = useState("")
  function search() {
    setval("")
    if (val == "camera") {
      navigate("/cameras")
    } else if (val == "camera") {
      navigate("/gagets")

    } else {
      navigate("/items")

    }
  }
  return (
    <>
      <input type="text" onChange={(e) => setval(e.target.value)} value={val} placeholder={clicked ? "Avalable camere & gagets" : ""} onClick={() => setClicked(true)} />
      <Button variant="text" onClick={() => search()}><SearchSharpIcon /></Button>
    </>
  )
}
function LogOut() {
  localStorage.clear("token")
  return (
    <div className="logout">
      <h1>Iam LOgOut</h1>
      <Navigate to="/" />
    </div>
  )
}
function ProductSignIN({ children, logIn, setlogIn }) {

  if (logIn) {
    return null
  } else {
    return children
  }
}
export default App;
















































