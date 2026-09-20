import { ManagerReview } from './types';

export const MANAGER_REVIEWS: ManagerReview[] = [
  {
    id: 'rev-1',
    role: 'Data Quality Lead',
    platform: 'Mercor',
    rating: 5,
    reviewText: 'Consistently follows complex annotation guidelines and delivers high accuracy across language model training tasks.',
    date: 'Recent'
  },
  {
    id: 'rev-2',
    role: 'Project Manager',
    platform: 'Welocalize',
    rating: 5,
    reviewText: 'Reliable Marathi and English translation work with strong attention to linguistic nuances and terminology consistency.',
    date: 'Recent'
  },
  {
    id: 'rev-3',
    role: 'Operations Lead',
    platform: 'OneForma',
    rating: 4,
    reviewText: 'Thorough data labeling and dataset tagging. Deadlines are respected and communication is professional.',
    date: 'Recent'
  }
];
