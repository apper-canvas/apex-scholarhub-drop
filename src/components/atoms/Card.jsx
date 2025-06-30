import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  gradient = false,
  padding = 'default',
  ...props 
}) => {
  const baseClasses = "bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300"
  const hoverClasses = hover ? "hover:shadow-xl hover:scale-[1.02]" : ""
  const gradientClasses = gradient ? "bg-gradient-to-br from-white via-gray-50 to-white" : ""
  
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8"
  }
  
  const cardClasses = `${baseClasses} ${hoverClasses} ${gradientClasses} ${paddingClasses[padding]} ${className}`
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cardClasses}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card