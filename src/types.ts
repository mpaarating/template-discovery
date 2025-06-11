export interface ZapTemplate {
  id: string;
  title: string;
  description: string;
  apps: {
    name: string;
    slug: string;
    icon_url: string;
    color: string;
  }[];
  categories: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  popularity_score: number;
  setup_time_minutes: number;
  use_cases: string[];
  created_at: string;
}
