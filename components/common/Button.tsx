const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
