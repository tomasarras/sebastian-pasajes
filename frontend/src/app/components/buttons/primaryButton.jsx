
export default function PrimaryButton({ actionText, onClick }) {
  return (
    <button onClick={onClick} className="bg-primary-500 hover:bg-primary-400 py-2 md:py-3 px-auto text-sm md:text-md shadow rounded">
      {actionText}
    </button>
  )
}
