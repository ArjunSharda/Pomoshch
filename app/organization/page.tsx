"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Plus, Users, TrendingUp, Clock, CheckCircle, Eye, Edit, Trash2, BarChart3, Calendar, MapPin, X, Loader2 } from 'lucide-react'
import Link from "next/link"

interface Task {
  id: number
  title: string
  category: string
  duration: string
  volunteers: number
  status: 'active' | 'completed'
  posted: string
  views: number
  applications: number
}

interface NewTask {
  title: string
  category: string
  duration: string
  description: string
  instructions: string
  impact: string
  location: string
}

const organizationStats = {
  tasksPosted: 28,
  volunteersEngaged: 189,
  totalImpact: 1247,
  activeOpportunities: 12
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Write Thank You Notes to Healthcare Workers",
    category: "Community Support",
    duration: "3 minutes",
    volunteers: 24,
    status: "active",
    posted: "2 hours ago",
    views: 89,
    applications: 24
  },
  {
    id: 2,
    title: "Help Student with Math Homework",
    category: "Education",
    duration: "5 minutes",
    volunteers: 12,
    status: "active",
    posted: "4 hours ago",
    views: 45,
    applications: 12
  },
  {
    id: 3,
    title: "Share Local Food Bank Post",
    category: "Social Media",
    duration: "1 minute",
    volunteers: 45,
    status: "completed",
    posted: "1 day ago",
    views: 156,
    applications: 45
  }
]

