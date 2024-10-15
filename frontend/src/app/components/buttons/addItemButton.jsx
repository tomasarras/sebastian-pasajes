import AddIcon from '@mui/icons-material/Add';

export default function AddItemButton({ actionText, ...props }) {
  return (<span {...props} className="flex items-center"><AddIcon className="mr-2 h-4 w-4" />{actionText}</span>)
}
