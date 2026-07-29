export interface PersonalInfo {
  name: string
  nameEn: string
  age: number
  city: string
  phone: string
  email: string
  position: string
  status: string
  motto: string
  experience: number
  education: string
  salary: string
}

export interface Education {
  period: string
  school: string
  major: string
  degree: string
}

export interface Skill {
  name: string
  icon: string
  level: number
  levelText: string
  levelClass: string
  detail: string
}

export interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

export interface TechTag {
  name: string
  highlight: boolean
}

export interface WorkExperience {
  company: string
  role: string
  period: string
  companyIcon: string
  responsibilities: string[]
  achievements: Achievement[]
}

export interface Achievement {
  title: string
  icon: string
  situation: string
  task: string
  action: string
  result: string
  metrics?: { label: string; value: string }[]
}

export interface Project {
  name: string
  period: string
  role: string
  description: string
  icon: string
  badge?: string
  featured: boolean
  duties: string[]
  techTags: string[]
}

export interface JDSkillCategory {
  [category: string]: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  skillCategories: SkillCategory[]
  techTags: TechTag[]
  workExperience: WorkExperience
  projects: Project[]
  typeWriterTexts: string[]
  jdResumeSkills: string[]
  jdSkillCategories: JDSkillCategory
  navLinks: { label: string; href: string }[]
  goalTags: { icon: string; text: string }[]
  contactMethods: { icon: string; label: string; value: string; href?: string }[]
}
