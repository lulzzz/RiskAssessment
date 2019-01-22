delete from SoaChapter;

SET IDENTITY_INSERT [dbo].[SoaChapter] ON 


INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (34, N'A.5', N'Informasjonssikkerhetspolicyer', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (35, N'A.5.1', N'Ledelsens føringer for informasjonssikkerhet', N'Å formidle ledelsens føringer og støtte til informasjonssikkerhet i samsvar med forretningsmessige krav og relevante lover og forskrifter.', 34, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (36, N'A.5.1.1', N'Policyer for informasjonssikkerhet', N'Et sett med policyer for informasjonssikkerhet skal defineres, dkjennes av ledelsen, publiseres og kommuniseres til ansatte og relevante eksterne parter.', 35, N'På høyeste nivå bør organisasjoner definere en "informasjonssikkerhetspolicy" som dkjennes av ledelsen, og som presenterer organisasjonens tilnærming til styring av informasjonssikkerhetsmålene sine.

Informasjonssikkerhetspolicyer bør adressere krav skapt av:

a)	forretningsstrategien;
b)	forskrifter, lover og kontrakter;
c)	det nåværende og framtidige forventede trusselmiljøet for informasjonssikkerhet.

Informasjonssikkerhetspolicyen bør inneholde påstander om:
a)	definering av informasjonssikkerhet, mål og prinsipper til veiledning for alle aktiviteter knyttet til informasjonssikkerhet;
b)	tildeling av generelt og spesifikt ansvar for styring av informasjonssikkerhet til definerte roller;
c)	prosesser for å håndtere avvik og unntak.

På et lavere nivå bør informasjonssikkerhetspolicyen understøttes av temaspesifikke policyer, som videre pålegger implementering av sikringstiltak for informasjonssikkerhet, og som typisk er strukturert for å dekke behovene til bestemte målgrupper innenfor en organisasjon eller for å ta opp bestemte temaer.

Eksempler på slike policytemaer er:

a)	aksesskontroll (se punkt 9);
b)	klassifisering (og håndtering) av informasjon (se 8.2);
c)	fysisk og miljømessig sikkerhet (se punkt 11);
d)	sluttbrukerettede temaer som:
1)	akseptabel bruk av aktiva (se A.8.1.3
2)	ryddig arbeidsplass og låst skjerm (se 1A.1.2.9
3)	informasjonsoverføring (se 1A.3.2.1
4)	mobilt utstyr og fjernarbeid (se 6.2);
5)	restriksjoner på installering og bruk av programvare (se 1A.2.6.2
e)	sikkerhetskopiering (se 12.3);
f)	informasjonsoverføring (se 13.2);
g)	beskyttelse mot ødeleggende programvare (se 12.2);
h)	håndtering av tekniske sårbarheter (se 1A.2.6.1
i)	kryptografiske kontroller (se punkt 10);
j)	kommunikasjonssikkerhet (se punkt 13);
k)	personvern og beskyttelse av personlig identifiserbar informasjon (se 1A.8.1.4
l)	leverandørforhold (se punkt 15).

Disse policyene bør kommuniseres til ansatte og relevante eksterne parter i en form som er relevant, tilgjengelig og forståelig for den tiltenkte leseren, for eksempel innenfor konteksten av et "program for bevisstgjøring, utdanning og opplæring i informasjonssikkerhet" (se A.7.2.2', N'Behovet for interne policyer for informasjonssikkerhet varierer fra organisasjon til organisasjon. Interne policyer er særlig nyttig i store og mer komplekse organisasjoner der de som definerer og dkjenner de forventede nivåene av kontroll, er adskilt fra de som implementerer sikringstiltakene, eller i situasjoner der en policy gjelder for mange forskjellige personer eller funksjoner i organisasjonen. Policyer for informasjonssikkerhet kan utgis i ett enkelt "informasjonssikkerhetspolicy"-dokument eller som et sett med enkeltstående, men relaterte dokumenter.

Hvis noen av informasjonssikkerhetspolicyene distribueres utenfor organisasjonen, bør det sørges nøye for at konfidensiell informasjon ikke røpes.

Enkelte organisasjoner bruker andre termer for disse policydokumentene, som "standarder", "direktiver" eller "regler"')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (37, N'A.5.1.2', N'Gjennomgang av policyene for informasjonssikkerhet', N'Policyene for informasjonssikkerhet skal gjennomgås med planlagte intervaller. Dersom betydelige endringer skjer, skal det sikres at de fortsatt er egnet, tilstrekkelige og virkningsfulle.', 35, N'Hver policy bør ha en eier som har tatt lederansvar for utarbeidelsen, gjennomgangen og evalueringen av policyene. Gjennomgangen bør inkludere å vurdere muligheter for forbedring av organisasjonens policyer og tilnærming til styring av informasjonssikkerhet, som svar på endringer i miljøet i organisasjonen, omstendigheter rundt virksomheten, juridiske forhold eller det tekniske miljøet.

Gjennomgangen av policyer for informasjonssikkerhet bør ta hensyn til resultatene fra ledelsens gjennomganger.

Det bør innhentes dkjenning fra ledelsen for en revidert policy.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (38, N'A.6', N'Organisering av informasjonssikkerhet', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (39, N'A.6.1', N'Intern organisering', N'Å etablere et styringsrammeverk for å initiere og kontrollere implementering og forvaltning av informasjonssikkerhet i organisasjonen.', 38, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (40, N'A.6.1.1', N'Roller og ansvar for informasjonssikkerhet', N'Alt ansvar for informasjonssikkerhet skal være definert og tilordnet.', 39, N'Ansvar for informasjonssikkerhet bør være tilordnet i samsvar med informasjonssikkerhetspolicyene (se A.5.1.1

Enkeltpersoner som er tildelt ansvar for informasjonssikkerhet, kan delegere sikkerhetsoppgaver til andre. De forblir likevel ansvarlige og avgjør om eventuelle oppgaver de har delegert, har blitt riktig utført.

Områder enkeltpersoner er ansvarlige for, bør være angitt. Særlig bør følgende finne sted:

a)	aktivaene og informasjonssikkerhetsprosessene bør være identifisert og definert;
b)	enheten som har ansvar for hvert aktivum eller hver informasjonssikkerhetsprosess, bør være utpekt, og detaljert informasjon om dette ansvaret bør være dokumentert (se A.8.1.2
c)	autorisasjonsnivåer bør være definert og dokumentert;
d)	for å være i stand til å ta ansvar på informasjonssikkerhetsområdet bør de utnevnte personene være kompetente på området og bli gitt muligheter til å holde seg oppdatert på utviklingen;
e)	koordinering av og tilsyn med informasjonssikkerhetsaspekter ved leverandørforhold bør være identifisert og dokumentert.', N'Mange organisasjoner utnevner en informasjonssikkerhetsleder som tar det overordnede ansvaret for å utvikle og implementere informasjonssikkerhet og støtte identifiseringen av sikringstiltak.

Ansvaret for å anskaffe og implementere sikringstiltakene vil imidlertid ofte bli liggende hos de enkelte lederne. En vanlig praksis er å utnevne en eier for hvert aktivum som så blir ansvarlig for den daglige beskyttelsen av det.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (41, N'A.6.1.2', N'Arbeidsdeling', N'Oppgaver og ansvar innenfor ulike områder skal være segregert for å redusere mulighetene for uautorisert eller utilsiktet modifisering eller misbruk av organisasjonens aktiva.', 39, N'Det bør være sørget for at ingen enkeltpersoner kan få tilgang til, modifisere eller bruke aktiva uten autorisasjon eller uten at det blir oppdaget. Oppdagelsen av en hendelse bør være adskilt fra bemyndigelsen til å gjøre noe med den. Muligheten for sammensvergelser bør vurderes når sikringstiltakene utarbeides.

I små organisasjoner kan det være vanskelig å oppnå arbeidsdeling, men prinsippet bør anvendes så langt det er mulig og gjennomførbart. Når slik deling er vanskelig å gjennomføre, bør andre sikringstiltak, som overvåking av aktiviteter, revisjonsspor og ledelsestilsyn, vurderes.', N'Arbeidsdeling er en metode for å redusere risikoen for utilsiktet eller tilsiktet misbruk av aktivaene til en organisasjon.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (42, N'A.6.1.3', N'Kontakt med myndigheter', N'Hensiktsmessig kontakt med relevante myndigheter skal opprettholdes.', 39, N'Organisasjoner bør ha prosedyrer som angir når myndigheter (f.eks. politi, kontrollmyndigheter eller tilsynsmyndigheter) bør kontaktes, hvem som bør gjøre dette, og hvordan identifiserte informasjonssikkerhetsbrudd bør rapporteres innen rimelig tid (f.eks. ved mistanke om lovbrudd).', N'Organisasjoner som angripes fra Internett, kan trenge at myndigheter griper inn mot kilden for angrepet.

Opprettholdelse av slik kontakt kan være et krav for å understøtte styring av informasjonssikkerhetsbrudd (se punkt 16) eller prosessen for virksomhetskontinuitet og beredskapsplanlegging (se punkt 17). Kontakt med kontrollmyndigheter er også nyttig for å kunne foregripe og klargjøre for kommende endringer i lover eller forskrifter som organisasjonen skal implementere. Kontakt med andre myndigheter inkluderer forsyningsverk, nødmeldingstjenester, leverandører av elektrisitet og helse- og sikkerhetsmyndigheter, for eksempel brannvesen (i forbindelse med virksomhetskontinuitet), leverandører av telekommunikasjon (i forbindelse med linjeruting og tilgjengelighet) og vannleverandører (i forbindelse med kjøleanlegg for utstyr).')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (43, N'A.6.1.4', N'Kontakt med spesielle interessegrupper', N'Hensiktsmessig kontakt med spesielle interessegrupper eller andre spesialiserte sikkerhetsfora og profesjonelle foreninger skal opprettholdes.', 39, N'Medlemskap i spesielle interessegrupper eller fora bør vurderes som et middel for å:

a)	styrke kunnskapen om d praksis og holde seg oppdatert om relevant sikkerhetsinformasjon;
b)	sikre at forståelsen av informasjonssikkerhetsmiljøet er oppdatert og fullstendig;
c)	få tidlig beskjed om varsler, råd og botemidler angående angrep og sårbarheter;
d)	få tilgang til spesialisters informasjonssikringsråd;
e)	dele og utveksle informasjon om nye teknologier, produkter, trusler og sårbarheter;
f)	sørge for egnede liaisonforbindelser i håndtering av informasjonssikkerhetshendelser (se punkt 16).', N'Det kan inngås avtaler om informasjonsdeling for å bedre samarbeid om og koordinering av sikkerhetsspørsmål. Slike avtaler bør identifisere krav til beskyttelse av konfidensiell informasjon.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (44, N'A.6.1.5', N'Informasjonssikkerhet i prosjektledelse', N'Informasjonssikkerhet skal håndteres som en del av prosjektledelsen, uavhengig av type prosjekt.', 39, N'Informasjonssikkerhet bør integreres i organisasjonens metode(r) for prosjektledelse for å sikre at informasjonssikkerhetsrisikoer identifiseres og håndteres som en del av et prosjekt. Dette gjelder generelt for alle typer prosjekter, for eksempel et prosjekt for en sentral virksomhetsprosess, IT, fasilitetsstyring og andre understøttende prosesser. Metodene for prosjektledelse som brukes, bør kreve at:

a)	informasjonssikkerhetsmål inkluderes blant prosjektmålene;
b)	det utføres en risikovurdering av informasjonssikkerheten tidlig i prosjektet for å identifisere nødvendige sikringstiltak;
c)	informasjonssikkerhet inngår i alle fasene av prosjektmetodologien som anvendes.

Implikasjoner av informasjonssikkerhet bør være adressert og gjennomgått regelmessig i alle prosjekter. Ansvar for informasjonssikkerhet bør være definert og tilordnet spesifiserte roller definert i metodene for prosjektledelse.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (45, N'A.6.2', N'Mobilt utstyr og fjernarbeid', N'Å ivareta sikkerheten ved fjernarbeid og bruk av mobilt utstyr.', 38, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (46, N'A.6.2.1', N'Policy for mobilt utstyr', N'En policy med underliggende sikringstiltak skal være innført for å håndtere risiko forbundet med bruk av mobilt utstyr.', 45, N'Ved bruk av mobilt utstyr bør det tas særlige hensyn for å påse at virksomhetsinformasjon ikke kompromitteres. Policyen for mobilt utstyr bør ta hensyn til risikoene knyttet til det å arbeide med mobilt utstyr i ubeskyttede miljøer.

Policyen for mobilt utstyr bør ta i betraktning:

a)	registrering av mobilt utstyr;
b)	krav til fysisk beskyttelse;
c)	restriksjoner på installering av programvare;
d)	krav til programvareversjoner på mobilt utstyr og til å ta i bruk korrigeringer;
e)	restriksjoner på tilkobling til informasjonstjenester;
f)	aksesskontroller;
g)	kryptografiske teknikker;
h)	beskyttelse mot ødeleggende programvare;
i)	ekstern deaktivering, sletting eller utestengning;
j)	sikkerhetskopiering;
k)	bruk av nettjenester og nettapper.

