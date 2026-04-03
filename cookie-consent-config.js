CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right"
    }
  },
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
          description: "Um unsere Webseite und die App stetig zu verbessern, möchten wir gerne Analysedaten erfassen. Bist du damit einverstanden? Weitere Infos findest du im <a href=\"datenschutz.html\">Datenschutz</a>.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          showPreferencesBtn: "Einstellungen verwalten"
        },
        preferencesModal: {
          title: "Cookie-Einstellungen",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          savePreferencesBtn: "Einstellungen speichern",
          closeIconLabel: "Schließen",
          sections: [
            {
              title: "Notwendige Cookies",
              description: "Diese Cookies sind für die Grundfunktionen der Webseite erforderlich und können nicht deaktiviert werden.",
              linkedCategory: "necessary"
            },
            {
              title: "Analyse-Cookies",
              description: "Wir nutzen Google Analytics, um zu verstehen, wie Besucher mit der Webseite interagieren.",
              linkedCategory: "analytics"
            }
          ]
        }
      }
    }
  }
});
