import { ReactNode } from "react";

interface WhiteBoxProps {
  children: ReactNode;
}

const WhiteBox = ({ children }: WhiteBoxProps) => {
  return (
    <div className="bg-white p-3 text-center border border-gray-300">
      {children}
    </div>
  );
};

export default WhiteBox;
