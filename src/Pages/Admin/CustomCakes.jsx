import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CustomCakes = () => {
  const [cakes, setCakes] = useState([]);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    fetchCustomizedCakes();
  }, []);

  const fetchCustomizedCakes = async () => {
    const response = await fetch(
      "http://localhost:4000/admin/product/customized-cakes",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.success) setCakes(data.products);
  };

  return (
    <Box className="p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      <Typography
        variant="h4"
        className="text-center mb-6 font-semibold text-gray-700"
      >
        Customized Cakes Management
      </Typography>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Full Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Cake Shape
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Sponge Flavor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Filling
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Egg Free
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className="font-bold">
                  Order Date
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cakes.map((cake) => (
              <TableRow key={cake._id.$oid}>
                <TableCell>{cake.fullName}</TableCell>
                <TableCell>{cake.email}</TableCell>
                <TableCell>{cake.phone}</TableCell>
                <TableCell>{cake.cakeShape}</TableCell>
                <TableCell>{cake.spongeFlavor}</TableCell>
                <TableCell>{cake.filling}</TableCell>
                <TableCell>{cake.eggFree ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {new Date(cake.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomCakes;
