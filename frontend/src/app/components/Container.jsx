
export default function Container({ children, className }) {

  return (
    <div className={`pt-20 bg-gray-75 p-4 md:px-16 md:pt-36 md:pb-16 h-screen ${className}`}>
        {children}
    </div>
  )
}
