export default function Vilkar() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Vilkår og betingelser</h1>

      <p className="text-sm text-gray-600 mb-6">
        Moen &amp; Co AS <br />
        Sist oppdatert: 3. juli 2025
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Om tjenesten</h2>
      <p className="mb-4">
        Denne plattformen er utviklet av Moen &amp; Co AS og gir brukere mulighet til å koble sin Google
        Analytics-konto for å hente ut og vise nøkkeltall som konverteringsrate og gjennomsnittlig ordreverdi (AOV) for
        deres nettbutikk. Tjenesten benytter Google sin autorisasjonsprosess (OAuth) og henter kun nødvendige data med
        lesetilgang.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Bruk av tjenesten</h2>
      <p className="mb-4">
        Tjenesten er gratis og tilbys "som den er". Brukeren er selv ansvarlig for å velge korrekt Google
        Analytics-konto og for hvordan dataene tolkes og brukes. Plattformen presenterer informasjonen slik den er
        hentet fra Google Analytics, uten garantier for nøyaktighet eller fullstendighet.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Personvern og datahåndtering</h2>
      <p className="mb-4">
        Vi lagrer ikke personlig informasjon eller Analytics-data permanent. Alle data hentes i sanntid og brukes kun
        til å vise resultater på skjermen. Ingen data deles med tredjeparter. Les vår{' '}
        <a href="/personvern" className="text-blue-600 underline">
          personvernerklæring
        </a>{' '}
        for mer informasjon.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Ansvarsbegrensning</h2>
      <p className="mb-4">
        Moen &amp; Co AS fraskriver seg ethvert ansvar for eventuelle tap eller skader som kan oppstå som følge av bruk
        av tjenesten. Tjenesten er ment som et hjelpemiddel for analyse og gir ingen garantier for resultater eller
        forbedringer i salg.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Endringer i vilkårene</h2>
      <p className="mb-4">
        Vi forbeholder oss retten til å endre disse vilkårene når som helst. Eventuelle endringer vil publiseres på
        denne siden, og det er ditt ansvar som bruker å holde deg oppdatert.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Kontakt</h2>
      <p className="mb-4">
        Har du spørsmål om tjenesten eller vilkårene, kan du kontakte oss:
      </p>
      <address className="not-italic">
        Moen &amp; Co AS <br />
        E-post:{' '}
        <a href="mailto:support@moenco.no" className="text-blue-600 underline">
          support@moenco.no
        </a>
      </address>
    </main>
  );
}
