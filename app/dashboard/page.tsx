"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"

import { useState, useEffect } from "react"

const helpHistory = [
  {
    id: 1,
    title: "Thank you note to Maria (nurse)",
    date: "Today",
    impact: "Made someone's tough week brighter",
    time: "2 min",
    status: "delivered",
  },
  {
    id: 2,
    title: "Helped Alex with fractions homework",
    date: "Yesterday",
    impact: "Kid understood math better",
    time: "3 min",
    status: "completed",
  },
  {
    id: 3,
    title: "Shared food bank post",
    date: "2 days ago",
    impact: "Helped 12 families get meals",
    time: "30 sec",
    status: "completed",
  },
  {
    id: 4,
    title: "Review for Sam's bakery",
    date: "3 days ago",
    impact: "Supported local business",
    time: "2 min",
    status: "completed",
  },
]

const todaysSuggestions = [
  {
    id: 5,
    title: "Send encouragement to Tom, a job seeker",
    time: "2 min",
    impact: "Boost someone's confidence",
    urgent: false,
  },
  {
    id: 6,
    title: "Help translate a welcome message",
    time: "3 min",
    impact: "Help new family feel welcome",
    urgent: true,
  },
]

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Hello")
  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning")
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-background" />
            </div>
            <span className="text-lg font-semibold text-foreground">pomoshch</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth">Settings</Link>
            </Button>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-foreground font-semibold text-sm">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">{greeting}, Alex! 👋</h1>
            <p className="text-lg text-muted-foreground">
              You've helped 4 people this week. Here's the difference you've made.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Ready to help someone today?</h2>
                <div className="space-y-4">
                  {todaysSuggestions.map((task) => (
                    <Card
                      key={task.id}
                      className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {task.urgent && (
                                <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-1">Needed today</Badge>
                              )}
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {task.time}
                              </div>
                            </div>
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-foreground transition-colors">
                              {task.title}
                            </h3>
                            <p className="text-muted-foreground">{task.impact}</p>
                          </div>
                          <Button className="ml-6 bg-foreground hover:bg-gray-800" asChild>
                            <Link href={`/help/${task.id}`}>
                              Help now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Your recent help</h2>
                <div className="space-y-3">
                  {helpHistory.map((help) => (
                    <Card key={help.id} className="border-0 bg-muted/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-medium text-foreground">{help.title}</h3>
                              {help.status === "delivered" && (
                                <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">Delivered</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-1">{help.impact}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {help.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {help.time}
                              </div>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-0 bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">Your impact</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">4</div>
                      <div className="text-sm text-muted-foreground">people helped this week</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">12 min</div>
                      <div className="text-sm text-muted-foreground">time given</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">3 days</div>
                      <div className="text-sm text-muted-foreground">helping streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Recent thank you</h3>
                  <p className="text-muted-foreground italic mb-3">
                    "Your note made my whole week better. Thank you for thinking of healthcare workers like me."
                  </p>
                  <p className="text-sm text-muted-foreground">— Maria, from yesterday</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Invite a friend</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Know someone who'd love to help? Share pomoshch with them.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Share pomoshch
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
