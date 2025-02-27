import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setUsers(storedUsers);
  }, []);

  // 🗑️ Function to Delete a User
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    alert("User deleted successfully!");
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        {/* 🔹 Header & Add User Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Dashboard - User Details</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
            Add User
          </Button>
        </Box>

        {users.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Profile</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell><strong>Gender</strong></TableCell>
                  <TableCell><strong>Qualification</strong></TableCell>
                  <TableCell><strong>Hobbies</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar src={user.profileImage} alt={user.name} />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.qualification}</TableCell>
                    <TableCell>{user.hobbies?.join(", ")}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 3 }}>
            No user data available. Click "Add User" to register a new user.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
