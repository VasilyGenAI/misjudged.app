const legalContainer = document.querySelector('[data-legal-source]');
const tutorialVideoContainer = document.querySelector('[data-tutorial-video]');
const siteLanguage = document.documentElement.lang === 'uk' ? 'uk' : document.documentElement.lang === 'en' ? 'en' : 'de';

// Mirrors the app-side language-to-video mapping while keeping the website on YouTube.
const TUTORIAL_YT_IDS = {
  de: 'URw6SLj_mpg',
  en: 'URw6SLj_mpg',
  uk: '0Vorfx2ZU14',
};

const LEGAL_TEXT = {
  de: {
    imprintTitle: 'Impressum',
    sectionHeadings: [
      'Angaben gemäß § 5 DDG',
      'Anbieter und Verantwortlicher für diese App:',
      'EU-Streitbeilegung',
      'Verbraucherstreitbeilegung / Universalschlichtungsstelle',
      'Haftungsausschluss (Disclaimer)',
      'Kontakt:',
    ],
    contactLabel: 'Kontakt',
    metaPatterns: [/^Vasily Schob/, /^Straße der Jugend 18/, /^14974 Ludwigsfelde/, /^Deutschland$/, /^Telefon:/],
    liabilityHeadings: ['Haftung für Inhalte', 'Haftung für Links'],
    agbSubHeadings: [
      'Preisgestaltung',
      'Risiko des Verlustes',
      'Automatische Verlängerung und Kündigung',
      'Widerrufsbelehrung',
      'Folgen des Widerrufs',
      'Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten',
    ],
  },
  en: {
    imprintTitle: 'Imprint',
    sectionHeadings: [
      'Information according to Section 5 DDG',
      'Provider and person responsible for this app:',
      'EU dispute resolution',
      'Consumer dispute resolution / universal arbitration board',
      'Disclaimer',
      'Contact:',
    ],
    contactLabel: 'Contact',
    metaPatterns: [/^Vasily Schob/, /^Straße der Jugend 18/, /^14974 Ludwigsfelde/, /^Germany$/, /^Phone:/],
    liabilityHeadings: ['Liability for Content', 'Liability for Links'],
    agbSubHeadings: [
      'Pricing',
      'Risk of Loss',
      'Automatic Renewal and Termination',
      'Right of Withdrawal',
      'Consequences of Withdrawal',
      'Early Expiry of the Right of Withdrawal for Digital Content',
    ],
  },
  uk: {
    imprintTitle: 'Вихідні дані',
    sectionHeadings: [
      'Інформація відповідно до § 5 DDG',
      'Постачальник і відповідальна особа за цей застосунок:',
      'Врегулювання спорів у ЄС',
      'Споживче врегулювання спорів / універсальна арбітражна установа',
      'Відмова від відповідальності',
      'Контакт:',
    ],
    contactLabel: 'Контакт',
    metaPatterns: [/^Vasily Schob/, /^Straße der Jugend 18/, /^14974 Ludwigsfelde/, /^Німеччина$/, /^Телефон:/],
    liabilityHeadings: ['Відповідальність за зміст', 'Відповідальність за посилання'],
    agbSubHeadings: [
      'Ціноутворення',
      'Ризик втрати',
      'Автоматичне продовження та розірвання',
      'Право на відмову',
      'Наслідки відмови',
      'Дострокове припинення права на відмову для цифрового контенту',
    ],
  },
};

if (tutorialVideoContainer) {
  const language = tutorialVideoContainer.dataset.videoLang || 'de';
  const tutorialVideoId = TUTORIAL_YT_IDS[language];

  if (tutorialVideoId) {
    tutorialVideoContainer.appendChild(createYoutubeEmbed(tutorialVideoId, language));
  }
}

