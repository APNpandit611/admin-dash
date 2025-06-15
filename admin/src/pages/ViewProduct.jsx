import React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "react-router-dom";

const ViewProduct = ({ product }) => {
    const averageRating = product.review.length > 0 ? product.review.reduce((sum, review) => sum + review.rating, 0) / product.review.length : 0

    return (
        // <div>
        //     <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        //         {product.title}
        //     </h1>
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        //         <div className="relative flex justify-center items-center w-full max-w-[400px] mx-auto">
        //             <Carousel className="w-full">
        //                 <CarouselContent>
        //                     {product.images.map((image, index) => (
        //                         <CarouselItem key={index}>
        //                             <img
        //                                 src={image}
        //                                 alt={product.title}
        //                                 className="rounded-lg shadow-md object-cover w-full h-[250px] md:h-[300px] lg:h-[400px]"
        //                             />
        //                         </CarouselItem>
        //                     ))}
        //                 </CarouselContent>
        //                 <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        //                 <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        //             </Carousel>
        //         </div>

        //         <div>
        //             <div className="text-lg font-semibold text-gray-600 mb-2">
        //                 Model:{" "}
        //                 <span className="text-gray-800">{product.model}</span>
        //             </div>
        //             <div className="text-lg font-semibold text-gray-600 mb-2">
        //                 Price:{" "}
        //                 <span className="text-green-600">${product.price}</span>
        //             </div>
        //             <div className="text-lg font-semibold text-gray-600 mb-2">
        //                 Stock:{" "}
        //                 <span
        //                     className={`text-${
        //                         product.stock > 0 ? "green" : "red"
        //                     }-600`}
        //                 >
        //                     {product.stock > 0
        //                         ? `${product.stock} in stock`
        //                         : "Out of stock"}
        //                 </span>
        //             </div>
        //             <div className="text-lg text-gray-700 mb-4">
        //                 <strong>Description:</strong> {product.description}
        //             </div>
        //             <div className="mb-4">
        //                 <h3 className="text-xl font-semibold text-gray-800">
        //                     Brand:
        //                 </h3>
        //                 <div className="text-lg text-gray-600">
        //                     {product.brand}
        //                 </div>
        //             </div>
        //             <div className="mb-4">
        //                 <h3 className="text-xl font-semibold text-gray-800">
        //                     Compatible Brands:
        //                 </h3>
        //                 <div>
        //                     <ul className="flex flex-col text-[16px] gap-1 text-gray-600">
        //                         {product.compatibleBrands.map(
        //                             (brand, index) => (
        //                                 <li key={index} className="list-none items-start">{brand}</li>
        //                             )
        //                         )}
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="mt-6 border-t border-gray-200 pt-6">
        //         <h3 className="text-xl font-semibold text-gray-800 mb-4">
        //             Features:
        //         </h3>
        //         <div className="space-y-4">
        //             {product.feature.map((feature) => (
        //                 <div
        //                     key={feature._id}
        //                     className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow-sm"
        //                 >
        //                     <div className="text-[16px] font-medium text-gray-800">
        //                         {feature.title}
        //                     </div>
        //                     <div className="text-[16px] text-gray-600">
        //                         {feature.detail}
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>

        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        //     <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        //         {product.title}
        //     </h1>
        //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        //         <div className="relative flex justify-center items-center w-full max-w-[500px] mx-auto">
        //             <Carousel className="w-full rounded-xl overflow-hidden shadow-2xl">
        //                 <CarouselContent>
        //                     {product.images.map((image, index) => (
        //                         <CarouselItem key={index}>
        //                             <img
        //                                 src={image}
        //                                 alt={`${product.title} - Image ${index + 1}`}
        //                                 className="object-cover w-full h-[350px] md:h-[450px] lg:h-[550px]"
        //                             />
        //                         </CarouselItem>
        //                     ))}
        //                 </CarouselContent>
        //                 <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
        //                 <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white" />
        //             </Carousel>
        //         </div>

        //         <div className="space-y-6">
        //             <div className="bg-gray-100 rounded-lg p-6 shadow-md">
        //                 <div className="grid grid-cols-2 gap-2 text-lg">
        //                     <div className="font-semibold text-gray-700">Model:</div>
        //                     <div className="text-gray-900">{product.model}</div>
        //                     <div className="font-semibold text-gray-700">Price:</div>
        //                     <div className="text-green-600 font-bold">${product.price}</div>
        //                     <div className="font-semibold text-gray-700">Stock:</div>
        //                     <div className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        //                         {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        //                     </div>
        //                 </div>
        //             </div>

        //             <div className="bg-white rounded-lg p-6 shadow-md">
        //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
        //                 <p className="text-gray-700 leading-relaxed">{product.description}</p>
        //             </div>

        //             <div className="bg-white rounded-lg p-6 shadow-md">
        //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Brand</h3>
        //                 <p className="text-gray-700">{product.brand}</p>
        //             </div>

        //             <div className="bg-white rounded-lg p-6 shadow-md">
        //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">Compatible Brands</h3>
        //                 <ul className="grid grid-cols-2 gap-2">
        //                     {product.compatibleBrands.map((brand, index) => (
        //                         <li key={index} className="text-gray-700 flex items-center">
        //                             {/* <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        //                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        //                             </svg> */}
        //                             {brand}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="mt-12">
        //         <h3 className="text-2xl font-bold text-gray-900 mb-6">Features</h3>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //             {product.feature.map((feature) => (
        //                 <div
        //                     key={feature._id}
        //                     className="flex flex-col p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
        //                 >
        //                     <div className="text-lg font-semibold text-gray-900 mb-2">
        //                         {feature.title}
        //                     </div>
        //                     <div className="text-gray-700">
        //                         {feature.detail}
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">
                {product.title}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Carousel Section */}
                <div className="w-full max-w-[500px] mx-auto lg:mx-0">
                    <Carousel className="w-full shadow-lg">
                        <CarouselContent>
                            {product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <CarouselItem key={index} >
                                        <img
                                            src={image}
                                            alt="Product Image"
                                            className="object-cover w-full h-[350px] md:h-[450px] rounded-lg"
                                        />
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <img
                                        src="/default-product-image.png"
                                        alt="Default Image"
                                        className="object-cover w-full h-[350px] md:h-[450px]"
                                    />
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
                    </Carousel>
                </div>

                {/* Product Info Section */}
                <div className="space-y-2 ">
                    {/* Product Details */}
                    <div className="bg-white rounded-lg p-6 shadow-lg ">
                        <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                            <div className="font-semibold text-gray-700">
                                Model:
                            </div>
                            <div className="text-gray-900">{product.model}</div>
                            <div className="font-semibold text-gray-700">
                                Price:
                            </div>
                            <div className="text-green-600 font-bold text-lg">
                                €{product.price}
                            </div>
                            <div className="font-semibold text-gray-700">
                                Stock:
                            </div>
                            <div
                                className={`font-bold ${
                                    product.stock > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : "Out of stock"}
                            </div>
                            <div className="font-semibold text-gray-700">
                                Ratings:
                            </div>
                            <div className="text-gray-700 text-sm md:text-base flex items-center gap-2">
                            <svg
                                
                                className="h-4 w-4 fill-current mr-1 text-yellow-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0l3.091 7.387L24 9.499l-6.545 5.546L18.182 24 12 20.088 5.818 24l1.727-9.955L0 9.499l8.909-2.112z" />
                            </svg>
                                {averageRating.toPrecision(2)} 
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="bg-white rounded-lg p-6 shadow-lg ">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Description
                        </h3>
                        <p className="text-gray-700 text-sm md:text-base">
                            {product.description}
                        </p>
                    </div>

                    {/* Brand and Compatible Brands */}
                    <div className="bg-white rounded-lg p-6 shadow-lg ">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Brand
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base">
                                {product.brand}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Compatible Brands
                            </h3>
                            <ul className="grid grid-cols-2 gap-2 text-sm md:text-base">
                                {product.compatibleBrands.map(
                                    (brand, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 flex items-center space-x-2"
                                        >
                                            <svg
                                                className="w-4 h-4 text-green-500 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{brand}</span>
                                        </li>
                                    )
                                )}

                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.feature.map((feature) => (
                        <div
                            key={feature._id}
                            className="flex flex-col p-6 bg-white rounded-lg shadow-lg"
                        >
                            <div className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </div>
                            <div className="text-gray-700 text-sm md:text-base">
                                {feature.detail}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