Det bør tas særlige hensyn når mobilt utstyr brukes på offentlige steder, møterom og andre steder som ikke er beskyttet. Det bør foreligge beskyttelse for å unngå uautorisert tilgang til eller utlevering av informasjonen som lagres og behandles av disse enhetene, for eksempel ved bruk av kryptografiske teknikker (se punkt 10) og ved å håndheve bruk av hemmelig autentiseringsinformasjon (se A.9.2.4

Mobilt utstyr bør også beskyttes fysisk mot tyveri, særlig når det etterlates for eksempel i biler eller andre transportmidler eller i hotellrom, konferansesentre eller møteplasser. Det bør etableres en spesifikk prosedyre, der det tas hensyn til organisasjonens juridiske, forsikringsrelaterte og andre sikkerhetskrav, for tilfeller der mobilt utstyr blir stjålet eller kommer bort. Utstyr med viktig, sensitiv eller kritisk virksomhetsinformasjon bør ikke etterlates uovervåket og bør, der det er mulig, låses fysisk inn, eller spesiallåser bør benyttes for å sikre enhetene.

Personell som bruker mobilt utstyr, bør være opplært for å være bevisste på tilleggsrisikoene som følger med denne arbeidsformen, og sikringstiltakene som bør være iverksatt.

Når policyen for mobilt utstyr tillater bruk av privateid mobilt utstyr, bør policyen og tilknyttede sikkerhetstiltak også ta i betraktning:

a)	adskillelse av privat bruk og jobbrelatert bruk av enhetene, inkludert bruk av programvare for å legge til rette for slik adskillelse og beskytte virksomhetsdata på en privat enhet;
b)	tilgang til virksomhetsinformasjon bare etter at brukerne har underskrevet en sluttbrukeravtale der de erkjenner sine plikter (fysisk beskyttelse, programvareoppdatering osv.), gir avkall på eierskap til virksomhetsdata og tillater at organisasjonen kan fjernslette data hvis enheten skulle bli borte eller stjålet, eller når de ikke lenger er autorisert til å bruke tjenesten. Denne policyen må ta hensyn til lovgivning knyttet til personvern.', N'Trådløse tilkoblinger for mobilt utstyr ligner på andre typer nettverkstilkoblinger, men det finnes viktige forskjeller det bør tas hensyn til ved identifisering av sikringstiltak. Noen typiske forskjeller:

a)	enkelte sikkerhetsprotokoller for trådløse nettverk er uutviklede og har kjente svakheter;
b)	informasjon lagret på mobilt utstyr sikkerhetskopieres kanskje ikke på grunn av begrenset båndbredde i nettverket eller fordi mobilt utstyr kanskje ikke er tilkoblet på tidspunktene det er planlagt sikkerhetskopiering.

Mobilt utstyr deler vanligvis fellesfunksjoner, for eksempel nettverk, Internett-tilgang, e-post og filbehandling, med stasjonært utstyr. Sikringstiltak for informasjonssikkerhet for mobilt utstyr består vanligvis av tiltak som er innført for stasjonært utstyr, og tiltak som skal håndtere trusler som følger når mobilt utstyr brukes utenfor organisasjonens lokaler.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (47, N'A.6.2.2', N'Fjernarbeid', N'En policy med underliggende sikringstiltak skal implementeres for å beskytte tilgang til, behandling av og lagring av informasjon der fjernarbeid utføres.', 45, N'Organisasjoner som tillater fjernarbeidsaktiviteter, bør utgi en policy som definerer vilkårene og restriksjonene for fjernarbeid. Der det anses for å være relevant og tillatt i henhold til loven, bør følgende forhold vurderes:

a)	den eksisterende fysiske sikkerheten der fjernarbeidet utføres, der det tas hensyn til den fysiske sikkerheten i bygningen og det lokale miljøet;
b)	det foreslåtte fysiske fjernarbeidsmiljøet;
c)	kravene til kommunikasjonssikkerhet, der det tas hensyn til behovet for fjerntilgang til organisasjonens interne systemer, sensitiviteten til informasjonen det skal gis tilgang til og som vil bli overført over kommunikasjonslinjen, og sensitiviteten til det interne systemet;
d)	mulighet for tilgang til virtuelt skrivebord, som forhindrer behandling og lagring av informasjon på privateid utstyr;
e)	trusselen knyttet til uautorisert tilgang til informasjon eller ressurser fra andre personer som bruker utstyret, for eksempel familie og venner;
f)	bruken av hjemmenettverk og krav til eller restriksjoner på konfigurasjonen av trådløse nettverkstjenester;
g)	policyer og prosedyrer for å forhindre tvister om rettigheter til immaterielle eiendeler utviklet på privateid utstyr;
h)	tilgang til privateid utstyr (for å verifisere sikkerheten til maskinen eller under en etterforskning), noe lovgivning kan hindre;
i)	lisensavtaler for programvare som er slik at organisasjoner kan bli ansvarlig for klientprogramvarelisenser på arbeidsstasjoner som eies privat av ansatte eller brukere hos eksterne parter;
j)	beskyttelse mot ødeleggende programvare og krav til brannmur.

Retningslinjene og ordningene som vurderes, bør inkludere:

a)	anskaffelse av egnet utstyr og lagringsmøbler for fjernarbeidsaktivitetene, der bruk av privateid utstyr som ikke er under organisasjonens kontroll, ikke tillates;
b)	en definisjon av arbeidet som tillates, arbeidstiden, klassifiseringen av informasjon som kan innehas, og de interne systemene og tjenestene som fjernarbeideren er autorisert for tilgang til;
c)	anskaffelse av egnet kommunikasjonsutstyr, inkludert metoder for å sikre fjerntilgang;
d)	fysisk sikkerhet;
e)	regler og veiledning for familiemedlemmers og gjesters aksess til utstyr og informasjon;
f)	anskaffelse av støtte og vedlikehold for maskinvare og programvare;
g)	anskaffelse av forsikring;
h)	prosedyrene for sikkerhetskopiering og virksomhetskontinuitet;
i)	overvåking av sikkerhet og revisjon;
j)	opphevelse av myndighet og aksessrettigheter og retur av utstyr når fjernarbeidsaktivitetene opphører.', N'Fjernarbeid refererer til alle former for arbeid som utføres utenfor kontoret, inkludert ikke-tradisjonelle arbeidsmiljøer som miljøer der det benyttes såkalt "telependling", "datapendling", "fleksibel arbeidsplass" og "virtuell arbeidsplass".')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (48, N'A.7', N'Personellsikkerhet', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (49, N'A.7.1', N'Før ansettelse', N'Å sikre at ansatte og kontraktører forstår sitt ansvar og er egnet for de rollene som de vurderes for.', 48, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (50, N'A.7.1.1', N'Bakgrunnsjekking', N'Før ansettelse skal bakgrunnsundersøkelser i samsvar med relevante lover, forskrifter og etikk utføres for alle kandidater. Disse skal stå i forhold til forretningsmessige krav, klassifisering av informasjonen det skal gis tilgang til, og de oppfattede risikoene.', 49, N'Undersøkelsene bør ta hensyn til alt som er relevant av personvern, beskyttelse av personlig identifiserbar informasjon og lovgivning om ansettelser og bør, der det er tillatt, inkludere følgende:

a)	tilgang til tilfredsstillende referanser, for eksempel én jobbreferanse og én personlig referanse;
b)	en undersøkelse av søkerens CV (i hvilken grad den er komplett og korrekt);
c)	bekreftelse av påståtte akademiske og faglige kvalifikasjoner;
d)	uavhengig undersøkelse av identitet (pass eller lignende dokument);
e)	mer detaljerte undersøkelser, som kredittsjekk eller politiattest.

Når en person ansettes i en spesifikk rolle knyttet til informasjonssikkerhet, bør organisasjonen påse at kandidaten:

a)	har den nødvendige kompetansen til å inneha sikkerhetsrollen;
b)	kan tiltros rollen, særlig hvis den er kritisk for organisasjonen.

Når en jobb, enten når den først besettes eller etter forfremmelse, involverer at personen får tilgang til systemer for informasjonsbehandling, og særlig hvis disse håndterer konfidensiell informasjon, for eksempel økonomisk informasjon eller svært konfidensiell informasjon, bør organisasjonen også vurdere ytterligere og mer detaljerte undersøkelser.

Prosedyrer bør definere kriterier og begrensninger for undersøkelsene, for eksempel hvem som er kvalifisert for å sjekke kandidater, og hvordan, når og hvorfor de utføres.

Også hvis det brukes kontraktører, bør det foreligge en prosess for bakgrunnssjekking. I slike tilfeller bør avtalen mellom organisasjonen og kontraktøren spesifisere hvem som har ansvar for å utføre bakgrunnssjekking, og hvilke varslingsprosedyrer det er nødvendig å følge dersom den ikke er utført eller resultatene gir grunn til tvil eller bekymring.

Informasjon om alle kandidater som vurderes for stillinger i organisasjonen, bør samles inn og håndteres i samsvar med relevant lovgivning i den relevante jurisdiksjonen. Avhengig av den gjeldende lovgivningen bør kandidatene på forhånd informeres om bakgrunnssjekkingen.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (51, N'A.7.1.2', N'Vilkår og betingelser for ansettelse', N'De kontraktmessige avtalene med ansatte og kontraktører skal beskrive deres og organisasjons ansvar for informasjonssikkerhet.', 49, N'De kontraktsmessige forpliktelsene til ansatte eller kontraktører bør gjenspeile organisasjonens policyer for informasjonssikkerhet samt klargjøre og angi:

a)	at alle ansatte og kontraktører som får tilgang til konfidensiell informasjon, bør underskrive en konfidensialitets- eller taushetserklæring før de får tilgang til systemer for informasjonsbehandling (se 1A.3.2.4
b)	den ansatte eller kontraktørens juridiske ansvar og rettigheter, for eksempel når det gjelder lover om opphavsrett eller databeskyttelse (se 1A.8.1.2
c)	ansvar for klassifisering av informasjon og forvaltning av organisasjonens aktiva knyttet til den ansattes eller kontraktørens ansvar ved håndtering av informasjon som mottas fra andre selskaper eller eksterne parter;
d)	tiltak som skal iverksettes hvis den ansatte eller kontraktøren ikke overholder organisasjonens sikkerhetskrav (se A.7.2.3

Roller og ansvar knyttet til informasjonssikkerhet bør kommuniseres til relevante kandidater under prosessen som finner sted før ansettelse.

Organisasjonen bør påse at ansatte og kontraktører samtykker i vilkår og betingelser for informasjonssikkerhet som er hensiktsmessige for den typen og det omfanget av tilgang de vil ha til organisasjonens aktiva knyttet til informasjonssystemer og -tjenester.

Der det er hensiktsmessig, bør ansvaret som ligger i vilkårene og betingelsene for ansettelse, fortsatt gjelde i en definert periode etter at ansettelsesforholdet opphører (se 7.3).', N'Adferdsregler kan benyttes for å beskrive den ansattes eller kontraktørens ansvar for informasjonssikkerhet hva gjelder konfidensialitet, databeskyttelse, etikk, riktig bruk av organisasjonens utstyr og fasiliteter samt anerkjent praksis som organisasjonen forventer. En ekstern part, som en kontraktør er tilknyttet, kan bli avkrevd å inngå kontraktsmessige ordninger på vegne av personen som er under kontrakt.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (52, N'A.7.2', N'Under ansettelsesforholdet', N'Å sikre at ansatte og kontraktører er klar over og oppfyller sitt ansvar for informasjonssikkerhet.', 48, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (53, N'A.7.2.1', N'Ledelsens ansvar', N'Ledelsen skal pålegge alle ansatte og kontraktører å ivareta informasjonssikkerheten i samsvar med etablerte policyer og prosedyrer i organisasjonen.', 52, N'Ledelsens ansvar bør inkludere å påse at ansatte og kontraktører:

a)	blir ordentlig informert om sine roller og sitt ansvar knyttet til informasjonssikkerhet før de gis tilgang til konfidensiell informasjon eller informasjonssystemer;
b)	gis retningslinjer som beskriver forventninger knyttet til informasjonssikkerhet for deres rolle i organisasjonen;
c)	motiveres til å følge organisasjonens informasjonssikkerhetspolicyer;
d)	oppnår det nivået av bevissthet rundt informasjonssikkerhet som er relevant for deres roller og ansvar i organisasjonen (se A.7.2.2
e)	etterlever vilkårene og betingelsene for ansettelse, som inkluderer organisasjonens informasjonssikkerhetspolicy og hensiktsmessige arbeidsmetoder;
f)	fortsetter å ha de riktige ferdighetene og kvalifikasjonene og får regelmessig utdanning;
g)	har en anonym kanal for å rapportere om brudd på policyer og prosedyrer for informasjonssikkerhet ("varsling").

