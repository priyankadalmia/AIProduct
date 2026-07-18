export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  mood: string;
  week: number;
  symptoms: string[];
  tags: string[];
  has_photo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  week: number;
  completed: boolean;
  sort_order: number;
  created_at: string;
}
