import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { profileService } from "@/services/api/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  
  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await profileService.getProfile()
      setProfile(data)
      setEditData(data)
    } catch (err) {
      setError('Failed to load profile data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadProfile()
  }, [])
  
  const handleSave = async () => {
    try {
      await profileService.updateProfile(editData)
      setProfile(editData)
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile. Please try again.')
    }
  }
  
  const handleCancel = () => {
    setEditData(profile)
    setIsEditing(false)
  }
  
  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  if (loading) return <Loading type="card" />
  if (error) return <Error message={error} onRetry={loadProfile} />
  if (!profile) return null
  
  return (
    <div className="space-y-6">
    {/* Header */}
    <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-display text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and settings</p>
        </div>
        <div className="flex items-center gap-3">
            {isEditing ? <>
                <Button variant="ghost" onClick={handleCancel}>Cancel
                                  </Button>
                <Button variant="primary" icon="Save" onClick={handleSave}>Save Changes
                                  </Button>
            </> : <Button variant="primary" icon="Edit" onClick={() => setIsEditing(true)}>Edit Profile
                            </Button>}
        </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
            <Card>
                <div className="p-6 text-center">
                    <div className="relative inline-block mb-6">
                        <div
                            className="w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                            {profile.name.charAt(0)}
                        </div>
                        <div
                            className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                            <ApperIcon name="Check" size={16} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold font-display text-gray-900 mb-1">
                        {profile.name}
                    </h2>
                    <p className="text-gray-600 mb-4">Grade {profile.grade}• Section {profile.section}
                    </p>
                    <div className="flex justify-center gap-2 mb-6">
                        <Badge variant="primary">Active Student</Badge>
                        <Badge variant="success">Verified</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold font-display text-gray-900">
                                {profile.stats.totalSubjects}
                            </p>
                            <p className="text-sm text-gray-600">Subjects</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-display text-gray-900">
                                {profile.stats.attendance}%
                                                  </p>
                            <p className="text-sm text-gray-600">Attendance</p>
                        </div>
                    </div>
                </div>
            </Card>
            {/* Quick Stats */}
            <Card className="mt-6">
                <div className="p-6">
                    <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">Academic Performance
                                      </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Overall Grade</span>
                            <Badge variant="success" size="lg">{profile.stats.overallGrade}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Class Rank</span>
                            <span className="font-semibold text-gray-900">#{profile.stats.classRank}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total Credits</span>
                            <span className="font-semibold text-gray-900">{profile.stats.totalCredits}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">GPA</span>
                            <span className="font-semibold text-gray-900">{profile.stats.gpa}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold font-display text-gray-900 mb-6">Personal Information
                                      </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name
                                                  </label>
                            {isEditing ? <input
                                type="text"
                                value={editData.name || ""}
                                onChange={e => handleInputChange("name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.name || "Not provided"}</p>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address
                                                      </label>
                                {isEditing ? <input
                                    type="email"
                                    value={editData.email || ""}
                                    onChange={e => handleInputChange("email", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.email || "Not provided"}</p>}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number
                                                          </label>
                                    {isEditing ? <input
                                        type="tel"
                                        value={editData.phone || ""}
                                        onChange={e => handleInputChange("phone", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.phone || "Not provided"}</p>}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth
                                                              </label>
                                        {isEditing ? <input
                                            type="date"
                                            value={editData.dateOfBirth || ""}
                                            onChange={e => handleInputChange("dateOfBirth", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.dateOfBirth || "Not provided"}</p>}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address
                                                                  </label>
                                            {isEditing ? <textarea
                                                value={editData.address || ""}
                                                onChange={e => handleInputChange("address", e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.address || "Not provided"}</p>}
                                        </div>
                                    </div>
                                </div></div></div></div></div></Card>
            {/* Academic Information */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold font-display text-gray-900 mb-6">Academic Information
                                      </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number
                                                      </label>
                                <p className="text-gray-900 font-medium">{profile.rollNumber || "Not provided"}</p>
                            </label></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Grade
                                                  </label>
                            <p className="text-gray-900 font-medium">{profile.grade}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Section
                                                  </label>
                            <p className="text-gray-900 font-medium">{profile.section}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year
                                                  </label>
                            <p className="text-gray-900 font-medium">{profile.academicYear}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date
                                                  </label>
                            <p className="text-gray-900 font-medium">{profile.admissionDate}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">House
                                                  </label>
                            <p className="text-gray-900 font-medium">{profile.house}</p>
                        </div>
                    </div>
                </div>
            </Card>
            {/* Emergency Contact */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold font-display text-gray-900 mb-6">Emergency Contact
                                      </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name
                                                  </label>
                            {isEditing ? <input
                                type="text"
                                value={editData.guardianName || ""}
                                onChange={e => handleInputChange("guardianName", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.guardianName || "Not provided"}</p>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone
                                                      </label>
                                {isEditing ? <input
                                    type="tel"
                                    value={editData.guardianPhone || ""}
                                    onChange={e => handleInputChange("guardianPhone", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.guardianPhone || "Not provided"}</p>}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship
                                                          </label>
                                    <p className="text-gray-900 font-medium">{profile.guardianRelation}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Email
                                                          </label>
                                    {isEditing ? <input
                                        type="email"
                                        value={editData.guardianEmail || ""}
                                        onChange={e => handleInputChange("guardianEmail", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" /> : <p className="text-gray-900 font-medium">{profile.guardianEmail || "Not provided"}</p>}
                                </div>
                            </div>
                        </div></div></div></Card>
        </div>
    </div>
</div>
  )
}

export default Profile