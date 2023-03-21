import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { api } from '../assets/api_Endpoint';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';



export function Login() {
    let [loder, setloder] = useState(false)
    let navigate = useNavigate()
    let validationYup = Yup.object().shape({
        name: Yup.string().min(5, "Enter minumum 5 characters").max(15, "Enter lessthen 20 characters").required("Name"),
        password: Yup.string().min(5, "Enter minumum 5 characters").max(25, "Enter less then 25 characters").required("Password"),

    })
    let { errors, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            password: ""
        },
        validationSchema: validationYup,
        onSubmit: (val) => {
            setloder(true)
            fetch(`${api}/user/login`, {
                method: "POST",
                body: JSON.stringify(val),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(val => {
                if (val.status == 200) {
                    localStorage.setItem("username", values.name)
                    setloder(false)

                    navigate("/")


                } else {
                    setloder(false)

                    alert("Invalid Credentials")
                }
            })
        }
    })

    return (
        <div className="login_page">
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" color={errors.name ? "error" : "primary"} name="name" onChange={handleChange} label={errors.name ? errors.name : "Name"} variant="outlined" />
                <TextField id="outlined-basic" color={errors.password ? "error" : "primary"} name="password" onChange={handleChange} label={errors.password ? errors.password : "Password"} variant="outlined" />
                <div className="signup_btn" >
                    <Button variant='contained' type='submit' className='holiday-btn'>{loder ? <RefreshIcon className='loder' /> : "login"}</Button>
                    <Button onClick={() => navigate("/signup")}>signup</Button>


                </div>
            </form>
        </div>
    )
}