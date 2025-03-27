"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  const fetchUsers = async (page = 1) => {
    if (page < 1 || (totalPages > 0 && page > totalPages)) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsers(response.data.data)
      setCurrentPage(page)
      setTotalPages(response.data.total_pages)

      // Show toast on page change (except initial load)
      if (!loading) {
        toast({
          title: `Page ${page}`,
          description: `Showing ${response.data.data.length} users`,
        })
      }
    } catch (err) {
      setError("Failed to fetch users. Please try again.")
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (id, userData) => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.put(`https://reqres.in/api/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Update the user in the local state
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...userData } : user)))

    return response.data
  }

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    await axios.delete(`https://reqres.in/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Remove the user from the local state
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
  }

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const value = {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    fetchUsers,
    updateUser,
    deleteUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}

