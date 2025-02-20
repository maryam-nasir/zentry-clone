type ButtonProps = {
  id: string;
  title: string;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  containerClassName?: string;
};

const Button = ({
  id,
  title,
  leftIcon,
  rightIcon,
  containerClassName,
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClassName}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general uppercase text-xs">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