Ledelsen bør vise sin støtte til policyer, prosedyrer og sikringstiltak for informasjonssikkerhet og opptre som rollemodeller.', N'Hvis ansatte og kontraktører ikke gjøres oppmerksomme på sitt ansvar for informasjonssikkerheten, kan de påføre en organisasjon betydelig skade. Motivert personell er sannsynligvis mer pålitelig og forårsaker færre informasjonssikkerhetsbrudd.

Dårlig ledelse kan føre til at personell føler seg undervurderte, noe som kan ha negative konsekvenser for organisasjonen når det gjelder informasjonssikkerheten. For eksempel kan dårlig ledelse føre til at informasjonssikkerheten forsømmes, eller til potensielt misbruk av organisasjonens aktiva.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (54, N'A.7.2.2', N'Bevisstgjøring, utdanning og opplæring i informasjonssikkerhet', N'Alle ansatte i organisasjonen, og kontraktører der det er relevant, skal få hensiktsmessig bevisstgjøring, utdanning og opplæring samt regelmessige oppdateringer i organisasjonens policyer og prosedyrer som er relevant for deres jobbfunksjon.', 52, N'Et bevisstgjøringsprogram for informasjonssikkerhet bør ha som mål å gjøre ansatte og, der det er relevant, kontraktører bevisste på ansvaret de har for informasjonssikkerhet, og måten dette ansvaret oppfylles på.

Et bevisstgjøringsprogram for informasjonssikkerhet bør etableres i tråd med organisasjonens informasjonssikkerhetspolicyer og relevante prosedyrer, og bør ta hensyn til den av organisasjonens informasjon som skal beskyttes, og sikringstiltakene som er iverksatt for å beskytte den. Bevisstgjøringsprogrammet bør omfatte flere bevisstgjøringsaktiviteter, som å gjennomføre kampanjer (f.eks. en "informasjonssikkerhetsdag") og gi ut hefter eller nyhetsbrev.

Bevisstgjøringsprogrammet bør planlegges slik at det tas hensyn til de ansattes roller i organisasjonen og, der det er relevant, organisasjonens forventninger til bevisstgjøring av kontraktører. Aktivitetene i bevisstgjøringsprogrammet bør finne sted over tid, fortrinnsvis regelmessig, slik at aktivitetene gjentas og omfatter nye ansatte og kontraktører. Bevisstgjøringsprogrammet bør også oppdateres regelmessig slik at det forblir på linje med organisasjonens policyer og prosedyrer, og det bør bygge på erfaringer fra informasjonssikkerhetsbrudd.

Bevisstgjøringsopplæring bør gjennomføres i henhold til kravene i organisasjonens bevisstgjøringsprogram for informasjonssikkerhet. Bevisstgjøringsopplæring kan foregå på ulike måter, for eksempel kan den være klasseromsbasert, nettbasert, fjernopplæring, skje i eget tempo osv.

Utdanning og opplæring innen informasjonssikkerhet bør også dekke generelle aspekter som:

a)	ledelsens engasjement for informasjonssikkerhet i hele organisasjonen;
b)	nødvendigheten av å gjøre seg kjent med og overholde gjeldende regler og forpliktelser for informasjonssikkerhet, som definert i policyer, standarder, lover, forskrifter, kontrakter og avtaler;
c)	personlig ansvarlighet for egne handlinger og manglende handlinger og generelt ansvar for å sikre eller beskytte informasjon som tilhører organisasjonen og eksterne parter;
d)	grunnleggende prosedyrer for informasjonssikkerhet (som rapportering av informasjonssikkerhetsbrudd) og grunnleggende sikringstiltak (som passordsikkerhet, sikringstiltak mot ødeleggende programvare og ryddige arbeidsplasser);
e)	kontaktpunkter og ressurser for ytterligere informasjon og råd om informasjonssikkerhetsspørsmål, inkludert ytterligere materiale til utdanning og opplæring innen informasjonssikkerhet.

Utdanning og opplæring innen informasjonssikkerhet bør finne sted med jevne mellomrom. Innledende utdanning og opplæring gjelder personer som overføres til nye stillinger eller roller med vesentlig annerledes krav til informasjonssikkerhet, og ikke bare nyansatte, og bør finne sted før rollene blir aktive.

Organisasjonen bør utvikle programmet for utdanning og opplæring for å kunne gjennomføre utdanningen og opplæringen på en effektiv måte. Programmet bør være i tråd med organisasjonens informasjonssikkerhetspolicyer og relevante prosedyrer, og bør ta hensyn til den av organisasjonens informasjon som skal beskyttes, og sikringstiltakene som er iverksatt for å beskytte den. Det bør vurderes ulike former for utdanning og opplæring i programmet, for eksempel forelesninger eller egenstudier.', N'Ved utvikling av et bevisstgjøringsprogram er det viktig å fokusere ikke bare på "hva" og "hvordan", men også på "hvorfor". Det er viktig at ansatte forstår målet med informasjonssikkerhet og de potensielle konsekvensene for organisasjonen, både positive og negative, av deres egen adferd.

Bevisstgjøring, utdanning og opplæring kan være en del av, eller gjennomføres i samarbeid med andre opplæringsaktiviteter, for eksempel generell IT- eller sikkerhetsopplæring. Bevisstgjørings-, utdannings- og opplæringsaktiviteter bør være egnede og relevante for den enkeltes roller, ansvar og ferdigheter.

