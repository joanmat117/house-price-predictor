import { useLanguage } from "@/shared/hooks/useLanguage"
import { Link } from "react-router-dom"

export default function TermsAndConditions() {
  const { language } = useLanguage()
  const isEs = language === "es"

  return (
    <section className="flex-1 px-4 py-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEs ? "Términos y Condiciones" : "Terms and Conditions"}
        </h1>
        <p className="text-muted-foreground">
          {isEs
            ? "Última actualización: Enero 2026 · Vigentes hasta su actualización"
            : "Last updated: January 2026 · Effective until updated"}
        </p>
      </header>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Aceptación" : "Acceptance"}
          </h2>
          <p>
            {isEs
              ? "Al acceder, registrarse o utilizar el servicio, usted declara haber leído y aceptado estos Términos y Condiciones. La aceptación se entiende otorgada por el solo uso del servicio. Si no está de acuerdo, no utilice el servicio."
              : "By accessing, registering for, or using the service, you confirm you have read and accepted these Terms and Conditions. Acceptance is deemed granted by using the service. If you do not agree, do not use the service."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Descripción del Servicio" : "Service Description"}
          </h2>
          <p>
            {isEs
              ? "El servicio ofrece una estimación no profesional del valor de propiedades en el Valle de Aburrá basada en datos de mercado y modelos estadísticos/algorítmicos. La estimación es referencial y puede diferir de avalúos, tasaciones o cotizaciones realizadas por profesionales."
              : "The service provides a non-professional estimate of property values in the Valle de Aburrá based on market data and statistical/algorithmic models. Estimates are for reference only and may differ from appraisals or quotes made by professionals."}
          </p>
          <p className="mt-2">
            {isEs
              ? "El servicio es gratuito dentro de límites razonables de uso. Puede incluir límites, cambios en la disponibilidad y actualizaciones sin previo aviso."
              : "The service is free within reasonable usage limits. It may include limits, changes in availability, and updates without prior notice."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Descargo de Responsabilidad" : "Disclaimer"}
          </h2>
          <p>
            {isEs
              ? "El resultado NO es un avalúo profesional, no constituye un dictamen técnico, ni asesoría financiera, legal o inmobiliaria. La información es orientativa y se entrega \"tal cual\". Usted reconoce y acepta que el responsable NO será responsable por decisiones de compra, venta, financiación, inversión o cualquier otra tomada con base en las estimaciones, así como por pérdidas o daños derivados."
              : "IMPORTANT: The output is NOT a professional appraisal, does not constitute a technical opinion, and is not financial, legal, or real estate advice. Information is provided for guidance and on an \"as is\" basis. You acknowledge and agree the provider is not liable for purchase, sale, financing, investment, or any decisions made based on estimates, nor for losses or damages arising from such use."}
          </p>
          <p className="mt-2">
            {isEs
              ? "Para fines oficiales, se recomienda acudir a un profesional o entidad competente."
              : "For official purposes, you should consult a licensed professional appraiser or competent entity."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Limitación de Responsabilidad" : "Limitation of Liability"}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isEs
                ? "En la máxima medida permitida por la ley, el responsable no será responsable por daños indirectos, incidentales, especiales, punitivos o consecuenciales."
                : "To the maximum extent permitted by law, the provider will not be liable for indirect, incidental, special, punitive, or consequential damages."}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Reglas de Uso" : "Acceptable Use"}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isEs
                ? "No intentar acceder sin autorización escrita, vulnerar seguridad, realizar hacking, automatizar abuso del servicio o evadir límites."
                : "Do not attempt unauthorized access, compromise security, automate abusive usage, or circumvent usage limits."}
            </li>
            <li>
              {isEs
                ? "No enviar información falsa o que infrinja derechos de terceros."
                : "Do not submit false information or content that infringes third-party rights."}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Datos que Recopilamos" : "Data We Collect"}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {isEs
                ? "Datos de autenticación de Google (cuenta Gmail), token de sesión."
                : "Google authentication data (Gmail account), session token."}
            </li>
            <li>
              {isEs
                ? "Datos de perfil opcionales: nombre completo, número de teléfono, agencia inmobiliaria."
                : "Optional profile data: full name, phone number, real estate agency."}
            </li>
            <li>
              {isEs
                ? "Datos de propiedad y ubicación: dirección, ciudad, barrio, referencias, latitud/longitud, área, área construida, habitaciones, baños, parqueaderos, estrato, antigüedad, características (piscina, sauna, etc.), estado y relación con la propiedad."
                : "Property and location data: address, city, neighborhood, landmarks, latitude/longitude, lot area, built area, rooms, bathrooms, parking spots, stratum, age, features (pool, sauna, etc.), status and relationship with the property."}
            </li>
            <li>
              {isEs
                ? "Datos de uso y métricas: consultas, predicciones realizadas, interacción con mapas/buscador, logs técnicos, dispositivo y navegador."
                : "Usage and metrics data: queries, predictions performed, map/search interactions, technical logs, device and browser."}
            </li>
            <li>
              {isEs
                ? "Cookies y tecnologías similares para mantener sesión y preferencias."
                : "Cookies and similar technologies to maintain session and preferences."}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Finalidades del Tratamiento" : "Processing Purposes"}
          </h2>
          <p>
            {isEs
              ? "Tratamos los datos para: (i) prestar el servicio y gestionar autenticación; (ii) estudio de mercado y analítica de uso; (iii) contactar a interesados en nuestros servicios; (iv) compartir información con terceros aliados o proveedores para los fines anteriores; (v) mejora de modelos, desarrollo de productos, comunicaciones comerciales; (vi) uso de datos agregados/anonimizados; (vii) cumplimiento de obligaciones legales."
              : "We process data to: (i) deliver the service and manage authentication; (ii) market study and usage analytics; (iii) contact users interested in our services; (iv) share information with third-party partners/providers for the above purposes; (v) improve models, develop products, and commercial communications; (vi) use aggregated/anonymous data; (vii) comply with legal obligations."}
          </p>
          <p className="mt-2">
            {isEs
              ? "Usted otorga consentimiento expreso para el tratamiento y uso comercial de sus datos conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas aplicables. El uso del servicio se entiende como autorización cuando sea permitido por la ley; cuando aplique, se solicitará autorización expresa por mecanismos adicionales."
              : "You provide explicit consent for the processing and commercial use of your data in accordance with Colombian Law 1581 of 2012, Decree 1377 of 2013, and other applicable regulations. Use of the service may be treated as authorization where legally permitted; where required, we will request explicit authorization through additional mechanisms."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Base Legal y Derechos" : "Legal Basis and Rights"}
          </h2>
          <p>
            {isEs
              ? "El tratamiento se realiza con base en su consentimiento y en la necesidad de prestar el servicio. Usted, como titular de los datos, tiene derecho a conocer, actualizar, rectificar y suprimir su información; solicitar prueba de autorización; ser informado del uso; presentar quejas ante la SIC; y revocar la autorización cuando proceda."
              : "Processing is based on your consent and the necessity to provide the service. As data subject, you have the right to access, update, rectify, and delete your information; request proof of authorization; be informed about use; file complaints before the SIC; and revoke authorization when applicable."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Transferencias y Encargados" : "Transfers and Processors"}
          </h2>
          <p>
            {isEs
              ? "Podemos usar proveedores y servicios externos (p.ej., geocodificación, hosting, analítica) que actúan como encargados del tratamiento, y también compartir información con terceros aliados para fines comerciales, en los términos aquí indicados. Podrán existir transferencias internacionales con las garantías y requisitos que exija la normativa aplicable."
              : "We may use external providers and services (e.g., geocoding, hosting, analytics) acting as processors, and may also share information with third-party partners for commercial purposes as described herein. International transfers may occur subject to the safeguards and requirements under applicable law."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Conservación y Seguridad" : "Retention and Security"}
          </h2>
          <p>
            {isEs
              ? "Conservamos los datos hasta que el titular solicite su eliminación o mientras sean necesarios para las finalidades descritas y cumplimiento legal. Implementamos medidas de seguridad razonables para proteger la información."
              : "We retain data until the data subject requests deletion or as long as necessary to fulfill the stated purposes and legal compliance. We implement reasonable security measures to protect information."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Propiedad Intelectual" : "Intellectual Property"}
          </h2>
          <p>
            {isEs
              ? "El software, marcas, diseño y contenido del servicio pertenecen al responsable o a sus licenciantes. No se concede licencia distinta a la necesaria para usar el servicio conforme a estos términos."
              : "The service software, trademarks, design, and content belong to the provider or its licensors. No license is granted other than what is necessary to use the service under these terms."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Menores de Edad" : "Minors"}
          </h2>
          <p>
            {isEs
              ? "El servicio no está dirigido a menores de edad. No recopilamos intencionalmente datos de menores."
              : "The service is not directed to minors. We do not knowingly collect data from minors."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Cookies" : "Cookies"}
          </h2>
          <p>
            {isEs
              ? "Usamos cookies para mantener sesión, preferencias y mejorar el servicio. Usted puede gestionar cookies desde su navegador."
              : "We use cookies to maintain session, preferences, and improve the service. You may manage cookies from your browser."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Modificaciones" : "Changes"}
          </h2>
          <p>
            {isEs
              ? "Podemos modificar estos términos en cualquier momento. Los cambios se publicarán en esta página. El uso continuo implica aceptación."
              : "We may modify these terms at any time. Changes will be published on this page. Continued use implies acceptance."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Terminación" : "Termination"}
          </h2>
          <p>
            {isEs
              ? "Podemos suspender o terminar el acceso al servicio por incumplimiento de estos términos o por razones de seguridad, operación o cumplimiento legal."
              : "We may suspend or terminate access for breach of these terms or for security, operational, or legal compliance reasons."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Ley Aplicable y Jurisdicción" : "Applicable Law and Jurisdiction"}
          </h2>
          <p>
            {isEs
              ? "Estos términos se rigen por la legislación de la República de Colombia. Cualquier controversia se someterá a los jueces competentes de [CIUDAD], Colombia, salvo norma imperativa en contrario."
              : "These terms are governed by the laws of the Republic of Colombia. Any dispute shall be submitted to the competent courts of [CITY], Colombia, unless mandatory rules provide otherwise."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">
            {isEs ? "Contacto y Ejercicio de Derechos" : "Contact and Rights Requests"}
          </h2>
          <p>
            {isEs
              ? "Para ejercer sus derechos o realizar consultas/quejas sobre el tratamiento de datos, contáctenos por WhatsApp al +57 3126561205 o al correo 1santiago@tutanota.com."
              : "To exercise your rights or make inquiries/complaints regarding data processing, contact us via WhatsApp at +57 3126561205 or by email at 1santiago@tutanota.com."}
          </p>
          <p className="mt-2">
            {isEs
              ? "Para solicitudes formales (p.ej. supresión de datos), utilice el correo 1santiago@tutanota.com para dejar trazabilidad."
              : "For formal requests (e.g. data deletion), please use 1santiago@tutanota.com to keep a record."}
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
