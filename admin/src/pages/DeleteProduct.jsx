import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading } from "@/store/loadingSlice";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { SheetClose } from "@/components/ui/sheet";

const DeleteProduct = ( { product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((store) => store.loading);
    

    const handleDelete = async () => {
        try {
            dispatch(setLoading(true));
            await axios.delete(`http://localhost:5000/product/delete/${product._id}`, {
                headers: {
                    "Content-Type": "application/json",
                }, withCredentials: true
            });
            toast.success("Product Deleted");
            navigate(0)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return loading ? (
        <Spinner />
    ) : (
        
                        <>
                            <div className="text-3xl font-bold text-center text-red-600 mb-6">
                                Delete Product
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="text-lg text-gray-700 mb-4">
                                    Are you sure you want to delete:{" "}
                                    <strong>{product?.title}</strong>?
                                </div>
                                <div className="text-sm text-gray-500 mb-6">
                                    This action cannot be undone. Once deleted,
                                    the Post will be deleted forever.
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleDelete}
                                        className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                    <SheetClose asChild>

                                    <button
                                        
                                        className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                    </SheetClose>
                                </div>
                            </div>
                        </>

    );
};

export default DeleteProduct;
