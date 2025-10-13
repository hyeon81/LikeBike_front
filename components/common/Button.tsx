const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-primary text-white py-6 rounded cursor-pointer text-2xl font-semibold hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-medium disabled:cursor-default"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
