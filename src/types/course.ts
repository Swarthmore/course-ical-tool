export interface Course {
  course_id: string
  semester: string
  reg_id: string
  department: string
  number: string
  section: string
  title: string
  credits: string
  misc: string
  college: string
  urls?: {
      type: string
      url: string
      description: string
  }[]
  instructors?: {
      name: string
      email: string
  }[]
  times?: {
      day: string
      start_time: string
      end_time: string
  }[]
  additional?: string
}
