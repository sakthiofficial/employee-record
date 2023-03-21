import { Input } from "@mui/icons-material";
import { StructuredTable } from "../hoc/StructuredTable";
import 'bootstrap/dist/css/bootstrap.min.css'
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useRef, useState } from "react";
import { Table } from 'react-bootstrap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { textAlign } from "@mui/system";
import { api } from "../assets/api_Endpoint";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
export function Attendence() {
    let [attendence, setattendence] = useState(null)
    let [inputVal, setinputVal] = useState("");
    let [holiday, setholiday] = useState(false)
    const [loder, setloder] = useState(true)
    let [hover, sethover] = useState(false)
    let navigate = useNavigate()

    let dom = useRef()
    let tableRef = useRef()
    function domManipulation(val) {

        if (val == "Present") {
            dom.current.parentElement.parentElement.childNodes[0].style.color = "#42a5f5"

        } else if (val == "Absent") {
            dom.current.parentElement.parentElement.childNodes[0].style.color = "#d83f87"

        }

        dom.current.parentElement.parentElement.childNodes[0].innerText = val

    }
    const [table, settable] = useState([]);
    useEffect(() => {


        let data = fetch(`${api}/${localStorage.getItem('username')}`).then(dt => dt.json()).then(res => {

            settable(res)
            setloder(false)
        })

    }, [])
    const [date, setdate] = useState(new Date())
    function sendData() {
        setloder(true)
        let arr = []
        for (let i = 1; i < tableRef.current.rows.length; i++) {
            console.log();
            let obj = {
                name: tableRef.current.rows[i].cells[1].innerText.toLowerCase(),
                attendence: tableRef.current.rows[i].cells[2].innerText,
                date: date.getDate(),
                month: date.getMonth(),
                work: tableRef.current.rows[i].cells[3].childNodes[0].value,
                year: date.getFullYear()
            }
            arr.push(obj);
        }
        fetch(`${api}/attendence/public/${localStorage.getItem('username')}`, {
            method: "POST",
            body: JSON.stringify(arr),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            if (res.status == 200) {
                setloder(false)
                navigate("/overview")
            } else {
                alert("Something Wrong")
            }
        })

    }

    return (
        <div className="attendence_page">
            <div className="attendence_page_table">
                <div className="attendence_page_table_icons">
                    <div style={{
                        display: "flex", alignItems: "center"
                    }} >
                        <DatePicker placeholderText="Select Date" minDate={new Date()} showIcon onChange={date => setdate(date)} selected={date} dateFormat="dd/MM/yyyy" />

                    </div>


                    <Button onClick={() => setholiday(true)}>Holiday</Button>

                </div>
                {
                    loder ? <div className="loder">
                        <RefreshIcon className='loder_icon' />
                    </div> : null
                }
                <Table striped bordered hover ref={tableRef}>

                    <thead text="dark" >
                        <tr>

                            <th>No</th>
                            <th>Name</th>
                            <th>Attendence</th>
                            <th>Work</th>

                        </tr>

                    </thead>
                    <tbody className="attendence_page_table-tbody">
                        {table.length == 0 ? <tr> <td colSpan="4" style={{ textAlign: "center" }}>Employee's were not <span onClick={() => navigate("/")} className="employee_add-btn">added</span></td> </tr> : table.map((val, ind) => {
                            return (
                                <tr>
                                    <td>{ind + 1}</td>
                                    <td>{val.name}</td>
                                    <td className="attendence">
                                        <div className="attendence_dropdown" onClick={() => setattendence(attendence == ind ? null : ind)}>
                                            <span style={{ color: holiday ? "#f9a825" : "#42a5f5" }}>{holiday ? "Holiday" : "Present"}</span>
                                            <KeyboardArrowDownIcon />
                                            {
                                                attendence === ind ? <div className="attendence_dropdown_menus" >
                                                    <p onClick={(e) => domManipulation(e.target.innerText)} ref={dom} className="present">Present</p>
                                                    <p onClick={(e) => domManipulation(e.target.innerText)} ref={dom} className="absent">Absent</p>
                                                </div> : null
                                            }
                                        </div>


                                    </td>


                                    <td>
                                        <input type="text" onChange={(e) => setinputVal(e.target.value)} />
                                    </td>



                                </tr>

                            )
                        })}

                    </tbody>
                </Table>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "end"
                }} >
                    <Button onClick={() => sendData()} variant="contained" onMouseOver={() => sethover(true)} onMouseOut={() => sethover(false)} className="holiday-btn"> {hover ? <CheckIcon className='attendence_page_table_icons_add' /> : "save"}  </Button>

                </div>

            </div>
        </div >
    )
}