import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";
import { useUserProfile } from "@/hooks/useUserProfile";

export function Header() {
  const { user } = useAuth();
  const userProfile = useUserProfile();

  const getInitials = (str: string, separator: string = " ") => {
    return str
      .split(separator)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const userInitials = userProfile.userFullName
    ? getInitials(userProfile.userFullName, "@")
    : "";

  const buildingInitials = userProfile.buildingName
    ? getInitials(userProfile.buildingName)
    : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-safe">
      <div className="container flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {userProfile.userFullName && (
              <>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <span className="text-base font-semibold text-primary">
                  {userProfile.userFullName}
                </span>
              </>
            )}
          </div>

          {/* Building Section */}
          <div className="flex items-center space-x-4">
            {userProfile.buildingName && (
              <>
                <Avatar>
                  <AvatarFallback>{buildingInitials}</AvatarFallback>
                </Avatar>
                <span className="text-base font-semibold text-primary">
                  {userProfile.buildingName}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
