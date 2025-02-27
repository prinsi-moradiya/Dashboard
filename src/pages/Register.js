import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, TextField, Button, Typography, Box, RadioGroup, 
  FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem, 
  Checkbox, FormGroup, IconButton, InputAdornment, Avatar 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    qualification: "",
    hobbies: [],
    termsAccepted: false,
    profileImage: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "termsAccepted") {
      setFormData((prev) => ({ ...prev, termsAccepted: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, name]
          : prev.hobbies.filter((hobby) => hobby !== name),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    users.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" variant="outlined" margin="normal" value={formData.name} onChange={handleChange} required />
          <TextField fullWidth label="Email" name="email" type="email" variant="outlined" margin="normal" value={formData.email} onChange={handleChange} required />
          <TextField 
            fullWidth 
            label="Password" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            variant="outlined" 
            margin="normal" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField fullWidth label="Address" name="address" multiline rows={3} variant="outlined" margin="normal" value={formData.address} onChange={handleChange} required />
          
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>Qualification</FormLabel>
            <Select name="qualification" value={formData.qualification} onChange={handleChange}>
              <MenuItem value="highschool">High School</MenuItem>
              <MenuItem value="bachelor">Bachelor's</MenuItem>
              <MenuItem value="master">Master's</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Hobbies</FormLabel>
            <FormGroup row>
              <FormControlLabel control={<Checkbox name="reading" onChange={handleCheckboxChange} />} label="Reading" />
              <FormControlLabel control={<Checkbox name="traveling" onChange={handleCheckboxChange} />} label="Traveling" />
              <FormControlLabel control={<Checkbox name="sports" onChange={handleCheckboxChange} />} label="Sports" />
            </FormGroup>
          </FormControl>

          {/* Image Upload */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="profileImage" />
            <label htmlFor="profileImage">
              <Button variant="contained" component="span">Upload Image</Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <Avatar src={imagePreview} sx={{ width: 100, height: 100, margin: "auto" }} />
              </Box>
            )}
          </Box>

          <FormControlLabel control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleCheckboxChange} />} label="I accept the terms and conditions" sx={{ mt: 2 }} />
          
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>Register</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
