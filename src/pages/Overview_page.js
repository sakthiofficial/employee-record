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
    function getData(name, date) {
        console.log("Iam CLicked");
        fetch(`${api}/attendence/month/list`, {
            method: "PUT",
            body: JSON.stringify({ name: name, month: date.getMonth(), year: date.getFullYear() }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(dt => dt.json()).then(val => settable(val))
    }



    return (
        <div className="overview_page">
            <div className="table">
                <div className="overview_page_icons">
                    <div className="overview_page_icons-name">
                        <p>Name :</p>
                        <div className="dropdown"><input value={inputVal} type="text" onClick={() => {
                            setinputVal("")
                            setshow(true)
                        }} onChange={(e) => setinputVal(e.target.value)} />
                            {show ? inputVal == "" || inputVal ? <div className="dropdown_menus">
                                {
                                    name.length > 0 ? name.filter(((val) => inputVal == "" ? val.name : val.name.includes(inputVal))).map(val => {
                                        return (
                                            <p onClick={() => {
                                                setinputVal(val.name)
                                                setshow(false)
                                            }
                                            }>{val.name}</p>
                                        )
                                    }) : null
                                }
                            </div> : null : null}
                        </div>

                    </div>
                    <div style={{
                        display: "flex", alignItems: "center"
                    }}>
                        <DatePicker dateFormat={"MM/yyyy"} selected={date} onChange={date => setdate(date)} maxDate={new Date()} placeholderText=" Select Date & Year" isClearable />
                        <IconButton > <CheckIcon className='attendence_page_table_icons_add' onClick={() => getData(inputVal, date)} /></IconButton>

                    </div>




                </div>
                <Table striped bordered hover onClick={() => inputVal == "" ? setshow(false) : null}>

                    <thead text="dark">
                        <tr>
                            <th>Date</th>
                            <th>Attendence</th>
                            <th>Place</th>
                            <th>Work</th>
                        </tr>

                    </thead>
                    <tbody>
                        {table.map((val, ind) => {
                            return (
                                <tr key={`overview-tr-${ind}`}>
                                    <td>{val.date}</td>
                                    <td>{val.attendence}</td>
                                    <td>{val.place}</td>
                                    <td>{val.work}</td>                           </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}