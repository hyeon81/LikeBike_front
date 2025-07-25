import { ReactNode } from "react";

interface WhiteBoxProps {
  children: ReactNode;
}

const WhiteBox = ({ children }: WhiteBoxProps) => {
  return (
    <div className="bg-white p-3 text-center border-2 border-gray-lightest ">
      {children}
    </div>
  );
};

export default WhiteBox;
