const Button = ({ btnType, btnText, handler }) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 w-full";

  if (btnType === "success") {
    return (
      <button
        className={`${baseClasses} bg-emerald-500 hover:bg-emerald-600 text-white`}
        onClick={handler}
      >
        {btnText}
      </button>
    );
  } else if (btnType === "danger") {
    return (
      <button
        className={`${baseClasses} bg-rose-500 hover:bg-rose-600 text-white`}
        onClick={handler}
      >
        {btnText}
      </button>
    );
  } else {
    return (
      <button
        className={`${baseClasses} bg-blue-500 hover:bg-blue-600 text-white`}
        onClick={handler}
      >
        {btnText}
      </button>
    );
  }
};

export default Button;
