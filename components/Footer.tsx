'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

const socials = [
  { name: 'GitHub', href: 'https://github.com/atharvajoshi01', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/atharvajoshi01', icon: Linkedin },
  { name: 'Email', href: 'mailto:atharvaj2112@gmail.com', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-custom py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Atharva Joshi
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-100 transition-colors"
                  aria-label={s.name}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
