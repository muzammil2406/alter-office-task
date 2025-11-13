import Link from "next/link"
import { BarChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 48 48" {...props}>
        <title>Google Logo</title>
        <clipPath id="g">
          <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
        </clipPath>
        <g clipPath="url(#g)">
          <path fill="#FBBC05" d="M0 37V11l17 13z" />
          <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
          <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
          <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
        </g>
      </svg>
    )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BarChart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">AnalytixVerse</h1>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard">
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Sign in with Google
                </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
