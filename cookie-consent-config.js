const cookieBannerLanguage = document.documentElement.lang === 'uk' ? 'uk' : document.documentElement.lang === 'en' ? 'en' : 'de';

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
    default: cookieBannerLanguage,
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
      },
      en: {
        consentModal: {
          title: "We use cookies",
          description: "We use cookies on our website. Some cookies are required for the website to function, while others are optional. Detailed information about the cookies and the option to choose your own settings can be found under \"Individual cookie settings\". You can change your settings at any time under \"Cookies\" in our privacy policy.",
          acceptAllBtn: "Accept all cookies",
          acceptNecessaryBtn: "Necessary only",
          showPreferencesBtn: "Manage settings"
        },
        preferencesModal: {
          title: "Cookie settings misjudged.app",
          acceptAllBtn: "Accept all cookies",
          acceptNecessaryBtn: "Necessary only",
          savePreferencesBtn: "Save settings",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Individual cookie settings",
              description: "Below you can find more information about the different cookie categories and the individual cookies and choose your own settings. The \"Necessary cookies\" category is required for our website and therefore cannot be deselected. The \"Analytics cookies\" category is only set if you select it or click \"Accept all cookies\"."
            },
            {
              title: "Necessary cookies",
              description: "These cookies are required for the basic functions of the website and cannot be disabled.<details><summary>More information</summary><p>Cookie name / duration / purpose</p><ul><li><strong>cc_cookie</strong>, 6 months, cookie consent cookie (used by our banner script to store which cookie settings you have selected for this website)</li></ul></details>",
              linkedCategory: "necessary"
            },
            {
              title: "Analytics cookies",
              description: "We use Google Analytics to understand how visitors interact with the website.<details><summary>More information</summary><p>Cookie name / duration / purpose</p><ul><li><strong>_ga</strong>, 2 years, Google Analytics cookie (used to distinguish users and measure interaction with the website over longer periods)</li><li><strong>_ga_*</strong>, 2 years, Google Analytics cookie (used to store and retrieve the current session status)</li><li><strong>_gid</strong>, 24 hours, Google Analytics cookie (used to recognize users for one day and group their behavior during that time)</li><li><strong>_gat_*</strong>, 1 minute, Google Analytics cookie (used to throttle the request rate in order to protect Google servers)</li><li><strong>cc_cookie</strong>, 6 months, cookie consent cookie (used by our banner script to store which cookie settings you have selected for this website)</li></ul></details>",
              linkedCategory: "analytics"
            }
          ]
        }
      },
      uk: {
        consentModal: {
          title: "Ми використовуємо cookie",
          description: "На нашому вебсайті ми використовуємо cookie. Деякі cookie є необхідними для роботи сайту, інші є необов'язковими. Детальну інформацію про cookie та можливість обрати індивідуальні налаштування ви знайдете в розділі \"Індивідуальні налаштування cookie\". Ви можете будь-коли змінити свої налаштування в розділі \"Cookies\" у нашій політиці конфіденційності.",
          acceptAllBtn: "Прийняти всі cookie",
          acceptNecessaryBtn: "Лише необхідні",
          showPreferencesBtn: "Керувати налаштуваннями"
        },
        preferencesModal: {
          title: "Налаштування cookie misjudged.app",
          acceptAllBtn: "Прийняти всі cookie",
          acceptNecessaryBtn: "Лише необхідні",
          savePreferencesBtn: "Зберегти налаштування",
          closeIconLabel: "Закрити",
          sections: [
            {
              title: "Індивідуальні налаштування cookie",
              description: "Нижче ви знайдете детальнішу інформацію про різні категорії cookie та окремі cookie, а також зможете обрати власні налаштування. Категорія \"Необхідні cookie\" потрібна для роботи нашого вебсайту, тому її не можна вимкнути. Категорія \"Аналітичні cookie\" встановлюється лише тоді, коли ви її обираєте або натискаєте \"Прийняти всі cookie\"."
            },
            {
              title: "Необхідні cookie",
              description: "Ці cookie потрібні для базових функцій вебсайту й не можуть бути вимкнені.<details><summary>Додаткова інформація</summary><p>Назва cookie / тривалість / призначення</p><ul><li><strong>cc_cookie</strong>, 6 місяців, cookie згоди на cookie (використовується нашим банерним скриптом для збереження вибраних вами налаштувань cookie для цього сайту)</li></ul></details>",
              linkedCategory: "necessary"
            },
            {
              title: "Аналітичні cookie",
              description: "Ми використовуємо Google Analytics, щоб зрозуміти, як відвідувачі взаємодіють із вебсайтом.<details><summary>Додаткова інформація</summary><p>Назва cookie / тривалість / призначення</p><ul><li><strong>_ga</strong>, 2 роки, cookie Google Analytics (використовується для розрізнення користувачів і вимірювання взаємодії з сайтом упродовж тривалого часу)</li><li><strong>_ga_*</strong>, 2 роки, cookie Google Analytics (використовується для збереження й отримання поточного статусу сесії)</li><li><strong>_gid</strong>, 24 години, cookie Google Analytics (використовується для розпізнавання користувачів протягом одного дня та групування їхньої поведінки за цей час)</li><li><strong>_gat_*</strong>, 1 хвилина, cookie Google Analytics (використовується для обмеження частоти запитів з метою захисту серверів Google)</li><li><strong>cc_cookie</strong>, 6 місяців, cookie згоди на cookie (використовується нашим банерним скриптом для збереження вибраних вами налаштувань cookie для цього сайту)</li></ul></details>",
              linkedCategory: "analytics"
            }
          ]
        }
      }
    }
  }
});
