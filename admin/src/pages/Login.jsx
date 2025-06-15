import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";
import { toast } from "sonner";


const Login = () => {
    const [seePassword, setSeePassword] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSeePassword = () => {
        setSeePassword(!seePassword);
    };

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(login({
                    user: res.data.admin,
                    // role: res.data.admin.role,
                }))
                
                toast.success(res.data.message)
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50 p-5"
        >
            <div className="flex flex-col gap-5 bg-white p-8 rounded-md shadow-md w-full max-w-sm">
                <div className="flex justify-center">
                    {/* <img
                        className="h-12 w-auto rounded-lg"
                        src="/Image.png"
                        alt="Logo"
                    /> */}
                    
                </div>
                <h1 className="text-xl font-semibold text-center text-[#3E2723]">
                    Admin Login
                </h1>

                <div>
                    <TextField
                        name="email"
                        value={input.email}
                        onChange={inputHandler}
                        label="Email"
                        variant="standard"
                        className={`${"w-full"}`}
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: "#F37736",
                            },
                            "& .MuiInput-underline:hover:before": {
                                borderBottomColor: "#F37736",
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: "#F37736",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#F37736",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#F37736",
                            },
                        }}
                    />
                </div>
                <div className="flex relative">
                    <TextField
                        name="password"
                        label="Password"
                        variant="standard"
                        className="w-full"
                        type={seePassword ? "text" : "password"}
                        value={input.password}
                        onChange={inputHandler}
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: "#F37736",
                            },
                            "& .MuiInput-underline:hover:before": {
                                borderBottomColor: "#F37736",
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: "#F37736",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#F37736",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#F37736",
                            },
                        }}
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-[#3E2723]">
                        <VisibilityOutlinedIcon
                            onClick={handleSeePassword}
                            className={`text-[#575757] ${
                                seePassword ? "" : "hidden"
                            }`}
                            style={{ fontSize: 20 }}
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    sx={{
                        "&:hover": {
                            backgroundColor: "#F37736",
                            color: "white",
                        },
                        color: "#F37736",
                        marginTop: "1rem",
                    }}
                >
                    Login
                </Button>
            </div>
        </form>
    );
};

export default Login;
