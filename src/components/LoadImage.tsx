import Image from "next/image";
import React from "react";

const LoadImage = async ({ imgSrc }: { imgSrc: string }) => {
  const random = Math.floor(Math.random() * 5 * 5) * 100;
  await new Promise((resolve: any) => setTimeout(resolve, random));
  return (
    <Image
      src={imgSrc}
      alt="loadImage"
      width={500}
      height={500}
      className="object-cover rounded-md"
    />
  );
};

export default LoadImage;