En vurdering av de ansattes forståelse kan gjennomføres på slutten av et bevisstgjørings-, utdannings- og opplæringskurs for å teste at kunnskapen har blitt overført.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (55, N'A.7.2.3', N'Disiplinærprosess', N'Det skal finnes en formell og kommunisert disiplinærprosess for å iverksette tiltak overfor ansatte som har begått et informasjonssikkerhetsbrudd.', 52, N'Disiplinærprosessen bør ikke igangsettes før det er verifisert at det har forekommet et informasjonssikkerhetsbrudd (se 1A.6.1.7

Den formelle disiplinærprosessen bør sikre korrekt og rettferdig behandling av ansatte som mistenkes for å ha begått informasjonssikkerhetsbrudd. Den formelle disiplinærprosessen bør gjøre det mulig med en gradert respons som tar hensyn til faktorer som typen og alvorlighetsgraden for bruddet, hvilke konsekvenser det har for virksomheten, om det er første gang det skjer eller har skjedd før, om personen som begikk det, hadde fått riktig opplæring, relevant lovgivning, forretningskontrakter og andre faktorer, avhengig av hva som er relevant.

Disiplinærprosessen bør også fungere avskrekkende for å forhindre at ansatte bryter organisasjonens policyer og prosedyrer for informasjonssikkerhet og andre informasjonssikkerhetsbrudd. Tilsiktede brudd kan kreve umiddelbare tiltak.', N'Disiplinærprosessen kan også bli en motivasjon eller et insentiv hvis det defineres positive sanksjoner for opptreden som utmerker seg i forbindelse med informasjonssikkerhet.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (56, N'A.7.3', N'Opphør og endring av ansettelsesforhold', N'Å beskytte organisasjonens interesser som en del av prosessen, med endring eller opphør av ansettelsesforhold.', 48, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (57, N'A.7.3.1', N'Opphør eller endring av ansvar i ansettelsesforhold', N'Ansvar og plikter for informasjonssikkerhet som forblir gyldige etter opphør eller endring av ansettelsesforholdet, skal defineres, kommuniseres til den ansatte eller kontraktøren og håndheves.', 56, N'Kommunikasjon av ansvar i forbindelse med opphør av et ansettelsesforhold bør inkludere kontinuerlige krav til informasjonssikkerhet og juridisk ansvar og, der det er relevant, ansvar som følger av en eventuell konfidensialitetserklæring (se 1A.3.2.4

Ansvar og plikter som fortsatt gjelder etter opphør av ansettelsesforholdet, bør være omhandlet i den ansattes eller kontraktørens vilkår og betingelser for ansettelse (se A.7.1.2

Endringer i ansvar eller ansettelsesforhold bør håndteres som opphør av det gjeldende ansvaret og ansettelsesforholdet i kombinasjon med oppstart av det nye ansvaret eller ansettelsesforholdet.', N'HR-funksjonen er generelt ansvarlig for den alminnelige opphørsprosessen og samarbeider med den nærmeste overordnede til personen som slutter, om å håndtere informasjonssikkerhetsaspektene ved de relevante prosedyrene. Hvis det er snakk om en kontraktør som er innhentet gjennom en ekstern part, er det denne eksterne parten som tar seg av opphørsprosessen i samsvar med kontrakten mellom organisasjonen og den eksterne parten.

Det kan være nødvendig å informere ansatte, kunder eller kontraktører om endringer i personell- og driftsordninger.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (58, N'A.8', N'Forvaltning av aktiva', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (59, N'A.8.1', N'Ansvar for aktiva', N'Å identifisere organisasjonens aktiva og definere ansvar for tilstrekkelig beskyttelse.', 58, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (60, N'A.8.1.1', N'Oversikt over aktiva', N'Aktiva knyttet til informasjon og systemer for informasjonsbehandling skal identifiseres, og en oversikt over disse aktivaene skal utarbeides og vedlikeholdes.', 59, N'En organisasjon bør identifisere aktuelle aktiva i livsløpet til informasjon og dokumentere deres betydning. Livsløpet til informasjon bør inkludere opprettelse, behandling, lagring, overføring, sletting og ødeleggelse. Dokumentasjon bør vedlikeholdes i egne eller eksisterende oversikter etter behov.

Oversikten over aktiva bør være nøyaktig, oppdatert, konsekvent og på linje med andre oversikter.
For hvert av de identifiserte aktivaene bør det tildeles eierskap til aktivumet (se A.8.1.2', N'Oversikter over aktiva bidrar til å sikre at det foreligger effektiv beskyttelse, og kan også være nødvendig for andre formål, for eksempel i forbindelse med helse og sikkerhet, forsikring eller økonomi (forvaltning av aktiva).

NS-ISO/IEC A.27005')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (61, N'A.8.1.2', N'Eierskap til aktiva', N'Aktiva som vedlikeholdes i oversikten, skal underlegges eierskap.', 59, N'Enkeltpersoner samt andre enheter som har tatt lederansvar for livsløpet til aktiva, kvalifiserer for å bli utpekt som eiere av aktiva.

En prosess for å sikre betimelig tildeling av eierskap til aktiva implementeres vanligvis. Eierskap bør tildeles når aktiva opprettes, eller når aktiva overføres til organisasjonen. Eieren av et aktivum bør ha ansvar for korrekt forvaltning av aktivumet gjennom hele dets livsløp.

Eieren av et aktivum bør:
a)	sikre at aktiva føres opp i oversikten;
b)	sikre at aktiva er hensiktsmessig klassifisert og beskyttet;
c)	definere og periodisk gjennomgå tilgangsbegrensninger og klassifiseringer av viktige aktiva ved å ta hensyn til aktuelle policyer for aksesskontroll;
d)	sikre riktig håndtering når aktivumet slettes eller ødelegges.', N'Den identifiserte eieren kan være enten en enkeltperson eller en enhet som har tatt lederansvar for å styre hele livsløpet til et aktivum. Den identifiserte eieren har ikke nødvendigvis noen eierrettigheter til aktivumet.

Rutinemessige oppgaver kan delegeres, for eksempel til en forvalter som fører tilsyn med aktivaene til daglig, men ansvaret ligger likevel hos eieren.

I komplekse informasjonssystemer kan det være nyttig å angi grupper med aktiva som fungerer sammen for å levere en bestemt tjeneste. I så fall er eieren av denne tjenesten ansvarlig for å levere tjenesten, inkludert driften av aktivaene knyttet til tjenesten.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (62, N'A.8.1.3', N'Akseptabel bruk av aktiva', N'Regler for akseptabel bruk av informasjon og aktiva knyttet til informasjon og systemer for informasjonsbehandling skal identifiseres, dokumenteres og implementeres.', 59, N'Ansatte og brukere hos eksterne parter som bruker eller har tilgang til organisasjonens aktiva, bør gjøres oppmerksomme på kravene til informasjonssikkerhet som gjelder for de av organisasjonens aktiva som er knyttet til informasjon og ressurser og systemer for informasjonsbehandling. De bør ha ansvar for sin bruk av alle ressurser for informasjonsbehandling og for all slik bruk som skjer under deres ansvar.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (63, N'A.8.1.4', N'Retur av aktiva', N'Ved opphør av ansettelsesforhold, kontrakt eller avtale, skal alle ansatte og brukere hos eksterne parter returnere alle organisasjonens aktiva som er i deres besittelse.', 59, N'Opphørsprosessen bør formaliseres slik at den inkluderer retur av alle tidligere utleverte fysiske og elektroniske aktiva som eies av eller er overlatt til organisasjonen.

I tilfeller der en ansatt eller en bruker hos en ekstern part kjøper organisasjonens utstyr eller bruker sitt eget private utstyr, bør det følges prosedyrer for å sikre at all relevant informasjon overføres til organisasjonen og slettes fra utstyret på en sikker måte (se 1A.1.2.7

I tilfeller der en ansatt eller en bruker hos en ekstern part har kunnskap som er viktig for drift som pågår, bør denne informasjonen dokumenteres og overføres til organisasjonen.

I oppsigelsestiden bør organisasjonen ha kontroll med uautorisert kopiering av relevant informasjon (f.eks. immaterielle eiendeler) fra ansatte og kontraktører som skal slutte.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (64, N'A.8.2', N'Klassifisering av informasjon', N'Å sikre at informasjonen har et tilstrekkelig beskyttelsesnivå i samsvar med dens betydning for organisasjonen.', 58, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (65, N'A.8.2.1', N'Klassifisering av informasjon', N'Informasjon skal klassifiseres i henhold til juridiske krav, verdi, kritikalitet og sensitivitet forbundet med uautorisert utlevering eller modifisering.', 64, N'Klassifiseringer og tilknyttede beskyttende sikringstiltak for informasjon bør ta hensyn til virksomhets behov for å dele og begrense tilgangen til informasjon samt til juridiske krav. Andre aktiva enn informasjon kan også klassifiseres i samsvar med klassifisering av informasjon som er lagret i, behandles av eller på annen måte håndteres eller beskyttes av dette aktivumet.

Eiere av informasjonsaktiva bør ha ansvar for klassifiseringen av dem.

Klassifiseringsordningen bør omfatte konvensjoner for klassifisering og kriterier for gjennomgang av klassifiseringen overtid. Ordningens beskyttelsesnivå bør vurderes ved å analysere konfidensialitet, integritet og tilgjengelighet og eventuelt andre krav for den relevante informasjonen. Ordningen bør være i tråd med policyen for aksesskontroll (se A.9.1.1

Hvert nivå bør gis et navn som gir mening innenfor konteksten av anvendelsen av klassifiseringsordningen.

Ordningen bør være lik i hele organisasjonen, slik at alle klassifiserer informasjon og tilknyttede aktiva på samme måte, har en felles forståelse av krav til beskyttelse og anvender tilstrekkelig beskyttelse.

Klassifisering bør inkluderes i organisasjonens prosesser og bør være lik og samstemt i hele organisasjonen. Resultatene av klassifisering bør si noe om verdien på aktiva avhengig av hvor sensitive og kritiske de er for organisasjonen, for eksempel med tanke på konfidensialitet, integritet og tilgjengelighet. Resultatene av klassifisering bør oppdateres i overensstemmelse med endringer i aktivaenes verdi, sensitivitet og kritikalitet i løpet av livsløpet deres.', N'Klassifisering gir personer som har å gjøre med informasjon, en konsis indikasjon på hvordan de skal håndtere og beskytte den. Dette gjøres lettere hvis det opprettes grupper med informasjon med tilsvarende beskyttelsesbehov, og hvis det angis prosedyrer for informasjonssikkerhet som gjelder for all informasjonen i hver gruppe. Denne metoden reduserer behovet for risikovurdering fra sak til sak og tilpasset utarbeidelse av sikringstiltak.

Informasjon kan opphøre å være sensitiv eller kritisk etter en viss periode, for eksempel når informasjonen har blitt offentliggjort. Det bør tas hensyn til disse aspektene, siden overklassifisering kan føre til at det implementeres unødvendige sikringstiltak som medfører ekstra utgifter, mens underklassifisering kan sette oppnåelsen av virksomhetsmål i fare.

Et eksempel på en klassifiseringsordning for konfidensialiteten til informasjon kan være basert på fire nivåer som følger:

a)	utlevering medfører ingen skade;
b)	utlevering medfører noe forlegenhet eller noe besvær for driften;
c)	utlevering har betydelige kortsiktige konsekvenser for driften eller taktiske mål;
d)	utlevering har omfattende konsekvenser for langsiktige strategiske mål eller truer organisasjonens overlevelse.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (66, N'A.8.2.2', N'Merking av informasjon', N'Det skal utarbeides og implementeres et egnet sett med prosedyrer for merking av Informasjon i samsvar med organisasjonens ordning for klassifisering av informasjon.', 64, N'Prosedyrer for merking av informasjon skal dekke informasjon og tilknyttede aktiva i fysiske eller elektroniske formater. Merkingen bør gjenspeile klassifiseringsordningen etablert i A.8.2.1

Utdata fra systemer som inneholder informasjon som er klassifisert som sensitiv eller kritisk, bør være påført en hensiktsmessig klassifiseringsetikett.', N'Merking av klassifisert informasjon er et sentralt krav til ordninger for informasjonsdeling. Fysiske etiketter og metadata er en vanlig form for merking.

Merking av informasjon og tilknyttede aktiva kan noen ganger ha negative virkninger. Klassifiserte aktiva er enklere å identifisere og dermed også enklere å stjele for innsidere eller eksterne angripere.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (67, N'A.8.2.3', N'Håndtering av aktiva', N'Det skal utarbeides og implementeres et egnet sett med prosedyrer for håndtering av aktiva i samsvar med organisasjonens ordning for klassifisering av informasjon.', 64, N'Det bør utarbeides prosedyrer for håndtering, behandling, lagring og kommunikasjon av informasjon i samsvar med informasjonens klassifisering (se A.8.2.1

Følgende punkter bør vurderes:

a)	tilgangsbegrensninger som understøtter kravene til beskyttelse for hvert klassifiseringsnivå;
b)	føring av en formell fortegnelse over autoriserte mottakere av aktiva;
c)	beskyttelse av midlertidige eller permanente kopier av informasjon på et nivå som er i samsvar med beskyttelsen av den opprinnelige informasjonen;
d)	lagring av IT-aktiva i samsvar med produsentens spesifikasjoner;
e)	tydelig merking av alle kopier av medier, myntet på den autoriserte mottakeren.

Klassifiseringsordningen som brukes i organisasjonen, er kanskje ikke lik ordningene som brukes av andre organisasjoner, selv om navnene på nivåer ligner. I tillegg kan klassifiseringen av informasjon som flyttes mellom organisasjoner variere, avhengig av konteksten i hver organisasjon, selv om klassifiseringsordningene er identiske.

Avtaler med andre organisasjoner som omfatter informasjonsdeling, bør inkludere prosedyrer for å identifisere klassifiseringen av informasjonen og for å tolke klassifiseringsetikettene fra andre organisasjoner.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (68, N'A.8.3', N'Håndtering av medier', N'Å forhindre uautorisert utlevering, modifisering, fjerning eller ødeleggelse av informasjon lagret på medier.', 58, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (69, N'A.8.3.1', N'Forvaltning av flyttbare medier', N'Det skal implementeres prosedyrer for forvaltning av flyttbare medier i samsvar med organisasjonens klassifiseringsordning.', 68, N'Følgende retningslinjer for forvaltning av flyttbare medier bør vurderes:

a)	hvis det ikke lenger er behov for det, bør innhold på gjenbrukbare medier som skal fjernes fra organisasjonen, gjøres ugjenopprettelig;
b)	der det er nødvendig og praktisk gjennomførbart, bør det kreves autorisasjon for medier somfjernes fra organisasjonen, og det bør føres en fortegnelse over slik fjerning for å ha et revisjonsspor;
c)	alle medier bør lagres i et trygt og sikkert miljø i samsvar med produsentens spesifikasjoner;
d)	hvis det er viktig å ta hensyn til konfidensialiteten eller integriteten til data, bør det benyttes kryptografiske teknikker for å beskytte data på flyttbare medier;
e)	for å redusere risikoen for at medier forringes mens det fortsatt er behov for dataene som er lagret på dem, bør dataene overføres til nye medier før de blir uleselige;
f)	flere kopier av verdifulle data bør lagres på separate medier for å redusere risikoen for tilfeldig skade på eller tap av data ytterligere;
g)	det bør vurderes å registrere flyttbare medier for å begrense muligheten for datatap;
h)	flyttbare mediestasjoner bør bare benyttes hvis det finnes en forretningsmessig årsak til å gjøre det;
i)	når det er behov for å benytte flyttbare medier, bør overføringen av informasjon til slike medier overvåkes.

Prosedyrer og autorisasjonsnivåer bør dokumenteres.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (70, N'A.8.3.2', N'Avhending av medier', N'Medier skal, ved bruk av formelle prosedyrer, avhendes på en sikker måte når det ikke lenger er behov for dem.', 68, N'Det bør etableres formelle prosedyrer for sikker avhending av medier for å minimere risikoen for at konfidensiell informasjon lekkes til uautoriserte personer. Prosedyrene for sikker avhending av medier som inneholder konfidensiell informasjon, bør stå i forhold til sensitiviteten til den informasjonen.

Følgende punkter bør vurderes:

a)	medier som inneholder konfidensiell informasjon, bør lagres og avhendes på en sikker måte, for eksempel ved at de brennes eller makuleres, eller ved at data slettes slik at mediet kan få en annen anvendelse i organisasjonen;
b)	det bør foreligge prosedyrer for å identifisere elementene som kan kreve sikker avhending;
c)	det kan være enklere å ordne det slik at alle medieelementer samles inn og avhendes på en sikker måte, i stedet for å forsøke å skille ut de sensitive elementene;
d)	mange organisasjoner tilbyr tjenester for innsamling og avhending av medier. Det bør sørges for å velge en egnet ekstern part med tilfredsstillende sikringstiltak og erfaring;
e)	avhending av sensitive elementer bør logges for å ha et revisjonsspor.

Ved oppsamling av medier til avhending bør det tas hensyn til aggregeringseffekten, som kan føre til at en stor mengde ikke-sensitiv informasjon blir sensitiv.', N'Det kan være nødvendig å foreta en risikovurdering av skadde enheter som inneholder sensitive data for å avgjøre om de bør ødelegges fysisk i stedet for å bli sendt til reparasjon eller bli kassert (se 1A.1.2.7')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (71, N'A.8.3.3', N'Fysisk overføring av medier', N'Medier som inneholder informasjon, skal beskyttes mot uautorisert tilgang, misbruk eller ødeleggelse under transport.', 68, N'Følgende retningslinjer bør vurderes for å beskytte medier som inneholder informasjon, under transport:

a)	det bør benyttes pålitelige transporttjenester eller bud;
b)	en liste over autoriserte bud bør avtales med ledelsen;
c)	det bør utarbeides prosedyrer for å verifisere identifiseringen av bud;
d)	innpakningen bør være tilstrekkelig til å beskytte innholdet mot fysiske skader som det er sannsynlig kan oppstå under transport, og i samsvar med eventuelle spesifikasjoner fra produsenten, for eksempel beskytte mot eventuelle miljøfaktorer som kan redusere hvor virkningsfullt mediet gjenopprettes, som eksponering for varme, fuktighet eller elektromagnetiske felter;
e)	det bør føres logger som identifiserer innholdet på mediene, og beskyttelsen som benyttes, og som registrerer tidspunktene for overføring til de transportansvarlige og for mottak på bestemmelsesstedet.', N'Informasjon kan være sårbar for uautorisert tilgang, misbruk eller ødeleggelse under fysisk transport, for eksempel når medier sendes i posten eller med bud. I dette sikringstiltaket inkluderer medier papirdokumenter.

