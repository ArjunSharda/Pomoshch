"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowRight, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

const taskCompletions: Record<string, any> = {
  "1": {
    name: "Maria",
    message: "You just made Maria's day! 💚",
    detail:
      "Your thank you note will reach Maria tomorrow morning when she starts her shift. Healthcare workers like her rarely hear how much their work means to people.",
    impact: "One person feeling appreciated and valued. Sometimes that's exactly what someone needs to keep going.",
  },
  "2": {
    name: "Alex",
    message: "Alex is going to understand fractions now! 📚",
    detail:
      "His mom will read your explanation to him after school. Thanks to helpers like you, Alex won't go to bed frustrated with his homework tonight.",
    impact: "One kid who won't give up on math. Your simple explanation might be the moment everything clicks for him.",
  },
  "3": {
    name: "families",
    message: "You just helped families get dinner! 🍽️",
    detail:
      "Your share has already been seen by 47 people, and 3 new donations have come in. The food bank says they'll have enough for the weekend now.",
    impact: "Real families with full fridges tonight. Sometimes the smallest actions create the biggest ripples.",
  },
  "5": {
    name: "Tom",
    message: "Tom needed to hear that today! 💪",
    detail:
      "Your encouragement will reach Tom this evening. Job searching is lonely, but messages like yours remind people they're not going through it alone.",
    impact: "One person who won't give up on their dreams. Your words might be exactly what Tom needs to keep going.",
  },
  "6": {
    name: "the Rodriguez family",
    message: "The Rodriguez family will feel so welcomed! 🌍",
    detail:
      "Your translation will be delivered tomorrow along with a welcome basket. Moving to a new country is scary, but your words will help them feel at home.",
    impact: "A family feeling like they belong. Your translation bridges more than language - it bridges hearts.",
  },
}

const nextOpportunities = [
  {
    id: 2,
    title: "Help 8-year-old Alex understand fractions",
    time: "3 min",
    impact: "Help a kid with homework",
    urgent: true,
  },
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

export default function CompletePage() {
  const [showNext, setShowNext] = useState(false)
  const searchParams = useSearchParams()
  const taskId = searchParams.get("task") || "1"

  const completion = taskCompletions[taskId] || taskCompletions["1"]

  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const availableOpportunities = nextOpportunities.filter((opp) => opp.id.toString() !== taskId)

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-background" />
            </div>
            <span className="text-lg font-semibold text-foreground">pomoshch</span>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-16">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-6">{completion.message}</h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{completion.detail}</p>

            <Card className="border-0 bg-muted/50 text-left max-w-md mx-auto mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-semibold text-foreground">Your impact today</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{completion.impact}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16 py-12 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Your helping journey</h2>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">4</div>
                <div className="text-muted-foreground">people helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">12 min</div>
                <div className="text-muted-foreground">time given</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">3 days</div>
                <div className="text-muted-foreground">helping streak</div>
              </div>
            </div>
          </div>

          {showNext && availableOpportunities.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Feeling good? Here's how you could help next...
              </h2>
              <div className="space-y-4 mb-8">
                {availableOpportunities.slice(0, 2).map((task) => (
                  <Card
                    key={task.id}
                    className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group text-left"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {task.urgent && (
                              <Badge className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 text-xs px-2 py-1">
                                Needed today
                              </Badge>
                            )}
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {task.time}
                            </div>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-muted-foreground transition-colors">
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{task.impact}</p>
                        </div>
                        <Button size="sm" className="ml-4 bg-foreground hover:bg-foreground/90 text-background" asChild>
                          <Link href={`/help/${task.id}`}>Help</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">See all my help</Link>
                </Button>
                <Button className="bg-foreground hover:bg-foreground/90 text-background" asChild>
                  <Link href="/">
                    Find more ways to help
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
