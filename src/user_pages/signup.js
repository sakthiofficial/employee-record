import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { api } from '../assets/api_Endpoint';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';


export function Signup() {
    let [loder, setloder] = useState(false)

    let navigate = useNavigate()
    let validationYup = Yup.object().shape({
        name: Yup.string().min(5, "Enter minumum 5 characters").max(15, "Enter lessthen 20 characters").required("Name"),
        password: Yup.string().min(5, "Enter minumum 5 characters").max(25, "Enter less then 25 characters").required("Password"),
        email: Yup.string().email().required()
    })
    let [nameErr, setnameErr] = useState(false)
    let { errors, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            password: "",
            email: ""
        },
        validationSchema: validationYup,
        onSubmit: (val) => {
            setloder(true)

            fetch(`${api}/user/signup`, {
                method: "POST",
                body: JSON.stringify(val),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(val => {
                if (val.status == 200) {
                    localStorage.setItem("username", val.name)
                    setloder(true)

                    setnameErr(false)
                    navigate("/")

                } else {
                    setnameErr(true)
                    setloder(true)


                }
            })

        }
    })
    return (
        <div className="signup_page">
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" color={nameErr ? "error" : "primary"} name="name" onChange={handleChange} label={errors.name ? errors.name : nameErr ? "Name already used" : "Name"} variant="outlined" />
                <TextField id="outlined-basic" color={errors.password ? "error" : "primary"} name="password" onChange={handleChange} label={errors.password ? errors.password : "Password"} variant="outlined" />
                <TextField id="outlined-basic" color={errors.email ? "error" : "primary"} name="email" onChange={handleChange} label={errors.email ? errors.email : "Email"} variant="outlined" />
                <Button variant='contained' type='submit' className='holiday-btn'>{loder ? <RefreshIcon className='loder' /> : "signup"}</Button>


            </form>
        </div>
    )
}