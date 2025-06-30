import { syllabusData } from '@/services/mockData/syllabusData'

export const syllabusService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return [...syllabusData]
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return syllabusData.find(subject => subject.Id === parseInt(id))
  }
}