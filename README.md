## Teknologier brukt i prosjektet
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Clerk](https://clerk.dev) (for autentisering)
- [Supabase](https://supabase.com) (for database)
- [Resend](https://resend.com) (for e-postutsendelse)

## Oversikt over hoveddeler av applikasjonen
- **Dashboard**: Viser statistikk og oversikt over utslipps- og kjøpsdata.  

- **Utslippsdata (Emission Records)**: Administrasjon og forespørsel om utslippsdata for produkter.
- **Kjøpsdata (Purchase Records)**: Registrering og administrasjon av kjøpsdata.
- **Autentisering**: Alle brukere logger inn med Clerk.
- **API**: tRPC-basert API for kommunikasjon mellom frontend og backend.
- **Database**: Bruker Supabase med Prisma og Drizzle for datamodellering og spørringer.
- **E-post**: Automatisk utsendelse av forespørsler om utslippsdata via Resend.

## Prosedyre for demo
1. Brukeren logger inn for første gang med Clerk. Før/etter dette må en rad i User-tabellen i Supabase lages for dem. Der må **authId** kopieres fra Clerk sitt dashboard. Det samme er ikke strengt tatt nødvendig for eposten deres.

2. For å se produkter og deretter lage purchase records og emission records må en bruker kobles til en organisasjon gjennom UserOrganization (altså organisasjonen brukeren tilhører), og deretter vil dataen fra andre organisasjoner som er koblet til den første gjennom OrgRelation vises. Dette gjøres manuelt i Supabase.

For demonstrasjonsformål kan det være greit å ha et statisk "økosystem" av selskaper og produkter satt opp, også kan dere koble brukere opp mot den samme organisasjonen for å vise funksjonalitet.


## Teknisk oversikt
Dette er en Nextjs applikasjon som bruker TRPC-prosedyrer sammen med Supabase for å hente og lage data, og for å sende eposter til de som skal fullføre emission records. Prosedyrer er beskyttet av Clerk.

Det er fire hoveddatatyper som hentes i backend: EmissionRecord, PurchaseRecord, Product og Organization. Når data hentes ut blir det noen ganger kombinert til en Enriched[Type], f.eks. EnrichedPurchaseRecord, som vil innehold nyttig data som id eller navn til produktet som har blitt kjøpt.

Typene som brukes i prosjektet hentes automatisk fra Supabase gjennom en fil som heter database.types.ts.
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > database.types.ts

Når en emission record blir laget i dashboardet vil en epost auto-sendes til eposten som ligger i Supabase under **organisasjonen** som eier produktet det samles data om.



## Videreutvikling
Invitasjonsprosess som automatiserer Clerk-Supabase kommunikasjonen når brukere skal onboardes.  
Videre statistikk.