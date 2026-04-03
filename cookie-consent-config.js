CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "middle center"
    }
  },
  disablePageInteraction: true,
  categories: {
    necessary: {
      readOnly: true,
      enabled: true
    },
    analytics: {
      enabled: false
    }
  },
  language: {
    default: "de",
    translations: {
      de: {
        consentModal: {
          title: "Wir verwenden Cookies",
          description: "Auf unserer Webseite verwenden wir Cookies. Einige Cookies sind für die Webseite erforderlich, andere sind optional. Detaillierte Informationen zu den Cookies sowie die Möglichkeit, individuelle Einstellungen vorzunehmen, finden Sie unter \"Individuelle Cookie-Einstellungen\". Sie können Ihre Einstellungen jederzeit unter \"Cookies\" in unserer Datenschutzerklärung ändern.",
          acceptAllBtn: "Alle Cookies akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          showPreferencesBtn: "Einstellungen verwalten"
        },
        preferencesModal: {
          title: "Cookie-Einstellungen misjudged.app",
          acceptAllBtn: "Alle Cookies akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          savePreferencesBtn: "Einstellungen speichern",
          closeIconLabel: "Schließen",
          sections: [
            {
              title: "Individuelle Cookie-Einstellungen",
              description: "Nachfolgend haben Sie die Möglichkeit, nähere Informationen zu den unterschiedlichen Cookie-Kategorien sowie den Cookies im Einzelnen zu finden und individuelle Einstellungen vorzunehmen. Die Kategorie \"Notwendige Cookies\" ist für unsere Webseite notwendig und kann daher nicht abgewählt werden. Die Kategorie \"Analyse Cookies\" wird nur gesetzt, wenn Sie diese auswählen oder auf \"Alle Cookies akzeptieren\" klicken."
            },
            {
              title: "Notwendige Cookies",
              description: "Diese Cookies sind für die Grundfunktionen der Webseite erforderlich und können nicht deaktiviert werden.<details><summary>Weitere Informationen</summary><p>Cookie Bezeichnung / Dauer / Zweck</p><ul><li><strong>cc_cookie</strong>, 6 Monate, Cookie-Consent-Cookie (wird von unserem Banner-Skript verwendet, um zu speichern, welche Cookie-Einstellungen Sie für diese Website gewählt haben)</li></ul></details>",
              linkedCategory: "necessary"
            },
            {
              title: "Analyse-Cookies",
              description: "Wir nutzen Google Analytics, um zu verstehen, wie Besucher mit der Webseite interagieren.<details><summary>Weitere Informationen</summary><p>Cookie Bezeichnung / Dauer / Zweck</p><ul><li><strong>_ga</strong>, 2 Jahre, Google Analytics Cookie (wird verwendet, um Nutzer zu unterscheiden und die Interaktion mit der Website über längere Zeiträume zu erfassen)</li><li><strong>_ga_*</strong>, 2 Jahre, Google Analytics Cookie (wird verwendet, um den aktuellen Sitzungsstatus zu speichern und abzurufen)</li><li><strong>_gid</strong>, 24 Stunden, Google Analytics Cookie (wird verwendet, um Nutzer für einen Tag lang wiederzuerkennen und deren Verhalten innerhalb dieser Zeit zu gruppieren)</li><li><strong>_gat_*</strong>, 1 Minute, Google Analytics Cookie (wird verwendet, um die Anforderungsrate zum Schutz der Google-Server zu drosseln)</li><li><strong>cc_cookie</strong>, 6 Monate, Cookie-Consent-Cookie (wird von unserem Banner-Skript verwendet, um zu speichern, welche Cookie-Einstellungen Sie für diese Website gewählt haben)</li></ul></details>",
              linkedCategory: "analytics"
            }
          ]
        }
      }
    }
  }
});
