"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Menu, X } from "lucide-react"

const useCases = [
  {
    title: "Team Collaboration",
    description: "Enhance team productivity and communication with real-time collaboration insights.",
    visualization: "teamwork",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Digital Workspace",
    description: "Optimize your team's digital environment for maximum efficiency and productivity.",
    visualization: "browser",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: "Risk Management",
    description: "Identify and mitigate potential challenges before they impact your team's productivity.",
    visualization: "error",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Remote Work Optimization",
    description: "Improve productivity and engagement for distributed teams.",
    visualization: "barChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Employee Wellbeing",
    description: "Monitor and improve team morale and work-life balance.",
    visualization: "lineChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Collaboration Analysis",
    description: "Identify bottlenecks and optimize team communication.",
    visualization: "networkGraph",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Performance Analytics",
    description: "Gain insights into individual and team performance metrics for data-driven decision making.",
    visualization: "barChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Resource Allocation",
    description: "Optimize resource distribution and workload management across teams and projects.",
    visualization: "pieChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Learning & Development",
    description: "Track skill development and identify areas for team growth and training opportunities.",
    visualization: "lineChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    title: "Meeting Efficiency",
    description: "Analyze and optimize meeting schedules, durations, and outcomes for better time management.",
    visualization: "pieChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Project Tracking",
    description: "Monitor project progress, identify bottlenecks, and forecast completion times with AI-powered insights.",
    visualization: "ganttChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Skill Gap Analysis",
    description: "Identify skill gaps within teams and suggest personalized learning paths for employees.",
    visualization: "radarChart",
    icon: (
      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
]




export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [radius, setRadius] = useState(125)

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth >= 768 ? 200 : 125)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFF] scroll-smooth transition duration-300 ease-in-out">
      <header className="container py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-20">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-1HvTLxiOh5GfLHBPOvPBTGn56o6M6G.svg"
              width={32}
              height={29}
              alt="Qwokka AI Logo"
              className="h-8 w-auto"
            />
            <span className="text-[#1E293B] text-xl font-medium">Qwokka AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#use-cases" className="text-[#1E293B] hover:text-[#1E293B]/80">
              Use Cases
            </Link>
            <Link href="#insights" className="text-[#1E293B] hover:text-[#1E293B]/80">
              Insights
            </Link>
            <Link href="#about" className="text-[#1E293B] hover:text-[#1E293B]/80">
              About
            </Link>
            <Link
              href="https://production.qwokka.ai/"
              className="bg-[#1E293B] text-white hover:bg-[#1E293B]/90 rounded-full px-6 py-2 text-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
          <button className="md:hidden z-20" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-[#1E293B]" /> : <Menu className="h-6 w-6 text-[#1E293B]" />}
          </button>
          {isMenuOpen && (
            <div className="fixed inset-0 bg-white z-10 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-8">
                <Link href="#use-cases" className="text-[#1E293B] text-2xl" onClick={() => setIsMenuOpen(false)}>
                  Use Cases
                </Link>
                <Link href="#insights" className="text-[#1E293B] text-2xl" onClick={() => setIsMenuOpen(false)}>
                  Insights
                </Link>
                <Link href="#about" className="text-[#1E293B] text-2xl" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link
                  href="https://qwokka.vercel.app/"
                  className="bg-[#1E293B] text-white hover:bg-[#1E293B]/90 rounded-full px-6 py-2 text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="container mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[#1E293B] text-4xl md:text-6xl font-medium leading-tight">
            Connect your tools.
            <br />
            <span className="text-[#3B82F6]">Unlock team insights.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#1E293B]/80 max-w-2xl mx-auto">
            Most companies focus only on active feedback like surveys, but ignoring passive data leaves critical
            insights untapped.
            <br />
            Get real-time insights without disrupting your team.
          </p>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white rounded-full px-8 py-4 md:py-6 text-lg w-full md:w-auto">
            <Link href="">
                Request Demo
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-full px-8 py-4 md:py-6 text-lg w-full md:w-auto"
            >
              <Link href="https://prashaantr.com">
                See it in action
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFF] via-[#EEF2FF] to-[#F8FAFF] rounded-[40px]" />
          <div className="relative">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Central Logo with Connecting Lines and Tech Stack Logos */}
                <div className="relative h-[300px] md:h-[600px] flex items-center justify-center mb-20">
                  {/* Concentric Circles */}
                  <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-[#3B82F6]/20 animate-pulse" />
                  <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border border-[#3B82F6]/30" />
                  <div className="absolute w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full border border-[#3B82F6]/40" />

                  {/* Center Qwokka Logo */}
                  <div className="absolute">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group-1HvTLxiOh5GfLHBPOvPBTGn56o6M6G.svg"
                      width={87}
                      height={79}
                      alt="Qwokka AI Logo"
                      className="w-12 md:w-20 h-auto"
                    />
                  </div>

                  {/* Tech Stack Logos */}
                  {techStacks.map((tech, index) => {
                    const angle = tech.angle * (Math.PI / 180)
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return (
                      <div
                        key={tech.name}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                        }}
                      >
                        <div
                          className={`bg-white/80 backdrop-blur-sm ${
                            tech.size ? "p-3 md:p-5" : "p-2 md:p-4"
                          } rounded-xl shadow-sm border border-[#3B82F6]/10 hover:border-[#3B82F6]/30`}
                        >
                          <Image
                            src={tech.logo || "/placeholder.svg"}
                            width={tech.size || 40}
                            height={tech.size || 40}
                            alt={tech.name}
                            className={`object-contain ${tech.size ? "w-8 h-8 md:w-12 md:h-12" : "w-6 h-6 md:w-8 md:h-8"}`}
                          />
                        </div>
                        {/* Connecting Line */}
                        <div
                          className="absolute left-1/2 top-1/2 h-[1px] md:h-[2px] bg-gradient-to-r from-[#3B82F6]/30 to-[#3B82F6]/10 origin-left"
                          style={{
                            width: `${radius}px`,
                            transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Analytics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  <Card className="bg-white/80 backdrop-blur-sm p-6 border-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-[#1E293B] text-lg">Engagement Trends</h4>
                        <p className="text-sm text-[#1E293B]/60 mt-1">Last 30 days activity</p>
                      </div>
                      <div className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1 rounded-full text-sm">+12.5%</div>
                    </div>
                    <div className="h-48 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={engagementData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#1E293B]/60">Meeting Participation</p>
                        <p className="text-lg font-medium text-[#1E293B]">+23%</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#1E293B]/60">Tool Usage</p>
                        <p className="text-lg font-medium text-[#1E293B]">+18%</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm p-6 border-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-[#1E293B] text-lg">Team Sentiment</h4>
                        <p className="text-sm text-[#1E293B]/60 mt-1">Real-time analysis</p>
                      </div>
                      <div className="bg-[#22C55E]/10 text-[#22C55E] px-3 py-1 rounded-full text-sm">Positive</div>
                    </div>
                    <div className="h-48 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sentimentData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(34, 197, 94, 0.1)" />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#22C55E"
                            strokeWidth={2}
                            dot={{ fill: "#22C55E", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#1E293B]/60">Collaboration Score</p>
                        <p className="text-lg font-medium text-[#1E293B]">8.5/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#1E293B]/60">Team Sync</p>
                        <p className="text-lg font-medium text-[#1E293B]">92%</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div id="about" className="mt-16 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-medium text-[#1E293B] mb-6">
                    Privacy-Focused Workplace Analytics
                  </h2>
                  <p className="text-[#1E293B]/70 mb-8">
                    Qwokka AI collects and anonymizes both active and passive data, ensuring no personal information is
                    processed. The anonymized data is then analyzed to provide insights on workplace productivity,
                    engagement, and policy impacts.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#3B82F6]/80">
                    <span>Learn about our privacy standards</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-20 mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#1E293B] text-4xl md:text-5xl font-medium text-center mb-4">
              Explore use cases.
              <br />
              <span className="text-[#3B82F6]">See what's possible.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#1E293B]/80 text-center max-w-2xl mx-auto mb-16">
              Discover how Qwokka AI can transform your workplace analytics and team productivity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="transition duration-300 ease-in-out transform hover:scale-105 bg-white rounded-3xl border border-[#3B82F6]/10 p-8 hover:shadow-lg"
                >
                  <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center mb-6">
                    {useCase.icon}
                  </div>
                  <h3 className="text-[#1E293B] text-2xl font-medium mb-3">{useCase.title}</h3>
                  <p className="text-[#1E293B]/60 text-lg leading-relaxed mb-6">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workforce Insights Section */}
        <section id="insights" className="py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[#1E293B] text-4xl md:text-5xl font-medium text-center mb-4">
              Discover workforce insights.
              <br />
              <span className="text-[#3B82F6]">Make better decisions.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#1E293B]/80 text-center max-w-2xl mx-auto mb-16">
              Uncover hidden patterns and optimize your team's performance with data-driven insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#3B82F6]/10">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-[#1E293B] mb-4">Productivity Patterns</h3>
                <p className="text-[#1E293B]/70 mb-6">
                  Uncover hidden productivity trends and optimize your team's workflow with AI-powered analytics.
                </p>
                <div className="aspect-[2/1] bg-gradient-to-br from-[#3B82F6]/10 to-[#3B82F6]/5 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-4 w-full px-8">
                    {[60, 80, 40, 90].map((height, i) => (
                      <div key={i} className="relative h-32">
                        <div
                          className="absolute bottom-0 w-full bg-[#3B82F6]/20 rounded-full"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#3B82F6]/10">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-[#1E293B] mb-4">Collaboration Networks</h3>
                <p className="text-[#1E293B]/70 mb-6">
                  Visualize team interactions and identify key collaboration patterns in real-time.
                </p>
                <div className="aspect-[2/1] bg-gradient-to-br from-[#3B82F6]/10 to-[#3B82F6]/5 rounded-lg flex items-center justify-center">
                  <div className="relative w-full h-full p-8">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="absolute w-16 h-16 bg-[#3B82F6]/20 rounded-full flex items-center justify-center"
                        style={{
                          left: `${25 + i * 25}%`,
                          top: `${30 + (i % 2) * 30}%`,
                        }}
                      >
                        <div className="w-8 h-8 bg-[#3B82F6]/30 rounded-full" />
                      </div>
                    ))}
                    {/* Connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      style={{ stroke: "rgba(59, 130, 246, 0.2)", strokeWidth: 2 }}
                    >
                      <line x1="30%" y1="40%" x2="55%" y2="65%" />
                      <line x1="55%" y1="65%" x2="80%" y2="40%" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-6">Ready to unlock your team's potential?</h2>
            <p className="text-xl text-[#1E293B]/70 mb-8">
              Join forward-thinking companies using Qwokka AI to drive engagement and productivity.
            </p>
            <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white rounded-full px-8 py-4 text-lg">
              Get Started
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#1E293B] text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Qwokka AI</h3>
              <p className="text-sm text-gray-400">Empowering teams with data-driven insights</p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Use Cases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://prashaantr.com" className="text-sm text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="https://prashaantr.com" className="text-sm text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">&copy; 2023 Qwokka AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const techStacks = [
  {
    name: "Microsoft Teams",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logos_microsoft-teams-8whEVXwcFoiZ40IJ6oI51HM534wtWi.svg",
    angle: 0,
  },
  {
    name: "Google",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devicon_google-kWqe6ym59LcMqQsECm2ql3R3uPZEC9.svg",
    angle: 45,
  },
  {
    name: "Zoom",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logos_zoom-6gtTUcvUpUm9rNrRXb0HrSrb0GzyPs.svg",
    angle: 90,
    size: 48,
  },
  {
    name: "GitHub",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mdi_github-3ZAC0ruWrPZH5ncl6rUh4f0K2uVQlF.svg",
    angle: 135,
  },
  {
    name: "Slack",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devicon_slack-TBBB2MUiFkjndgqzTPkfkatSQUGHlk.svg",
    angle: 180,
  },
  {
    name: "Jira",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devicon_jira-wordmark-O2A8bRRd4rnsdxMZCW7kTx7iuV82l0.svg",
    angle: 225,
  },
  {
    name: "Asana",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logos_asana-tTk0ifPGJ59BDYEU9IxsS0Bo8Ub8MJ.svg",
    angle: 270,
    size: 48,
  },
  {
    name: "Peakon",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201000011024-rTTNlL0EH9hyFPz0YOMn7QgifZlV6V.svg",
    angle: 315,
    size: 48,
  },
]

const engagementData = [
  { name: "Week 1", value: 4000 },
  { name: "Week 2", value: 3000 },
  { name: "Week 3", value: 5000 },
  { name: "Week 4", value: 2780 },
  { name: "Week 5", value: 1890 },
  { name: "Week 6", value: 2390 },
  { name: "Week 7", value: 3490 },
]

const sentimentData = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 59 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 81 },
  { name: "Fri", value: 56 },
  { name: "Sat", value: 55 },
  { name: "Sun", value: 40 },
]


