"use client"

export default function Checkbox({ color, className, label, checked = false, onClick }) {
  const customColor = color != undefined
  let styles = {}
  if (customColor) {
    if (checked)
      styles.container = { borderColor: color }
    styles.checkContainer = { backgroundColor: color }
  }
  return (
  <button style={styles.container} type='button' onClick={onClick} className={`${className} inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white border ${checked ? "border-primary-500" : ""}`}>
    <span style={styles.checkContainer} className={`rounded-full border p-0.5 ${checked && !customColor ? "bg-primary-500" : ""}`}>
      <svg
        className={`w-4 h-4 ${checked ? "" : "invisible"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke={customColor ? "white" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
      {label}
  </button>)
}
