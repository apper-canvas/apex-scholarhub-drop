import { profileData } from '@/services/mockData/profileData'

export const profileService = {
  getProfile: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return { ...profileData }
  },
  
  updateProfile: async (updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would update the backend
    Object.assign(profileData, updatedData)
    
    return { ...profileData }
  }
}