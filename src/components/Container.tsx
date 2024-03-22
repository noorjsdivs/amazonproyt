import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`max-w-screen-xl mx-auto px-4 py-4 md:py-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
