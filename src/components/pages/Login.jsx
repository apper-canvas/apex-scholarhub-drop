import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'

function Login() {
  const { isInitialized } = useContext(AuthContext)
  
  useEffect(() => {
    if (isInitialized) {
      const { ApperUI } = window.ApperSDK
      ApperUI.showLogin("#authentication")
    }
  }, [isInitialized])
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-2xl 2xl:text-3xl font-bold">
            S
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold">
              Sign in to ScholarHub
            </div>
            <div className="text-center text-sm text-gray-500">
              Welcome back, please sign in to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login