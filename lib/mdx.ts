import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')
const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface ProjectMetadata {
  title: string
  description: string
  date: string
  category: string[]
  featured: boolean
  image?: string
  github?: string
  demo?: string
  tech: string[]
}

export interface PostMetadata {
  title: string
  description: string
  date: string
  readTime?: number
  tags: string[]
}

export interface Project {
  slug: string
  metadata: ProjectMetadata
  content: string
}

export interface Post {
  slug: string
  metadata: PostMetadata
  content: string
}

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

export function getProjects(): Project[] {
  ensureDirectoryExists(projectsDirectory)

  const files = fs.readdirSync(projectsDirectory).filter(file => file.endsWith('.mdx'))

  const projects = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(projectsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      metadata: data as ProjectMetadata,
      content,
    }
  })

  return projects.sort((a, b) =>
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

export function getProject(slug: string): Project | null {
  ensureDirectoryExists(projectsDirectory)

  try {
    const filePath = path.join(projectsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      metadata: data as ProjectMetadata,
      content,
    }
  } catch {
    return null
  }
}

export function getPosts(): Post[] {
  ensureDirectoryExists(postsDirectory)

  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      metadata: data as PostMetadata,
      content,
    }
  })

  return posts.sort((a, b) =>
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}

export function getPost(slug: string): Post | null {
  ensureDirectoryExists(postsDirectory)

  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      metadata: data as PostMetadata,
      content,
    }
  } catch {
    return null
  }
}
