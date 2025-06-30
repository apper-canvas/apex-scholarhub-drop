import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import GradeCard from '@/components/molecules/GradeCard'
import ApperIcon from '@/components/ApperIcon'
import { resultsService } from '@/services/api/resultsService'

const Results = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedExam, setSelectedExam] = useState(null)
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'table'
  
  const loadResults = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await resultsService.getAll()
      setResults(data)
      if (data.length > 0) {
        setSelectedExam(data[0].Id)
      }
    } catch (err) {
      setError('Failed to load results data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadResults()
  }, [])
  
  const selectedResult = results.find(result => result.Id === selectedExam)
  
  // Prepare chart data
  const getChartData = () => {
    if (!selectedResult) return { categories: [], series: [] }
    
    const categories = selectedResult.subjects.map(subject => subject.name)
    const percentages = selectedResult.subjects.map(subject => subject.percentage)
    
    return {
      categories,
      series: [{
        name: 'Percentage',
        data: percentages
      }]
    }
  }
  
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 8
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#3B82F6'],
    xaxis: {
      categories: getChartData().categories,
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Percentage (%)'
      },
      max: 100
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [50, 0, 100]
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%"
        }
      }
    }
  }
  
  const getOverallGrade = (percentage) => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    return 'D'
  }
  
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'success'
      case 'B+':
      case 'B':
        return 'primary'
      case 'C':
        return 'accent'
      case 'D':
        return 'warning'
      default:
        return 'error'
    }
  }
  
  if (loading) return <Loading type="table" />
  if (error) return <Error message={error} onRetry={loadResults} />
  if (results.length === 0) return (
    <Empty 
      title="No results available"
      description="Your exam results will appear here once they are published."
      icon="BarChart3"
    />
  )
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900">Academic Results</h1>
          <p className="text-gray-600 mt-1">View your exam results and performance analytics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'cards' ? 'primary' : 'ghost'}
            size="sm"
            icon="Grid3X3"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'ghost'}
            size="sm"
            icon="Table"
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
        </div>
      </div>
      
      {/* Exam Selector */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold font-display text-gray-900 mb-4">Select Exam</h2>
          <div className="flex flex-wrap gap-3">
            {results.map((result) => (
              <Button
                key={result.Id}
                variant={selectedExam === result.Id ? 'primary' : 'outline'}
                onClick={() => setSelectedExam(result.Id)}
                className="flex-shrink-0"
              >
                {result.examName}
              </Button>
            ))}
          </div>
        </div>
      </Card>
      
      {selectedResult && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Award" size={32} className="text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-1">
                  {selectedResult.grade}
                </h3>
                <p className="text-gray-600">Overall Grade</p>
              </div>
            </Card>
            
            <Card className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Target" size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-1">
                  {selectedResult.totalMarks}
                </h3>
                <p className="text-gray-600">Total Marks</p>
              </div>
            </Card>
            
            <Card className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="TrendingUp" size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-1">
                  {Math.round(selectedResult.subjects.reduce((acc, subject) => acc + subject.percentage, 0) / selectedResult.subjects.length)}%
                </h3>
                <p className="text-gray-600">Average %</p>
              </div>
            </Card>
            
            <Card className="text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="BookOpen" size={32} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-1">
                  {selectedResult.subjects.length}
                </h3>
                <p className="text-gray-600">Subjects</p>
              </div>
            </Card>
          </div>
          
          {/* Performance Chart */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold font-display text-gray-900 mb-6">Performance Chart</h2>
              <Chart
                options={chartOptions}
                series={getChartData().series}
                type="bar"
                height={350}
              />
            </div>
          </Card>
          
          {/* Subject Results */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold font-display text-gray-900 mb-6">Subject Results</h2>
              
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedResult.subjects.map((subject, index) => (
                    <motion.div
                      key={subject.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GradeCard
                        subject={subject.name}
                        grade={subject.grade}
                        marks={subject.marks}
                        totalMarks={subject.totalMarks}
                        percentage={subject.percentage}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Marks</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Total</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Percentage</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResult.subjects.map((subject, index) => (
                        <motion.tr
                          key={subject.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{subject.name}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="font-medium text-gray-900">{subject.marks}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-gray-600">{subject.totalMarks}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="font-medium text-gray-900">{subject.percentage}%</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Badge variant={getGradeColor(subject.grade)}>
                              {subject.grade}
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

export default Results