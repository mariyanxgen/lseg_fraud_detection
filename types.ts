import { LucideIcon } from 'lucide-react';

export enum TechStack {
  AZURE = 'Azure',
  DATABRICKS = 'Databricks',
  MICROSOFT = 'Microsoft',
  GENERIC = 'Generic'
}

export interface ArchitectureNode {
  id: string;
  label: string;
  subLabel?: string;
  description: string;
  techStack: TechStack;
  techDetails: string[]; // Specific services (e.g., "Event Hubs", "Delta Lake")
  icon: LucideIcon | React.ElementType;
  x: number; // Percentage X (0-100)
  y: number; // Percentage Y (0-100)
  width?: number; // Optional custom width
}

export interface Connection {
  from: string;
  to: string;
  label?: string;
  curved?: boolean;
}