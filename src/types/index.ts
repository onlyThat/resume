export interface PersonalInfo {
  name: string;
  nameEn: string;
  age: number;
  city: string;
  phone: string;
  email: string;
  position: string;
  salary?: string;
  status: string;
  motto: string;
  experience: string;
}

export interface Education {
  period: string;
  school: string;
  major: string;
  degree: string;
}

export interface Skill {
  name: string;
  level: number;
  proficiency: '精通' | '熟练' | '了解';
  icon: string;
  detail: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface Achievement {
  title: string;
  icon: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Project {
  name: string;
  period: string;
  badge?: string;
  icon: string;
  role: string;
  description: string;
  duties: string[];
  techTags: string[];
}

export interface TechTag {
  name: string;
  highlight: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  skillCategories: SkillCategory[];
  techTags: TechTag[];
  workExperience: WorkExperience;
  achievements: Achievement[];
  projects: Project[];
  typeWriterTexts: string[];
  jdSkills: string[];
  skillCategoryMap: Record<string, string[]>;
}
