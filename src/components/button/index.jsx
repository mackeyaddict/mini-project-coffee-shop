export default function Button({children, variant = 'primary',  size = 'xl', onClick, isIcon = 'false'}) {
  const variants = {
    primary: "bg-white text-[#000000] hover:opacity-85",
    primaryOutline: "bg-transparent border border-black text-black hover:bg-black hover:text-white hover:opacity-85",
    secondary: "bg-black text-white hover:opacity-85",
    secondaryOutline: "bg-transparent border-white text-white hover:bg-black hover:text-white hover:border-white hover:opacity-85",
    disabled: "hidden",
  };
  
  const sizes = {
    xl: "text-xl px-[40px] py-3",
    lg: "text-base px-5 py-3",
    md: "text-base px-4 py-2",
    sm: "text-sm px-3 py-2",
  };

  const icons = {
    true: "flex gap-2 items-center",
    false: ""
  }

  return (
    <button onClick={onClick} className={`rounded-full w-full hover:scale-[0.98] font-semibold ${icons[isIcon]} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}