Når konfidensiell informasjon på medier ikke er kryptert, bør det vurderes ytterligere fysisk beskyttelse av mediet.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (72, N'A.9', N'Aksesskontroll', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (73, N'A.9.1', N'Virksomhetskrav til aksesskontroll', N'Å begrense aksess til informasjon og systemer for informasjonsbehandling.', 72, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (74, N'A.9.1.1', N'Aksesskontrollpolicy', N'En policy for aksesskontroll skal etableres, dokumenteres og gjennomgås, basert på forretningsmessige krav og krav til informasjonssikkerhet.', 73, N'Eiere av aktiva bør fastsette hensiktsmessige regler for aksesskontroll og rettigheter og begrensninger for aksess for bestemte brukerroller til aktivaene deres, der detaljnivået og strengheten for sikringstiltakene gjenspeiler de tilknyttede informasjonssikkerhetsrisikoene.

Aksesskontroller er både logiske og fysiske (se punkt 11), og disse bør vurderes sammen. Brukere og tjenesteleverandører bør bli tydelig meddelt hvilke virksomhetskrav aksesskontroller skal innfri.

Policyen bør ta hensyn til følgende:

a)	sikkerhetskravene til virksomhetsapplikasjoner;
b)	policyer for autorisasjon og spredning av informasjon, for eksempel prinsippet om tjenstlig behov og nivåer for informasjonssikkerhet og klassifisering av informasjon (se 8.2);
c)	samsvar mellom policyene for aksessrettigheter og klassifisering av informasjon for systemer og nettverk;
d)	relevant lovgivning og eventuelle kontraktsmessige forpliktelser knyttet til begrensning av aksess til data eller tjenester (se 18.1);
e)	styring av aksessrettigheter i et distribuert nettverksmiljø som anerkjenner alle typer tilgjengelige tilkoblinger;
f)	segregering av roller for aksesskontroll, for eksempel aksessforespørsel, aksessautorisasjon og administrasjon av aksess;
g)	krav til formell autorisasjon av aksessforespørsler (se A.9.2.1
h)	krav til periodisk gjennomgang av aksessrettigheter (se A.9.2.5
i)	fjerning av aksessrettigheter (se A.9.2.6
j)	arkivering av dokumentasjon av alle vesentlige hendelser som gjelder bruken og forvaltningen av brukeridentiteter og hemmelig autentiseringsinformasjon;
k)	roller med privilegert aksess (se A.9.2.3', N'Ved angivelse av regler for aksesskontroll bør særlig følgende vurderes:

a)	etablering av regler basert på premisset om at "alt er generelt forbudt med mindre det er uttrykkelig tillatt", i stedet for på den svakere regelen om at "alt er generelt tillatt med mindre det er uttrykkelig forbudt";
b)	endringer i informasjonsetiketter (se A.8.2.2
c)	endringer i brukertillatelser som innføres automatisk av informasjonssystemet, og de som innføres av en administrator;
d)	regler som krever spesifikk dkjenning før vedtakelse, og de som ikke gjør det.

Regler for aksesskontroll bør understøttes av formelle prosedyrer (se 9.2, 9.3 og 9.4) og definerte ansvarsområder (se A.6.1.1

Rollebasert aksesskontroll er en tilnærming som brukes med hell av mange organisasjoner for å koble aksessrettigheter til forretningsroller.

To vanlige prinsipper som styrer policyen for aksesskontroll, er:

a)	tjenstlig behov for informasjon: Du gis bare aksess til den informasjonen du trenger for å utføre oppgavene dine (ulike oppgaver/roller innebærer ulike behov og dermed ulike aksessprofiler);
b)	tjenstlig behov for systemer: Du gis bare aksess til de systemene for informasjonsbehandling (ITutstyr, applikasjoner, prosedyrer, rom) du trenger for å utføre oppgaven/jobben/rollen din.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (75, N'A.9.1.2', N'Aksess til nettverk og nettjenester', N'Brukere skal bare gis aksess til nettverk og nettjenester som de er spesifikt autoriserte til å benytte.', 73, N'Det bør formuleres en policy om bruken av nettverk og nettjenester. Denne policyen bør dekke:

a)	nettverkene og nettjenestene som det tillates aksess til;
b)	autorisasjonsprosedyrer for å bestemme hvem som skal tillates aksess til hvilke nettverk og nettjenester;
c)	sikringstiltak og prosedyrer for styring for å beskytte aksess til nettverkstilkoblinger og nettjenester;
d)	metodene som brukes for aksess til nettverk og nettjenester (f.eks. bruk av VPN eller trådløst nettverk);
e)	krav til brukerautentisering for aksess til ulike nettjenester;
f)	overvåking av bruken av nettjenester.

Policyen om bruken av nettjenester bør være i samsvar med organisasjonens policy for aksesskontroll (se A.9.1.1', N'Uautoriserte og usikre tilkoblinger til nettjenester kan ha innvirkning på hele organisasjonen. Dette sikringstiltaket er særlig viktig for nettverkstilkoblinger til sensitive eller kritiske virksomhetsapplikasjoner eller til brukere på steder med høy risiko, for eksempel offentlige eller eksterne områder som ligger utenfor organisasjonens styring og kontroll med informasjonssikkerhet.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (76, N'A.9.2', N'Styring av brukeraksess', N'Å sikre autoriserte brukere aksess og å forhindre uautorisert aksess til systemer og tjenester.  ', 72, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (77, N'A.9.2.1', N'Registrering og sletting av brukere', N'En formell prosess for registrering og sletting av brukere skal implementeres for å gi aksessrettigheter.', 76, N'Prosessen for å styre bruker-ID-er bør omfatte følgende:

a)	bruke unike bruker-ID-er slik at brukere kan knyttes til og holdes ansvarlige for handlingene sine. Bruk av delte ID-er bør bare tillates hvis det er nødvendig av forretningsmessige eller driftsmessige årsaker, og bør dkjennes og dokumenteres;
b)	umiddelbart deaktivere eller fjerne bruker-ID-ene til brukere som har forlatt organisasjonen (se A.9.2.6
c)	periodisk identifisere og fjerne eller deaktivere overflødige bruker-ID-er;
d)	sikre at overflødige bruker-ID-er ikke utstedes til andre brukere.', N'Det å gi eller inndra aksess til informasjon eller systemer for informasjonsbehandling er vanligvis en prosedyre i to trinn:

a)	tildele og aktivere, eller inndra en bruker-ID;
b)	gi, eller inndra, aksessrettigheter til denne bruker-ID-en (se A.9.2.2')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (78, N'A.9.2.2', N'Forvaltning av brukeraksess', N'En formell prosess for forvaltning av brukeraksess skal implementeres for å tildele eller inndra aksessrettigheter for alle typer brukere til alle systemer og tjenester.', 76, N'Forvaltningsprosessen for å tildele eller inndra aksessrettigheter gitt bruker-ID-er bør omfatte følgende:

a)	innhente autorisasjon fra eieren av informasjonssystemet eller -tjenesten for bruken av informasjonssystemet eller -tjenesten (se sikringstiltak A.8.1.2
b)	verifisere at aksessnivået som gis, svarer til aksesspolicyene (se 9.1) og er i samsvar med andre krav, som arbeidsdeling (se A.6.1.2
c)	sikre at aksessrettigheter ikke aktiveres (f.eks. av tjenesteleverandører) før autorisasjonsprosedyrer er fullført;
d)	føre en sentral fortegnelse over aksessrettigheter en bruker-ID er gitt for aksess til informasjonssystemer og -tjenester;
e)	endre aksessrettighetene til brukere som har fått nye roller eller jobber og umiddelbart fjerne eller blokkere aksessrettighetene til brukere som har forlatt organisasjonen;
f)	gjennomgå aksessrettigheter periodisk sammen med eierne av informasjonssystemene eller - tjenestene (se A.9.2.5', N'Det bør vurderes å etablere brukeraksessroller basert på forretningsmessige krav som sammenfatter flere aksessrettigheter i typiske brukeraksessprofiler. Forespørsler om og gjennomganger av aksess (se A.9.2.4

Det bør vurderes å inkludere punkter i personellets kontrakter og servicekontrakter som angir sanksjoner som trer i kraft hvis personell eller kontraktører forsøker å få uautorisert aksess (se A.7.1.2')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (79, N'A.9.2.3', N'Styring av privilegerte aksessrettigheter', N'Tildeling og bruk av privilegerte aksessrettigheter skal begrenses og kontrolleres.', 76, N'Tildelingen av privilegerte aksessrettigheter bør kontrolleres gjennom en formell autorisasjonsprosess i samsvar med den relevante policyen for aksesskontroll (se sikringstiltak A.9.1.1

Følgende trinn bør vurderes:

a)	de privilegerte aksessrettighetene tilknyttet hvert system eller hver prosess, for eksempel operativsystem, forvaltningssystem for databaser og hver enkelt applikasjon, og brukerne de skal tildeles til, bør identifiseres;
b)	privilegerte aksessrettigheter bør tildeles til brukere på grunnlag av tjenstlig behov og fra hendelse til hendelse i tråd med policyen for aksesskontroll (se A.9.1.1
c)	det bør vedlikeholdes en autorisasjonsprosess og en fortegnelse over alle tildelte privilegier. Privilegerte aksessrettigheter bør ikke gis før autorisasjonsprosessen er fullført;
d)	krav til utløp av privilegerte aksessrettigheter bør være definert;
e)	privilegerte aksessrettigheter bør tildeles til en annen bruker-ID enn de som brukes for vanlige aktiviteter i virksomheten. Vanlige aktiviteter i virksomheten bør ikke utføres ved bruk av en privilegert ID;
f)	kompetansen til brukere med privilegerte aksessrettigheter bør gjennomgås regelmessig for å verifisere at den er i tråd med pliktene deres;
g)	spesifikke prosedyrer bør etableres og holdes ved like for å unngå uautorisert bruk av generiske bruker-ID-er for administrasjon, i henhold til systemenes konfigurasjonsmuligheter;
h)	for generiske bruker-ID-er for administrasjon bør konfidensialiteten til hemmelig autentiseringsinformasjon ivaretas når den deles (f.eks. ved a bytte passord hyppig og så raskt som mulig når en privilegert bruker slutter eller bytter jobb, og ved å kommunisere dem til privilegerte brukere med egnede mekanismer).', N'Upassende bruk av privilegier for systemadministrasjon (enhver funksjon eller innretning i et informasjonssystem som lar brukeren overstyre sikringstiltak for systemer eller applikasjoner) er en viktig medvirkende faktor til svikt eller brudd i systemer.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (80, N'A.9.2.4', N'Styring av hemmelig autentiseringsinformasjon om brukere', N'Tildeling av hemmelig autentiseringsinformasjon skal kontrolleres gjennom en formell styringsprosess', 76, N'Prosessen bør omfatte følgende krav:

a)	brukere bør pålegges å underskrive en erklæring om at de skal holde personlig hemmelig autentiseringsinformasjon konfidensiell, og om at de skal holde hemmelig autentiseringsinformasjon for en gruppe (altså delt) innenfor medlemmene av gruppen. Denne underskrevne erklæringen kan inkluderes i vilkårene og betingelsene for ansettelse (se A.7.1.2
b)	når det kreves at brukere vedlikeholder sin egen hemmelige autentiseringsinformasjon, bør de først få sikker midlertidig hemmelig autentiseringsinformasjon som de tvinges til å endre første gang den brukes;
c)	det bør etableres prosedyrer for å verifisere identiteten til en bruker før denne får ny, endret eller midlertidig hemmelig autentiseringsinformasjon;
d)	midlertidig hemmelig autentiseringsinformasjon bør gis til brukere på en sikker måte. Bruken av eksterne parter eller ubeskyttede e-postmeldinger (i klartekst) bør unngås;
e)	midlertidig hemmelig autentiseringsinformasjon bør være unik for et individ, og det bør ikke være mulig å gjette den;
f)	brukere bør bekrefte mottak av hemmelig autentiseringsinformasjon;
g)	standard hemmelig autentiseringsinformasjon fra leverandøren bør endres etter installering av systemer eller programvare.', N'Passord er en mye brukt form for hemmelig autentiseringsinformasjon og er en vanlig måte å verifisere en brukers identitet på. Andre former for hemmelig autentiseringsinformasjon er kryptografiske nøkler og andre data lagret på maskinvaretokener (f.eks. smartkort) som produserer autentiseringskoder.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (81, N'A.9.2.5', N'Gjennomgang av brukeres aksessrettigheter', N'Eiere av aktiva skal gjennomgå brukernes aksessrettigheter med jevne mellomrom.', 76, N'Følgende bør vurderes for gjennomgangen av aksessrettigheter:

a)	brukeres aksessrettigheter bør gjennomgås med jevne mellomrom og etter eventuelle endringer, som en forfremmelse, en degradering eller opphør av et ansettelsesforhold (se punkt 7);
b)	en brukers aksessrettigheter bør gjennomgås og tildeles på ny når brukeren bytter rolle innad i samme organisasjon;
c)	autorisasjoner for privilegerte aksessrettigheter bør gjennomgås med kortere intervaller;
d)	tildelinger av privilegier bør kontrolleres med jevne mellomrom for å påse at ingen har fått uautoriserte privilegier;
e)	endringer i privilegerte kontoer bør logges med tanke på periodisk gjennomgang.', N'Dette sikringstiltaket kompenserer for mulige svakheter i utførelsen av sikringstiltak A.9.2.1')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (82, N'A.9.2.6', N'Fjerning eller korrigering av aksessrettigheter', N'Aksessrettigheter til informasjon og systemer for informasjonsbehandling for alle ansatte og brukere hos eksterne parter skal fjernes ved opphør av ansettelsesforholdet, kontrakten eller avtalen, eller korrigeres ved endringer.', 76, N'Når en person slutter, bør vedkommendes aksessrettigheter til informasjon og aktiva tilknyttet tjenester og systemer for informasjonsbehandling fjernes eller suspenderes. Dette vil avgjøre om det er nødvendig å fjerne aksessrettigheter. Endringer i ansettelsesforhold bør gjenspeiles i fjerning av alle aksessrettigheter som ikke ble dkjent for det nye ansettelsesforholdet. Aksessrettighetene som bør fjernes eller korrigeres, omfatter rettigheter for fysisk og logisk aksess. Fjerning eller korrigering kan skje ved å fjerne, inndra eller bytte nøkler, identifiseringskort, systemer for informasjonsbehandling eller abonnementer. All dokumentasjon som identifiserer ansattes og kontraktørers aksessrettigheter, bør gjenspeile fjerningen eller korrigeringen av aksessrettigheter. Hvis en ansatt eller en bruker hos en ekstern part slutter og har kjent til passord for bruker-ID-er som forblir aktive, bør disse endres når et ansettelsesforhold, en kontrakt eller en avtale opphører eller endres.

