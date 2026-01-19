import { useLanguage } from "@/shared/hooks/useLanguage"
import { MarkdownRenderer } from "@/shared/components/MarkdownRenderer"
import { ReturnToHomeButton } from "@/shared/components/ReturnToHomeButton"

const TERMS_ES = "/docs/terms-es.md"
const TERMS_EN = "/docs/terms-en.md"

export default function TermsAndConditions() {
  const { language } = useLanguage()
  const isEs = language === "es"

  return (
    <section className="flex-1 px-4 py-6 max-w-4xl mx-auto">
      <MarkdownRenderer 
        url={isEs ? TERMS_ES : TERMS_EN} 
      />
      
      <div className="pt-8 border-t mt-8">
        <ReturnToHomeButton/> 
      </div>
    </section>
  )
}
