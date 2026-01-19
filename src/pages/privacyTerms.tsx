import { useLanguage } from "@/shared/hooks/useLanguage"
import { Link } from "react-router-dom"

export default function PrivacyTerms() {
  const { language } = useLanguage()
  const isEs = language === "es"

  return (
    <section className="flex-1 px-4 py-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEs ? "Política de Privacidad" : "Privacy Policy"}
        </h1>
        <p className="text-muted-foreground">
          {isEs
            ? "Última actualización: Enero 2026 · Vigente hasta su actualización"
            : "Last updated: January 2026 · Effective until updated"}
        </p>
      </header>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold">{isEs ? "Responsable del Tratamiento" : "Controller"}</h2>
          <p>
            {isEs
              ? "Este servicio es operado por [Nombre legal completo], NIT [NIT], con domicilio en [Dirección], ciudad [Ciudad], correo [Email]. “Propiedades Aburrá” es un nombre comercial y no una sociedad registrada; la entidad responsable real debe ser la indicada."
              : "This service is operated by [Entity’s full legal name], NIT/Tax ID [NIT], registered at [Address], city [City], email [Email]. “Propiedades Aburrá” is a trade name and not a registered company; the actual responsible entity must be identified."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Datos que Recopilamos" : "Data We Collect"}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{isEs ? "Datos de autenticación por Google (Gmail): nombre, correo, identificador." : "Google sign-in (Gmail): name, email, identifier."}</li>
            <li>{isEs ? "Perfil opcional: teléfono, agencia inmobiliaria." : "Optional profile: phone, real estate agency."}</li>
            <li>{isEs ? "Datos de propiedad y ubicación; interacciones y uso del servicio." : "Property/location data; interactions and service usage."}</li>
            <li>{isEs ? "Cookies y tecnologías similares para sesión, rendimiento y analítica." : "Cookies and similar technologies for session, performance, and analytics."}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Finalidades" : "Purposes"}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{isEs ? "Estudio de mercado y analítica de uso." : "Market study and usage analytics."}</li>
            <li>{isEs ? "Contactar a interesados en nuestros servicios." : "Contact users interested in our services."}</li>
            <li>{isEs ? "Compartir información con terceros aliados/proveedores para los fines anteriores." : "Share information with third-party partners/providers for the above purposes."}</li>
            <li>{isEs ? "Mejora de modelos, desarrollo de producto y comunicaciones comerciales." : "Model improvement, product development, and commercial communications."}</li>
            <li>{isEs ? "Estadísticas y reportes, incluyendo uso agregado/anonimizado." : "Statistics and reporting, including aggregated/anonymous use."}</li>
            <li>{isEs ? "Cumplimiento de obligaciones legales." : "Compliance with legal obligations."}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Bases Legales" : "Legal Bases"}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{isEs ? "Consentimiento expreso del titular." : "Explicit user consent."}</li>
            <li>{isEs ? "Ejecución de la relación y prestación del servicio." : "Contractual performance and service provision."}</li>
            <li>{isEs ? "Interés legítimo en mejora y analítica." : "Legitimate interest in improvement and analytics."}</li>
            <li>{isEs ? "Cumplimiento legal." : "Legal compliance."}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Transferencias y Encargados" : "Transfers and Processors"}</h2>
          <p>
            {isEs
              ? "Podremos transferir o transmitir datos a proveedores en Colombia y en el exterior con medidas de seguridad y cumplimiento legal aplicable."
              : "We may transfer or disclose data to providers in Colombia and abroad with appropriate safeguards and legal compliance."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Conservación y Seguridad" : "Retention and Security"}</h2>
          <p>
            {isEs
              ? "Conservamos los datos hasta que el titular solicite su eliminación o mientras sean necesarios para las finalidades descritas. Implementamos medidas razonables de seguridad."
              : "We retain data until the user requests deletion or as long as necessary for the stated purposes. We implement reasonable security measures."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Derechos del Titular" : "Data Subject Rights"}</h2>
          <p>
            {isEs
              ? "El titular puede acceder, actualizar, rectificar, suprimir sus datos y revocar la autorización. Para ejercer derechos o quejas, contáctenos al +57 3126561205 y [Email/DPO/Canal]. Puede presentar quejas ante la SIC."
              : "You may access, update, rectify, delete your data and revoke consent. To exercise rights or complaints, contact +57 3126561205 and [Email/DPO/Channel]. You may file complaints before the SIC."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Menores" : "Minors"}</h2>
          <p>{isEs ? "No dirigido a menores; no recolectamos datos de menores sin autorización exigida." : "Not directed to minors; we do not knowingly collect data from minors without required authorization."}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Cookies" : "Cookies"}</h2>
          <p>{isEs ? "Usamos cookies para sesión, experiencia y analítica. Puedes gestionarlas en tu navegador." : "We use cookies for session, experience, and analytics. You can manage them in your browser."}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">{isEs ? "Cambios" : "Changes"}</h2>
          <p>{isEs ? "Esta política puede ser actualizada; se publicará con nueva fecha de actualización." : "This policy may be updated; changes will be published with the updated date."}</p>
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
