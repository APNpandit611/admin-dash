import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/loadingSlice";
import { addCharger } from "@/store/chargerSlice";
import Spinner from "./Spinner";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import ViewProduct from "@/pages/ViewProduct";
import UpdateProduct from "@/pages/UpdateProduct";
import DeleteProduct from "@/pages/DeleteProduct";


const ProductTable = () => {
    const [product, setProduct] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.loading);
    const { mode } = useSelector((store) => store.screen);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(
                    `http://localhost:5000/product/all`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                
                setProduct(res.data.products);

                setFilterProduct(res.data.products);
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchProduct();
    }, [dispatch]);

    useEffect(() => {
        const filteredProduct = product.filter((product) =>
            product.brand.toLowerCase().includes(search.toLowerCase())
        );
        setFilterProduct(filteredProduct);
        setCurrentPage(1);
    }, [product, search]);

    const totalPages = Math.ceil(filterProduct.length / itemsPerPage);

    const currentData = filterProduct.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filterProduct.length);

    return (
        <div className={`${mode ? "bg-gray-900 text-white" : "bg-white"} `}>
            <div className="flex flex-col items-center w-full space-y-3 my-3 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                <h1 className="text-3xl font-medium text-center lg:text-left">
                    Recent Activity
                </h1>
                <div className="flex w-full items-center lg:justify-end">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search by item"
                        className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder-gray-500 transition duration-300 ease-in-out placeholder:text-sm"
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-r-md transition duration-300 ease-in-out shadow-md hover:shadow-lg ml-1">
                        Search
                    </button>
                </div>
            </div>
            <div className="p-2 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div>
                    {loading ? (
                        <div className="m-3">
                            <Spinner />
                        </div>
                    ) : (
                        <Table className="overflow-hidden">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Brand</TableHead>

                                    <TableHead>Price</TableHead>
                                    <TableHead>In Stock</TableHead>
                                    <TableHead>Ratings</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentData.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.model}</TableCell>
                                        <TableCell>{product.brand}</TableCell>
                                        <TableCell>€{product.price}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>{(product.review.length > 0 ? product.review.reduce((sum, review)=>sum + review.rating, 0) / product.review.length : 0).toPrecision(2)}</TableCell>

                                        <TableCell className="flex gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="rounded-full bg-blue-200 p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                                                        <FaEye
                                                            fontSize={18}
                                                            className="text-black"
                                                        />
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent className="overflow-x-auto w-full h-screen md:max-w-[90%] md:h-[90%] lg:max-w-[75%]  dark:bg-slate-800">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-semibold text-gray-800"></DialogTitle>
                                                        <DialogDescription>
                                                            <ViewProduct
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>

                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <div className="rounded-full bg-green-200 p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                                                        <MdEditSquare
                                                            fontSize={18}
                                                            className="text-green-600"
                                                        />
                                                    </div>
                                                </SheetTrigger>
                                                <SheetContent className="overflow-x-auto w-full sm:max-w-xl">
                                                    <SheetHeader>
                                                        <SheetTitle>
                                                            Update Charger
                                                        </SheetTitle>
                                                        <SheetDescription>
                                                            Edit the fields
                                                            below to update
                                                            charger details.
                                                    <UpdateProduct
                                                        productId={product._id}
                                                    />
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                </SheetContent>
                                            </Sheet>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="rounded-full bg-red-200 p-2 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                                                        <MdDelete
                                                            fontSize={18}
                                                            className="text-red-600"
                                                        />
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle></DialogTitle>
                                                    </DialogHeader>
                                                        <DialogDescription>
                                                            <DeleteProduct
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                        </DialogDescription>
                                                </DialogContent>
                                            </Dialog>

                                            {/* <Link
                                                to={`/product/delete/${product._id}`}
                                            >
                                                <div className="rounded-full bg-red-200 p-2 shadow-md hover:shadow-lg transition-shadow duration-200">
                                                    <MdDelete
                                                        fontSize={18}
                                                        className="text-red-600"
                                                    />
                                                </div>
                                            </Link> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow></TableRow>
                            </TableFooter>
                        </Table>
                    )}

                    <div className="flex flex-col items-center justify-center gap-5 my-5">
                        <div className="text-[12px] opacity-50 w-full text-center">
                            Showing{" "}
                            <span className="font-bold">{startItem}</span> to{" "}
                            <span className="font-bold">{endItem}</span> of{" "}
                            <span className="font-bold">{product.length}</span>{" "}
                            items
                        </div>
                        <Pagination>
                            <PaginationContent className="cursor-pointer">
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            onClick={() =>
                                                handlePageChange(index + 1)
                                            }
                                            className={
                                                currentPage === index + 1
                                                    ? "font-bold text-blue-600 "
                                                    : ""
                                            }
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
