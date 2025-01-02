import s from "./primaryButton.module.css"

export default function PrimaryButton({ type, actionText, onClick, outline = false, className, ...rest }) {
  return (
    <button onClick={onClick} type={type} className={`py-2 ${outline ? s.buttonOutline : s.button} min-w-24 transition-all text-white md:py-3 px-auto text-sm md:text-md shadow rounded ${className}`} {...rest}>
      {actionText}
    </button>
  )
}
