import { Box, Button } from "@mui/material";
import React, { useState } from "react";

type UserAddress = {
  district: string;
  place: string;
  pincode: number;
};
type User = {
  name: string;
  age: number;
  hobbies: string[];
  address: UserAddress;
};
const LearnTs = () => {
  const [users, setUsers] = useState<User>();
  const count: number = 0;
  // console.log(users, count);
  const user: User = {
    name: "abin",
    age: 10,
    hobbies: ["reading"],
    address: {
      district: "calicut",
      pincode: 673523,
      place: "maniyur",
    },
  };
  user.age = 12;

  const handleSubmit = () => {
    setUsers(user);
    handleAlert("alan");
  };
  const handleAlert = (names: string) => {
    alert(names);
  };

  return (
    <Box>
      <Button onClick={handleSubmit}>Apply</Button>
    </Box>
  );
};

export default LearnTs;
