"use client"

import { useState, useEffect } from "react"
import { useUserContext } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import UserCard from "@/components/user-card"
import EditUserDialog from "@/components/edit-user-dialog"
import { Search, LogOut, Users, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UsersList() {
  const { users, loading, error, currentPage, totalPages, fetchUsers } = useUserContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState(null)
  const [animateItems, setAnimateItems] = useState(false)
  const router = useRouter()

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateItems(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 animate-fade-in">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center mx-auto animate-pulse-slow">
            <Users className="h-8 w-8 text-white" />
          </div>
          <p className="mt-4 text-gray-500">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 animate-fade-in">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-red-500 font-medium">{error}</p>
        <Button onClick={() => fetchUsers(currentPage)} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center mr-3">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            User Management
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-9 h-10 w-full sm:w-64 border-gray-200 focus:border-brand-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-gray-200 hover:bg-gray-50 hover:text-brand-purple transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <Card className="animate-fade-in shadow-md">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No users found matching your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className={`transition-all duration-300 ${
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <UserCard user={user} onEdit={() => setEditingUser(user)} />
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => fetchUsers(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:text-brand-purple"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => fetchUsers(page)}
                    isActive={currentPage === page}
                    className={
                      currentPage === page
                        ? "bg-brand-purple text-white hover:bg-brand-purple/90"
                        : "hover:text-brand-purple"
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => fetchUsers(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:text-brand-purple"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {editingUser && <EditUserDialog user={editingUser} open={!!editingUser} onClose={() => setEditingUser(null)} />}
    </div>
  )
}

