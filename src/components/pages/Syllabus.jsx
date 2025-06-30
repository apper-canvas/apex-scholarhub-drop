import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { syllabusService } from '@/services/api/syllabusService'
import { toast } from 'react-toastify'

const Syllabus = () => {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedSubject, setExpandedSubject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const loadSubjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await syllabusService.getAll()
      setSubjects(data)
    } catch (err) {
      setError('Failed to load syllabus data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadSubjects()
  }, [])
  
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const toggleSubject = (subjectId) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId)
  }
  
  const handleDownload = (resource) => {
    toast.success(`Downloading ${resource.name}...`)
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
      'Biology': 'Leaf',
      'Computer Science': 'Monitor'
    }
    return icons[subject] || 'Book'
  }
  
  if (loading) return <Loading type="card" />
  if (error) return <Error message={error} onRetry={loadSubjects} />
  if (subjects.length === 0) return (
    <Empty 
      title="No subjects found"
      description="Your syllabus will appear here once subjects are added."
      icon="BookOpen"
    />
  )
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900">Syllabus</h1>
          <p className="text-gray-600 mt-1">View your subject syllabus and course materials</p>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search subjects or teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Subjects Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {filteredSubjects.map((subject, index) => (
            <motion.div
              key={subject.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSubject(subject.Id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                      <ApperIcon name={getSubjectIcon(subject.name)} size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-gray-900">{subject.name}</h3>
                      <p className="text-gray-600">Code: {subject.code}</p>
                      <p className="text-sm text-gray-500">Teacher: {subject.teacher}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant="primary">
                      {subject.syllabus.length} Topics
                    </Badge>
                    <Badge variant="secondary">
                      {subject.resources.length} Resources
                    </Badge>
                    <ApperIcon 
                      name={expandedSubject === subject.Id ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-gray-400" 
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedSubject === subject.Id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-6 space-y-6">
                        {/* Syllabus Topics */}
                        <div>
                          <h4 className="text-lg font-semibold font-display text-gray-900 mb-4">
                            Syllabus Topics
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subject.syllabus.map((topic, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                                <span className="text-gray-700">{topic}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Resources */}
                        <div>
                          <h4 className="text-lg font-semibold font-display text-gray-900 mb-4">
                            Course Resources
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {subject.resources.map((resource, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-accent-100 to-accent-200 rounded-lg flex items-center justify-center">
                                    <ApperIcon 
                                      name={resource.type === 'pdf' ? 'FileText' : 
                                            resource.type === 'video' ? 'Play' : 
                                            resource.type === 'link' ? 'ExternalLink' : 'File'} 
                                      size={16} 
                                      className="text-accent-600" 
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{resource.name}</p>
                                    <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                                  </div>
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  icon="Download"
                                  onClick={() => handleDownload(resource)}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredSubjects.length === 0 && searchTerm && (
        <Empty 
          title="No subjects found"
          description={`No subjects match "${searchTerm}". Try a different search term.`}
          icon="Search"
        />
      )}
    </div>
  )
}

export default Syllabus