if (legalContainer) {
  const source = legalContainer.dataset.legalSource;

  fetch(source)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Datei konnte nicht geladen werden: ${source}`);
      }
      return response.text();
    })
    .then((text) => {
      legalContainer.appendChild(formatLegalText(text, source));
    })
    .catch(() => {
      legalContainer.innerHTML = '<p class="legal-error">Der Rechtstext konnte nicht geladen werden. Bitte prüfe, ob die zugehörige .txt-Datei im Repository liegt.</p>';
    });
}

function formatLegalText(text, source) {
  const wrapper = document.createElement('div');
  wrapper.className = 'legal-text';
  const isImpressum = source === 'Impressum.txt';
  const isAgb = source === 'AGB.txt';

  if (isImpressum) {
    wrapper.classList.add('legal-text--impressum');
  }

  const normalized = preprocessLegalText(text, source);
  const lines = normalized.split('\n');
  let list = null;
  let listMode = null;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      list = null;
      listMode = null;
      continue;
    }

    if (isImpressum) {
      const impressumNode = createImpressumNode(trimmed);
      if (impressumNode) {
        list = null;
        listMode = null;
        wrapper.appendChild(impressumNode);
        continue;
      }
    }

    if (isAgb) {
      const agbNode = createAgbNode(trimmed);
      if (agbNode) {
        list = null;
        listMode = null;
        wrapper.appendChild(agbNode);
        continue;
      }
    }

    if (/^Teil\s+\d+:/i.test(trimmed)) {
      list = null;
      listMode = null;
      const heading = document.createElement('h2');
      heading.textContent = trimmed;
      heading.id = createHeadingId(trimmed);
      wrapper.appendChild(heading);
      continue;
    }

    if (/^\d+\.\d+\.\s+/.test(trimmed)) {
      list = null;
      listMode = null;
      const heading = document.createElement('h3');
      heading.textContent = trimmed;
      heading.id = createHeadingId(trimmed);
      wrapper.appendChild(heading);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      list = null;
      listMode = null;
      const heading = document.createElement('h2');
      heading.textContent = trimmed;
      heading.id = createHeadingId(trimmed);
      wrapper.appendChild(heading);
      continue;
    }

    if (/^[\-•]/.test(trimmed) || shouldBecomeListItem(trimmed, listMode)) {
      if (!list) {
        list = document.createElement('ul');
        wrapper.appendChild(list);
      }
      const item = document.createElement('li');
      appendRichText(item, formatListText(trimmed.replace(/^[\-•]\s*/, ''), listMode));
      list.appendChild(item);
      listMode = listMode || 'generic';
      continue;
    }

    list = null;

    const paragraph = document.createElement('p');
    appendRichText(paragraph, trimmed);
    wrapper.appendChild(paragraph);
    listMode = shouldStartList(trimmed);
  }

  return wrapper;
}

function createYoutubeEmbed(videoId, language) {
  const iframe = document.createElement('iframe');
  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);

  embedUrl.searchParams.set('controls', '1');
  embedUrl.searchParams.set('rel', '0');
  embedUrl.searchParams.set('modestbranding', '1');

  iframe.className = 'video-preview__frame';
  iframe.width = '340';
  iframe.height = '604';
  iframe.src = embedUrl.toString();
  iframe.title = `Misjudged Tutorial ${language.toUpperCase()}`;
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';

  return iframe;
}

function preprocessLegalText(text, source) {
  const sourceName = source.toLowerCase();
  const isTermsSource = sourceName === 'agb.txt' || sourceName === 'terms.txt';
  const isPrivacySource = sourceName === 'datenschutz.txt' || sourceName === 'privacy.txt';
  let normalized = text
    .replace(/\r/g, '')
    .replace(/([^\n])\s+(\d+\.\d+\.\s+)/g, '$1\n$2')
    .replace(/^(\d+\.\d+\.\s+[^.\n:]{2,120})\s+([A-ZÄÖÜ])/gm, '$1\n$2')
    .replace(/^(\d+\.\s+[^\n]{2,90}?)\s+(?=(Wenn|Um|Im|Bei|Auf|Die|Der|Das|Du|Ich|Bitte|Vasily|Gelegentlich|Diese|Soweit|Bestimmte|Kunden)\b)/gm, '$1\n')
    .replace(/^(Automatische Verlängerung und Kündigung|Widerrufsbelehrung|Folgen des Widerrufs|Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten)\s+(?=[A-ZÄÖÜ])/gm, '$1\n')
    .replace(/^(Kontakt:)\s+(.*)$/gm, '$1\n$2')
    .trim();

  if (isTermsSource) {
    normalized = normalized.replace(/([^\n])\n([a-zäöüß])/g, '$1 $2');
  }

  if (isPrivacySource) {
    const paymentSection = normalized.match(/^3\.7\..*$/m);

    if (paymentSection) {
      normalized = normalized.replace(/\n?^3\.7\..*$/m, '');
      normalized = normalized.replace(/^4\. Datenverarbeitung auf Social Media-Plattformen$/m, `${paymentSection[0]}\n\n4. Datenverarbeitung auf Social Media-Plattformen`);
    }
  }

  return normalized;
}

function shouldBecomeListItem(line, listMode) {
  if (!listMode) {
    return false;
  }

  if (listMode === 'intro-bullets') {
    return /^meiner\b/i.test(line);
  }

  if (/^https?:\/\//.test(line)) {
    return false;
  }

  if (line.length > 180) {
    return false;
  }

  if (/:\s/.test(line)) {
    return false;
  }

  if (/^[A-ZÄÖÜ][a-zäöüß]+:\s/.test(line)) {
    return false;
  }

  return !/^\d+\.\d+\.\s+/.test(line) && !/^\d+\.\s+/.test(line);
}

function shouldStartList(line) {
  if (/bei der Nutzung$/i.test(line)) {
    return 'intro-bullets';
  }

  if (/(?:bestätigst du, dass:|Folgendes zu unterlassen:|Diese Daten sind:|Dazu gehören:|folgende Rechte hinsichtlich|den folgenden Zweck|den folgenden Zwecken:|ergibt sich über die Einstellungen|nachdem du:)/i.test(line)) {
    return 'generic';
  }

  return null;
}

function appendRichText(element, text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlPattern);

  for (const part of parts) {
    if (!part) {
      continue;
    }

    if (/^https?:\/\/[^\s]+$/.test(part)) {
      const link = document.createElement('a');
      link.href = part;
      link.textContent = part;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      element.appendChild(link);
    } else {
      element.appendChild(document.createTextNode(part));
    }
  }
}

function createImpressumNode(line) {
  const locale = LEGAL_TEXT[siteLanguage];

  if (line === locale.imprintTitle) {
    const heading = document.createElement('h2');
    heading.textContent = line;
    return heading;
  }

  if (locale.sectionHeadings.includes(line)) {
    const heading = document.createElement('h3');
    heading.textContent = line.replace(/:$/, '');
    heading.id = createHeadingId(line);
    return heading;
  }

  if (/^Kontakt:\s+/.test(line)) {
    const wrapper = document.createElement('div');
    wrapper.className = 'legal-impressum-block';

    const heading = document.createElement('h3');
    heading.textContent = locale.contactLabel;
    heading.id = createHeadingId(locale.contactLabel);
    wrapper.appendChild(heading);

    const paragraph = document.createElement('p');
    appendRichText(paragraph, line.replace(/^Kontakt:\s*/, ''));
    wrapper.appendChild(paragraph);
    return wrapper;
  }

  if (/^Contact:\s+/.test(line) || /^Контакт:\s+/.test(line)) {
    const wrapper = document.createElement('div');
    wrapper.className = 'legal-impressum-block';

    const heading = document.createElement('h3');
    heading.textContent = locale.contactLabel;
    heading.id = createHeadingId(locale.contactLabel);
    wrapper.appendChild(heading);

    const paragraph = document.createElement('p');
    appendRichText(paragraph, line.replace(/^(Contact|Контакт):\s*/, ''));
    wrapper.appendChild(paragraph);
    return wrapper;
  }

  if (locale.metaPatterns.some((pattern) => pattern.test(line))) {
    const paragraph = document.createElement('p');
    paragraph.className = 'legal-impressum-meta';
    appendRichText(paragraph, line);
    return paragraph;
  }

  const matchingLiabilityHeading = locale.liabilityHeadings.find((heading) => line.startsWith(`${heading} `));
  if (matchingLiabilityHeading) {
    const wrapper = document.createElement('div');
    wrapper.className = 'legal-impressum-block';

    const paragraphText = line.slice(matchingLiabilityHeading.length).trim();
    const heading = document.createElement('h3');
    heading.textContent = matchingLiabilityHeading;
    heading.id = createHeadingId(matchingLiabilityHeading);
    wrapper.appendChild(heading);

    const paragraph = document.createElement('p');
    appendRichText(paragraph, paragraphText);
    wrapper.appendChild(paragraph);
    return wrapper;
  }

  return null;
}

function createAgbNode(line) {
  const locale = LEGAL_TEXT[siteLanguage];
  const cleanLine = line.replace(/\.$/, '');

  if (locale.agbSubHeadings.includes(cleanLine)) {
    const heading = document.createElement('h4');
    heading.textContent = cleanLine;
    heading.id = createHeadingId(cleanLine);
    return heading;
  }

  return null;
}

function formatListText(text, listMode) {
  if (listMode === 'intro-bullets') {
    return text.replace(/\.$/, '');
  }

  return text;
}

function createHeadingId(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}
