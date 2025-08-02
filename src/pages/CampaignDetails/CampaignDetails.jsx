import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../../context";
import { CustomButton, Loader } from "../../components";
import { calculateBarPercentage, daysLeft } from "../../utils";
import { thirdweb } from "../../assets";

import CountBox from "../../components/CountBox/CountBox";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state);
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    console.log(await contract.call("getDonators", [state.pId]));
    setDonators(data);
  };

  useEffect(() => {
    // const fetchDonators = async () => {
    //   const data = await getDonations(pId);
    //   setDonators(data); // `donators` is the state
    // };
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    await fetchDonators();
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-[10px] gap-[30px] ">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl "
          />
          <div className="relative w-full h-[7px] bg-[#3a3a43] mt-2 rounded-full">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[20px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[10px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white bg-[#1c1c24] rounded-t-[10px] text-center truncate p-4">
              Creator
            </h4>
            <div className=" flex flex-row px-5 py-3 justify-evenly items-center flex-wrap gap-[14px]  bg-[#2c2f32] rounded-b-[10px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="User"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold  text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white bg-[#1c1c24] rounded-t-[10px] text-center truncate p-4">
              Story
            </h4>
            <div className=" flex flex-row px-5 justify-evenly items-center flex-wrap gap-[14px]  bg-[#2c2f32] rounded-b-[10px]">
              <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] p-5 leading-[26px]">
                {state.description}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white bg-[#1c1c24] rounded-t-[10px] text-center truncate p-4">
              Donators
            </h4>
            <div className=" flex flex-row px-5 justify-evenly items-center flex-wrap gap-[14px]  bg-[#2c2f32] rounded-b-[10px] p-5">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex-justify-between
                    items-center"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                      {index + 1}. {item.donator}. {item.donation} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] p-5 leading-[26px]">
                  No donators yet be the donator!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white bg-[#1c1c24] rounded-t-[10px] text-center truncate p-4">
            Fund
          </h4>

          <div className="] flex flex-col p-4 bg-[#3e3e4b] ">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-black">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] text-center sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-amber-100"
                name=""
                id=""
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="mt-[20px] p-4 bg-[#13131a] rounded-t-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilouge font-normal leading-[22px] text-amber-200">
                  Support the project if it piqued your interest
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-amber-600 rounded-t-0 rounded-b-[10px]"
                handleClick={handleDonate}
              ></CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
