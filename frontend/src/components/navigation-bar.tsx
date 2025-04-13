import { Button } from "@/components/ui/button";
import { Moon, Sun, Save, Play } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UserMenu } from "./user-menu";

interface UserInfo {
  name: string;
  email: string;
}

interface NavigationBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
  userImage: string;
  userInfo: UserInfo;
  onViewChangeImage: () => void;
  onViewUserDetails: () => void;
  onSaveToLocalDevice: () => void;
  onSave: () => void;
  onRunCode: () => void;
}

export default function NavigationBar({
  isDarkMode,
  toggleDarkMode,
  onLogout,
  userImage,
  userInfo,
  onViewChangeImage,
  onViewUserDetails,
  onSaveToLocalDevice,
  onSave,
  onRunCode,
}: NavigationBarProps) {
  return (
    <nav className="border-b p-4 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onSaveToLocalDevice}>
            Save to Local Device
          </Button>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Moon className="h-4 w-4" />
            </Label>
          </div>
          <Button variant="outline" onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onRunCode}>
            <Play className="h-4 w-4" />
          </Button>
          {/* <UserMenu
            userImage={userImage}
            userInfo={userInfo}
            onLogout={onLogout}
            onViewChangeImage={onViewChangeImage}
            onViewUserDetails={onViewUserDetails}
          /> */}
        </div>
      </div>
    </nav>
  );
}
