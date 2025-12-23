// lib/types.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  color: string; // Cor de destaque para o "glow" ou fundo
}