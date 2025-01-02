
export default function Container({ children, className }) {

  return (
    <div className={`pt-16 bg-gray-75 p-4 md:px-16  min-h-screen ${className}`}>
        {children}
    </div>
  )
}
