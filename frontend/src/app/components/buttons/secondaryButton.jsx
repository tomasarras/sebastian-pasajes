export default function SecondaryButton({ actionText, className = "", outline = false, ...props }) {
  return (
    <button {...props} className={`px-4 text-black disabled:text-gray-500 ${outline ? "border-secondary-500 border text-secondary-500 hover:bg-secondary-500 hover:text-white transition-all" : "bg-secondary-500 hover:bg-secondary-400"} disabled:bg-gray-200 py-2 md:py-3 px-auto text-sm md:text-md shadow rounded ${className}`}>
      {actionText}
    </button>
  )
}
