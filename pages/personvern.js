import Head from 'next/head';

<Head>
  <title>Personvernerklæring – Moen & Co AS</title>
  <meta name="description" content="Les vår personvernerklæring for informasjon om hvordan vi behandler dine data." />
</Head>

export default function Personvern() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Personvernerklæring</h1>

      <p className="text-sm text-gray-600 mb-6">
        Moen &amp; Co AS <br />
        Sist oppdatert: 3. juli 2025
      </p>

      <p className="mb-4">
        Denne appen er utviklet av Moen &amp; Co AS for å gi eiere av nettbutikker innsikt i konverteringsrate og
        gjennomsnittlig ordreverdi (Average Order Value) basert på data fra Google Analytics. Vi tar personvern på
        alvor og samler kun inn den informasjonen som er nødvendig for å levere denne tjenesten.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Hvilke data samler vi inn?</h2>
      <p className="mb-4">
        Når du kobler til din Google-konto via vår app, ber vi kun om <strong>lesetilgang</strong> til din Google
        Analytics-konto. Vi henter spesifikke nøkkeltall (som antall transaksjoner, trafikk og omsetning) som brukes
        til å beregne:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Konverteringsrate</li>
        <li>Gjennomsnittlig ordreverdi</li>
      </ul>

      <p className="mb-4">Vi samler <strong>ikke</strong> inn:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Navn, e-post eller andre personopplysninger knyttet til Google-kontoen din</li>
        <li>Betalingsinformasjon</li>
        <li>Brukeratferd utenfor de spesifikke måleparametrene vi trenger</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Hvordan brukes dataene?</h2>
      <p className="mb-4">
        Dataene hentes kun for å gjøre nødvendige beregninger og vises direkte til deg på landingssiden. Vi lagrer
        ikke dine Analytics-data permanent, og ingen data deles med tredjeparter.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Informasjonskapsler (cookies)</h2>
      <p className="mb-4">
        Vi kan bruke nødvendige informasjonskapsler for å sikre at tjenesten fungerer som den skal, men vi bruker ikke
        cookies for sporing eller markedsføring.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Dine rettigheter</h2>
      <p className="mb-4">
        Du kan når som helst trekke tilbake tilgangen appen har til din Google-konto via Google-kontoinnstillinger.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Kontaktinformasjon</h2>
      <p className="mb-4">
        Har du spørsmål om personvern eller hvordan vi håndterer data, ta gjerne kontakt med oss:
      </p>
      <address className="not-italic mb-4">
        Moen &amp; Co AS <br />
        E-post: <a href="mailto:support@moenco.no" className="text-blue-600 underline">support@moenco.no</a>
      </address>
    </main>
  );
}
