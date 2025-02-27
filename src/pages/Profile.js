import React, { useEffect, useState } from "react";
import { Container, Typography, Avatar, Box } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Profile Details</Typography>
      {user ? (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Avatar src={user.profileImage} sx={{ width: 120, height: 120, margin: "auto" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Address: {user.address}</Typography>
          <Typography>Gender: {user.gender}</Typography>
          <Typography>Qualification: {user.qualification}</Typography>
          <Typography>Hobbies: {user.hobbies.join(", ")}</Typography>
        </Box>
      ) : (
        <Typography>No user data found.</Typography>
      )}
    </Container>
  );
};

export default Profile;
