import React from "react";
import { useSelector } from "react-redux";

const InfoCard = ({ title, detail, icon }) => {
    const {mode} = useSelector((store) => store.screen)
    return (

        <div className={`${ mode ? "bg-gray-900 text-white" : "bg-white"} p-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex items-center gap-4`}>
            {/* Icon Container */}
            <div className="rounded-full bg-blue-100 p-3 shadow-md hover:shadow-lg transition-shadow duration-200">
                <img src={icon} alt="" height={35} width={35} />
            </div>

            {/* Info Text */}
            <div className="flex flex-col justify-center">
                <h3 className="text-sm opacity-60">{title}</h3>
                <p className="text-xl font-bold">{detail}</p>
            </div>
        </div>
    );
};

export default InfoCard;