Aksessrettigheter til informasjon og aktiva tilknyttet systemer for informasjonsbehandling bør reduseres eller fjernes før ansettelsesforholdet opphører eller endres, avhengig av evalueringen av risikofaktorer som:

a)	hvorvidt det var den ansatte, brukeren hos den eksterne parten eller ledelsen som tok initiativ til opphør eller endring, og årsaken til opphøret;
b)	de nåværende ansvarsområdene til den ansatte, brukeren hos den eksterne parten eller en annen bruker;
c)	verdien av aktivaene som er tilgjengelige for øyeblikket.', N'I enkelte situasjoner kan aksessrettigheter bli tildelt på grunnlag av at de er tilgjengelige for flere personer enn den ansatte eller brukeren hos en ekstern part som slutter, for eksempel til gruppe-ID-er. I slike situasjoner bør personer som slutter, fjernes fra eventuelle lister for gruppeaksess, og det bør sørges for at alle andre ansatte og brukere hos eksterne parter som er involvert, bes om ikke lenger å dele denne informasjonen med personen som slutter.

I tilfeller der ledelsen har tatt initiativ til opphør av ansettelsesforholdet, kan misfornøyde ansatte eller brukere hos eksterne parter med vilje ødelegge informasjon eller sabotere systemer for informasjonsbehandling. I tilfeller der personer sier opp eller blir sagt opp, kan de bli fristet til å innhente informasjon for framtidig bruk.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (83, N'A.9.3', N'Brukeransvar', N'Å ansvarliggjøre brukerne for å sikre sin autentiseringsinformasjon.', 72, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (84, N'A.9.3.1', N'Bruk av hemmelig autentiseringsinformasjon', N'Brukere skal være pålagt å følge organisasjonens praksis for bruk av hemmelig autentiseringsinformasjon.', 83, N'Alle brukere bør rådes til å:

a)	holde hemmelig autentiseringsinformasjon konfidensiell og sørge for at den ikke avsløres for andre parter, herunder autoritetspersoner;
b)	unngå å nedtegne (f.eks. på papir, i programvarefiler eller på håndholdte enheter) hemmelig autentiseringsinformasjon, med mindre dette kan lagres på en sikker måte og lagringsmetoden er dkjent (f.eks. i et passordhvelv);
c)	endre hemmelig autentiseringsinformasjon hvis noe tyder på at den kan ha blitt kompromittert;
d)	når passord brukes som hemmelig autentiseringsinformasjon, velge tilstrekkelig lange kvalitetspassord som:
1)	er lette å huske;
2)	ikke er basert på noe en annen person enkelt kunne gjette eller få tak i ved hjelp av personrelatert informasjon, for eksempel navn, telefonnumre, fødselsdager osv.;
3)	ikke er sårbare for ordbokangrep (dvs. ikke består av ord som finnes i ordbøker);
4)	ikke inneholder etterfølgende like tegn, bare numeriske tegn eller bare alfabetiske tegn;
5)	hvis de er midlertidige, endres ved første pålogging;
e)	ikke dele en enkeltbrukers hemmelige autentiseringsinformasjon;
f)	sikre riktig beskyttelse av passord når passord brukes som hemmelig autentiseringsinformasjon i automatiske påloggingsprosedyrer og lagres;
g)	ikke bruke den samme hemmelige autentiseringsinformasjonen i jobbsammenheng og ellers.', N'Anskaffelse av enkel pålogging (Single Sign On - SSO) eller andre verktøy for forvaltning av hemmelig autentiseringsinformasjon reduserer mengden hemmelig autentiseringsinformasjon som det kreves at brukere beskytter, og kan dermed øke effektiviteten til dette sikringstiltaket. Disse verktøyene kan imidlertid også medføre større konsekvenser hvis hemmelig autentiseringsinformasjon utleveres.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (85, N'A.9.4', N'Kontroll av aksess til systemer og applikasjoner', N'Å forhindre uautorisert aksess til systemer og applikasjoner', 72, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (86, N'A.9.4.1', N'Aksessbegrensning til informasjon', N'Aksess til informasjon og systemfunksjoner i applikasjoner skal begrenses i samsvar med policyen for aksesskontroll.', 85, N'Aksessbegrensninger bør være basert på individuelle krav for virksomhetsapplikasjoner og være i samsvar med den definerte policyen for aksesskontroll.

Følgende bør vurderes for å understøtte krav til aksessbegrensninger:

a)	anskaffelse av menyer for å kontrollere aksessen til systemfunksjoner i applikasjoner;
b)	kontroll med hvilke data en bestemt bruker skal ha aksess til;
c)	kontroll med aksessrettighetene til brukere, for eksempel til å lese, skrive, slette og kjøre;
d)	kontroll med aksessrettighetene til andre applikasjoner;
e)	begrensning av informasjonen i utdata;
f)	anskaffelse av fysiske eller logiske aksesskontroller for å isolere sensitive applikasjoner, applikasjonsdata eller systemer.', NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (87, N'A.9.4.2', N'Sikre påloggingsprosedyrer', N'Der det er påkrevd av policyen for aksesskontroll, skal aksess til systemer og applikasjoner kontrolleres gjennom en sikker påloggingsprosedyre.  ', 85, N'Det bør velges en egnet autentiseringsteknikk for å bevise en brukers påståtte identitet.

Når det er påkrevd med sterk autentisering og verifisering av identitet, bør det benyttes alternative autentiseringsmetoder til passord, som kryptografiske metoder, smartkort, tokener eller biometriske metoder.

Prosedyren for å logge på et system eller en applikasjon bør utformes for å redusere muligheten for uautorisert aksess til et minimum. Påloggingsprosedyren bør derfor utlevere minst mulig informasjon om systemet eller applikasjonen, for å unngå å hjelpe en uautorisert bruker unødig. En d påloggingsprosedyre bør:

a)	ikke vise system- eller applikasjonsidentifikatorer før påloggingsprosedyren er gjennomført med suksess;
b)	vise en generell advarsel om at bare autoriserte brukere bør få aksess til datamaskinen;
c)	ikke vise hjelpemeldinger under påloggingsprosedyren som ville være til hjelp for en autorisert bruker;
d)	ikke validere påloggingsopplysningene før alle data er lagt inn. Hvis det oppstår en feiltilstand, bør ikke systemet angi hvilken del av dataene som er riktig eller feil;
e)	beskytte mot påloggingsforsøk ved hjelp av rå makt-angrep;
f)	logge mislykkede og vellykkede forsøk;
g)	avstedkomme en sikkerhetshendelse hvis det registreres et potensielt forsøk på eller vellykket brudd på sikringstiltak for pålogging;
h)	vise følgende informasjon etter vellykket pålogging:
1)	dato og klokkeslett for forrige vellykkede pålogging;
2)	detaljer om eventuelle mislykkede påloggingsforsøk siden forrige vellykkede pålogging;
i)	ikke vise passord som skrives inn;
j)	ikke overføre passord i klartekst over et nettverk;
k)	avslutte inaktive økter etter en definert periode uten aktivitet, særlig på steder med høy risiko, som offentlige eller eksterne områder som ligger utenfor organisasjonens sikkerhetsstyring, eller på mobilt utstyr;
l)	begrense tilkoblingstiden for å gi ekstra sikkerhet for applikasjoner med høy risiko og redusere tidsvinduet for uautorisert aksess.', N'Passord er en vanlig metode for identifisering og autentisering basert på en hemmelighet som bare brukeren kjenner. Det samme kan oppnås med kryptografiske metoder og autentiseringsprotokoller. Styrken på brukerautentiseringen bør være hensiktsmessig for klassifiseringen av informasjonen det skal gis aksess til.

Hvis passord overføres i klartekst over et nettverk under påloggingsøkten, kan de bli fanget opp av et lytteprogram for nettverk.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (88, N'A.9.4.3', N'Styringssystem for passord', N'Styringssystemer for passord skal være interaktive og skal kvalitetssikre passord.  ', 85, N'Et styringssystem for passord bør:

a)	framtvinge bruk av individuelle bruker-ID-er og passord for å ivareta ansvarlighet;
b)	tillate at brukere velger og endrer sine egne passord, og inkludere en bekreftelsesprosedyre for å ta hensyn til feiltasting;
c)	tvinge fram valg av kvalitetspassord;
d)	tvinge brukere til å endre passord ved første pålogging;
e)	tvinge fram bytte av passord med jevne mellomrom og ved behov;
f)	føre en fortegnelse over tidligere brukte passord og forhindre at passord brukes på nytt;
g)	ikke vise passord på skjermen idet de skrives inn;
h)	lagre passordfiler separat fra systemdata for applikasjonen;
i)	lagre og overføre passord i beskyttet form.', N'Enkelte applikasjoner krever at en uavhengig myndighet skal tildele brukerpassord. I slike tilfeller gjelder ikke punkt b), d) og e) i veiledningen over. I de fleste tilfeller velges og vedlikeholdes passordene av brukere.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (89, N'A.9.4.4', N'Bruk av privilegerte hjelpeprogrammer', N'Bruk av hjelpeprogrammer som kan overstyre sikringstiltak i systemer og applikasjoner, skal være begrenset og strengt kontrollert.', 85, N'Følgende retningslinjer for bruken av hjelpeprogrammer som kan være i stand til å overstyre sikringstiltak i systemer og applikasjoner, bør vurderes:

a)	bruk av prosedyrer for identifisering, autentisering og autorisering for hjelpeprogrammer;
b)	segregering av hjelpeprogrammer fra applikasjoner;
c)	begrensning av bruken av hjelpeprogrammer til det minste praktisk gjennomførbare antallet tiltrodde, autoriserte brukere (se A.9.2.3
d)	autorisering for ad hoc-bruk av hjelpeprogrammer;
e)	begrensning av tilgjengeligheten til hjelpeprogrammer, for eksempel til varigheten av en autorisert endring;
f)	logging av all bruk av hjelpeprogrammer;
g)	definering og dokumentasjon av autorisasjonsnivåer for hjelpeprogrammer;
h)	fjerning eller deaktivering av alle unødvendige hjelpeprogrammer;
i)	å ikke gjøre hjelpeprogrammer tilgjengelige for brukere som har aksess til applikasjoner på systemer der det er påkrevd med arbeidsdeling.', N'De fleste datainstallasjoner har ett eller flere hjelpeprogrammer som kan være i stand til å overstyre sikringstiltak i systemer og applikasjoner.')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (90, N'A.9.4.5', N'Aksesskontroll til programkildekode', N'Aksess til programkildekode skal være begrenset.', 85, N'Operativ overvåking av systembruk omhandles i 12.4.

 
1A.8.2.3
Veiledning til implementering
Teknisk samsvar bør fortrinnsvis gjennomgås ved hjelp av automatiserte verktøy, som genererer tekniske rapporter som senere tolkes av en teknisk spesialist. Alternativt kan en erfaren systemingeniør utføre manuelle gjennomganger (om nødvendig med støtte fra egnede programvareverktøy).

