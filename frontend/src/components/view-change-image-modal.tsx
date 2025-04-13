import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface ViewChangeImageModalProps {
  isOpen: boolean
  onClose: () => void
  userImage: string
  userName: string
  onImageChange: (image: string) => void
}

export function ViewChangeImageModal({ isOpen, onClose, userImage, userName, onImageChange }: ViewChangeImageModalProps) {
  const [previewImage, setPreviewImage] = useState(userImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onImageChange(previewImage)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>View/Change Image</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Click on the image to upload a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Avatar className="w-40 h-40 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <AvatarImage src={previewImage} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

