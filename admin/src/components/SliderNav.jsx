import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "@/store/screenSlice";
import { logout } from "@/store/userSlice";

const SliderNav = () => {
    const [ mode, setMode ] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const rmode = useSelector((store) => store.screen.mode)

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/admin/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(logout())
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const modeHandler = (e) => {
        e.preventDefault();
        setMode(!mode)
        dispatch(changeMode({ mode: mode}))
    }

    // useEffect(() => {
    //     const getProduct = async () => {
    //         try {
    //             const res = await axios.get(
    //                 `http://localhost:5000/product/all`,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     withCredentials: true,
    //                 }
    //             );
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getProduct();
    // }, []);

    return (
        <div className={`${ rmode ? "bg-gray-900 text-white": "bg-white"} flex flex-col justify-between w-16 lg:w-52 lg:px-2 shadow-lg rounded-md`}>
            <div className="flex flex-col">
                <Link to="/dashboard">
                    <img
                        src="/Image.png"
                        alt=""
                        className="h-8 w-12 rounded-md my-3 mx-1 lg:w-20 lg:h-12"
                    />
                </Link>
                <hr className="mb-2" />

                <div className="flex flex-col gap-y-8 mt-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center justify-center gap-2 lg:justify-start lg:ml-2"
                    >
                        <img
                            src="/dashboard.png"
                            alt=""
                            height={16}
                            width={16}

                        />
                        <span className="hidden lg:block underline-offset-4 hover:underline  font-semibold">
                            Dashboard
                        </span>
                    </Link>
                    <Link
                        to="/order"
                        className="flex items-center justify-center gap-2 lg:justify-start lg:ml-1"
                    >
                        <img src="/order.png" alt="" height={24} width={24} />
                        <span className="hidden lg:block underline-offset-4 hover:underline  font-semibold">
                            Orders
                        </span>
                    </Link>
                    <Link
                        to="/product"
                        className="flex items-center justify-center gap-2 lg:justify-start lg:ml-1"
                    >
                        <img src="/box.png" alt="" height={24} width={24} />
                        <span className="hidden lg:block underline-offset-4 hover:underline  font-semibold">
                            Products
                        </span>
                    </Link>
                    <Link
                        to="/transaction"
                        className="flex items-center justify-center gap-2 lg:justify-start lg:ml-1"
                    >
                        <img src="/bill.png" alt="" height={24} width={24} />
                        <span className="hidden lg:block underline-offset-4 hover:underline  font-semibold">
                            Transactions
                        </span>
                    </Link>
                    <Link
                        to="/setting"
                        className="flex items-center justify-center gap-2 lg:justify-start lg:ml-2"
                    >
                        <img
                            src="/settings.png"
                            alt=""
                            height={20}
                            width={20}
                        />
                        <span className="hidden lg:block underline-offset-4 hover:underline font-semibold">
                            Settings
                        </span>
                    </Link>
                </div>
            </div>
            <div className="mb-3">
            <Button className={`${ !rmode ? " text-black" : "text-white"}`} onClick={modeHandler} variant="link">
                    <img src="/night.png" alt="" height={22} width={22} />
                    <span className="hidden lg:block">Dark Mode</span>
                </Button>
                <hr className="my-3" />
                <Button className={`${ !rmode ? " text-black" : "text-white"}`} onClick={logoutHandler} variant="link">
                    <img src="/logout.png" alt="" height={22} width={22} />
                    <span className="hidden lg:block">Logout</span>
                </Button>
            </div>
        </div>
    );
};

export default SliderNav;
