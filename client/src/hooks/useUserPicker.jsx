import React, { useState } from "react";

const useUserPicker = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectedUser = (e) => {
    setSelectedUser(e.value);
  };

  const clearUserPicker = () => setSelectedUser(null);

  return { selectedUser, handleSelectedUser, clearUserPicker };
};

export default useUserPicker;
