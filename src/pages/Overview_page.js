import { StructuredTable } from "../hoc/StructuredTable";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from "react";
import { api } from "../assets/api_Endpoint";

export function Overview() {
    const [table, settable] = useState([])
    const [name, setname] = useState([]);

    useEffect(() => {

        let data = fetch("http://localhost:4000/").then(dt => dt.json()).then(res => setname(res))

    }, [])
    let [date, setdate] = useState(new Date())
    let [inputVal, setinputVal] = useState(null)
    let [show, setshow] = useState(true)
    function getData(date) {

        if (date.getMonth()) {
            fetch(`${api}/attendence/month/list`, {
                method: "PUT",
                body: JSON.stringify({ month: date.getMonth(), year: JSON.stringify(date.getFullYear()) }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(dt => dt.json()).then(val => settable(val))
        };
    }
    useEffect(() => getData(date))


    return (
        <div className="overview_page">
            <div className="table">
                <div className="overview_page_icons">

                    <div style={{
                        display: "flex", alignItems: "center"
                    }}>
                        <DatePicker dateFormat={"MM/yyyy"} selected={date} onChange={date => {
                            date ? setdate(date) : setdate(new Date())
                        }} maxDate={new Date()} placeholderText=" Select Date & Year" />
                        <IconButton > <CheckIcon className='attendence_page_table_icons_add' onClick={() => getData(date)} /></IconButton>

                    </div>




                </div>
                <Table striped bordered hover onClick={() => inputVal == "" ? setshow(false) : null}>

                    <thead text="dark">
                        <tr>
                            <th>Date</th>
                            {name.map(val => {
                                return (
                                    <th>{val.name}</th>)
                            })}
                            <th>Work</th>
                        </tr>

                    </thead>
                    <tbody>
                        {table.map((val, ind) => {
                            return (
                                <tr key={`overview-tr-${ind}`}>
                                    <td>{val.date}</td>
                                    {name.map(tb => {
                                        if (val.present.includes(tb.name.toLowerCase())) {
                                            return (
                                                <td>{val.place}</td>
                                            )
                                        } else {
                                            return (
                                                <td style={{ color: "#d83f87" }}>Absent</td>
                                            )
                                        }
                                    })}
                                    <td>{val.work}</td>
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>

            </div>
        </div >
    )
}