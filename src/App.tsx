import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Database, Palette, Zap, Code2 } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            React + Vite + Tailwind + shadcn/ui + Supabase
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A modern, production-ready stack for building on-chain applications with beautiful UI components and powerful backend services.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Vite + React</CardTitle>
              <CardDescription>Lightning-fast development with hot reload</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader className="text-center">
              <Palette className="w-12 h-12 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Tailwind CSS</CardTitle>
              <CardDescription>Utility-first CSS framework for rapid styling</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardHeader className="text-center">
              <Code2 className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">shadcn/ui</CardTitle>
              <CardDescription>Beautiful, accessible UI components</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader className="text-center">
              <Database className="w-12 h-12 mx-auto text-orange-600 mb-2" />
              <CardTitle className="text-lg">Supabase</CardTitle>
              <CardDescription>Open-source Firebase alternative</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Test the setup with this interactive counter and form
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Counter */}
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Count: {count}
                </div>
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setCount(count - 1)}
                    className="w-12 h-12"
                  >
                    -
                  </Button>
                  <Button 
                    onClick={() => setCount(count + 1)}
                    className="w-12 h-12"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Input 
                    id="message" 
                    placeholder="Enter a message"
                  />
                </div>
                <Button className="w-full">
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Setup Instructions */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Next Steps: Supabase Setup
              </CardTitle>
              <CardDescription>
                To complete the setup, you'll need to configure Supabase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Ready to connect to Supabase?</strong> Click the "Connect to Supabase" button 
                  in the top right to set up your database connection.
                </p>
              </div>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p>• Environment variables will be automatically configured</p>
                <p>• Database schema can be created with migrations</p>
                <p>• Authentication and real-time features ready to use</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App