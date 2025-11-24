import React from 'react'

export const mdxComponents = {
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
  img: (props: any) => (
    <img className="rounded-lg shadow-lg my-8 w-full" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-neutral-200 text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-6 overflow-x-auto my-6" {...props} />
  ),
}
