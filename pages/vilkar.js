export default function Vilkar() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Vilkår og betingelser</h1>

      <p className="text-sm text-gray-600 mb-6">
        Moen &amp; Co AS <br />
        Sist oppdatert: 10. juli 2025
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
      <h2 className="text-xl font-semibold mt-6 mb-2">3.1 Datainnsamling og bruk</h2>
      <p className="mb-4">
        Vi lagrer ikke personlig informasjon eller Analytics-data permanent. Alle data hentes i sanntid fra Google Analytics og brukes kun til å vise resultater på skjermen. Ingen data deles med tredjeparter.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3.2 Databeskyttelse</h2>
      <p className="mb-2">
        Vi implementerer følgende sikkerhetstiltak for å beskytte sensitive data:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>All dataoverføring skjer via krypterte HTTPS-forbindelser</li>
        <li>Tilgang til Google Analytics-data krever OAuth-autorisasjon fra brukeren</li>
        <li>Ingen sensitive data lagres permanent på våre servere</li>
        <li>Midlertidige data slettes automatisk når brukerøkten avsluttes</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3.3 Dataoppbevaring og sletting</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Vi lagrer ikke Google Analytics-data permanent</li>
        <li>Tilgangstokens for Google Analytics oppbevares kun under aktiv brukersesjon</li>
        <li>Alle data slettes automatisk når du forlater plattformen</li>
        <li>Brukere kan når som helst trekke tilbake tilgang til Google Analytics-kontoen sin gjennom Google-kontoen sin</li>
        <li>Ved forespørsel kan brukere kontakte oss for å sikre at eventuelle midlertidige data er slettet</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3.4 Brukerrettigheter</h2>
      <p className="mb-2">Brukere har rett til å:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Få innsyn i hvilke data som hentes fra Google Analytics</li>
        <li>Trekke tilbake tilgang til Google Analytics-kontoen når som helst</li>
        <li>Kreve sletting av eventuelle midlertidige data</li>
        <li>Få informasjon om hvordan dataene behandles</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Google Analytics API-bruk</h2>
      <p className="mb-2">Vi bruker følgende Google Analytics API-tilgang:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Scope: <a href="https://www.googleapis.com/auth/analytics.readonly">https://www.googleapis.com/auth/analytics.readonly</a></li>
        <li>Formål: Hente ut konverteringsdata og AOV-statistikk</li>
        <li>Datatyper: Aggregerte statistikker, ingen personidentifiserbar informasjon</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Ansvarsbegrensning</h2>
      <p className="mb-4">
        Moen &amp; Co AS fraskriver seg ethvert ansvar for eventuelle tap eller skader som kan oppstå som følge av bruk
        av tjenesten. Tjenesten er ment som et hjelpemiddel for analyse og gir ingen garantier for resultater eller
        forbedringer i salg.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Endringer i vilkårene</h2>
      <p className="mb-4">
        Vi forbeholder oss retten til å endre disse vilkårene når som helst. Eventuelle endringer vil publiseres på
        denne siden, og det er ditt ansvar som bruker å holde deg oppdatert.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Kontakt</h2>
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
