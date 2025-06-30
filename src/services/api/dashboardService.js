import { dashboardData } from '@/services/mockData/dashboardData'

export const dashboardService = {
  getDashboardData: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return dashboardData
  }
}