Det bør utvises forsiktighet hvis det benyttes inntrengningstester eller sårbarhetsvurderinger, ettersom slike aktiviteter kan føre til at systemets sikkerhet blir kompromittert. Slike tester bør være planlagte, dokumenterte og repeterbare.

Gjennomganger av teknisk samsvar bør bare utføres av kompetente, autoriserte personer eller under tilsyn av slike personer.', N'Gjennomganger av teknisk samsvar omfatter undersøkelse av operative systemer for å påse at sikringstiltak for maskinvare og programvare er riktig iverksatt. Denne typen gjennomgang av samsvar krever spesialisert teknisk ekspertise.

Gjennomganger av samsvar omfatter også for eksempel inntrengningstesting og sårbarhetsvurderinger, som kanskje utføres av uavhengige eksperter som jobber under kontrakt spesielt for dette formålet. Dette kan være nyttig for å oppdage sårbarheter i systemet og for å undersøke hvor effektive sikringstiltakene er til å forhindre uautorisert tilgang på grunn av disse sårbarhetene.

Inntrengningstesting og sårbarhetsvurderinger gir et øyeblikksbilde av et system i en bestemt tilstand på et bestemt tidspunkt. Øyeblikksbildet er begrenset til de delene av systemet som faktisk testes under ett eller flere inntrengningsforsøk. Inntrengningstesting og sårbarhetsvurderinger kan ikke erstatte risikovurdering.

