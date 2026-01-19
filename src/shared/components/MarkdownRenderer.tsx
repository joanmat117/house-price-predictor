import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Loader } from './icons/Loader'

interface MarkdownRendererProps {
  url: string
  className?: string
}

export const MarkdownRenderer = ({ url, className }: MarkdownRendererProps) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch(url)
      .then((res) => {
        const isHtml = res.headers.get('content-type')?.includes('text/html')
        
        if (!res.ok || isHtml) {
          throw new Error('Archivo no encontrado o formato incorrecto')
        }
        return res.text()
      })
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error cargando markdown:', err)
        setError(true)
        setLoading(false)
      })
  }, [url])

  if (loading) return <Loader className='size-10 mx-auto'/>
  if (error) {
    return (
      <div className="py-5 px-3 text-center border-2 border-dashed rounded-lg border-destructive/20">
        <p className="text-destructive font-medium">No se pudo cargar el contenido</p>
        <p className="text-xs text-muted-foreground mt-1">Por favor, intenta más tarde</p>
      </div>
    )
  }

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown 
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold tracking-tight mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-8 mb-3" {...props} />,
          p: ({node, ...props}) => <p className="text-sm leading-relaxed mb-4 text-foreground/90" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
          li: ({node, ...props}) => <li className="text-sm text-foreground/80" {...props} />,
          strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
