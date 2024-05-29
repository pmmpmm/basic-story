import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  variant?: "contain" | "outline" | "text";
  size?: "small" | "medium" | "large" | "full";
  href?: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, variant, size, href, icon, disabled, onClick }: ButtonProps) => {
  let style = "leading-none px-4 py-[10px] ";

  if (size === "small") {
    style = "leading-none px-3 py-[8px] ";
  } else if (size === "medium") {
    style = "leading-none px-4 py-[12px] ";
  } else if (size === "large") {
    style = "leading-none px-6 py-[16px] ";
  } else if (size === "full") {
    style = "leading-none px-6 py-[16px] w-full ";
  }

  if (variant === "contain") {
    style +=
      "text-base text-white font-medium bg-neutral-800 border border-solid border-neutral-800 rounded-md disabled:bg-neutral-600 disabled:border-neutral-600";
  } else if (variant === "outline") {
    style += "font-medium border border-solid border-main-700 box-border rounded-md ";
  } else if (variant === "text") {
    style = "flex items-center gap-1 leading-none px-0 py-1 ";
  }

  if (href) {
    return (
      <Link to={href}>
        <button type="button" className={style} onClick={onClick}>
          {text}
        </button>
      </Link>
    );
  }
  return (
    <button type="button" className={style} disabled={disabled} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};

export default Button;
