import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    gender: "",
    qualification: "",
    hobbies: [],
    profileImage: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      alert("No user logged in!");
      navigate("/login");
    }
  }, [navigate]);

  //  Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle Hobbies Checkbox
  const handleHobbiesChange = (e) => {
    const { value, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      hobbies: checked
        ? [...prevUser.hobbies, value]
        : prevUser.hobbies.filter((hobby) => hobby !== value),
    }));
  };

  // Handle Profile Update (including image)
  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // 🔹 Update user in registeredUsers list
    users = users.map((u) => (u.email === user.email ? { ...u, ...user } : u));

    // Save updated data to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Profile Updated Successfully!");
    navigate("/dashboard");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Update Profile
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Avatar src={user.profileImage} sx={{ width: 80, height: 80, mb: 1 }} />
          <Button variant="contained" component="label">
            Change Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={user.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={user.email}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            name="address"
            multiline
            rows={3}
            fullWidth
            value={user.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row name="gender" value={user.gender} onChange={handleChange}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel>Qualification</FormLabel>
            <Select name="qualification" value={user.qualification} onChange={handleChange}>
              <MenuItem value="High School">High School</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="Bachelor's">Bachelor's</MenuItem>
              <MenuItem value="Master's">Master's</MenuItem>
            </Select>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Hobbies</FormLabel>
            <FormControlLabel
              control={<Checkbox checked={user.hobbies.includes("Reading")} onChange={handleHobbiesChange} value="Reading" />}
              label="Reading"
            />
            <FormControlLabel
              control={<Checkbox checked={user.hobbies.includes("Traveling")} onChange={handleHobbiesChange} value="Traveling" />}
              label="Traveling"
            />
            <FormControlLabel
              control={<Checkbox checked={user.hobbies.includes("Music")} onChange={handleHobbiesChange} value="Music" />}
              label="Music"
            />
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Update Profile
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProfile;
