"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import UsersList from "@/components/users-list"
import { UserProvider } from "@/context/user-context"

export default function UsersPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    }
  }, [router])

  return (
    <UserProvider>
      <main className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#ECEEFB] py-8 px-4">
        <div className="container mx-auto">
          <UsersList />
        </div>
      </main>
    </UserProvider>
  )
}

