import { Github, Linkedin, User } from 'lucide-react'
import data from '@/assets/docs/credits.json'
import { useTranslations } from '@/shared/hooks/useTranslations'
import { ReturnToHomeButton } from '@/shared/components/ReturnToHomeButton'

/*
  Data Json Estructure: 
  [
  {
    "name": "",
    "picture": "",
    "description": "",
    "github": "",
    "linkedin": ""
  }
  ]

*/

export default function CreditsView() {

  const t = useTranslations()

  return (
    <section className="flex-1 px-4 py-8 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          {t.credits.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {data.map((person, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-6 bg-card border rounded-3xl transition-all hover:shadow-md"
          >
            {/* Renderizado condicional de la imagen o placeholder */}
            <div className="mb-4">
              {person.picture ? (
                <img 
                  src={person.picture} 
                  alt={person.name || 'Contributor'}
                  className="w-24 h-24 rounded-full object-cover border-2 border-muted"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <User size={40} />
                </div>
              )}
            </div>

            {/* Nombre opcional */}
            {person.name && (
              <h3 className="text-xl font-bold mb-2 text-center">{person.name}</h3>
            )}
            
            {/* Descripción opcional */}
            {person.description && (
              <p className="text-sm text-center text-muted-foreground mb-6 flex-1">
                {person.description}
              </p>
            )}

            {/* Redes sociales solo si existen */}
            <div className="flex gap-3">
              {person.github && (
                <a 
                  href={person.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {person.linkedin && (
                <a 
                  href={person.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer className="pt-8 border-t text-center">
        
      <ReturnToHomeButton/>
      </footer>
    </section>
  )
}
