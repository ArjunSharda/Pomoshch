"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Heart, MapPin, Calendar, CheckCircle, ArrowLeft, Share2, Flag, Award, TrendingUp, Loader2 } from 'lucide-react'
import Link from "next/link"

const taskData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Write Thank You Notes to Healthcare Workers",
    organization: "City General Hospital",
    duration: "3 minutes",
    impactSummary: "Brighten someone's day", // Renamed from 'impact'
    category: "Community Support",
    volunteers: 24,
    location: "Remote",
    urgency: "high",
    description: "Help us show appreciation to our frontline healthcare workers by writing personalized thank you notes. Your words of encouragement will be delivered to doctors, nurses, and support staff who have been working tirelessly to keep our community healthy.",
    timePosted: "2 hours ago",
    instructions: [
      "Choose from one of the suggested templates or write your own message",
      "Keep the tone positive and encouraging",
      "Mention specific appreciation for their dedication and hard work",
      "Submit your message and we'll ensure it reaches a healthcare worker"
    ],
    templates: [
      "Thank you for your incredible dedication and the sacrifices you make every day to keep our community safe and healthy. Your compassion and expertise make a real difference in so many lives.",
      "Your hard work and commitment during these challenging times inspire us all. Thank you for being a hero in scrubs and for everything you do to care for others.",
      "We are so grateful for your service and the long hours you put in to help others. Your kindness and professionalism mean the world to patients and families."
    ],
    organizationInfo: {
      name: "City General Hospital",
      verified: true,
      description: "Leading healthcare provider serving our community for over 50 years",
      volunteersHelped: 1250,
      tasksPosted: 89
    },
    impact: {
      immediate: "Your message will brighten a healthcare worker's day",
      longTerm: "Contributes to improved morale and mental health support",
      community: "Part of 500+ thank you messages this month"
    }
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TaskDetail({ params }: PageProps) {
  const [taskId, setTaskId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params
        setTaskId(resolvedParams.id)
      } catch (error) {
        console.error("Error resolving params:", error)
      } finally {
        setIsLoading(false)
      }
    }

    resolveParams()
  }, [params])

  const task = taskId ? taskData[taskId] : null

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">Loading task...</p>
          </div>
        </div>
    )
  }

  if (!task) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Task not found</h1>
            <p className="text-gray-600 mb-6">This task might have been removed or is no longer available.</p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <nav className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">QuickImpact</span>
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
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge
                          variant={task.urgency === 'high' ? 'destructive' : 'default'}
                          className="text-xs"
                      >
                        {task.category}
                      </Badge>
                      {task.urgency === 'high' && (
                          <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                            Urgent
                          </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.duration}
                    </div>
                  </div>

                  <CardTitle className="text-2xl leading-tight mb-2">
                    {task.title}
                  </CardTitle>

                  <CardDescription className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {task.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Posted {task.timePosted}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {task.volunteers} volunteers joined
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">About This Opportunity</h3>
                    <p className="text-gray-700 leading-relaxed">{task.description}</p>
                  </div>

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

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Message Templates (Optional)</h3>
                    <div className="space-y-3">
                      {task.templates.map((template: string, index: number) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-700 italic">"{template}"</p>
                            <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs">
                              Use This Template
                            </Button>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Write Your Thank You Message</h3>
                    <div className="space-y-4">
                      <Textarea
                          placeholder="Write your heartfelt message here... Your words will make a real difference!"
                          className="min-h-[120px]"
                      />
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Tip:</span> Personal messages have the biggest impact!
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline">Save Draft</Button>
                          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Submit Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{task.organizationInfo.name}</CardTitle>
                    {task.organizationInfo.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <CardDescription>{task.organizationInfo.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{task.organizationInfo.volunteersHelped}</div>
                      <div className="text-xs text-gray-600">Volunteers Helped</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-teal-600">{task.organizationInfo.tasksPosted}</div>
                      <div className="text-xs text-gray-600">Tasks Posted</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    View Organization Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">Immediate Impact</div>
                      <div className="text-sm text-gray-600">{task.impact.immediate}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">Long-term Impact</div>
                      <div className="text-sm text-gray-600">{task.impact.longTerm}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">Community Impact</div>
                      <div className="text-sm text-gray-600">{task.impact.community}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Task Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Goal</span>
                      <span>24/50 volunteers</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    26 more volunteers needed to reach our goal!
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
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
        </div>
      </div>
  )
}