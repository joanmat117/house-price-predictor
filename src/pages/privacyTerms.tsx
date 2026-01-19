import { useLanguage } from "@/shared/hooks/useLanguage"
import { MarkdownRenderer } from "@/shared/components/MarkdownRenderer"
import { ReturnToHomeButton } from "@/shared/components/ReturnToHomeButton"

const PRIVACY_ES = "/docs/privacy-es.md"
const PRIVACY_EN = "/docs/privacy-en.md"

export default function PrivacyTerms() {
  const { language } = useLanguage()
  const isEs = language === "es"

  return (
    <section className="flex-1 px-4 py-6 max-w-4xl mx-auto">
      <MarkdownRenderer 
        url={isEs ? PRIVACY_ES : PRIVACY_EN} 
      />

      <div className="pt-8 border-t mt-8">
        <ReturnToHomeButton/> 
      </div>
    </section>
  )
}
