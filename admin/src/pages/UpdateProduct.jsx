import React, { useEffect, useRef, useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "@/store/loadingSlice";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner";

const UpdateProduct = ({ productId }) => {
    const initialState = {
        title: "",
        model: "",
        price: 0,
        stock: 0,
        description: "",
        images: [],
        brand: "",
        compatibleBrands: [],
        feature: [
            {
                title: "",
                detail: "",
            },
        ],
    };
    const [input, setInput] = useState(initialState);
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.loading);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/product/${productId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setInput(res.data.product);
            } catch (error) {
                console.log(error);
                toast(error.res.data.message);
            }
        };
        getProduct();
    }, [productId, dispatch]);

    const addFeature = () => {
        setInput({
            ...input,
            feature: [...input.feature, { title: "", detail: "" }],
        });
    };

    const removeFeature = (index) => {
        const updatedFeatures = input.feature.filter((_, i) => i !== index);
        setInput({ ...input, feature: updatedFeatures });
    };

    const featureHandler = (index, field, value) => {
        const updatedFeature = input.feature.map((f, i) =>
            i === index ? { ...f, [field]: value } : f
        );
        setInput({ ...input, feature: updatedFeature });
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        if (name === "compatibleBrands") {
            setInput({
                ...input,
                [name]: value.split(",").map((b) => b.trim()),
            });
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const handleCancel = () => {
        setInput(initialState);
    };

    const inputImageHandler = (e) => {
        setInput({ ...input, files: Array.from(e.target.files) });
    };

    const removeImage = (index) => {
        setInput({
            ...input,
            images: input.images.filter((_, i) => i !== index),
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("model", input.model);
        formData.append("price", input.price);
        formData.append("stock", input.stock);
        formData.append("unit", input.unit);
        formData.append("description", input.description);
        // formData.append("image", input.image);
        formData.append("brand", input.brand);
        formData.append(
            "compatibleBrands",
            JSON.stringify(input.compatibleBrands)
        );
        formData.append("feature", JSON.stringify(input.feature));
        input.images.forEach((image) => formData.append("images", image));
        // formData.append("images", input.images);
        // if (!input.files && input.images) {
        //     // Include existing images in the formData if no new files are selected
        //     input.images.forEach((image) => formData.append("images", image));
        // }
        
        if (input.files) {
            input.files.forEach((file) => {
                formData.append(`images`, file);
            });
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/product/edit/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                // setTimeout(() => {
                //     navigate(0); // This will reload the page
                // }, 1000);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            {/* Form */}

            <form onSubmit={submitHandler} className="mt-6 space-y-1">
                <div>
                    <label htmlFor="" className="text-xs opacity-65">
                        Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        value={input.title}
                        onChange={inputHandler}
                        type="text"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="" className="text-xs opacity-65">
                        Model
                    </label>
                    <Input
                        id="model"
                        name="model"
                        value={input.model}
                        onChange={inputHandler}
                        type="text"
                        required
                    />
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="w-full">
                        <label htmlFor="" className="text-xs opacity-65">
                            Price
                        </label>
                        <Input
                            id="price"
                            name="price"
                            value={input.price}
                            onChange={inputHandler}
                            type="number"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="text-xs opacity-65">
                            In stock
                        </label>
                        <Input
                            id="stock"
                            name="stock"
                            value={input.stock}
                            onChange={inputHandler}
                            type="number"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="" className="text-xs opacity-65">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={input.description}
                        onChange={inputHandler}
                    />
                </div>

                <div>
                    <label htmlFor="images" className="text-xs opacity-65">
                        Images
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {input.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img}
                                    alt="Existing"
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 text-red-600 rounded-full m-1"
                                >
                                    <img
                                        src="/remove.png"
                                        alt=""
                                        height={20}
                                        width={20}
                                    />
                                </button>
                            </div>
                        ))}
                        <Input
                            ref={fileInputRef} //setting input file empty after submission
                            accept="image/*"
                            name="images"
                            onChange={inputImageHandler}
                            type="file"
                            multiple
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="" className="text-xs opacity-65">
                        Brand
                    </label>
                    <Input
                        id="brand"
                        name="brand"
                        value={input.brand}
                        onChange={inputHandler}
                        type="text"
                    />
                </div>

                <div>
                    <label htmlFor="" className="text-xs opacity-65">
                        Compatible Brands
                    </label>
                    <Input
                        id="compatibleBrands"
                        name="compatibleBrands"
                        value={input.compatibleBrands.join(", ")} // Display as comma-separated values
                        onChange={inputHandler}
                        type="text"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="" className="text-xs opacity-65">
                        Features
                    </label>
                    {input.feature.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 space-y-1"
                        >
                            <Input
                                type="text"
                                placeholder="Title"
                                value={feature.title}
                                onChange={(e) =>
                                    featureHandler(
                                        index,
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="w-1/2"
                            />
                            <Input
                                type="text"
                                placeholder="Detail"
                                value={feature.detail}
                                onChange={(e) =>
                                    featureHandler(
                                        index,
                                        "detail",
                                        e.target.value
                                    )
                                }
                                className="w-1/2"
                            />
                            <Button
                                type="button"
                                variant="link"
                                onClick={() => removeFeature(index)}
                                size={10}
                            >
                                <img
                                    src="/remove.png"
                                    alt=""
                                    height={20}
                                    width={20}
                                />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="link"
                        onClick={addFeature}
                        size={10}
                    >
                        + Add Feature
                    </Button>
                </div>

                <div className="pt-4 flex justify-end space-x-2">
                    <SheetClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            className=""
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </SheetClose>
                    {/* {loading ? (
                        <Button
                            type="submit"
                            variant="outline"
                            className="hover:bg-slate-800 hover:text-white"
                        >
                            Update <Spinner />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            variant="outline"
                            className="hover:bg-slate-800 hover:text-white"
                        >
                            Update
                        </Button>
                    )} */}
                     <Button
                            type="submit"
                            variant="outline"
                            className="hover:bg-slate-800 hover:text-white"
                        >
                            Update
                        </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
