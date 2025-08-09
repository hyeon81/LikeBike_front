export interface IBikeLog extends UserBikeLog {
  id: number;
  description: string;
  bike_photo_url: string;
  safety_gear_photo_url: string;
  started_at: string;
  created_at: string;
  verification_status: "pending" | "verified" | "rejected";
  verified_at: string | null;
  points_awarded: number;
  admin_notes: string | null;
}

export interface UserBikeLog {
  id: number;
  bike_photo_url: string;
  safety_gear_photo_url: string;
  started_at: string;
  verification_status: "pending" | "verified" | "rejected";
}

export const LOG_STATUS = {
  pending: { text: "검토 중", color: "bg-orange-500" },
  verified: { text: "인증 완료", color: "bg-green-500" },
  rejected: { text: "인증 실패", color: "bg-red-500" },
};
