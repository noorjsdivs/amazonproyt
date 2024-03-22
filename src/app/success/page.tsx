"use client";
import Container from "@/components/Container";
import { resetCart } from "@/store/nextSlice";

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const SuccessPage = ({ searchParams }: any) => {
  console.log("search", searchParams?.session_id);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!searchParams?.session_id) {
      redirect("/");
    } else {
      dispatch(resetCart());
    }
  }, []);

  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Your Payment Accepted by orebionlineshopping.com
        </h2>
        <p>Now you can view your Orders or continue Shopping with us</p>
        <div className="flex items-center gap-x-5">
          <Link href={"/order"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPage;
