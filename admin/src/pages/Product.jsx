import { Button } from "@/components/ui/button";
import Layout from "@/Layout";
import React, { useRef, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/loadingSlice";
import Spinner from "@/components/Spinner";
import InfoCard from "@/components/InfoCard";
import { infoData } from "@/lib/InfoCardData";
import ProductTable from "@/components/ProductTable";
import { VscJson } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const initialState = {
        title: "",
        model: "",
        price: 0,
        stock: 0,
        unit: 0,
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
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((store) => store.loading);
    const { mode } = useSelector((store) => store.screen);
    const fileInputRef = useRef(null);
    const handleFile = (e) => {
        setFile(e.target.files?.[0]);
    };
    const [ modalOpen, setModalOpen ] = useState(false);

    const bulkUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please select a file");
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                dispatch(setLoading(true));
                const products = JSON.parse(event.target.result);
                console.log("products: ", products);
                // Send the array of products to the backend
                const res = await axios.post(
                    `http://localhost:5000/product/bulk`,
                    { products },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate(0);
                }
            } catch (error) {
                toast.error("Bulk upload failed");
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        reader.readAsText(file);
    };

    const addFeature = () => {
        setInput({
            ...input,
            feature: [...input.feature, { title: "", detail: "" }],
        });
    };

    const removeFeature = (index) => {
        setInput((input) => ({
            ...input,
            feature: input.feature.filter((_, i) => i !== index),
        }));
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

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("model", input.model);
        formData.append("price", input.price);
        formData.append("stock", input.stock);
        formData.append("description", input.description);
        formData.append("brand", input.brand);
        formData.append(
            "compatibleBrands",
            JSON.stringify(input.compatibleBrands)
        );
        formData.append("feature", JSON.stringify(input.feature));
        input.files.forEach((file) => {
            formData.append(`images`, file);
        });

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `http://localhost:5000/product/create`,
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
                setInput(initialState);
                //setting the input field for files empty after submission
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Layout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold">Product</h1>
                    <h2 className="text-[12px] opacity-40">
                        View your products here
                    </h2>
                </div>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost">
                                {" "}
                                Upload <VscJson size={18} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <form
                                onSubmit={bulkUpload}
                                className="flex flex-col gap-3"
                            >
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Input
                                        id="picture"
                                        type="file"
                                        accept=".json"
                                        onChange={handleFile}
                                    />
                                </div>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <Button
                                        className="h-8 rounded-md px-3 text-xs"
                                        variant="outline"
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                )}
                            </form>
                        </PopoverContent>
                    </Popover>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>Add Product</Button>
                        </SheetTrigger>
                        <SheetContent
                            className={`overflow-x-auto w-full sm:max-w-xl`}
                        >
                            <SheetHeader>
                                <SheetTitle>Add a New Charger</SheetTitle>
                                <SheetDescription>
                                    Fill out the fields below to add a new
                                    charger product.
                                </SheetDescription>
                            </SheetHeader>

                           
                            <form
                                onSubmit={submitHandler}
                                className={`mt-6 space-y-1`}
                            >
                                <div className="">
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
                                        Title{" "}
                                        <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={input.title}
                                        onChange={inputHandler}
                                        type="text"
                                        placeholder=""
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
                                        Model{" "}
                                        <span className="text-red-700">*</span>
                                    </label>
                                    <Input
                                        id="model"
                                        name="model"
                                        value={input.model}
                                        onChange={inputHandler}
                                        type="text"
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <div className="w-full">
                                        <label
                                            htmlFor=""
                                            className="text-xs opacity-65"
                                        >
                                            Price{" "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id="price"
                                            name="price"
                                            value={input.price}
                                            onChange={inputHandler}
                                            type="number"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor=""
                                            className="text-xs opacity-65"
                                        >
                                            In stock{" "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id="stock"
                                            name="stock"
                                            value={input.stock}
                                            onChange={inputHandler}
                                            type="number"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={input.description}
                                        onChange={inputHandler}
                                        placeholder=""
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
                                        Image
                                    </label>
                                    <Input
                                        ref={fileInputRef} //setting input file empty after submission
                                        accept="image/*"
                                        name="images"
                                        onChange={inputImageHandler}
                                        type="file"
                                        multiple
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
                                        {" "}
                                        Brand{" "}
                                    </label>
                                    <Input
                                        id="brand"
                                        name="brand"
                                        value={input.brand}
                                        onChange={inputHandler}
                                        type="text"
                                        placeholder=""
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
                                        Compatible Brands
                                    </label>
                                    <Input
                                        id="compatibleBrands"
                                        name="compatibleBrands"
                                        value={input.compatibleBrands.join(
                                            ", "
                                        )} 
                                        onChange={inputHandler}
                                        type="text"
                                        placeholder=""
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label
                                        htmlFor=""
                                        className="text-xs opacity-65"
                                    >
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
                                                onClick={() =>
                                                    removeFeature(index)
                                                }
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
                                        className="opacity-65 font-normal text-[13px]"
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
                                        {/* <Button
                                            type="button"
                                            variant="destructive"
                                            className=""
                                            onClick={() => {
                                                setModalOpen(true);
                                                handleCancel();
                                            }}
                                        >
                                            Cancel
                                        </Button> */}
                                    </SheetClose>
                                      
                                    {loading ? (
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            className="hover:bg-slate-800 hover:text-white"
                                        >
                                            Submit <Spinner />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            className="hover:bg-slate-800 hover:text-white"
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div></div>
            <div className="flex flex-col gap-4 my-4 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-4 ">
                {infoData.map((data) => (
                    <InfoCard
                        key={data.id}
                        title={data.title}
                        detail={data.detail}
                        icon={data.icon}
                    />
                ))}
            </div>

            <div>
                <ProductTable />
            </div>
        </Layout>
    );
};

export default Product;
