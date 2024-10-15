export default function SecondaryButton({ size = "md", actionText, className = "", outline = false, ...props }) {
  return (
    <button {...props} className={`${size === 'sm' && "h-9"} px-4 text-black disabled:text-gray-500 ${outline ? "border-secondary-500 border text-secondary-500 hover:bg-secondary-500 hover:text-white transition-all" : "bg-secondary-500 hover:bg-secondary-400"} disabled:bg-gray-200 py-2 ${size != 'sm' && 'md:py-3'} px-auto text-sm md:text-md shadow rounded flex items-center justify-center ${className}`}>
      {actionText}
    </button>
  )
}
