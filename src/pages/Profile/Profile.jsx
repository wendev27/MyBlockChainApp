import React, { useState, useEffect } from "react";

import { useStateContext } from "../../context";
import DisplayCampaigns from "../../components/DisplayCampaigns/DisplayCampaigns";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
    // <div> // ai code
    //   {isLoading ? (
    //     <p>Loading campaigns...</p>
    //   ) : (
    //     <ul>
    //       {campaigns.map((c, i) => (
    //         <li key={i}>{c.title}</li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
};

export default Profile;
