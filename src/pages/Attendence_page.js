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

export function Attendence() {
    let [attendence, setattendence] = useState(null)
    let [place, setplace] = useState(null)
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

        let data = fetch(api).then(dt => dt.json()).then(res => settable(res))

    }, [])
    const [date, setdate] = useState(new Date())
    console.log();
    function sendData() {
        let arr = []
        for (let i = 1; i < tableRef.current.rows.length; i++) {
            let obj = {
                name: tableRef.current.rows[i].cells[1].innerText.toLowerCase(),
                attendence: tableRef.current.rows[i].cells[2].innerText,
                place: tableRef.current.rows[i].cells[3].innerText,
                work: tableRef.current.rows[i].cells[4].innerText,
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            }
            arr.push(obj);
        }
        fetch(`${api}/attendence`, {
            method: "POST",
            body: JSON.stringify(arr),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => console.log(res))
        console.log(arr);
    }

    return (
        <div className="attendence_page">
            <div className="attendence_page_table">
                <div className="attendence_page_table_icons">

                    <div >
                        <DatePicker placeholderText=" Select Date" minDate={new Date()} showIcon isClearable selected={date} dateFormat="dd/MM/yyyy" onChange={setdate} />

                    </div>
                    <IconButton > <CheckIcon className='attendence_page_table_icons_add' onClick={() => sendData()} /></IconButton>
                </div>
                <Table striped bordered hover ref={tableRef}>

                    <thead text="dark" >
                        <tr>

                            <th>No</th>
                            <th>Name</th>
                            <th>Attendence</th>
                            <th>Place</th>
                            <th>Work</th>

                        </tr>

                    </thead>
                    <tbody className="attendence_page_table-tbody">

                        {table.map((val, ind) => {
                            return (
                                <tr>
                                    <td>{ind + 1}</td>
                                    <td>{val.name}</td>
                                    <td className="attendence">
                                        <div className="attendence_dropdown" onClick={() => setattendence(attendence == ind ? null : ind)}>
                                            <span style={{ color: "#42a5f5" }}>Present</span>
                                            <KeyboardArrowDownIcon />
                                            {
                                                attendence === ind ? <div className="attendence_dropdown_menus" >
                                                    <p onClick={(e) => domManipulation(e.target.innerText)} ref={dom} className="present">Present</p>
                                                    <p onClick={(e) => domManipulation(e.target.innerText)} ref={dom} className="absent">Absent</p>
                                                </div> : null
                                            }
                                        </div>


                                    </td>

                                    <td className="attendence" onClick={() => setplace(place == ind ? null : ind)}><span>banglore</span><KeyboardArrowDownIcon />
                                        {
                                            place === ind ? <div className="attendence_dropdown_menus" >
                                                <p onClick={(e) => domManipulation(e.target.innerText)} ref={dom} >banglore</p>
                                                <p onClick={(e) => domManipulation(e.target.innerText)} ref={dom}>hosur</p>
                                            </div> : null
                                        }
                                    </td>



                                </tr>

                            )
                        })}

                    </tbody>
                </Table>

            </div>
        </div>
    )
}