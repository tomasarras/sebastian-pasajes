import TuneIcon from '@mui/icons-material/Tune';
import styles from "./filterButton.module.css"
export default function FilterButton({ onClick, className, ...props }) {
  return (
    <button {...props} onClick={onClick} className={`${className} h-9 px-4 flex align-center justify-center min-w-24 py-2 border hover:bg-gray-200 transition-all px-auto text-sm md:text-md shadow rounded ${styles.background}`}>
      <span className="flex items-center w-100"><TuneIcon className="mr-2 h-4 w-4"/> Filtrar</span>
    </button>
  )
}
