import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const GradeCard = ({ subject, grade, marks, totalMarks, percentage }) => {
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'success'
      case 'B+':
      case 'B':
        return 'primary'
      case 'C+':
      case 'C':
        return 'accent'
      case 'D':
        return 'warning'
      default:
        return 'error'
    }
  }
  
  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': 'Calculator',
      'Science': 'Microscope',
      'English': 'BookOpen',
      'History': 'Clock',
      'Geography': 'Globe',
      'Physics': 'Zap',
      'Chemistry': 'Flask',
      'Biology': 'Leaf'
    }
    return icons[subject] || 'Book'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <ApperIcon name={getSubjectIcon(subject)} size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold font-display text-gray-900">{subject}</h3>
            <p className="text-sm text-gray-500">{marks}/{totalMarks} marks</p>
          </div>
        </div>
        
        <Badge variant={getGradeColor(grade)} size="lg">
          {grade}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Percentage</span>
          <span className="text-lg font-bold font-display text-gray-900">{percentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-2 rounded-full bg-gradient-to-r ${
              percentage >= 90 ? 'from-green-500 to-green-600' :
              percentage >= 80 ? 'from-blue-500 to-blue-600' :
              percentage >= 70 ? 'from-yellow-500 to-yellow-600' :
              percentage >= 60 ? 'from-orange-500 to-orange-600' :
              'from-red-500 to-red-600'
            }`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default GradeCard