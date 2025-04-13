import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserDetailsOverlayProps {
  isOpen: boolean
  onClose: () => void
  userImage: string
  initialUserInfo: {
    name: string
    email: string
  }
}

interface ExtendedUserInfo {
  name: string
  email: string
  role: string
  joinDate: string
  lastLogin: string
}

export function UserDetailsOverlay({ isOpen, onClose, userImage, initialUserInfo }: UserDetailsOverlayProps) {
  const [userInfo, setUserInfo] = useState<ExtendedUserInfo | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Simulate fetching user details from a database
      const fetchUserDetails = async () => {
        // In a real application, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
        setUserInfo({
          ...initialUserInfo,
          role: 'Developer',
          joinDate: '2023-01-15',
          lastLogin: new Date().toISOString().split('T')[0]
        })
      }

      fetchUserDetails()
    }
  }, [isOpen, initialUserInfo])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Your account information
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={userImage} alt={userInfo?.name} />
            <AvatarFallback>{userInfo?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          {userInfo ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <p className="text-muted-foreground dark:text-gray-300">{userInfo.email}</p>
              <div className="mt-4 space-y-2 dark:text-gray-300">
                <p><strong>Role:</strong> {userInfo.role}</p>
                <p><strong>Join Date:</strong> {userInfo.joinDate}</p>
                <p><strong>Last Login:</strong> {userInfo.lastLogin}</p>
              </div>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

