
export default function PrimaryButton({ actionText, onClick, outline = false, className }) {
  return (
    <button onClick={onClick} className={`py-2 ${outline ? "border-primary-500 border text-primary-500 hover:bg-primary-400 hover:text-white transition-all" : "bg-primary-500 hover:bg-primary-400 text-primary-100"} md:py-3 px-auto text-sm md:text-md shadow rounded ${className}`}>
      {actionText}
    </button>
  )
}
