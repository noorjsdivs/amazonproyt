"use client";
import Image from "next/image";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import CartIcon from "../../images/cartIcon.png";
import Link from "next/link";
import logo from "@/images/logo.png";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAllProducts } from "@/store/nextSlice";
import FormattedPrice from "../FormattedPrice";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { productData, favoriteData, allProducts } = useSelector(
    (state: StateProps) => state.next
  );

  useEffect(() => {
    const getProducts = async () => {
      const data = await axios.get(
        "https://fakestoreapiserver.reactbd.com/tech"
      );

      dispatch(setAllProducts(data?.data));
    };
    getProducts();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allProducts.filter((item: StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* Logo */}
        <Link href={"/"}>
          <div className="headerItem">
            <Image className="w-28 object-cover mt-1" src={logo} alt="logo" />
          </div>
        </Link>
        {/* Deliver */}
        <div className="headerItem hidden xl:inline-flex gap-1">
          <SlLocationPin className="text-lg text-white" />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">USA</p>
          </div>
        </div>
        {/* Searchbar */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search next_amazon products"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
          {/*  ============= Searchfield start here ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto h-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                        href={{
                          pathname: `/product/${item._id}`,
                          query: {
                            _id: item._id,
                            title: item.title,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                          },
                        }}
                        onClick={() => setSearchQuery("")}
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                      >
                        <div>
                          <img
                            className="w-24"
                            src={item.image}
                            alt="productImage"
                          />
                        </div>
                        <div>
                          <p className="text-xs -mb-1">
                            {item.brand}_{item.category}
                          </p>
                          <p className="text-lg font-medium">{item.title}</p>
                          <p className="text-xs">
                            {item.description.substring(0, 100)}
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            price:{" "}
                            <span className="font-semibold">
                              <FormattedPrice amount={item.price} />
                            </span>
                            <span className="text-gray-600 line-through">
                              <FormattedPrice amount={item.oldPrice} />
                            </span>
                          </p>
                        </div>
                        <div className="flex-1 text-right px-4">
                          <p className="text-base font-semibold animate-bounce text-amazon_blue">
                            Save{" "}
                            <FormattedPrice
                              amount={item.oldPrice - item.price}
                            />
                          </p>
                        </div>
                      </Link>
                    ))}
                </>
              ) : (
                <div className="py-10 bg-gray-50 flex items-center justify-center">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again
                  </p>
                </div>
              )}
            </div>
          )}
          {/*  ============= Searchfield end here ============ */}
        </div>
        {/* User info */}
        {session?.user ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <img
              src={session?.user?.image!}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
          >
            <p>Hello, sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* Favorite */}
        <Link
          href={"/favorite"}
          className="text-xs text-gray-100 hidden xl:inline-flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>
          {favoriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow font-medium rounded-sm">
              {favoriteData.length}
            </span>
          )}
        </Link>
        {/* Cart */}
        <Link
          href={"/cart"}
          className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
        >
          <Image
            src={CartIcon}
            alt="cartIcon"
            className="w-auto object-cover h-8"
          />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
