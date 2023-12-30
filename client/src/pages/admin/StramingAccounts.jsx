import React from "react";
import { useStreamingContext } from "../../context/stramingContext.jsx";
import StreamingAccountTable from "../../components/StreamingAccountTable.jsx";
import OptionsTab from "../../components/OptionsTab.jsx";

const StreamingAccounts = () => {
  const { accounts } = useStreamingContext();

  const getFormattedDate = (date) => {
    if (!date) return;
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
      <StreamingAccountTable dataTable={formattedAccounts} />
    </div>
  );
};

export default StreamingAccounts;
