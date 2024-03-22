import Container from "@/components/Container";
import FormattedPrice from "@/components/FormattedPrice";
import LoadImage from "@/components/LoadImage";

import Image from "next/image";
import React, { Suspense } from "react";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";

interface Props {
  params: {
    slug: string;
  };
}
const SingeProduct = async ({ searchParams }: any) => {
  const {
    _id,
    title,
    brand,
    category,
    description,
    image,
    isNew,
    oldPrice,
    price,
  } = await searchParams;

  return (
    <Container>
      <div className="w-full grid md:grid-cols-3 gap-2 bg-gray-100 min-h-[500px] rounded-lg">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
          {/* <Image
            src={image}
            alt="loadImage"
            width={500}
            height={500}
            className="object-cover rounded-md"
          /> */}
          <Suspense
            fallback={
              <div className="w-full h-full bg-black/80 flex items-center justify-center">
                <p className="text-2xl font-medium text-white tracking-wider animate-pulse">
                  Loading...
                </p>
              </div>
            }
          >
            <LoadImage imgSrc={image} />
          </Suspense>
          <div
            className="w-12 h-24 absolute bottom-10 right-2 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300
             "
          >
            <span className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300">
              <HiShoppingCart />
            </span>
            <span className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300">
              <FaHeart />
            </span>
          </div>
          {isNew && (
            <button className="absolute top-2 right-2 bg-black text-gray-200 px-4 py-1 text-sm rounded-sm hover:text-white duration-300">
              New Arrival
            </button>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
          <div className="flex flex-col gap-3">
            <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
              {category}_{brand}
            </p>
            <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
              {title}
            </h1>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div>
            <p className="text-base text-gray-600 flex items-center gap-1">
              Price:
              <span className="text-amazon_blue text-lg font-semibold">
                <FormattedPrice amount={price} />
              </span>
              <span className="ml-1 line-through">
                <FormattedPrice amount={oldPrice} />
              </span>
            </p>
            <p className="text-sm text-gra flex items-center gap-1">
              You saved:
              <span>
                <FormattedPrice amount={oldPrice - price} />
              </span>
            </p>
            <button className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold">
              add to cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingeProduct;
