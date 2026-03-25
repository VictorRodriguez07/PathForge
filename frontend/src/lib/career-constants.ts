import {
  Monitor, Smartphone, Layers, BarChart2,
  Zap, Cloud, Gamepad2, Brain,
  Globe, Lock, Database, Cpu,
  TrendingUp, Heart, DollarSign, Shield,
} from 'lucide-react';

export const PROJECT_TYPE_OPTIONS = [
  { value: 'web_apps',      label: 'Aplicaciones web',       Icon: Monitor },
  { value: 'mobile_apps',   label: 'Apps móviles',           Icon: Smartphone },
  { value: 'apis',          label: 'APIs y servicios',       Icon: Layers },
  { value: 'data_analysis', label: 'Análisis de datos',      Icon: BarChart2 },
  { value: 'automation',    label: 'Automatización',         Icon: Zap },
  { value: 'infrastructure',label: 'Infraestructura cloud',  Icon: Cloud },
  { value: 'games',         label: 'Videojuegos',            Icon: Gamepad2 },
  { value: 'ai_ml',         label: 'IA y Machine Learning',  Icon: Brain },
] as const;

export const INDUSTRY_OPTIONS = [
  { value: 'web',       label: 'Web',        Icon: Globe },
  { value: 'mobile',    label: 'Mobile',     Icon: Smartphone },
  { value: 'data',      label: 'Data',       Icon: Database },
  { value: 'cloud',     label: 'Cloud',      Icon: Cloud },
  { value: 'security',  label: 'Seguridad',  Icon: Shield },
  { value: 'gaming',    label: 'Gaming',     Icon: Gamepad2 },
  { value: 'fintech',   label: 'Fintech',    Icon: DollarSign },
  { value: 'healthtech',label: 'Healthtech', Icon: Heart },
] as const;

export const WORK_PREFERENCE_OPTIONS = [
  { value: 'visual',         label: 'Visual — diseño e interfaces' },
  { value: 'logical',        label: 'Lógico — algoritmos y sistemas' },
  { value: 'infrastructure', label: 'Infraestructura — servidores y cloud' },
  { value: 'data',           label: 'Datos — análisis y modelos' },
  { value: 'security',       label: 'Seguridad — protección y auditoría' },
] as const;

export const OBJECTIVE_OPTIONS = [
  { value: 'first_job',     label: 'Conseguir mi primer empleo en tech' },
  { value: 'career_change', label: 'Cambiar de carrera hacia tecnología' },
  { value: 'specialize',    label: 'Especializarme en un área técnica' },
  { value: 'freelance',     label: 'Trabajar como freelancer' },
] as const;

export const TECHNOLOGY_OPTIONS = [
  { value: 'html_css',    label: 'HTML & CSS' },
  { value: 'javascript',  label: 'JavaScript' },
  { value: 'typescript',  label: 'TypeScript' },
  { value: 'python',      label: 'Python' },
  { value: 'java',        label: 'Java' },
  { value: 'csharp',      label: 'C#' },
  { value: 'php',         label: 'PHP' },
  { value: 'ruby',        label: 'Ruby' },
  { value: 'go',          label: 'Go' },
  { value: 'rust',        label: 'Rust' },
  { value: 'sql',         label: 'SQL' },
  { value: 'nosql',       label: 'NoSQL' },
  { value: 'react',       label: 'React' },
  { value: 'vue',         label: 'Vue' },
  { value: 'angular',     label: 'Angular' },
  { value: 'node',        label: 'Node.js' },
  { value: 'django',      label: 'Django' },
  { value: 'spring',      label: 'Spring' },
  { value: 'docker',      label: 'Docker' },
  { value: 'kubernetes',  label: 'Kubernetes' },
  { value: 'aws',         label: 'AWS' },
  { value: 'azure',       label: 'Azure' },
  { value: 'gcp',         label: 'GCP' },
  { value: 'git',         label: 'Git' },
  { value: 'linux',       label: 'Linux' },
] as const;

export const EXPERIENCE_LEVEL_OPTIONS = [
  {
    value: 'none',
    label: 'Sin experiencia',
    desc: 'Nunca he programado',
  },
  {
    value: 'beginner',
    label: 'Principiante',
    desc: 'Conozco lo básico',
  },
  {
    value: 'intermediate',
    label: 'Intermedio',
    desc: 'Tengo proyectos propios',
  },
  {
    value: 'advanced',
    label: 'Avanzado',
    desc: 'Trabajo profesionalmente',
  },
] as const;

export const MARKET_DEMAND_LABELS: Record<string, string> = {
  very_high: 'Muy alta',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export const REMOTE_LABELS: Record<string, string> = {
  excellent: 'Excelente',
  good: 'Bueno',
  limited: 'Limitado',
};