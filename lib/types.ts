export interface Short {
  id: string;
  title: string;
  civilization: 'Egypt' | 'Rome' | 'Greece' | 'Mesopotamia' | 'Persia';
  status: 'Idea' | 'Script Ready' | 'Visual Ready' | 'Published';
  scheduledDate: string;
  script: string;
  imagePrompts: string;
  createdAt: string;
  updatedAt: string;
}

export type Civilization = Short['civilization'];
export type Status = Short['status'];

export const CIVILIZATIONS: Civilization[] = ['Egypt', 'Rome', 'Greece', 'Mesopotamia', 'Persia'];
export const STATUSES: Status[] = ['Idea', 'Script Ready', 'Visual Ready', 'Published'];

export interface GenerateRequest {
  type: 'idea' | 'script' | 'image_prompts';
  context: {
    title: string;
    civilization: string;
    existingScript?: string;
  };
}
