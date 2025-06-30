import { motion } from 'framer-motion'

const Loading = ({ type = 'card' }) => {
  const CardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-2"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-5/6"></div>
        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-4/6"></div>
      </div>
    </div>
  )

  const TableSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="p-6 border-b border-gray-200">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/3"></div>
      </div>
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
            </div>
            <div className="w-16 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )

  const CalendarSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
        ))}
      </div>
    </div>
  )

  const DashboardSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <CardSkeleton />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )

  const renderSkeleton = () => {
    switch (type) {
      case 'table':
        return <TableSkeleton />
      case 'calendar':
        return <CalendarSkeleton />
      case 'dashboard':
        return <DashboardSkeleton />
      default:
        return <CardSkeleton />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {renderSkeleton()}
    </motion.div>
  )
}

export default Loading