"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, DollarSign, Globe, Shield, Star, Users, Zap, Play, Menu, X } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleGetStarted = () => {
    console.log("[v0] Get Started button clicked")
    onGetStarted()
  }

  return (
    <div className="min-h-screen bg-payveri-black text-white">
      {/* Navigation */}
      <nav className="bg-payveri-black/80 backdrop-blur-md border-b border-payveri-purple/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/favicon-lime.svg" alt="PayVeri" className="w-8 h-8" />
              <span className="font-bold text-xl text-payveri-lime">PayVeri</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-payveri-lime transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-400 hover:text-payveri-lime transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-400 hover:text-payveri-lime transition-colors">
                About
              </a>
              <Button variant="outline" onClick={handleGetStarted} className="border-payveri-purple text-payveri-purple hover:bg-payveri-purple/10">
                Sign In
              </Button>
              <Button onClick={handleGetStarted} className="bg-payveri-lime text-payveri-black hover:bg-payveri-lime/90 font-semibold">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-payveri-purple/20">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-400 hover:text-payveri-lime transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-400 hover:text-payveri-lime transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-gray-400 hover:text-payveri-lime transition-colors">
                  About
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-payveri-purple/20">
                  <Button variant="outline" onClick={handleGetStarted} className="w-full border-payveri-purple text-payveri-purple hover:bg-payveri-purple/10">
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted} className="w-full bg-payveri-lime text-payveri-black hover:bg-payveri-lime/90 font-semibold">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-payveri-black via-payveri-black to-payveri-black/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-payveri-purple/20 text-payveri-lime border-payveri-purple/50">
              🚀 Now in Beta - Join Early!
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              The Future of
              <span className="text-payveri-lime">
                {" "}
                Freelance Payments
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Secure, instant payments for freelancers. Create your professional subdomain, manage projects, and get
              paid faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={handleGetStarted} className="w-full sm:w-auto bg-payveri-lime text-payveri-black hover:bg-payveri-lime/90 font-semibold">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-payveri-purple text-payveri-lime hover:bg-payveri-purple/10">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-payveri-black border-t border-payveri-purple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From project management to secure payments, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-payveri-purple/20 bg-payveri-black/50 shadow-lg hover:shadow-xl hover:border-payveri-lime/30 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-payveri-lime/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-payveri-lime" />
                </div>
                <CardTitle className="text-white">Custom Subdomains</CardTitle>
                <CardDescription className="text-gray-400">Get your own professional subdomain like yourname.payveri.com</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-payveri-purple/20 bg-payveri-black/50 shadow-lg hover:shadow-xl hover:border-payveri-lime/30 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-payveri-lime/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-payveri-lime" />
                </div>
                <CardTitle className="text-white">Instant Payments</CardTitle>
                <CardDescription className="text-gray-400">Secure payment processing with multiple payment methods</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-payveri-purple/20 bg-payveri-black/50 shadow-lg hover:shadow-xl hover:border-payveri-lime/30 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-payveri-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-payveri-purple" />
                </div>
                <CardTitle className="text-white">Secure & Reliable</CardTitle>
                <CardDescription className="text-gray-400">Bank-level security with 99.9% uptime guarantee</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-payveri-purple/20 bg-payveri-black/50 shadow-lg hover:shadow-xl hover:border-payveri-lime/30 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-payveri-lime/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-payveri-lime" />
                </div>
                <CardTitle className="text-white">Client Management</CardTitle>
                <CardDescription className="text-gray-400">Manage all your clients and projects in one place</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-payveri-purple/20 bg-payveri-black/50 shadow-lg hover:shadow-xl hover:border-payveri-lime/30 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-payveri-lime/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-payveri-lime" />
                </div>
                <CardTitle className="text-white">Lightning Fast</CardTitle>
                <CardDescription className="text-gray-400">Optimized for speed with instant file uploads and previews</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-payveri-purple/20 bg-payveri-black/50 shadow-lg hover:shadow-xl hover:border-payveri-lime/30 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-payveri-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-payveri-purple" />
                </div>
                <CardTitle className="text-white">Premium Support</CardTitle>
                <CardDescription className="text-gray-400">24/7 support from our dedicated team of experts</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 bg-payveri-black border-t border-payveri-purple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-400">Only pay when you earn. No hidden fees, no monthly subscriptions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-payveri-purple/20 bg-payveri-black/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Freelancer</CardTitle>
                <CardDescription className="text-gray-400">Perfect for individual freelancers</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-payveri-lime">10%</span>
                  <span className="text-gray-400 ml-2">commission</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Custom subdomain
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Basic analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Email support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-payveri-lime text-payveri-black hover:bg-payveri-lime/90 font-semibold" onClick={onGetStarted}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-payveri-lime bg-payveri-black/50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-payveri-lime text-payveri-black">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">SuperFreelancer</CardTitle>
                <CardDescription className="text-gray-400">For established professionals</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-payveri-lime">7.5%</span>
                  <span className="text-gray-400 ml-2">commission</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Everything in Freelancer
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Priority support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Custom branding
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-payveri-lime text-payveri-black hover:bg-payveri-lime/90 font-semibold" onClick={onGetStarted}>
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-payveri-purple/20 bg-payveri-black/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Enterprise</CardTitle>
                <CardDescription className="text-gray-400">For agencies and teams</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-payveri-purple">Custom</span>
                  <span className="text-gray-400 ml-2">pricing</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Everything in SuperFreelancer
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Team management
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    White-label solution
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-5 w-5 text-payveri-lime mr-3" />
                    Dedicated support
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 border-payveri-purple text-payveri-purple hover:bg-payveri-purple/10" >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-payveri-lime/20 to-payveri-purple/20 border-t border-b border-payveri-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Freelance Business?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who are already using PayVeri to streamline their payments and grow their
            business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={handleGetStarted} className="w-full sm:w-auto bg-payveri-lime text-payveri-black hover:bg-payveri-lime/90 font-semibold">
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-payveri-black border-t border-payveri-purple/10 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/favicon-lime.svg" alt="PayVeri" className="w-8 h-8" />
                <span className="font-bold text-xl text-payveri-lime">PayVeri</span>
              </div>
              <p className="text-gray-400">The future of freelance payments, today.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-payveri-lime">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-payveri-lime">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-payveri-lime">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-payveri-lime transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-payveri-purple/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PayVeri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
