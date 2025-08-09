"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Heart, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const taskData: Record<string, any> = {
    "1": {
        id: 1,
        title: "Write a thank you note to Maria, a nurse working night shifts",
        time: "2 min",
        impact: "Brighten someone's tough week",
        category: "Thank you note",
        description:
            "Maria has been working extra shifts to cover for sick colleagues at City General Hospital. She's been pulling 12-hour night shifts for two weeks straight. A heartfelt thank you note would remind her that her hard work is noticed and appreciated.",
        instructions: [
            "Write a personal message thanking Maria for her dedication",
            "Keep it warm and genuine - no need to be formal",
            "Mention how healthcare workers like her make a difference",
            "We'll make sure Maria receives your note",
        ],
        examples: [
            "Dear Maria, Thank you for everything you do during these long night shifts. Your dedication to caring for others, especially when you're covering extra shifts, doesn't go unnoticed. You're making a real difference. Take care of yourself too. ❤️",
            "Hi Maria! I heard you've been working extra hard lately covering night shifts. I just wanted you to know that your commitment to helping others is truly inspiring. Thank you for all you do - you're a hero! 🌟",
        ],
        completionMessage: "Your message is on its way to Maria! 💚",
        completionDetail:
            "She'll receive your note tomorrow morning. Thank you for taking the time to brighten someone's day.",
    },
    "2": {
        id: 2,
        title: "Help 8-year-old Alex understand fractions",
        time: "3 min",
        impact: "Help a kid with homework",
        category: "Tutoring help",
        description:
            "Alex is struggling with adding fractions like 1/2 + 1/4 and getting frustrated with his math homework. His mom Sarah is working a double shift at the hospital and asked if someone could help explain it in a simple way that makes sense to an 8-year-old.",
        instructions: [
            "Explain fractions using simple, kid-friendly language",
            "Use examples Alex can relate to (like pizza slices or cookies)",
            "Keep it encouraging and positive - he's already feeling frustrated",
            "Write it like you're talking directly to Alex",
        ],
        examples: [
            "Hey Alex! Fractions are like sharing pizza 🍕. If you have 1/2 of a pizza (that's half) and your friend gives you 1/4 more (that's a quarter), you add them together! Think of it like this: 1/2 = 2/4, so 2/4 + 1/4 = 3/4. You'd have 3 out of 4 pizza slices! Pretty cool, right?",
            "Hi Alex! I know fractions can be tricky, but you're doing great! Think of fractions like cookies 🍪. If you have 1/2 of your cookies and get 1/4 more, first make them the same size pieces: 1/2 = 2/4. Then 2/4 + 1/4 = 3/4 cookies total! You've got this, buddy!",
        ],
        completionMessage: "Your explanation is heading to Alex! 📚",
        completionDetail: "His mom will read it to him after school. Thanks for helping a kid understand math better!",
    },
    "3": {
        id: 3,
        title: "Share a post about the community food drive",
        time: "30 sec",
        impact: "Help families get meals",
        category: "Social sharing",
        description:
            "The Riverside Community Food Bank is running critically low on supplies before the weekend. They need to reach more families who could benefit, and more donors who can help. A simple share on social media could make the difference between families having dinner or going hungry.",
        instructions: [
            "Share the food drive post on your social media",
            "Add a personal message about why community support matters",
            "Tag friends who might want to help or benefit",
            "Use hashtags #RiversideFoodDrive #CommunitySupport",
        ],
        examples: [
            "🍽️ Our local food bank needs our help! The Riverside Community Food Drive is running low just before the weekend. If you can donate non-perishables or know families who need support, please reach out. Every can counts! #RiversideFoodDrive #CommunitySupport",
            "Hey friends! 💙 The Riverside Food Bank is almost empty and the weekend is coming. Let's help our neighbors - whether you can donate a few cans or know someone who needs groceries, every bit helps. Community is everything! #RiversideFoodDrive",
        ],
        completionMessage: "Your share is helping spread the word! 📢",
        completionDetail: "Thanks to shares like yours, the food drive has already reached 200+ more people today.",
    },
    "5": {
        id: 5,
        title: "Send encouragement to Tom, a job seeker",
        time: "2 min",
        impact: "Boost someone's confidence",
        category: "Encouragement",
        description:
            "Tom has been looking for work for 4 months after being laid off from his marketing job. He's starting to lose confidence and feeling discouraged after several rejections. His friend mentioned he could really use some words of encouragement from the community.",
        instructions: [
            "Write an encouraging message to boost Tom's spirits",
            "Acknowledge that job searching is tough but he shouldn't give up",
            "Share positive thoughts about his skills and potential",
            "Keep it genuine and supportive",
        ],
        examples: [
            "Hi Tom! I know job searching can feel overwhelming and discouraging, but please don't give up. Four months feels long, but the right opportunity is out there waiting for you. Your marketing skills and experience are valuable - sometimes it just takes time to find the right fit. You've got this! 💪",
            "Hey Tom, just wanted to send some encouragement your way! Job hunting is one of the hardest things we go through, and it's totally normal to feel discouraged. But remember - every 'no' gets you closer to the right 'yes.' Your persistence shows character, and that's exactly what good employers are looking for. Hang in there! ✨",
        ],
        completionMessage: "Your encouragement is on its way to Tom! 💪",
        completionDetail:
            "Messages like yours remind job seekers they're not alone. Thank you for lifting someone up today.",
    },
    "6": {
        id: 6,
        title: "Help translate a welcome message",
        time: "3 min",
        impact: "Help new family feel welcome",
        category: "Translation",
        description:
            "The Rodriguez family just moved to our neighborhood from El Salvador. The community center wants to send them a welcome message in Spanish to help them feel at home, but they need someone to translate a short, warm greeting that explains local resources and shows they're welcomed here.",
        instructions: [
            "Translate the welcome message into clear, friendly Spanish",
            "Keep the tone warm and welcoming",
            "Make sure it sounds natural, not like a machine translation",
            "Include information about community resources if you can",
        ],
        examples: [
            "¡Bienvenidos a nuestro vecindario, familia Rodriguez! Nos alegra mucho tenerlos aquí. Nuestra comunidad está aquí para apoyarlos - tenemos un centro comunitario con clases de inglés, un banco de alimentos, y muchos vecinos amables. Si necesitan algo o tienen preguntas, no duden en preguntar. ¡Esperamos conocerlos pronto! 🏠❤️",
            "¡Hola familia Rodriguez! Queremos darles la más cálida bienvenida a nuestro barrio. Sabemos que mudarse puede ser difícil, pero aquí tienen una comunidad que los apoya. Hay recursos disponibles y vecinos que están felices de ayudar. ¡Esperamos que se sientan como en casa muy pronto! 🌟",
        ],
        completionMessage: "Your translation is being delivered! 🌍",
        completionDetail:
            "The Rodriguez family will receive this tomorrow. Thank you for helping new neighbors feel welcomed.",
    },
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default function HelpPage({ params }: PageProps) {
    const router = useRouter()
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
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
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Request not found</h1>
                    <p className="text-muted-foreground mb-6">
                        This help request might have been completed or is no longer available.
                    </p>
                    <Button asChild>
                        <Link href="/">Find other ways to help</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const handleSubmit = async () => {
        if (!message.trim()) return

        setIsSubmitting(true)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsComplete(true)

        setTimeout(() => {
            router.push(`/complete?task=${task.id}`)
        }, 2000)
    }

    const handleUseExample = (example: string) => {
        setMessage(example)
    }

    if (isComplete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-4">{task.completionMessage}</h1>
                    <p className="text-muted-foreground mb-6">{task.completionDetail}</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Taking you to see your impact...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="px-6 py-6 border-b border-border">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Button variant="ghost" asChild className="text-muted-foreground">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                            <Heart className="w-4 h-4 text-background" />
                        </div>
                        <span className="text-lg font-semibold text-foreground">pomoshch</span>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Task header */}
                    <div className="mb-12">
                        <div className="flex items-center space-x-3 mb-4">
                            <Badge className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm px-3 py-1">
                                {task.category}
                            </Badge>
                            <div className="flex items-center text-muted-foreground">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="text-sm">{task.time}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">{task.title}</h1>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{task.description}</p>

                        <div className="flex items-center text-muted-foreground">
                            <Heart className="w-5 h-5 mr-2 text-muted-foreground/60" />
                            <span>{task.impact}</span>
                        </div>
                    </div>

                    <Card className="mb-8 border-0 bg-muted/50">
                        <CardContent className="p-8">
                            <h2 className="text-xl font-semibold text-foreground mb-4">How to help</h2>
                            <ol className="space-y-3">
                                {task.instructions.map((instruction: string, index: number) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-muted-foreground/20 rounded-full flex items-center justify-center text-sm font-medium text-foreground mt-0.5">
                                            {index + 1}
                                        </div>
                                        <span className="text-muted-foreground leading-relaxed">{instruction}</span>
                                    </li>
                                ))}
                            </ol>
                        </CardContent>
                    </Card>

                    {/* Message form */}
                    <Card className="mb-8 border-0 shadow-sm">
                        <CardContent className="p-8">
                            <h2 className="text-xl font-semibold text-foreground mb-4">Your {task.category.toLowerCase()}</h2>
                            <Textarea
                                placeholder={`Write your ${task.category.toLowerCase()} here... Be yourself, your genuine words will make the biggest impact.`}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[120px] text-base leading-relaxed border-border mb-4"
                            />
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    {message.length > 0 ? `${message.length} characters` : "Take your time, there's no rush"}
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!message.trim() || isSubmitting}
                                    className="bg-foreground hover:bg-foreground/90 text-background"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-4 h-4 mr-2" />
                                            Send help
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-muted/50">
                        <CardContent className="p-8">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Need inspiration? Here are some examples</h3>
                            <div className="space-y-4">
                                {task.examples.map((example: string, index: number) => (
                                    <div key={index} className="bg-background p-4 rounded-lg border border-border">
                                        <p className="text-muted-foreground leading-relaxed mb-3 italic">"{example}"</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleUseExample(example)}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            Use this as a starting point
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}