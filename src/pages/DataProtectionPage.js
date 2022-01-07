import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux'

class DataProtectionPage extends React.Component {

  render() {
    return (
      <Page
        className="DataProtectionPage"
        title='Datenschutzerklärung'
      >
        <div class="about-text">
            <h3>I Name und Anschrift des Verantwortlichen</h3>
            <p>Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:</p>
            <p>
                BuFaK WiWi<br />
                Platz der Göttinger Sieben 3<br />
                37073<br />
                Deutschland<br />
                Tel.: +49 (0) 30 27874095<br />
                E-Mail: administration@bufak-wiwi.de<br />
                Website: <a href="https://www.bufak-wiwi.org">www.bufak-wiwi.org</a>
            </p>
        </div>
        <div class="about-text">
            <h3>II Allgemeines zur Datenverarbeitung</h3><br />
            <h4>1. Umfang der Verarbeitung personenbezogener Daten</h4>
            <p>
                Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.                    
            </p>
            <h4>2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten</h4>
            <p>
                Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.
            </p>
            <p>
                Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.
            </p>
            <p>
                Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.
            </p>
            <p>
                Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
            </p>
            <p>
                Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.  
            </p>
            <h4>3. Hosting</h4>
            <p>Server und Datenbanken für die Authentifizierung werden gehostet auf den Servern von Firebase, Google LCC.</p>
            <p>Server und Datenbanken für alle weiteren Funktionen werden gehostet auf den Servern von netcup GmbH.</p>

            <h4>4. Datenlöschung und Speicherdauer</h4>
            <p>
                Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.
            </p>
            <h4>Registrierung</h4><br />
            <h6>1. Beschreibung und Umfang der Datenverarbeitung</h6>
            <p>Auf unserer Internetseite bieten wir Nutzern die Möglichkeit, sich unter Angabe personenbezogener Daten zu registrieren. Die Daten werden dabei in eine Eingabemaske eingegeben und an uns übermittelt.
                Für die Authentifizierung werden folgende der Daten an Firebase, Google LCC weitergegeben:
                <div class="col-lg-12">

                        <li>(1) E-Mail-Adresse</li>
                        <li>(2) Password</li>
                        <li>(3)	Datum und Uhrzeit der Registrierung</li>
                    
                </div><br />
                Zusätzlich werden folgende weitere Daten erhoben, welche nicht an Dritte weitergegeben werden:<br />
                <div class="col-lg-12">

                        <li>(4) Name des Nutzers</li>
                        <li>(5) Adresse</li>
                        <li>(6) Geburtstag</li>
                        <li>(7) Geschlecht</li>
                        <li>(8) Zugehörige Fachschaft inklusive Hochschule</li>
                    
                </div>
                Im Rahmen des Registrierungsprozesses wird eine Einwilligung des Nutzers zur Verarbeitung dieser Daten eingeholt.
            </p>
            <h6>2. Rechtsgrundlage für die Datenverarbeitung</h6>
            <p>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO.</p>
            <h6>3. Zweck der Verarbeitung</h6>
            <p>Die Registrierung des Nutzers ist für die Bereithalten der Anmeldung zu einer BuFaK erforderlich.</p>
            <h6>4. Dauer der Speicherung</h6>
            <p>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.
                Dies ist für die während des Registrierungsvorgangs erhobenen Daten der Fall, wenn die bereitgestellte Anmeldung zu einer BuFaK oder die Registrierung auf unserer Internetseite aufgehoben oder abgeändert wird.
            </p>
            <h6>5. Widerspruchs- und Beseitigungsmöglichkeit</h6>
            <p>Als Nutzer haben sie jederzeit die Möglichkeit, die Registrierung aufzulösen. Senden Sie dafür eine formlose E-Mail an 
                    <a href='m&#97;il&#116;o&#58;&#105;n%66o&#64;b%&#55;5%66a&#107;&#46;un&#105;-pad%65&#114;bo%72&#110;&#46;d%6&#53;' target="_blank" rel="noopener noreferrer">info&#64;bufak&#46;&#117;n&#105;-p&#97;der&#98;or&#110;&#46;d&#101;</a>.
                Die über Sie gespeicherten Daten können Sie jederzeit abändern lassen unter <i> &gt Profil Aktualisieren &gt Jetzt Aktualisieren</i>.
                Sind die Daten zur Erfüllung eines Vertrages oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, ist eine vorzeitige Löschung der Daten nur möglich, soweit nicht vertragliche oder gesetzliche Verpflichtungen einer Löschung entgegenstehen.
            </p>
            <h4>Anmeldung zu einer BuFaK</h4><br />
            <h6>1. Beschreibung und Umfang der Datenverarbeitung</h6>
            <p>Auf unserer Internetseite bieten wir Nutzern die Möglichkeit, sicht unter Angabe personenbezogener Daten zu einer BuFaK anzumelden. Die Daten werden dabei in eine Eingabemaske eingegeben und an uns übermittelt und gespeichert. Folgende Daten werden im Rahmen des Anmeldungsprozesses erhoben und im Falle einer Annahme der Anmeldung ein die ausrichtende Fachschaft weitergegeben:</p>
            <div class="col-lg-12">
                    <li>(1) Art der Teilnahme (Teilnehmer / Alumnus / BuFaK Rat)</li>
                    <li>(2) Priorität innerhalb der Fachschaft</li>
                    <li>(3) NRW-Semesterticket</li>
                    <li>(4) Die Anzahl der angetretenen BuFaKs</li>
                    <li>(5) Handynummer</li>
                    <li>(6) Anmerkungen</li>
                
            </div><br />
            <p>Zusätzlich werden folgende weitere Daten erhoben, welche anonymisiert und aggregiert an die ausrichtende Fachschaft weitergegeben wird:</p>
            <div class="col-lg-12">
                    <li>(7) Essensgewohnheit</li>
                    <li>(8) Unverträglichkeiten</li>
                
            </div>
            <p>Im Rahmen des Registrierungsprozesses wird eine Einwilligung des Nutzers zur Verarbeitung dieser Daten eingeholt.</p>
            <h6>2. Rechtsgrundlage für die Datenverarbeitung</h6>
            <p>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO.</p>
            <h6>3. Zweck der Verarbeitung</h6>
            <p>Die Anmeldung ist erforderlich, um eine BuFaK auszurichten.</p>
            <h6>4. Dauer der Speicherung</h6>
            <p>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. 
                Dies ist für die Daten (1) und (2) der Fall, wenn die bereitgestellte Anmeldung zu einer BuFaK aufgehoben oder abgeändert wird.
                Für die Daten (3) - (8) ist dies unmittelbar nach der Ausrichtung der BuFaK der Fall.
            </p>
            <h6>5. Widerspruchs- und Beseitigungsmöglichkeit</h6>
            <p>Als Nutzer haben sie jederzeit die Möglichkeit, die Anmeldung aufzulösen oder abzuändern. Senden Sie dafür eine formlose E-Mail an 
                <a href='m&#97;il&#116;o&#58;&#105;n%66o&#64;b%&#55;5%66a&#107;&#46;un&#105;-pad%65&#114;bo%72&#110;&#46;d%6&#53;' target="_blank" rel="noopener noreferrer">info&#64;bufak&#46;&#117;n&#105;-p&#97;der&#98;or&#110;&#46;d&#101;</a>.
                Sind die Daten zur Erfüllung eines Vertrages oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, ist eine vorzeitige Löschung der Daten nur möglich, soweit nicht vertragliche oder gesetzliche Verpflichtungen einer Löschung entgegenstehen.
            </p>

            <h4>Verwendung von Cookies</h4><br />
            <h6>1. Beschreibung und Umfang der Datenverarbeitung</h6>
            <p>Unsere Webseite verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die im Internetbrowser bzw. vom Internetbrowser auf dem Computersystem des Nutzers gespeichert werden. Ruft ein Nutzer eine Website auf, so kann ein Cookie auf dem Betriebssystem des Nutzers gespeichert werden. Dieser Cookie enthält eine charakteristische Zeichenfolge, die eine eindeutige Identifizierung des Browsers beim erneuten Aufrufen der Website ermöglicht.</p>
            <p>Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert werden kann.</p>
            <p>In den Cookies werden dabei folgende Daten gespeichert und übermittelt:</p>
            <div class="col-lg-12">
                    <li>(1)	Log-In-Informationen</li>
                
            </div>
            <h6>2. Rechtsgrundlage für die Datenverarbeitung</h6>
            <p>Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von Cookies ist Art. 6 Abs. 1 lit. f DSGVO.</p>
            <h6>3. Zweck der Datenverarbeitung</h6>
            <p>Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu vereinfachen. Einige Funktionen unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten werden. Für diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.</p>
            <p>Für folgende Anwendungen benötigen wir Cookies:</p>
            <div class="col-lg-12">
                    <li>(1)	Anmeldung zu einer BuFaK</li>
                
            </div>
            <p>Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung von Nutzerprofilen verwendet.</p>
            <h6>4. Dauer der Speicherung, Widerspruchs- und Beseitigungsmöglichkeit</h6>
            <p>Cookies werden auf dem Rechner des Nutzers gespeichert und von diesem an unserer Seite übermittelt. Daher haben Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für unsere Website deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website vollumfänglich genutzt werden.</p>

            <h3>III. Rechte der betroffenen Personen</h3>
            <p>Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen folgende Rechte gegenüber dem Verantwortlichen zu:</p>
            <h4>1. Auskunftsrecht</h4>
            <p>Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet werden. 
                    Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen über folgende Informationen Auskunft verlangen:
            </p>
            <div class="col-lg-12">
                    <li>(1) die Zwecke, zu denen die personenbezogenen Daten verarbeitet werden;</li>
                    <li>(2) die Kategorien von personenbezogenen Daten, welche verarbeitet werden;</li>
                    <li>(3) die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie betreffenden personenbezogenen Daten offengelegt wurden oder noch offengelegt werden;</li>
                    <li>(4) die geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete Angaben hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;</li>
                    <li>(5) das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten, eines Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung; </li>
                    <li>(6) das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;</li>
                    <li>(7) alle verfügbaren Informationen über die Herkunft der Daten, wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden;</li>
                    <li>(8) das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO und – zumindest in diesen Fällen – aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person.
                            Ihnen steht das Recht zu, Auskunft darüber zu verlangen, ob die Sie betreffenden personenbezogenen Daten in ein Drittland oder an eine internationale Organisation übermittelt werden. In diesem Zusammenhang können Sie verlangen, über die geeigneten Garantien gem. Art. 46 DSGVO im Zusammenhang mit der Übermittlung unterrichtet zu werden.
                    </li>
                
            </div>
            <h4>2. Recht auf Berichtigung</h4>
            <p>Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, sofern die verarbeiteten personenbezogenen Daten, die Sie betreffen, unrichtig oder unvollständig sind. Der Verantwortliche hat die Berichtigung unverzüglich vorzunehmen.</p>
            
            <h4>3. Recht auf Einschränkung der Verarbeitung</h4><br />
            <p>Unter den folgenden Voraussetzungen können Sie die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen Daten verlangen:</p>
            <div class="col-lg-12">
                    <li>(1) wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für eine Dauer bestreiten, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen;</li>
                    <li>(2) die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnen und stattdessen die Einschränkung der Nutzung der personenbezogenen Daten verlangen;</li>
                    <li>(3) der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder</li>
                    <li>(4) wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DSGVO eingelegt haben und noch nicht feststeht, ob die berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.</li>
                
            </div>
            <p>Wurde die Verarbeitung der Sie betreffenden personenbezogenen Daten eingeschränkt, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Union oder eines Mitgliedstaats verarbeitet werden.</p>
            <p>Wurde die Einschränkung der Verarbeitung nach den o.g. Voraussetzungen eingeschränkt, werden Sie von dem Verantwortlichen unterrichtet bevor die Einschränkung aufgehoben wird.</p>
            
            <h4>4. Recht auf Löschung</h4><br />
            <h6>a) Löschungspflicht</h6>
            <p>Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, und der Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der folgenden Gründe zutrifft:</p>
            <div class="col-lg-12">
                    <li>(1) Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.</li>
                    <li>(2) Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2 lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung. </li>
                    <li>(3) Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art. 21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein. </li>
                    <li>(4) Die Sie betreffenden personenbezogenen Daten wurden unrechtmäßig verarbeitet. </li>
                    <li>(5) Die Löschung der Sie betreffenden personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt. </li>
                    <li>(6) Die Sie betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.</li>
                
            </div>
            <h6>b) Information an Dritte</h6>
            <p>Hat der Verantwortliche die Sie betreffenden personenbezogenen Daten öffentlich gemacht und ist er gem. Art. 17 Abs. 1 DSGVO zu deren Löschung verpflichtet, so trifft er unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene Maßnahmen, auch technischer Art, um für die Datenverarbeitung Verantwortliche, die die personenbezogenen Daten verarbeiten, darüber zu informieren, dass Sie als betroffene Person von ihnen die Löschung aller Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt haben. </p>
            <h6>c) Ausnahmen</h6>
            <p>Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist</p>
            <div class="col-lg-12">
                    <li>(1) zur Ausübung des Rechts auf freie Meinungsäußerung und Information;</li>
                    <li>(2) zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde;</li>
                    <li>(3) aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i sowie Art. 9 Abs. 3 DSGVO;</li>
                    <li>(4) für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das unter Abschnitt a) genannte Recht voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung unmöglich macht oder ernsthaft beeinträchtigt, oder</li>
                    <li>(5) zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</li>
                
            </div>

            <h4>5. Recht auf Unterrichtung</h4>
            <p>Haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung gegenüber dem Verantwortlichen geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden.</p>
            <p>Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über diese Empfänger unterrichtet zu werden.</p>
            
            <h4>6. Recht auf Datenübertragbarkeit</h4>
            <p>Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Außerdem haben Sie das Recht diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern</p>
            <div class="col-lg-12">
                    <li>(1) die Verarbeitung auf einer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder Art. 9 Abs. 2 lit. a DSGVO oder auf einem Vertrag gem. Art. 6 Abs. 1 lit. b DSGVO beruht und</li>
                    <li>(2) die Verarbeitung mithilfe automatisierter Verfahren erfolgt.</li>
                
            </div>
            <p>In Ausübung dieses Rechts haben Sie ferner das Recht, zu erwirken, dass die Sie betreffenden personenbezogenen Daten direkt von einem Verantwortlichen einem anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar ist. Freiheiten und Rechte anderer Personen dürfen hierdurch nicht beeinträchtigt werden.</p>
            <p>Das Recht auf Datenübertragbarkeit gilt nicht für eine Verarbeitung personenbezogener Daten, die für die Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde.</p>

            <h4>7. Widerspruchsrecht</h4>
            <p>Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. </p>
            <p>Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>
            <p>Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.</p>
            <p>Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung, so werden die Sie betreffenden personenbezogenen Daten nicht mehr für diese Zwecke verarbeitet.</p>
            <p>Sie haben die Möglichkeit, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft – ungeachtet der Richtlinie 2002/58/EG – Ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden.</p>
            
            <h4>8. Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung</h4>
            <p>Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.</p>
                
            <h4>9. Automatisierte Entscheidung im Einzelfall einschließlich Profiling</h4>
            <p>Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich Profiling – beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt. Dies gilt nicht, wenn die Entscheidung </p>
            <div class="col-lg-12">
                    <li>(1) für den Abschluss oder die Erfüllung eines Vertrags zwischen Ihnen und dem Verantwortlichen erforderlich ist,</li>
                    <li>(2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zulässig ist und diese Rechtsvorschriften angemessene Maßnahmen zur Wahrung Ihrer Rechte und Freiheiten sowie Ihrer berechtigten Interessen enthalten oder</li>
                    <li>(3) mit Ihrer ausdrücklichen Einwilligung erfolgt.</li>
                
            </div>
            <p>Allerdings dürfen diese Entscheidungen nicht auf besonderen Kategorien personenbezogener Daten nach Art. 9 Abs. 1 DSGVO beruhen, sofern nicht Art. 9 Abs. 2 lit. a oder g DSGVO gilt und angemessene Maßnahmen zum Schutz der Rechte und Freiheiten sowie Ihrer berechtigten Interessen getroffen wurden.</p>
            <p>Hinsichtlich der in (1) und (3) genannten Fälle trifft der Verantwortliche angemessene Maßnahmen, um die Rechte und Freiheiten sowie Ihre berechtigten Interessen zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung gehört.</p>
                            
            <h4>10. Recht auf Beschwerde bei einer Aufsichtsbehörde</h4>
            <p>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt</p>
            <p>Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.</p>
        </div>
     </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataProtectionPage);
