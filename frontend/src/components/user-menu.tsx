"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ImageIcon, LogOut } from "lucide-react";
import { ViewChangeImageModal } from "@/components/view-change-image-modal";

interface UserInfo {
  name: string;
  email: string;
}

interface UserMenuProps {
  userImage: string;
  userInfo: UserInfo;
  onLogout: () => void;
  onViewChangeImage: () => void;
  onViewUserDetails: () => void;
}

export function UserMenu({
  userImage,
  userInfo,
  onLogout,
  onViewChangeImage,
  onViewUserDetails,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt={`userInfo.name`} />
            <AvatarFallback>{`userInfo.name?.charAt(0)`}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`userInfo.name`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {`userInfo.email`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onViewChangeImage}>
          <ImageIcon className="mr-2 h-4 w-4" />
          <span>View/Change Image</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewUserDetails}>
          <User className="mr-2 h-4 w-4" />
          <span>User Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
