"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Star, Heart, Share2, ArrowRight } from 'lucide-react'

interface TaskCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
  organization: string
  impact: string
}

export function TaskCompletionModal({ 
  isOpen, 
  onClose, 
  taskTitle, 
  organization, 
  impact 
}: TaskCompletionModalProps) {
  const [showImpact, setShowImpact] = useState(false)

  const handleComplete = () => {
    setShowImpact(true)
    setTimeout(() => {
      onClose()
      setShowImpact(false)
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!showImpact ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Task Completed!</span>
              </DialogTitle>
              <DialogDescription>
                Thank you for completing "{taskTitle}" for {organization}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Impact Created</p>
                      <p className="text-sm text-green-700">{impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handleComplete} className="bg-gradient-to-r from-blue-600 to-teal-600">
                  See My Impact <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Amazing Work! 🎉
              </h3>
              <p className="text-gray-600">
                You've just made a real difference in someone's life. Your contribution matters!
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">+50</div>
                <div className="text-xs text-gray-600">Impact Points</div>
              </div>
              <div>
                <div className="text-lg font-bold text-teal-600">+1</div>
                <div className="text-xs text-gray-600">Task Complete</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">+1</div>
                <div className="text-xs text-gray-600">Person Helped</div>
              </div>
            </div>
            
            <Badge className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              🏆 Community Helper Badge Earned!
            </Badge>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
