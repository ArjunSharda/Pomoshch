import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Heart, ArrowRight, Sparkles, MessageCircle } from "lucide-react"
import Link from "next/link"

const quickHelp = [
  {
    id: 1,
    title: "Write a thank you note to Maria, a nurse working night shifts",
    time: "2 min",
    impact: "Brighten someone's tough week",
    urgent: false,
    description:
      "Maria has been working extra shifts to cover for sick colleagues. A simple thank you would mean the world to her right now.",
  },
  {
    id: 2,
    title: "Help 8-year-old Alex understand fractions",
    time: "3 min",
    impact: "Help a kid with homework",
    urgent: true,
    description:
      "Alex is struggling with 1/2 + 1/4 and getting frustrated. His mom is working late and could use some help.",
  },
  {
    id: 3,
    title: "Share a post about the community food drive",
    time: "30 sec",
    impact: "Help families get meals",
    urgent: false,
    description:
      "The local food bank is running low before the weekend. A quick share could help them reach more families.",
  },
]

const recentStories = [
  {
    helper: "Sarah M.",
    story:
      "I helped translate a welcome letter for a refugee family. Two weeks later, I got a photo of their kids at their first day of school. Made my whole month.",
    time: "3 days ago",
  },
  {
    helper: "Mike R.",
    story:
      "Spent 2 minutes writing a review for a struggling local bakery. The owner messaged me saying it was exactly what they needed to keep going.",
    time: "1 week ago",
  },
  {
    helper: "Emma L.",
    story:
      "Helped a high schooler with college essay feedback. She got into her dream school and sent me the acceptance letter. I'm still smiling.",
    time: "2 weeks ago",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple header */}
      <header className="px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-semibold text-foreground">pomoshch</span>
          </div>
          <Button variant="ghost" asChild className="text-muted-foreground">
            <Link href="/auth">Sign in</Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                Got 5 minutes?
                <br />
                <span className="text-muted-foreground">Someone needs your help.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                Real people in your community need small favors. The kind that take minutes but mean everything.
              </p>
              <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
                No long commitments. No complicated sign-ups. Just human beings helping human beings, one small act of
                kindness at a time.
              </p>

              {/* Subtle community indicator */}
              <div className="flex items-center justify-center space-x-6 mb-12">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-muted-foreground font-medium text-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-muted/50 border-2 border-background flex items-center justify-center text-muted-foreground/60 text-xs">
                    +2.8k
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">2,847 people</span> helped someone this week
                </div>
              </div>
            </div>
          </div>

          {/* Quick help cards */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-foreground mb-4">Right now, you could help...</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These are real requests from people in your area. Each one is a chance to make someone's day a little
                brighter.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {quickHelp.map((task, index) => (
                <Card
                  key={task.id}
                  className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          {task.urgent && (
                            <Badge className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 text-xs px-3 py-1">
                              Needed today
                            </Badge>
                          )}
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {task.time}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-muted-foreground transition-colors">
                          {task.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4 text-lg">{task.description}</p>
                        <div className="flex items-center text-muted-foreground">
                          <Heart className="w-4 h-4 mr-2 text-muted-foreground/60" />
                          <span className="font-medium">{task.impact}</span>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        className="ml-8 bg-foreground hover:bg-foreground/90 group-hover:bg-foreground/90 transition-colors text-background"
                        asChild
                      >
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

          {/* Why this matters section */}
          <div className="py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">Why small acts matter</h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                We live in a world that feels increasingly disconnected. But the truth is, most problems aren't solved
                by grand gestures. They're solved by ordinary people doing small, kind things for each other.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">It's personal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every request comes from a real person with a real need. You're not helping "the community"—you're
                    helping Maria, Alex, or Sam.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">It fits your life</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No meetings, no long-term commitments. Help when you can, how you can. Five minutes while your
                    coffee brews.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">It feels good</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    There's something magical about helping someone and knowing exactly how it mattered. It's the best
                    part of anyone's day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stories from helpers */}
          <div className="py-20 bg-muted/30 -mx-6 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-4">Stories from helpers</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The best part isn't the helping—it's the moment you realize how much it mattered.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {recentStories.map((story, index) => (
                  <Card key={index} className="border-0 bg-background shadow-sm">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <MessageCircle className="w-4 h-4 text-muted-foreground/60" />
                        <span className="text-sm font-medium text-foreground">{story.helper}</span>
                        <span className="text-sm text-muted-foreground">{story.time}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">"{story.story}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Simple stats */}
          <div className="py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">This week on pomoshch</h2>
              <p className="text-muted-foreground">Small numbers that represent real human connections</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">2,847</div>
                <div className="text-muted-foreground">people helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">3.2 min</div>
                <div className="text-muted-foreground">average help time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">94%</div>
                <div className="text-muted-foreground">say it made their day</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">1,203</div>
                <div className="text-muted-foreground">thank you messages</div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="py-20 border-t border-border">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-4">How it works</h2>
                <p className="text-lg text-muted-foreground">
                  It's designed to be as simple as possible, because helping shouldn't be complicated.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    step: "1",
                    title: "See who needs help",
                    description:
                      "Browse real requests from people in your community. Each one tells you exactly what's needed and how long it takes.",
                  },
                  {
                    step: "2",
                    title: "Choose what feels right",
                    description:
                      "Pick something that matches your time, skills, or just your mood. No pressure, no guilt if you skip something.",
                  },
                  {
                    step: "3",
                    title: "Help and feel good",
                    description:
                      "Do the small thing. Get a thank you. See exactly how it mattered. Feel that warm feeling that lasts all day.",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6">Ready to help someone today?</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                There's someone out there who could really use what you have to offer. It might be two minutes of your
                time, or a skill you take for granted, or just a kind word.
              </p>
              <p className="text-lg text-muted-foreground/80 mb-12">
                The best part? You'll probably get more out of it than they do.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-foreground hover:bg-foreground/90 text-lg px-8 py-3 text-background"
                  asChild
                >
                  <Link href="/auth">
                    Start helping
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent" asChild>
                  <Link href="#how-it-works">Learn more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-background" />
              </div>
              <span className="text-lg font-semibold text-foreground">pomoshch</span>
              <span className="text-sm text-muted-foreground">• помощь means "help" in Russian</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
