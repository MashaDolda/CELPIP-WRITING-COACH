// Usage tracking for free users and guests
interface UsageData {
  userId: string;
  month: string; // Format: "2024-12"
  essaysSubmitted: number;
  lastUsed: Date;
}

const GUEST_LIMIT = 3; // 3 free essays for guests
const FREE_USER_LIMIT = 10; // 10 essays per month for registered free users

// Get current month key
const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
};

// Get guest usage from localStorage
export const getGuestUsage = (): number => {
  const guestData = localStorage.getItem('guest-usage');
  if (!guestData) return 0;
  
  try {
    const data = JSON.parse(guestData);
    const currentMonth = getCurrentMonth();
    
    // Reset if it's a new month
    if (data.month !== currentMonth) {
      localStorage.removeItem('guest-usage');
      return 0;
    }
    
    return data.essaysSubmitted || 0;
  } catch {
    return 0;
  }
};

// Update guest usage
export const updateGuestUsage = (): void => {
  const currentUsage = getGuestUsage();
  const newUsage = {
    month: getCurrentMonth(),
    essaysSubmitted: currentUsage + 1,
    lastUsed: new Date().toISOString()
  };
  
  localStorage.setItem('guest-usage', JSON.stringify(newUsage));
};

// Get user usage (for registered users)
export const getUserUsage = (userId: string): number => {
  const userData = localStorage.getItem(`user-usage-${userId}`);
  if (!userData) return 0;
  
  try {
    const data = JSON.parse(userData);
    const currentMonth = getCurrentMonth();
    
    // Reset if it's a new month
    if (data.month !== currentMonth) {
      localStorage.removeItem(`user-usage-${userId}`);
      return 0;
    }
    
    return data.essaysSubmitted || 0;
  } catch {
    return 0;
  }
};

// Update user usage
export const updateUserUsage = (userId: string): void => {
  const currentUsage = getUserUsage(userId);
  const newUsage = {
    userId,
    month: getCurrentMonth(),
    essaysSubmitted: currentUsage + 1,
    lastUsed: new Date().toISOString()
  };
  
  localStorage.setItem(`user-usage-${userId}`, JSON.stringify(newUsage));
};

// Check if user can submit essays
export const canSubmitEssay = (userId?: string): { canSubmit: boolean; remaining: number; limit: number; isGuest: boolean } => {
  if (!userId) {
    // Guest user
    const used = getGuestUsage();
    return {
      canSubmit: used < GUEST_LIMIT,
      remaining: Math.max(0, GUEST_LIMIT - used),
      limit: GUEST_LIMIT,
      isGuest: true
    };
  }
  
  // Registered user
  const used = getUserUsage(userId);
  return {
    canSubmit: used < FREE_USER_LIMIT,
    remaining: Math.max(0, FREE_USER_LIMIT - used),
    limit: FREE_USER_LIMIT,
    isGuest: false
  };
};

// Reset usage for testing
export const resetUsage = (userId?: string): void => {
  if (!userId) {
    localStorage.removeItem('guest-usage');
  } else {
    localStorage.removeItem(`user-usage-${userId}`);
  }
};
