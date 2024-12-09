import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthProvider";
import { UserProfile } from "@/types/userProfile";
import { fetchUserProfile } from "@/services/userProfileService";

export const useUserProfile = (): UserProfile => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const getUserProfile = useCallback(async () => {
    if (!user?.id) return;

    setUserProfile((prev) => (prev ? { ...prev, isLoading: true } : null));
    try {
      const profileInfo = await fetchUserProfile(user.id);
      setUserProfile({
        ...profileInfo,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUserProfile((prev) => (prev ? { ...prev, isLoading: false } : null));
    }
  }, [user?.id]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    userProfile || {
      userFullName: "",
      isLoading: true,
      buildingName: "",
      mappedinMapId: "",
    }
  );
};
