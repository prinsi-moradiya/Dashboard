import React from "react";
import { Table, Button } from "react-bootstrap";


const EmployeeTable = ({ employees, handleShow, handleDelete, currentPage, setCurrentPage, recordsPerPage }) => {
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(employees.length / recordsPerPage);

  return (
    <>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1 + indexOfFirstRecord}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShow(employee)}>Edit</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(index + indexOfFirstRecord)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      </div>
    </>
  );
};

export default EmployeeTable;