import 'bootstrap/dist/css/bootstrap.min.css'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import RefreshIcon from '@mui/icons-material/Refresh';
import { api } from "../assets/api_Endpoint"
export function HomeTable() {
    const [add, setadd] = useState(false)
    const [loder, setloder] = useState(false)

    const [table, settable] = useState([]);
    function getItem() {
        fetch(api).then(dt => dt.json()).then(res => settable(res))

    }
    useEffect(() => {
        setloder(true)
        getItem()
        setloder(false)

    }, [])

    let validationYup = Yup.object().shape({
        name: Yup.string().min(5, "Enter minumum 5 characters").max(15, "Enter lessthen 15 characters").required("Name"),
        id: Yup.string().min(4, "Enter minumum 4 numbers").max(15, "Enter less then 15 numbers").required("Id"),
        work: Yup.string().min(5, "Enter minumum 5 characters").max(15, "Enter less then 15 characters").required("Work"),
        email: Yup.string().min(5, "Enter minumum 5 characters").max(15, "Enter less then 15 characters").required("Email")

    })
    let { initialValues, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            id: "",
            work: "",
            email: ""
        },
        validationSchema: validationYup,
        onSubmit: (val) => {
            setloder(true)
            console.log(val);
            fetch(`${api}/employee/add`, {
                method: "POST",
                body: JSON.stringify(val),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(dt => {
                setloder(false)
                setadd(false)
                getItem()

                console.log(dt)
            })
        }
    })
    return (
        <div className="table">
            <div className="table_icons">
                {add ? <> <IconButton > <CheckIcon onClick={handleSubmit} className='table_icons_add' /></IconButton>
                    <IconButton > <ClearIcon onClick={() => setadd(false)} className='table_icons_clear' /></IconButton></> : <IconButton onClick={() => setadd(true)}> <AddIcon className='table_icons_add' /></IconButton>}



            </div>
            {
                loder ? <div className="loder">
                    <RefreshIcon className='loder_icon' />
                </div> : null
            }
            <form>
                <Table striped bordered hover>

                    <thead text="dark">
                        <tr>
                            <th>No</th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Work</th>
                            <th>Email</th>

                        </tr>

                    </thead>
                    <tbody>
                        {
                            table.map((val, ind) => {
                                return (
                                    <tr>
                                        <td>{ind + 1}</td>
                                        <td>{val._id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.work}</td>
                                        <td>{val.email}</td>


                                    </tr>
                                )
                            })
                        }
                        {
                            add ? <tr>

                                <td>{table.length + 1}</td>
                                <td><TextField id="standard-basic" label={errors.id ? errors.id : "Id"} color={errors.id ? "error" : "primary"} variant="standard" type="number" name="id" onChange={handleChange} /></td>
                                <td><TextField id="standard-basic" label={errors.name ? errors.name : "Name"} color={errors.name ? "error" : "primary"} name="name" onChange={handleChange} variant="standard" /></td>
                                <td><TextField id="standard-basic" label={errors.work ? errors.work : "Work"} color={errors.work ? "error" : "primary"} variant="standard" type="text" name="work" onChange={handleChange} /></td>
                                <td><TextField id="standard-basic" label={errors.email ? errors.email : "Email"} color={errors.email ? "error" : "primary"} variant="standard" type="email" name="email" onChange={handleChange} /></td>



                            </tr> : null
                        }
                    </tbody>
                </Table>
            </form>
        </div>
    )
}