ISO/IEC TR A.27008')

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (91, N'A.10', N'Kryptografi', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (92, N'A.10.1', N'Kryptografiske kontroller', N'Å sikre korrekt og virkningsfull bruk av kryptografi for å beskytte konfidensialiteten, ektheten og/eller integriteten til informasjon.', 91, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (93, N'A.10.1.1', N'Policy for bruk av kryptografiske kontroller', N'Det skal utarbeides og implementeres en policy for bruk av kryptografiske kontroller for beskyttelse av informasjon.', 92, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (94, N'A.10.1.2', N'Nøkkelhåndtering', N'Det skal utarbeides og implementeres en policy for bruk, beskyttelse og levetid for kryptografiske nøkler, gjennom hele deres livsløp.', 92, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (95, N'A.11', N'Fysisk og miljømessig sikkerhet', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (96, N'A.11.1', N'Sikre områder', N'Å forhindre uautorisert adgang til, skade på og forstyrrelser i organisasjonens informasjon og systemer for informasjonsbehandling.', 95, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (97, N'A.11.1.1', N'Fysisk sikkerhetssone', N'Avgrensede områder skal defineres og benyttes til å beskytte områder som inneholder enten sensitiv eller kritisk informasjon samt systemer for informasjonsbehandling.', 96, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (98, N'A.11.1.2', N'Adgangskontroll', N'Sikre områder skal beskyttes med hensiktsmessige adgangskontroller for å sikre at bare autorisert personell har adgang.', 96, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (99, N'A.11.1.3', N'Sikring av kontorer, rom og fasiliteter', N'Fysisk sikring av kontorer, rom og fasiliteter skal utformes og benyttes.', 96, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (100, N'A.11.1.4', N'Beskyttelse mot eksterne og miljømessige trusler', N'Fysisk beskyttelse mot naturkatastrofer, ondsinnede angrep eller ulykker skal utformes og benyttes.', 96, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (101, N'A.11.1.5', N'Arbeid i sikre områder', N'Prosedyrer for arbeid i sikre områder skal utformes og benyttes.', 96, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (102, N'A.11.1.6', N'Vareleveringsområder', N'Områder for varelevering og -lasting samt andre steder hvor uvedkommende kan komme inn i lokalene, skal kontrolleres, og om mulig isoleres fra systemer for informasjonsbehandling, for å forhindre uautorisert adgang.', 96, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (103, N'A.11.2', N'Utstyr', N'Å forhindre tap, skade, tyveri eller kompromittering av aktiva samt avbrudd i organisasjonens drift.', 95, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (104, N'A.11.2.1', N'Plassering og beskyttelse av utstyr', N'Utstyr skal plasseres og beskyttes for å redusere risikoene forbundet med miljømessige trusler og farer samt muligheter for uautorisert adgang.  ', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (105, N'A.11.2.2', N'Understøttende utstyr', N'Utstyr skal beskyttes mot strømbrudd og andre avbrudd forårsaket av svikt i understøttende utstyr.', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (106, N'A.11.2.3', N'Kablingssikkerhet', N'Kabling for strøm og telekommunikasjon som fører data eller understøtter informasjonstjenester, skal beskyttes mot avlytting, forstyrrelser eller skade.', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (107, N'A.11.2.4', N'Vedlikehold av utstyr', N'Utstyr skal vedlikeholdes på korrekt måte for å sikre fortsatt tilgjengelig og integritet.', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (108, N'A.11.2.5', N'Fjerning av aktiva', N'Utstyr, informasjon eller programvare skal ikke tas ut av organisasjonen uten forhåndsdkjennelse.', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (109, N'A.11.2.6', N'Sikring av utstyr og aktiva utenfor organisasjonen', N'Det skal iverksettes sikringstiltak for aktiva som skal brukes eksternt, der det tas hensyn til de ulike risikoene ved å arbeide utenfor organisasjonens lokaler.  ', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (110, N'A.11.2.7', N'Sikker avhending eller gjenbruk av utstyr', N'Før avhending eller gjenbruk skal alt utstyr som inneholder lagringsmedier, kontrolleres for å sikre at alle sensitive data og lisensiert programvare har blitt fjernet eller overskrevet på en sikker måte.', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (111, N'A.11.2.8', N'Uovervåket brukerutstyr', N'Brukere skal sikre at uovervåket utstyr har tilstrekkelig beskyttelse.', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (112, N'A.11.2.9', N'Policy for ryddig arbeidsplass og låst skjerm', N'Det skal innføres en policy for rydding av papirer og flyttbare lagringsmedier samt en låst-skjerm-policy for systemer for informasjonsbehandling.  ', 103, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (113, N'A.12', N'Driftssikkerhet', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (114, N'A.12.1', N'Driftsprosedyrer og ansvar', N'Å sikre korrekt og sikker drift av systemer for informasjonsbehandling', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (115, N'A.12.1.1', N'Dokumenterte driftsprosedyrer', N'Driftsprosedyrer skal dokumenteres og gjøres tilgjengelig for alle brukere som har behov for dem.', 114, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (116, N'A.12.1.2', N'Endringsledelse', N'Endringer i organisasjonen, virksomhetsprosesser, systemer for informasjonsbehandling og systemer som har innvirkning på informasjonssikkerheten, skal være under kontroll.', 114, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (117, N'A.12.1.3', N'Kapasitetsstyring', N'Bruken av ressurser skal overvåkes og reguleres, og anslag over framtidig kapasitetsbehov skal utarbeides for å sikre nødvendig systemprestasjon.', 114, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (118, N'A.12.1.4', N'Separasjon av miljøer for utvikling, testing og drift', N'Miljøene for utvikling, testing og drift skal være adskilt for å redusere risikoene for uautorisert tilgang til eller endringer i driftsmiljøet.', 114, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (119, N'A.12.2', N'Beskyttelse mot ødeleggende programvare', N'Å sikre at informasjon og systemer for informasjonsbehandling er beskyttet mot ødeleggende programvare.', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (120, N'A.12.2.1', N'Tiltak mot ødeleggende programvare', N'Det skal implementeres tiltak for deteksjon, forebygging og gjenoppretting for å beskytte mot ødeleggende programvare, kombinert med hensiktsmessig bevisstgjøring av brukere.', 119, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (121, N'A.12.3', N'Sikkerhetskopiering', N'Å beskytte mot tap av data.', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (122, N'A.12.3.1', N'Sikkerhetskopiering av informasjon', N'Sikkerhetskopier av informasjon, programvare og systemavbildninger skal tas og testes regelmessig i samsvar med en avtalt policy for sikkerhetskopiering.', 121, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (123, N'A.12.4', N'Logging og overvåking', N'Å registrere hendelser og generere bevis.', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (124, N'A.12.4.1', N'Hendelseslogg', N'Hendelseslogger som registrerer brukeraktiviteter, avvik, feil og informasjonssikkerhetshendelser, skal produseres, oppbevares og gjennomgås regelmessig.', 123, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (125, N'A.12.4.2', N'Beskyttelse av logginformasjon', N'Fasiliteter for logging og logginformasjon skal beskyttes mot misbruk og uautorisert tilgang.', 123, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (126, N'A.12.4.3', N'Administrator- og operatørlogger', N'Systemadministrators og systemoperatørs aktiviteter skal loggføres og loggene skal beskyttes og gjennomgås regelmessig.', 123, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (127, N'A.12.4.4', N'Klokkesynkronisering', N'Klokker i alle relevante informasjonsbehandlingssystemer innenfor en organisasjon eller et sikkerhetsdomene skal synkroniseres mot én referansetidskilde.', 123, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (128, N'A.12.5', N'Kontroll av operativ programvare', N'Å sikre integriteten til operative systemer.', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (129, N'A.12.5.1', N'Installasjon av programvare i operative systemer', N'Prosedyrer skal implementeres for å kontrollere installasjon av programvare i operative systemer.', 128, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (130, N'A.12.6', N'Styring av tekniske sårbarheter', N'Å forhindre utnyttelse av tekniske sårbarheter.', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (131, N'A.12.6.1', N'Håndtering av tekniske sårbarheter', N'Informasjon om tekniske sårbarheter i informasjonssystemer som er i bruk, skal innhentes jevnlig, organisasjonens eksponering overfor slike sårbarheter skal evalueres, og egnede tiltak skal iverksettes for å håndtere risikoen forbundet med dem.', 130, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (132, N'A.12.6.2', N'Restriksjoner på installering av programvare', N'Regler for installering av programvare utført av brukere skal etableres og implementeres.', 130, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (133, N'A.12.7', N'Hensyn ved revisjon av informasjonssystemer', N'Å minimere virkningen av revisjonsaktiviteter i operative systemer.', 113, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (134, N'A.12.7.1', N'Tiltak for revisjon av informasjonssystemer', N'Krav til revisjon og aktiviteter som involverer verifisering av operative systemer, skal være nøye planlagt og avtalt for å minimere forstyrrelser i  virksomhetsprosesser.', 133, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (135, N'A.13', N'Kommunikasjonssikkerhet', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (136, N'A.13.1', N'Styring av nettverkssikkerhet', N'Å sikre beskyttelse av informasjon i nettverk og understøttende systemer for informasjonsbehandling.', 135, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (137, N'A.13.1.1', N'Nettverkskontroller', N'Nettverk skal styres og kontrolleres for å beskytte informasjon i systemer og applikasjoner.', 136, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (138, N'A.13.1.2', N'Sikring av nettjenester', N'Sikringsmekanismer, tjenestenivåer og styringskrav til alle nettjenester skal identifiseres og inkluderes i avtaler om nettjenester, uavhengig av om disse tjenestene leveres av interne ressurser eller er utkontraktert.', 136, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (139, N'A.13.1.3', N'Segregering i nettverk', N'Grupper av informasjonstjenester, brukere og informasjonssystemer skal segregeres i nettverk.', 136, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (140, N'A.13.2', N'Informasjonsoverføring', N'Å opprettholde sikkerheten til informasjon som overføres innenfor en organisasjon og med eksterne enheter.  ', 135, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (141, N'A.13.2.1', N'Policyer og prosedyrer for informasjonsoverføring', N'Formelle policyer, prosedyrer og sikringstiltak for overføring skal være iverksatt for å beskytte overføringen av informasjon ved bruk av enhver type kommunikasjonsmiddel.', 140, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (142, N'A.13.2.2', N'Avtaler om informasjonsoverføring', N'Avtaler skal omhandle sikker overføring av virksomhetsinformasjon mellom organisasjonen og eksterne parter.', 140, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (143, N'A.13.2.3', N'Elektronisk meldingsutveksling', N'Informasjon involvert i elektronisk meldingsutveksling, skal være hensiktsmessig beskyttet.', 140, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (144, N'A.13.2.4', N'Konfidensialitets- eller taushetserklæringer', N'Krav til konfidensialitets- eller taushetserklæringer som tilkjennegir organisasjonens behov for beskyttelse av informasjon, skal identifiseres, gjennomgås regelmessig og dokumenteres.', 140, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (145, N'A.14', N'Anskaffelse, utvikling og vedlikehold av systemer', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (146, N'A.14.1', N'Sikkerhetskrav til informasjonssystemer', N'Å påse at informasjonssikkerhet er en integrert del av informasjonssystemer gjennom hele livsløpet. Dette omfatter også kravene til informasjonssystemer som tilbyr tjenester over offentlige nettverk', 145, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (147, N'A.14.1.1', N'Behovsanalyse og beskrivelse av krav til informasjonssikkerhet', N'Krav til informasjonssikkerhet skal inngå i kravene til nye informasjonssystemer eller ved forbedringer av eksisterende informasjonssystemer.', 146, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (148, N'A.14.1.2', N'Sikring av applikasjonstjenester i offentlige nettverk', N'Informasjon i applikasjonstjenester som overføres i offentlige nettverk, skal beskyttes mot bedragersk aktivitet, kontrakttvister og uautorisert utlevering og modifisering.', 146, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (149, N'A.14.1.3', N'Beskyttelse av transaksjoner til og fra applikasjonstjenester', N'Informasjon i transaksjoner til og fra applikasjonstjenester skal beskyttes for å hindre ufullstendig overføring, feilruting, uautorisert meldingsendring, uautorisert utlevering, uautorisert meldingsduplisering eller repetering.', 146, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (150, N'A.14.2', N'Sikkerhet i utviklings- og støtteprosesser', N'Å påse at informasjonssikkerhet er utformet og iverksatt i hele utviklingsprosessen til informasjonssystemer.', 145, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (151, N'A.14.2.1', N'Policy for sikker utvikling', N'Regler for utvikling av programvare og systemer skal etableres og benyttes under utvikling I organisasjonen.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (152, N'A.14.2.2', N'Prosedyrer for endringskontroll av systemer', N'Endringer i systemer i utviklingsprosessen skal styres ved bruk av formelle prosedyrer for endringskontroll.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (153, N'A.14.2.3', N'Teknisk gjennomgang av applikasjoner etter endringer av driftsplattfonn', N'Dersom driftsplattfonnen blir endret, skal virksomhetskritiske applikasjoner gjennomgås og testes for å sikre at det ikke har hatt negativ innvirkning på organisasjonens drift eller sikkerhet.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (154, N'A.14.2.4', N'Restriksjoner på endringer av programvarepakker', N'Modifiseringer av programvarepakker skal frarådes og begrenses til nødvendige endringer, og alle endringer skal være strengt kontrollert', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (155, N'A.14.2.5', N'Prinsipper for prosjektering av sikre systemer', N'Prinsipper for prosjektering av sikre systemer skal etableres, dokumenteres, vedlikeholdes og brukes ved enhver implementering av informasjonssystemer.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (156, N'A.14.2.6', N'Sikkert utviklingsmiljø', N'Organisasjoner skal etablere og hensiktsmessig beskytte sikre utviklingsmiljøer for systemutvikling og integreringsarbeid som dekker hele utviklingsprosessen til systemet.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (157, N'A.14.2.7', N'Utkontraktert utvikling', N'Organisasjonen skal føre tilsyn med og overvåke aktivitet forbundet med utkontraktert systemutvikling.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (158, N'A.14.2.8', N'Sikkerhetstest av systemer', N'Test av sikkerhetsfunksjonalitet skal gjennomføres mens utvikling foregår.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (159, N'A.14.2.9', N'Systemakseptansetest', N'Det skal etableres programmer for akseptansetest med tilhørende kriterier for nye informasjonssystemer, oppgraderinger og nye versjoner.', 150, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (160, N'A.14.3', N'Testdata', N'Å sikre beskyttelse av data som brukes for testing.', 145, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (161, N'A.14.3.1', N'Beskyttelse av testdata', N'Testdata skal velges med omhu, beskyttes og holdes under kontroll.', 160, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (162, N'A.15', N'Leverandørforhold', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (163, N'A.15.1', N'Informasjonssikkerhet i leverandørforhold', N'Å sikre beskyttelse av virksomhetsaktiva som er tilgjengelige for leverandører.', 162, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (164, N'A.15.1.1', N'Informasjonssikkerhetspolicy for leverandørforhold', N'Krav til informasjonssikkerhet for å redusere risikoer forbundet med leverandørtilgang til virksomhetsaktiva skal avtales med leverandøren og dokumenteres.', 163, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (165, N'A.15.1.2', N'Håndtering av sikkerhet i leverandøravtaler', N'Alle relevante krav til informasjonssikkerhet skal etableres og avtales med hver leverandør som kan få aksess til, behandle, lagre, kommunisere eller levere komponenter i IT-infrastrukturen for organisasjonens informasjon.', 163, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (166, N'A.15.1.3', N'Informasjons- og kommunikasjonsteknologi i forsyningskjeden', N'Avtaler med leverandører skal inneholde krav om å adressere informasjonssikkerhetsrisikoer forbundet med tjenester for informasjons- og kommunikasjonsteknologi og forsyningskjeden for produkter.', 163, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (167, N'A.15.2', N'Styring av leverandørers tjenesteleveranser', N'Å opprettholde et avtalt nivå for informasjonssikkerhet og tjenesteleveranser i tråd med leverandøravtaler.', 162, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (168, N'A.15.2.1', N'Overvåking og gjennomgang av leverandørers tjenester', N'Organisasjoner skal regelmessig overvåke, gjennomgå og revidere leverandørers tjenesteleveranser.', 167, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (169, N'A.15.2.2', N'Styring av endringer i leverandørers tjenester', N'Endringer i tjenestetilbudet fra leverandører, inklusive vedlikehold og forbedring av eksisterende policyer, prosedyrer og sikringstiltak for informasjonssikkerhet, skal styres. Det skal tas hensyn til kritikaliteten til virksomhetsinformasjon, systemer og prosesser som er involvert, og risikoer skal revurderes.', 167, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (170, N'A.16', N'Styring av informasjonssikkerhetsbrudd', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (171, N'A.16.1', N'Styring av informasjonssikkerhetsbrudd og forbedringer', N'Å sikre en enhetlig og virkningsfull tilnærming til styring av informasjonssikkerhetsbrudd, herunder kommunikasjon av sikkerhetshendelser og svakheter.', 170, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (172, N'A.16.1.1', N'Ansvar og prosedyrer', N'Lederansvar og prosedyrer skal etableres for å sikre en rask, virkningsfull og velordnet respons på informasjonssikkerhetsbrudd.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (173, N'A.16.1.2', N'Rapportering av informasjonssikkerhetshendelser', N'Informasjonssikkerhetshendelser skal rapporteres gjennom hensiktsmessige ledelseskanaler så raskt som mulig.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (174, N'A.16.1.3', N'Rapportering av svakheter i informasjonssikkerheten', N'Ansatte og kontraktører som bruker organisasjonens informasjonssystemer og -tjenester, skal rapportere mulige eller observerte svakheter i systemenes eller tjenestens informasjonssikkerhet.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (175, N'A.16.1.4', N'Behandling av informasjonssikkerhetshendelser', N'Informasionssikkerhetshendelser skal vurderes, og det skal avgjøres om de skal klassifiseres som informasjonssikkerhetsbrudd.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (176, N'A.16.1.5', N'Reaksjon på informasjonssikkerhetsbrudd', N'Det skal reageres på informasjonssikkerhetsbrudd i samsvar med dokumenterte prosedyrer.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (177, N'A.16.1.6', N'Læring av informasjonssikkerhetsbrudd', N'Kunnskap tilført fra å analysere og løse informasjonssikkerhetsbrudd skal brukes til å redusere sannsynligheten for eller konsekvensene av framtidige brudd.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (178, N'A.16.1.7', N'Innsamling av bevis', N'Organisasjonen skal definere og benytte prosedyrer for identifisering, innsamling, anskaffelse og bevaring av informasjon som kan benyttes som bevis.', 171, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (179, N'A.17', N'Informasjonssikkerhetsaspekter ved styring av virksomhetskontinuitet', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (180, N'A.17.1', N'Informasjonssikkerhetskontinuitet', N'Informasjonssikkerhetskontinuitet skal være forankret i organisasjonens ledelsessystemer for virksomhetskontinuitet.', 179, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (181, N'A.17.1.1', N'Planlegging av informasjonssikkerhetskontinuitet', N'Organisasjonen skal fastsette sine krav til informasjonssikkerhet og kontinuitet i styringen av informasjonssikkerhet i uønskede situasjoner, for eksempel under en krise eller katastrofe.', 180, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (182, N'A.17.1.2', N'Implementering av informasjonssikkerhetskontinuitet', N'Organisasjonen skal etablere, dokumentere, implementere og vedlikeholde prosesser, prosedyrer og sikringstiltak for å sikre det nødvendige nivået av informasjonssikkerhetskontinuitet i en uønsket situasjon', 180, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (183, N'A.17.1.3', N'Verifisere, gjennomgå og evaluere informasjonssikkerhetskontinuitet', N'Organisasjonen skal med jevne mellomrom verifisere de etablerte og iverksatte sikringstiltakene for informasjonssikkerhetskontinuitet for å sikre at de er gyldige og virkningsfulle i uønskede situasjoner.', 180, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (184, N'A.17.2', N'Redundans', N'Å sikre tilgjengeligheten til systemer som skal behandle informasjon.', 179, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (185, N'A.17.2.1', N'Tilgjengelighet til systemer som skal behandle informasjon', N'Systemer som skal behandle informasjon, skal ha tilstrekkelig redundans for å oppfylle tilgjengelighetskrav.', 184, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (186, N'A.18', N'Samsvar', N'', NULL, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (187, N'A.18.1', N'Samsvar med juridiske og kontraktsmessige krav', N'Å unngå brudd på juridiske, lovfestede, regulatoriske eller kontraktsmessige forpliktelser knyttet til informasjonssikkerhet og på ethvert sikkerhetskrav.', 186, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (188, N'A.18.1.1', N'Identifisering av gjeldende lovgivning og kontraktsmessige krav', N'Alle relevante lovfestede, regulatoriske og kontraktsmessige krav samt organisasjonens tilnærming til å oppfylte disse kravene skal være uttrykkelig identifisert, dokumentert og holdes oppdatert for hvert informasjonssystem og for organisasjonen.  ', 187, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (189, N'A.18.1.2', N'Immaterielle rettigheter', N'Hensiktsmessige prosedyrer skal implementeres for å sikre samsvar med lovfestede, regulatoriske og kontraktsmessige krav knyttet til immaterielle rettigheter og bruk av proprietære programvareprodukter.', 187, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (190, N'A.18.1.3', N'Beskyttelse av arkiv', N'Arkiv skal beskyttes mot tap, ødeleggelse, forfalskning, uautorisert tilgang og uautorisert utlevering, i samsvar med lovbestemte, regulatoriske, kontraktsmessige og forretningsmessige krav.', 187, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (191, N'A.18.1.4', N'Personvern og beskyttelse av personlig identifiserbar informasjon', N'Personvern og beskyttelse av personlig identifiserbar informasjon skal sikres som påkrevd i relevante lover og forskrifter der det er aktuelt.', 187, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (192, N'A.18.1.5', N'Regulering av kryptografiske kontroller', N'Kryptografiske kontroller skal brukes i samsvar med alle relevante avtaler, lover og forskrifter.', 187, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (193, N'A.18.2', N'Gjennomganger av informasjonssikkerhet', N'Å sikre at informasjonssikkerhet er iverksatt og forvaltes i samsvar med organisasjonens policyer og prosedyrer.', 186, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (194, N'A.18.2.1', N'Uavhengig gjennomgang av informasjonssikkerhet', N'Organisasjonens tilnærming til styring av informasjonssikkerhet og implementeringen av denne (dvs. sikringsmål, sikringstiltak, policyer, prosesser og prosedyrer for informasjonssikkerhet) skal gjennomgås uavhengig med planlagte intervaller eller dersom betydelige endringer skjer.', 193, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (195, N'A.18.2.2', N'Samsvar med policyer og standarder for sikkerhet', N'Ledere skal, innenfor sitt ansvarsområde, jevnlig gjennomgå at informasjonsbehandling og prosedyrer er i samsvar med gjeldende sikkerhetspolicyer, standarder og alle andre sikringskrav.', 193, NULL, NULL)

INSERT [dbo].[SoaChapter] ([Id], [Name], [Description], [Goal], [Parent], [HowTo], [Info]) VALUES (196, N'A.18.2.3', N'Gjennomgang av teknisk samsvar', N'Informasjonssystemer skal regelmessig gjennomgås for samsvar med organisasjonens policyer og standarder for informasjonssikkerhet.', 193, NULL, NULL)

SET IDENTITY_INSERT [dbo].[SoaChapter] OFF

