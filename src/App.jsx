import React from "react";
import { Route, Routes } from "react-router-dom";

// imported from pages
import Home from "./pages/Home/Home.jsx";
import CreateCampaign from "./pages/CreateCampaign/CreateCampaign.jsx";
import Profile from "./pages/Profile/Profile.jsx";

//imported from components
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { DisplayCampaigns } from "./components/index.js";
import CampaignDetails from "./pages/CampaignDetails/CampaignDetails.jsx";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-amber-700 min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar></Sidebar>
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/display-campaign/" element={<DisplayCampaigns />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