export default function OrganizationDashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isCreating, setIsCreating] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    category: '',
    duration: '',
    description: '',
    instructions: '',
    impact: '',
    location: ''
  })

  const handleCreateTask = async () => {
    setIsCreating(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      category: newTask.category,
      duration: newTask.duration,
      volunteers: 0,
      status: 'active',
      posted: 'Just now',
      views: 0,
      applications: 0
    }

    setTasks(prev => [task, ...prev])
    setNewTask({
      title: '',
      category: '',
      duration: '',
      description: '',
      instructions: '',
      impact: '',
      location: ''
    })
    setIsCreating(false)
  }

  const handleDeleteTask = async (taskId: number) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">QuickImpact</span>
                <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-700 font-medium">Organization</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild className="font-medium">
                  <Link href="/dashboard">Switch to Volunteer View</Link>
                </Button>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                  O
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                City General Hospital Dashboard
              </h1>
              <p className="text-gray-600 font-medium">
                Manage your volunteer opportunities and track community impact. Last updated: January 2025
              </p>
            </div>
            <Button className="bg-gray-900 hover:bg-gray-800 font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Post New Opportunity
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tasks Posted</p>
                    <p className="text-2xl font-bold text-gray-900">{organizationStats.tasksPosted}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Volunteers Engaged</p>
                    <p className="text-2xl font-bold text-gray-900">{organizationStats.volunteersEngaged}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Impact</p>
                    <p className="text-2xl font-bold text-gray-900">{organizationStats.totalImpact}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Opportunities</p>
                    <p className="text-2xl font-bold text-gray-900">{organizationStats.activeOpportunities}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="opportunities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-gray-100">
              <TabsTrigger value="opportunities" className="font-medium">Opportunities</TabsTrigger>
              <TabsTrigger value="analytics" className="font-medium">Analytics</TabsTrigger>
              <TabsTrigger value="post-new" className="font-medium">Post New</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="font-semibold">Your Posted Opportunities</CardTitle>
                  <CardDescription>
                    Manage and track your volunteer opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                                <Badge
                                    variant={task.status === 'active' ? 'default' : 'secondary'}
                                    className="text-xs font-medium"
                                >
                                  {task.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center font-medium">
                              <Clock className="w-3 h-3 mr-1" />
                              {task.duration}
                            </span>
                                <span className="flex items-center font-medium">
                              <Calendar className="w-3 h-3 mr-1" />
                                  {task.posted}
                            </span>
                                <Badge variant="outline" className="text-xs font-medium bg-gray-50">
                                  {task.category}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center font-medium">
                              <Eye className="w-3 h-3 mr-1" />
                              {task.views} views
                            </span>
                                <span className="flex items-center font-medium">
                              <Users className="w-3 h-3 mr-1" />
                                  {task.applications} volunteers
                            </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditTask(task)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="font-semibold">Volunteer Engagement</CardTitle>
                    <CardDescription>Track how volunteers interact with your opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">Average Response Time</span>
                        <span className="font-bold">2.3 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">Completion Rate</span>
                        <span className="font-bold">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">Volunteer Satisfaction</span>
                        <span className="font-bold">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="font-semibold">Impact Metrics</CardTitle>
                    <CardDescription>Measure the difference you're making</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">People Helped</span>
                        <span className="font-bold">847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">Community Reach</span>
                        <span className="font-bold">2,340</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">Positive Feedback</span>
                        <span className="font-bold">98%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="post-new" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="font-semibold">Post New Volunteer Opportunity</CardTitle>
                  <CardDescription>
                    Create a new micro-volunteering opportunity for your community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="font-medium">Opportunity Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Write thank you notes to volunteers"
                            value={newTask.title}
                            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                            className="mt-1 border-gray-200"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category" className="font-medium">Category</Label>
                        <Select value={newTask.category} onValueChange={(value) => setNewTask(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger className="mt-1 border-gray-200">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="community">Community Support</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="translation">Translation</SelectItem>
                            <SelectItem value="mentorship">Mentorship</SelectItem>
                            <SelectItem value="research">Research</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="duration" className="font-medium">Estimated Duration</Label>
                        <Select value={newTask.duration} onValueChange={(value) => setNewTask(prev => ({ ...prev, duration: value }))}>
                          <SelectTrigger className="mt-1 border-gray-200">
                            <SelectValue placeholder="How long will this take?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 minute">1 minute</SelectItem>
                            <SelectItem value="2 minutes">2 minutes</SelectItem>
                            <SelectItem value="3 minutes">3 minutes</SelectItem>
                            <SelectItem value="4 minutes">4 minutes</SelectItem>
                            <SelectItem value="5 minutes">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location" className="font-medium">Location Type</Label>
                        <Select value={newTask.location} onValueChange={(value) => setNewTask(prev => ({ ...prev, location: value }))}>
                          <SelectTrigger className="mt-1 border-gray-200">
                            <SelectValue placeholder="Where can volunteers help?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Local">Local/In-Person</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="description" className="font-medium">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe what volunteers will do and why it matters..."
                            value={newTask.description}
                            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                            className="mt-1 min-h-[100px] border-gray-200"
                        />
                      </div>

                      <div>
                        <Label htmlFor="instructions" className="font-medium">Instructions for Volunteers</Label>
                        <Textarea
                            id="instructions"
                            placeholder="Step-by-step instructions for completing this task..."
                            value={newTask.instructions}
                            onChange={(e) => setNewTask(prev => ({ ...prev, instructions: e.target.value }))}
                            className="mt-1 min-h-[100px] border-gray-200"
                        />
                      </div>

                      <div>
                        <Label htmlFor="impact" className="font-medium">Expected Impact</Label>
                        <Input
                            id="impact"
                            placeholder="e.g., Brighten someone's day, Support education"
                            value={newTask.impact}
                            onChange={(e) => setNewTask(prev => ({ ...prev, impact: e.target.value }))}
                            className="mt-1 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Preview your opportunity before posting</p>
                        <p>Make sure all details are clear and actionable for volunteers.</p>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" className="font-medium border-gray-200">Save Draft</Button>
                        <Button
                            onClick={handleCreateTask}
                            disabled={isCreating || !newTask.title || !newTask.category}
                            className="bg-gray-900 hover:bg-gray-800 font-medium"
                        >
                          {isCreating ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                          ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Post Opportunity
                              </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent className="sm:max-w-md">
            {editingTask && (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <DialogTitle className="font-semibold">Edit Opportunity</DialogTitle>
                        <DialogDescription>Make changes to your volunteer opportunity</DialogDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setEditingTask(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title" className="font-medium">Title</Label>
                      <Input
                          id="edit-title"
                          value={editingTask.title}
                          onChange={(e) => setEditingTask((prev: Task | null) =>
                              prev ? { ...prev, title: e.target.value } : null
                          )}
                          className="mt-1 border-gray-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="edit-category" className="font-medium">Category</Label>
                      <Input
                          id="edit-category"
                          value={editingTask.category}
                          onChange={(e) => setEditingTask((prev: Task | null) =>
                              prev ? { ...prev, category: e.target.value } : null
                          )}
                          className="mt-1 border-gray-200"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setEditingTask(null)} className="font-medium">
                        Cancel
                      </Button>
                      <Button
                          onClick={() => {
                            if (editingTask) {
                              setTasks(prev => prev.map(task =>
                                  task.id === editingTask.id ? editingTask : task
                              ))
                              setEditingTask(null)
                            }
                          }}
                          className="bg-gray-900 hover:bg-gray-800 font-medium"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </>
            )}
          </DialogContent>
        </Dialog>
      </div>
  )
}