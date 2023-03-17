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
    let [inputVal, setinputVal] = useState(null)
    let arr = []
    let [date, setdate] = useState(new Date())

    useEffect(() => {

        fetch(`${api}/${localStorage.getItem('username')}`).then(dt => dt.json()).then(res => {
            setname(res)
            fetch(`${api}/attendence/public//month/list/${localStorage.getItem('username')}`, {
                method: "PUT",
                body: JSON.stringify({ name: res[0].name, month: date.getMonth(), year: date.getFullYear() }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(dt => dt.json()).then(val => {
                settable(val)
                setinputVal(res[0].name)


            })
        });


    }, [])
    if (table.length > 0) {
        for (let i = 1; i <= month(date.getMonth()); i++) {
            let res = is_check(i, date.getMonth(), table)

            if (res > 0) {
                arr.push(table[res - 1])
            } else {

                arr.push(i)


            }
            // if (!res) {
            // }
            // arr.push(i)

        }
    }

    let [show, setshow] = useState(false);

    function getData(name, date) {
        fetch(`${api}/attendence/public/month/list/${localStorage.getItem('username')}`, {
            method: "PUT",
            body: JSON.stringify({ name: name, month: date.getMonth(), year: date.getFullYear() }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(dt => dt.json()).then(val => {
            settable(val)

        })
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
                            {show ? <div className="dropdown_menus">

                                {
                                    name.length > 0 ? name.filter(((val) => inputVal == "" ? val.name : val.name.includes(inputVal))).map((val, ind) => {
                                        return (
                                            <p onClick={() => {
                                                setinputVal(val.name)
                                                setshow(false)
                                            }

                                            } key={
                                                "p" + ind}>{val.name}</p>
                                        )
                                    }) : null
                                }
                            </div> : null}
                        </div>
                        {


                        }
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
                            <th>Work</th>
                        </tr>

                    </thead>
                    <tbody>
                        {table.length == 0 ? <tr> <td colSpan="4" style={{ textAlign: "center" }}>No entry's on the current month</td> </tr> : arr.map((val, ind) => {
                            return (

                                <tr key={`overview-tr-${ind}`}>
                                    {val.date ?
                                        <>
                                            <td >{val.date}</td>
                                            <td style={{ color: val.attendence.toLowerCase() == "present" ? "#42a5f5" : val.attendence.toLowerCase() == "holiday" ? "#f9a825" : "#d83f87" }}>{val.attendence}</td>
                                            <td> {val.work}</td>
                                        </>

                                        : <><td style={{ backgroundColor: "#e6e6e6" }}>{val}</td>
                                            <td colSpan="2" style={{ textAlign: "center", wordSpacing: "1rem", backgroundColor: "#e6e6e6", color: "#9e9e9e" }}>No entry's on the date </td>
                                        </>}

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}
// arr.map(val => {
//     if (is_check(val, table)) {
//         return (
//             <tr key={`overview-tr-${ind}`}>
//                 <td>{table[val].date}</td>
//                 <td style={{ color: table[val].attendence.toLowerCase() == "present" ? "#42a5f5" : "#d83f87" }}>{table[val].attendence}</td>
//                 <td>{table[val].work}</td>                           </tr>
//         )
//     } else {
//         return (
//             <tr>
//                 <td colSpan="4" style={{ textAlign: "center" }}>No entry's on the current date</td> </tr>

//         )
//     }
// })
// })}
function month(month, year) {
    switch (month) {
        case 0:
            return 31
        case 1:
            if (year % 4 == 0) {
                return 29
            } else {
                return 28
            }
        case 2:
            return 31

        case 3:
            return 30
        case 4:
            return 31
        case 5:
            return 30
        case 6:
            return 31
        case 7:
            return 31
        case 8:
            return 30
        case 9:
            return 31
        case 10:
            return 30
        case 11:
            return 31


    }
}
function is_check(val, m, arr) {
    for (var i = 1; i < month(m); i++) {
        if (arr[i - 1]) {
            if (arr[i - 1].date == val) {

                return i
            }
        }
    }
    return false

}