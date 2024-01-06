import React from "react";
import StreamingProfilesTable from "../../components/StramingProfilesTable.jsx";
import { useStreamingContext } from "../../context/stramingContext.jsx";
import OptionsTab from "../../components/OptionsTab.jsx";
import Pill from "../../components/Pill.jsx";

const StreamingProfiles = () => {
  const { accounts, profiles, filterExpiredProfiles, resetProfiles } =
    useStreamingContext();

  const getFormattedDate = (date) => {
    return date.split("T")[0];
  };

  const formattedAccounts = accounts.map((account) => {
    return {
      ...account,
      perfiles: account.perfiles.map((perfil) => {
        return {
          ...perfil,
          vencimiento: getFormattedDate(perfil?.vencimiento),
        };
      }),
    };
  });

  const getNumbersPerfils = (data) => {
    return data.reduce((acc, current) => {
      acc[current.renovacion] = (acc[current.renovacion] || 0) + 1;
      return acc;
    }, {});
  };

  return (
    <div className="w-full flex flex-col gap-y-4 justify-center">
      <OptionsTab />
      <div className="flex flex-row gap-x-4">
        {Object.entries(getNumbersPerfils(profiles)).map(([key, value]) => (
          <Pill name={key} value={value} />
        ))}
      </div>
      <StreamingProfilesTable
        accountsData={formattedAccounts}
        profilesData={profiles}
        filterProfiles={filterExpiredProfiles}
        resetProfiles={resetProfiles}
      />
    </div>
  );
};

export default StreamingProfiles;
