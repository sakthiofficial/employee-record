import { Table } from 'react-bootstrap';

export function StructuredTable({ table }) {
    return (
        <Table striped bordered hover>

            <thead text="dark">
                <tr>
                    {table.th.map(val => {
                        return (
                            <th>{val}</th>

                        );
                    })}
                </tr>

            </thead>
            <tbody>
                {table.tr.map(val => {
                    return (
                        <tr>
                            {val.map(ch => {
                                return (
                                    <td>{ch}</td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
