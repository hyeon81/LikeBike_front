const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
