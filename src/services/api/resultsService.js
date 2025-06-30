import { resultsData } from '@/services/mockData/resultsData'

export const resultsService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 450))
    
    return [...resultsData]
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return resultsData.find(result => result.Id === parseInt(id))
  },
  
  getByExamName: async (examName) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return resultsData.filter(result => 
      result.examName.toLowerCase().includes(examName.toLowerCase())
    )
  }
}