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
import { api } from "../assets/api_Endpoint";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export function HomeTable() {
    const [add, setadd] = useState(false)
    const [loder, setloder] = useState(false)
    const [edit, setedit] = useState(true)
    const [table, settable] = useState([]);
    function getItem() {
        fetch(api).then(dt => dt.json()).then(res => settable(res))

    }
    useEffect(() => {
        setloder(true)
        getItem()
        setloder(false)
        setedit(false)

    }, [])
    function deleteitem(id) {
        fetch(`${api}/employee/delete/${id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.status == 200) {
                setloder(false)
                setedit(false)

                getItem()

            }
            console.log(res.status);
        })
    }

    let validationYup = Yup.object().shape({
        name: Yup.string().min(5, "Enter minumum 5 characters").max(15, "Enter lessthen 20 characters").required("Name"),
        work: Yup.string().min(5, "Enter minumum 5 characters").max(25, "Enter less then 25 characters").required("Work"),

    })
    let { initialValues, values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            work: "",
            method: "add",
            id: null
        },
        validationSchema: validationYup,
        onSubmit: (val) => {
            setloder(true)

            if (val.method == "add") {
                fetch(`${api}/employee/add`, {
                    method: "POST",
                    body: JSON.stringify({ name: val.name, work: val.work }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(dt => {
                    setloder(false)
                    setadd(false)
                    getItem()


                })
            } else {
                fetch(`${api}/employee/edit`, {
                    method: "PUT",
                    body: JSON.stringify({ name: val.name, work: val.work, id: val.id }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(res => {
                    if (res.status == 200) {
                        setloder(false)
                        getItem()
                    }
                })
                setadd(false)
                setedit(false)

            }
        }
    })
    function edit_button(name, work, id) {
        values.name = name;
        values.work = work;
        values.id = id
        values.method = "edit"
    }
    return (
        <div className="table home_table">
            <div className="table_icons">
                {add ? <> <IconButton > <CheckIcon onClick={handleSubmit} className='table_icons_add' /></IconButton>
                    <IconButton > <ClearIcon onClick={() => setadd(false)} className='table_icons_clear' /></IconButton></> : <IconButton onClick={() => setadd(true)}> <AddIcon onClick={() => {
                        values.name = "";
                        values.work = "";
                        values.method = "add"
                    }} className='table_icons_add' /></IconButton>}



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
                            <th>Name</th>
                            <th>Work</th>

                            {edit ? <th>Tools</th> : null}
                        </tr>

                    </thead>
                    <tbody className='home_table_tbody' >
                        {
                            table.map((val, ind) => {
                                return (
                                    <tr>
                                        <td>{ind + 1}</td>
                                        <td onClick={() => setedit(!edit)} className="name">{val.name}</td>
                                        <td>{val.work}</td>
                                        {edit ? <td className='home_table_tbody-icons' > <EditIcon className='edit-icon' onClick={() => {
                                            setadd(true);
                                            edit_button(val.name, val.work, val._id)
                                        }} /><DeleteIcon onClick={() => deleteitem(val._id)} className='delete-icon' /></td> : null}

                                    </tr>
                                )
                            })
                        }
                        {
                            add ? <tr>

                                <td>{table.length + 1}</td>
                                <td><TextField id="standard-basic" value={values.name} label={errors.name ? errors.name : "Name"} color={errors.name ? "error" : "primary"} name="name" onChange={handleChange} variant="standard" /></td>
                                <td><TextField id="standard-basic" value={values.work} label={errors.work ? errors.work : "Work"} color={errors.work ? "error" : "primary"} variant="standard" type="text" name="work" onChange={handleChange} /></td>



                            </tr> : null
                        }
                        {

                        }
                    </tbody>
                </Table>
            </form>
        </div>
    )
}

