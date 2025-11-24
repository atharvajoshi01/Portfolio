import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/mdx'
import { MDXRemote } from 'next/mdx-remote/rsc'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.metadata.title} | Atharva Joshi`,
    description: post.metadata.description,
  }
}

const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 mt-8" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl lg:text-4xl font-display font-semibold mb-4 mt-12" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-display font-semibold mb-3 mt-8" {...props} />
  ),
  p: (props: any) => <p className="text-neutral-700 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-neutral-700" {...props} />,
  a: (props: any) => (
    <a className="text-accent hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-accent pl-4 italic text-neutral-600 my-6"
      {...props}
    />
  ),
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post

  return (
    <div className="pt-32 pb-20">
      <article className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/writing"
            className="inline-flex items-center text-accent hover:underline mb-6"
          >
            ← Back to Writing
          </Link>

          <h1 className="text-5xl lg:text-display-sm font-display font-bold text-primary mb-6">
            {metadata.title}
          </h1>

          <p className="text-xl text-neutral-600 mb-8">{metadata.description}</p>

          {/* Meta Information */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-neutral-200">
            <div className="flex items-center text-neutral-600">
              <Calendar size={18} className="mr-2" />
              <span>
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {metadata.readTime && (
              <div className="flex items-center text-neutral-600">
                <Clock size={18} className="mr-2" />
                <span>{metadata.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {metadata.tags && (
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* MDX Content */}
        <div className="mdx-content prose prose-lg max-w-none">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Link
            href="/writing"
            className="inline-flex items-center text-accent hover:underline font-medium"
          >
            ← View All Posts
          </Link>
        </div>
      </article>
    </div>
  )
}
