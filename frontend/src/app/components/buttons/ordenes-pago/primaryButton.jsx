import s from "./primaryButton.module.css"

export default function PrimaryButton({ actionText, onClick, outline = false, className }) {
  return (
    <button onClick={onClick} className={`py-2 ${outline ? s.buttonOutline : s.button} transition-all text-white md:py-3 px-auto text-sm md:text-md shadow rounded ${className}`}>
      {actionText}
    </button>
  )
}
