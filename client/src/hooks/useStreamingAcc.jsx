import React, { useEffect, useState } from "react";

const useStreamingAcc = ({ initialProfiles }) => {
  const [profiles, setProfiles] = useState([{}]);
  console.log(profiles);

  const addProfile = () => {
    setProfiles((prev) => [...prev, {}]);
  };

  const removeProfile = (perfil) => {
    setProfiles((prev) =>
      prev.filter((profiles) => profiles.perfil !== perfil.perfil)
    );
  };

  const removeLastProfile = () => {
    setProfiles((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (!initialProfiles) {
      setProfiles([]);
    } else {
      setProfiles(initialProfiles);
    }
  }, []);

  return { profiles, addProfile, removeLastProfile, removeProfile };
};

export default useStreamingAcc;
