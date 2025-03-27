"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  Github,
  MessageCircle,
  BarChart3,
  Users,
  CreditCard,
  Calendar,
  Clock,
  AlertTriangle,
  Award,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilloutPopupEmbed } from "@fillout/react"
import "@fillout/react/style.css"

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)
  const [hoursLeft, setHoursLeft] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  
  // Calculate end of week (Sunday 11:59 PM)
  const getEndOfWeek = (): Date => {
    const now = new Date()
    const dayOfWeek = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const daysUntilEndOfWeek = dayOfWeek === 0 ? 7 : 7 - dayOfWeek // If today is Sunday, set to next Sunday
    
    const endOfWeek = new Date(now)
    endOfWeek.setDate(now.getDate() + daysUntilEndOfWeek)
    endOfWeek.setHours(23, 59, 59, 999)
    
    return endOfWeek
  }
  
  // Format date as "Month Day(th/st/nd/rd)"
  const formatDate = (date: Date): string => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    
    // Add appropriate suffix to day
    let suffix = 'th'
    if (day % 10 === 1 && day !== 11) {
      suffix = 'st'
    } else if (day % 10 === 2 && day !== 12) {
      suffix = 'nd'
    } else if (day % 10 === 3 && day !== 13) {
      suffix = 'rd'
    }
    
    return `${month} ${day}${suffix}`
  }
  
  // Calculate and update countdown timer
  const updateCountdown = (): void => {
    const now = new Date()
    const endOfWeek = getEndOfWeek()
    const timeDiff = endOfWeek.getTime() - now.getTime()
    
    if (timeDiff <= 0) {
      // If we've reached the end of the week, reset to next week
      setDaysLeft(7)
      setHoursLeft(0)
      setMinutesLeft(0)
      setSecondsLeft(0)
      return
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
    
    setDaysLeft(days)
    setHoursLeft(hours)
    setMinutesLeft(minutes)
    setSecondsLeft(seconds)
  }
  
  // Initialize countdown and update every second
  useEffect(() => {
    // Update immediately on load
    updateCountdown()
    
    // Then update every second
    const timer = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const openForm = (): void => {
    setIsFormOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#06061A]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/ubiquity-logo.webp" alt="Ubiquity Logo" width={40} height={40} />
            <span className="font-bold text-xl text-white">Ubiquity</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-[#00FFFF]">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-[#00FFFF]">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium text-gray-300 hover:text-[#00FFFF]" onClick={openForm}>
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-[#00FFFF] text-sm font-semibold animate-pulse">
              <span className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" /> Only 2 spots left this month
              </span>
            </div>
            <Button onClick={openForm}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-[#06061A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 bg-[#00FFFF]/10 rounded-full text-[#00FFFF] text-sm font-semibold">
              <span className="flex items-center justify-center">
                <Clock className="h-4 w-4 mr-2" /> Limited Availability: Only accepting 2 new clients per month
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">GitHub Repository Management Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Analytics, talent matching, and contribution-based payouts for development teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-[#06061A]" onClick={openForm}>
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-[#06061A] bg-white hover:bg-white/10 hover:text-white"
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
            <div className="bg-[#00FFFF]/10 p-4 rounded-lg inline-block">
              <p className="text-[#00FFFF] font-semibold">
                Next enrollment window closes in: {daysLeft}d {hoursLeft}h {minutesLeft}m {secondsLeft}s
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <div className="bg-[#00FFFF] text-[#06061A] py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="font-semibold mb-2 md:mb-0">
              <span className="flex items-center justify-center md:justify-start">
                <TrendingUp className="h-4 w-4 mr-2" /> 87% of teams see ROI within 30 days
              </span>
            </p>
            <p className="font-semibold mb-2 md:mb-0">
              <span className="flex items-center justify-center md:justify-start">
                <Award className="h-4 w-4 mr-2" /> Trusted by 50+ top blockchain teams
              </span>
            </p>
            <p className="font-semibold">
              <span className="flex items-center justify-center md:justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" /> Only 2 spots remaining this month
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Comprehensive GitHub Management</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-[#00FFFF]" />}
              title="Advanced Analytics"
              description="AI-powered qualitative insights that measure the actual impact of every contribution, not just raw numbers."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-[#00FFFF]" />}
              title="Talent Matching"
              description="Intelligent task-talent matchmaking to ensure the right developer is assigned to the right task."
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10 text-[#00FFFF]" />}
              title="Contribution-Based Payouts"
              description="Transparent payment mechanisms based on comments, reviews, code contributions, and spec writing."
            />
            <FeatureCard
              icon={<Github className="h-10 w-10 text-[#00FFFF]" />}
              title="Complete Repo Management"
              description="Automated issue deduplication and organization to ensure nothing slips through the cracks."
            />
            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-[#00FFFF]" />}
              title="Dedicated Support"
              description="Weekly calls and unlimited messaging with an assigned support person from our core team."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-[#00FFFF]" />}
              title="Streamlined Workflow"
              description="Self-assignment of tasks for developers with AI-driven assistance and full repo context."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#00FFFF] h-10 w-10 rounded-full flex items-center justify-center text-[#06061A] font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Alex T.</h4>
                  <p className="text-sm text-gray-600">CTO at BlockChain Protocol</p>
                </div>
              </div>
              <p className="text-gray-700">
                "We were lucky to get in before they closed enrollment last month. Our development velocity has
                increased by 40% since implementing Ubiquity's management system."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-[#00FFFF] h-10 w-10 rounded-full flex items-center justify-center text-[#06061A] font-bold">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah M.</h4>
                  <p className="text-sm text-gray-600">Lead Developer at L2 Solutions</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was on the waitlist for 2 months before a spot opened up. The wait was absolutely worth it - our team
                coordination has never been better."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#00FFFF]">
              <div className="bg-[#00FFFF] p-6 text-[#06061A] text-center relative">
                <div className="absolute top-0 right-0 bg-[#06061A] text-[#00FFFF] px-4 py-1 rounded-bl-lg font-bold text-sm">
                  Limited Spots
                </div>
                <h3 className="text-2xl font-bold">Enterprise Plan</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$2,000</span>
                  <span className="text-lg">/month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <PricingItem text="Unlimited developers on your team" />
                  <PricingItem text="Weekly calls with your support person" />
                  <PricingItem text="Unlimited messaging support" />
                  <PricingItem text="Advanced GitHub analytics" />
                  <PricingItem text="AI-powered talent matching" />
                  <PricingItem text="Contribution-based payout system" />
                  <PricingItem text="Full access to UbiquityOS platform" />
                </ul>
                <div className="mt-6 mb-4 text-center text-sm text-red-500 font-semibold">
                  <span className="flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 mr-1" /> Only 2 spots remaining for June enrollment
                  </span>
                </div>
                <Button
                  className="w-full mt-4 bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-[#06061A]"
                  size="lg"
                  onClick={openForm}
                >
                  Get Started Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Banner */}
      <div className="bg-[#06061A] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Don't Miss Out!</h3>
          <p className="mb-4">We only accept 2 new clients per month. Join our waitlist to secure your spot.</p>
          <div className="inline-block animate-pulse bg-[#00FFFF]/20 px-4 py-2 rounded-lg">
            <p className="text-[#00FFFF] font-semibold">Current waitlist: 7 companies (3-4 month wait)</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-[#06061A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your repository management?</h2>
            <p className="text-xl mb-4 text-gray-300">
              Schedule a demo to see how Ubiquity can help manage your GitHub repositories and development team.
            </p>
            <p className="text-[#00FFFF] font-semibold mb-8">
              Limited time offer: Skip the waitlist if you sign up before {formatDate(getEndOfWeek())}
            </p>
            <Button size="lg" className="bg-[#00FFFF] hover:bg-[#00FFFF]/90 text-[#06061A]" onClick={openForm}>
              Contact Us Today
            </Button>
            <p className="mt-4 text-sm text-gray-400">* Our team reviews all applications within 24 hours</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#06061A] text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image src="/ubiquity-logo.webp" alt="Ubiquity Logo" width={30} height={30} />
              <span className="font-bold text-white">Ubiquity</span>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} Ubiquity. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Fillout Form Popup */}
      <FilloutPopupEmbed filloutId="1DBHRinjKwus" isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface PricingItemProps {
  text: string;
}

function PricingItem({ text }: PricingItemProps) {
  return (
    <li className="flex items-start">
      <Check className="h-5 w-5 text-[#00FFFF] mr-2 mt-0.5" />
      <span>{text}</span>
    </li>
  )
}
