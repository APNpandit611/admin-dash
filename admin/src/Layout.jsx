import React from "react";

import SliderNav from "./components/SliderNav";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
    const mode = useSelector((store)=> store.screen.mode)
    return (
        <div className={`${ mode ? "bg-gray-900 text-white" : "bg-white"} flex h-screen`}>
            <SliderNav/>

            <div className="w-full overflow-x-auto p-3">
                {children}
            </div>
        </div>
    );
};

export default Layout;
