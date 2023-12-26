import React from "react";
import StreamingAccountTable from "../../components/StreamingAccountTable.jsx";
import StreamingProfilesTable from "../../components/StramingProfilesTable.jsx";
import { useStreamingContext } from "../../context/stramingContext.jsx";
import { Link } from "react-router-dom";

function StreamingProfiles() {
  const { accounts, profiles } = useStreamingContext();

  return (
    <div className="flex flex-col gap-y-4">
      <Link
        to="/streaming/accounts"
        className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
        Ir a cuentas
      </Link>
      <StreamingProfilesTable dataTable={profiles} />
    </div>
  );
}

export default StreamingProfiles;
