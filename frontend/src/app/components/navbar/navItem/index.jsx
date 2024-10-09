import Link from 'next/link'

export default function NavItem({ href, navText, icon, endIcon, className }) {
  return (
    <Link href={href} className={`flex gap-2 rounded-lg text-gray-500 p-2 ${className}`}>
      {icon}
      <span className="w-full grid justify-start">{navText}</span>
      {endIcon && <span className='ml-4'>{endIcon}</span>}
    </Link>
  )
}
