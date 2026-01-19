import { useLanguage } from "@/shared/hooks/useLanguage"
import { Link } from "react-router-dom"

export default function PrivacyTerms() {
  const { language } = useLanguage()
  const isEs = language === "es"

  return (
    <section className="flex-1 px-4 py-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEs ? "Privacidad" : "Privacy"}
        </h1>
        <p className="text-muted-foreground">
          {isEs
            ? "Última actualización: Enero 2026"
            : "Last updated: January 2026"}
        </p>
      </header>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold">{isEs ? "Resumen" : "Summary"}</h2>
          <p>
            {isEs
              ? "Tu privacidad nos importa. Esta página explica qué información usamos para operar el servicio, por qué la usamos, y cómo puedes contactarnos si tienes preguntas o quieres eliminar tus datos."
              : "Your privacy matters. This page explains what information we use to operate the service, why we use it, and how to contact us if you have questions or want your data deleted."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Contacto" : "Contact"}</h2>
          <p>
            {isEs
              ? "Para consultas, peticiones, quejas o reclamos relacionados con datos personales, puede contactarnos por correo a 1santiago@tutanota.com o por WhatsApp al +57 3126561205."
              : "For questions, requests, complaints, or claims related to personal data, you can contact us by email at 1santiago@tutanota.com or via WhatsApp at +57 3126561205."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Qué datos usamos" : "What data we use"}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isEs
                ? "Inicio de sesión: datos de autenticación con Google (por ejemplo, correo y nombre) y datos de sesión."
                : "Sign-in: Google authentication data (for example, email and name) and session data."}
            </li>
            <li>
              {isEs
                ? "Perfil (opcional): nombre completo, teléfono, agencia inmobiliaria."
                : "Profile (optional): full name, phone number, real estate agency."}
            </li>
            <li>
              {isEs
                ? "Datos del inmueble/ubicación: lo que ingresas para obtener la estimación (dirección o lugar cercano, ciudad/barrio, coordenadas y características del inmueble)."
                : "Property/location data: what you enter to get the estimate (address or nearby place, city/neighborhood, coordinates, and property features)."}
            </li>
            <li>
              {isEs
                ? "Datos de uso: consultas/predicciones, eventos de interacción y logs técnicos para mejorar el servicio y prevenir abuso."
                : "Usage data: queries/predictions, interaction events, and technical logs to improve the service and prevent abuse."}
            </li>
            <li>
              {isEs
                ? "Cookies/tecnologías similares: para sesión, preferencias y funcionamiento básico."
                : "Cookies/similar technologies: for session, preferences, and basic functionality."}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Para qué los usamos" : "How we use it"}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{isEs ? "Prestación del servicio y soporte." : "Service delivery and support."}</li>
            <li>{isEs ? "Estudio de mercado y analítica del uso." : "Market study and usage analytics."}</li>
            <li>{isEs ? "Contactar a personas interesadas en el servicio." : "Contact people interested in the service."}</li>
            <li>{isEs ? "Mejora de modelos, desarrollo del producto y prevención de abuso." : "Model improvement, product development, and abuse prevention."}</li>
            <li>{isEs ? "Cumplimiento de obligaciones legales y atención de requerimientos." : "Legal compliance and handling official requests."}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Compartimos datos con terceros" : "Do we share data with third parties?"}</h2>
          <p>
            {isEs
              ? "A veces usamos proveedores que nos ayudan a operar el servicio (por ejemplo, hosting, analítica o geocodificación). En esos casos, compartimos solo lo necesario para prestar el servicio y mantenerlo seguro."
              : "Sometimes we use providers that help us operate the service (for example, hosting, analytics, or geocoding). In those cases, we share only what’s necessary to run the service and keep it secure."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Cuánto tiempo conservamos los datos" : "How long we keep data"}</h2>
          <p>
            {isEs
              ? "Conservamos los datos el tiempo necesario para operar el servicio y para los fines descritos arriba. Puedes solicitar la eliminación de tus datos escribiendo a 1santiago@tutanota.com."
              : "We keep data as long as needed to operate the service and for the purposes described above. You can request deletion by emailing 1santiago@tutanota.com."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Seguridad" : "Security"}</h2>
          <p>
            {isEs
              ? "Tomamos medidas razonables para proteger la información. Aun así, ningún sistema es 100% infalible."
              : "We take reasonable measures to protect information. However, no system is 100% foolproof."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Tus opciones" : "Your choices"}</h2>
          <p>
            {isEs
              ? "Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a 1santiago@tutanota.com."
              : "You can request access, correction, or deletion of your data by emailing 1santiago@tutanota.com."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Menores de edad" : "Minors"}</h2>
          <p>
            {isEs
              ? "El servicio no está dirigido a menores de edad."
              : "The service is not directed to minors."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Cookies" : "Cookies"}</h2>
          <p>
            {isEs
              ? "Usamos cookies para que la app funcione (por ejemplo, mantener sesión y preferencias). Puedes gestionarlas desde tu navegador."
              : "We use cookies so the app works (for example, to keep session and preferences). You can manage them in your browser."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Cambios" : "Changes"}</h2>
          <p>
            {isEs
              ? "Podemos actualizar esta información. Si haces cambios importantes, intentaremos avisarlo dentro de la app o en esta misma página."
              : "We may update this information. If we make important changes, we’ll try to notify it in the app or on this page."}
          </p>
        </section>

        <div className="pt-4">
          <Link to="/" className="underline">
            {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </div>
      </div>
    </section>
  )
}
