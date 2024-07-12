"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { axiosInstance } from "@/lib/utils"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function HomePage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter()

  const sendData = async () => {
    const res = await axiosInstance.post("/login/", {
      username: username,
      password: password,
    });

    if (res.data.result !== "Ok") {
      toast.error("Invalid username or password")
    }
    else {
      toast.info("Logged in successfully")
      router.push("/dashboard/")
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-foreground">
              Username
            </Label>
            <div className="mt-1">
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="mt-1">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Button
              onClick={(e) => {
                sendData();
                e.preventDefault();
              }}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
