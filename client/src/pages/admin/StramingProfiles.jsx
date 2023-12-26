import React from "react";
import StreamingProfilesTable from "../../components/StramingProfilesTable.jsx";
import { useStreamingContext } from "../../context/stramingContext.jsx";
import OptionsTab from "../../components/OptionsTab.jsx";

const StreamingProfiles = () => {
  const { accounts, profiles, filterExpiredProfiles, resetProfiles } =
    useStreamingContext();

  console.log(accounts);

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

  return (
    <div className="w-full flex flex-col gap-y-4">
      <OptionsTab />
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
