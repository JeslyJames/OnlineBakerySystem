import React, { useState, useContext } from "react";
import {
  TextField,
  MenuItem,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import { UserContext } from "./UserContext";

function CustomizedCakes() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    cakeShape: "",
    spongeFlavor: "Chocolate",
    filling: "Fresh Cream",
    eggFree: false,
    file: null,
    message: "",
    promotionalOffers: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "radio") {
      if (name === "eggFree" || name === "promotionalOffers") {
        setFormData((prev) => ({
          ...prev,
          [name]: value === "Yes", // Convert "Yes" to true and "No" to false
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || Object.keys(user).length < 1) {      
      setMessage("You must be logged in to customize a cake.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/saveCustomizedCake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, fullName: user?.name, email: user?.email, userId: user.id }),
      });
      const result = await response.json();
      console.log(formData, user);

      if (response.ok) {
        setMessage(result.message || "Form submitted successfully!");
      } else {
        setMessage(
          result.error || "Failed to submit the form. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#f9f2ed] p-8 min-h-screen">
      {message !==
      "Your cake customization has been submitted. Our customer representative will contact you within 24 hours." ? (
        <div className="max-w-3xl mx-auto bg-white p-10 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            DESIGN YOUR CAKE
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                name="fullName"
                label="Full Name"
                required
                variant="outlined"
                fullWidth
                value={formData.fullName || user && user.name}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Email"
                required
                variant="outlined"
                fullWidth
                value={formData.email || user && user.email}
                onChange={handleChange}
                error={
                  !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) &&
                  formData.email !== ""
                }
                helperText={
                  !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) &&
                  formData.email !== ""
                    ? "Enter a valid email address"
                    : ""
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                name="phone"
                label="Phone"
                placeholder="e.g., +1 (123) 456-7890"
                variant="outlined"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                error={
                  !/^\+?[0-9\s-()-]{10,15}$/.test(formData.phone) &&
                  formData.phone !== ""
                }
                helperText={
                  !/^\+?[0-9\s-()-]{10,15}$/.test(formData.phone) &&
                  formData.phone !== ""
                    ? "Enter a valid phone number"
                    : ""
                }
              />
              <TextField
                name="date"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                name="cakeShape"
                select
                label="Please select your photo cake shape"
                variant="outlined"
                fullWidth
                value={formData.cakeShape}
                onChange={handleChange}
              >
                <MenuItem value="Round">Round</MenuItem>
                <MenuItem value="Square">Square</MenuItem>
                <MenuItem value="Heart">Heart</MenuItem>
              </TextField>
              <TextField
                name="spongeFlavor"
                select
                label="Select sponge flavour"
                variant="outlined"
                fullWidth
                value={formData.spongeFlavor}
                onChange={handleChange}
              >
                <MenuItem value="Chocolate">Chocolate</MenuItem>
                <MenuItem value="Vanilla">Vanilla</MenuItem>
                <MenuItem value="Red Velvet">Red Velvet</MenuItem>
              </TextField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextField
                name="filling"
                select
                label="Select Filling"
                variant="outlined"
                fullWidth
                value={formData.filling}
                onChange={handleChange}
              >
                <MenuItem value="Fresh Cream">Fresh Cream</MenuItem>
                <MenuItem value="Chocolate Ganache">Chocolate Ganache</MenuItem>
                <MenuItem value="Buttercream">Buttercream</MenuItem>
              </TextField>
              <FormControl>
                <FormLabel>Egg free?</FormLabel>
                <RadioGroup
                  row
                  name="eggFree"
                  value={formData.eggFree ? "Yes" : "No"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="mb-4">
              <Button variant="outlined" component="label">
                Choose File
                <input type="file" hidden name="file" onChange={handleChange} />
              </Button>
              <span className="text-sm text-gray-500 ml-2">No file chosen</span>
            </div>

            <div className="mb-4">
              <TextField
                name="message"
                label="Enter Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <FormControl>
                <FormLabel>
                  I Wish To Accept Promotional Offers From Cutie Pie
                </FormLabel>
                <RadioGroup
                  row
                  name="promotionalOffers"
                  value={formData.promotionalOffers ? "Yes" : "No"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#d3d3d3", color: "#333" }}
            >
              Submit
            </Button>
          </form>

          {message && <p className="text-sm text-green-600 mt-4">{message}</p>}

          <p className="text-sm text-gray-600 mt-4">
            We'll be in touch as soon as possible. If you have any questions or
            need immediate information we're here to help! Our hours of
            operation are daily from 8am - 6pm.
          </p>
        </div>
      ) : (
        <Box
          sx={{
            backgroundColor: "#e0f7fa", // Light teal background
            color: "#004d40", // Dark teal text
            padding: "16px",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" component="h4">
            {message}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default CustomizedCakes;
