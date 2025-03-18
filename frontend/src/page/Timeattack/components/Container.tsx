import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="flex flex-col max-w-md mx-auto min-h-screen bg-gray-50 border-x border-gray-200">
    {children}
  </div>
);

export default Container;
