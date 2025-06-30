import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No data available", 
  description = "There's nothing to show here yet.", 
  icon = "FileX", 
  action,
  actionLabel = "Take Action"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={32} className="text-white" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          <ApperIcon name="Plus" size={18} className="mr-2" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty