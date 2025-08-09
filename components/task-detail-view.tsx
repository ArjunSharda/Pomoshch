"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Heart, MapPin, Calendar, CheckCircle, X, Share2, Flag, Award, TrendingUp, MessageCircle, Send, Loader2, Play, Pause, RotateCcw } from 'lucide-react'

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
  avatar: string
}

interface TaskDetailViewProps {
  task: any
  onClose: () => void
  onComplete: (taskId: number) => void
  isCompleting: boolean
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Sarah M.",
    content: "This is such a meaningful opportunity! I'm excited to help spread some positivity to our healthcare heroes.",
    timestamp: "2 hours ago",
    avatar: "S"
  },
  {
    id: 2,
    author: "Mike R.",
    content: "Just completed my thank you note. It felt great to give back to those who do so much for our community.",
    timestamp: "4 hours ago", 
    avatar: "M"
  },
  {
    id: 3,
    author: "Emma L.",
    content: "Quick question - should we include our names in the thank you notes or keep them anonymous?",
    timestamp: "6 hours ago",
    avatar: "E"
  }
]

export function TaskDetailView({ task, onClose, onComplete, isCompleting }: TaskDetailViewProps) {
  const [taskStatus, setTaskStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started')
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const handleStatusChange = (status: 'not-started' | 'in-progress' | 'completed') => {
    setTaskStatus(status)
    if (status === 'completed') {
      onComplete(task.id)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    
    setIsSubmittingComment(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const comment: Comment = {
      id: Date.now(),
      author: "You",
      content: newComment,
      timestamp: "Just now",
      avatar: "Y"
    }
    
    setComments(prev => [comment, ...prev])
    setNewComment("")
    setIsSubmittingComment(false)
  }

  const getStatusIcon = () => {
    switch (taskStatus) {
      case 'not-started':
        return <Play className="w-4 h-4" />
      case 'in-progress':
        return <Pause className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  const getStatusColor = () => {
    switch (taskStatus) {
      case 'not-started':
        return 'bg-gray-900 hover:bg-gray-800'
      case 'in-progress':
        return 'bg-blue-600 hover:bg-blue-700'
      case 'completed':
        return 'bg-green-600 hover:bg-green-700'
      default:
        return 'bg-gray-900 hover:bg-gray-800'
    }
  }

  const getStatusText = () => {
    switch (taskStatus) {
      case 'not-started':
        return 'Start Task'
      case 'in-progress':
        return 'Mark Complete'
      case 'completed':
        return 'Completed'
      default:
        return 'Start Task'
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 p-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <Badge 
                variant={task.urgency === 'high' ? 'destructive' : 'default'}
                className="text-xs font-medium"
              >
                {task.category}
              </Badge>
              {task.urgency === 'high' && (
                <Badge variant="outline" className="text-xs text-red-600 border-red-200 font-medium">
                  Urgent
                </Badge>
              )}
              <Badge 
                variant="outline" 
                className={`text-xs font-medium ${
                  taskStatus === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                  taskStatus === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {taskStatus === 'not-started' ? 'Not Started' : 
                 taskStatus === 'in-progress' ? 'In Progress' : 'Completed'}
              </Badge>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
              {task.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center font-medium">
                <Clock className="w-4 h-4 mr-1" />
                {task.duration}
              </div>
              <div className="flex items-center font-medium">
                <MapPin className="w-4 h-4 mr-1" />
                {task.location}
              </div>
              <div className="flex items-center font-medium">
                <Calendar className="w-4 h-4 mr-1" />
                Posted {task.timePosted}
              </div>
              <div className="flex items-center font-medium">
                <Users className="w-4 h-4 mr-1" />
                {task.volunteers} volunteers joined
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">About This Opportunity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
            
            {task.instructions && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">How to Help</h3>
                <ol className="space-y-2">
                  {task.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Take Action</CardTitle>
            <CardDescription>Complete this task to make a positive impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Select value={taskStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                className={`${getStatusColor()} font-medium`}
                onClick={() => {
                  if (taskStatus === 'not-started') {
                    handleStatusChange('in-progress')
                  } else if (taskStatus === 'in-progress') {
                    handleStatusChange('completed')
                  }
                }}
                disabled={isCompleting || taskStatus === 'completed'}
              >
                {isCompleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {getStatusIcon()}
                    <span className="ml-2">{getStatusText()}</span>
                  </>
                )}
              </Button>
              
              {taskStatus !== 'not-started' && (
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChange('not-started')}
                  className="font-medium"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
            
            {taskStatus === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Task Completed!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Thank you for making a difference. Your contribution has been recorded.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Discussion ({comments.length})
            </CardTitle>
            <CardDescription>Connect with other volunteers and share your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Comment */}
            <div className="space-y-3">
              <Textarea 
                placeholder="Share your thoughts, ask questions, or encourage other volunteers..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] border-gray-200"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isSubmittingComment}
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-800 font-medium"
                >
                  {isSubmittingComment ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                      {comment.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg font-semibold">{task.organization}</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <CardDescription>Leading healthcare provider serving our community for over 50 years</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">1,250</div>
                <div className="text-xs text-gray-600 font-medium">Volunteers Helped</div>
              </div>
              <div>
                <div className="text-lg font-bold text-teal-600">89</div>
                <div className="text-xs text-gray-600 font-medium">Tasks Posted</div>
              </div>
            </div>
            <Button variant="outline" className="w-full font-medium" size="sm">
              View Organization Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Your Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Immediate Impact</div>
                <div className="text-sm text-gray-600">Your message will brighten a healthcare worker's day</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Long-term Impact</div>
                <div className="text-sm text-gray-600">Contributes to improved morale and mental health support</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Community Impact</div>
                <div className="text-sm text-gray-600">Part of 500+ thank you messages this month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Task Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Completion Goal</span>
                <span>24/50 volunteers</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div className="text-sm text-gray-600 font-medium">
              26 more volunteers needed to reach our goal!
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Earn Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-lg">🏆</div>
              <div>
                <div className="font-medium text-sm">Community Helper Badge</div>
                <div className="text-xs text-gray-600">Complete this task</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-lg">⭐</div>
              <div>
                <div className="font-medium text-sm">+50 Impact Points</div>
                <div className="text-xs text-gray-600">Towards next level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

