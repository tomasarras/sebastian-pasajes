
export default function TableActionButton({ actionIcon, onClick }) {
    return (
      <button onClick={onClick} className="p-1 mx-1 transform hover:scale-110">
        {actionIcon}
      </button>
    )
  }
  