const legalContainer = document.querySelector('[data-legal-source]');

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

    if (/^\d+\.\d+\.\s+/.test(trimmed)) {
      list = null;
      listMode = null;
      const heading = document.createElement('h3');
      heading.textContent = trimmed;
      wrapper.appendChild(heading);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      list = null;
      listMode = null;
      const heading = document.createElement('h2');
      heading.textContent = trimmed;
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

function preprocessLegalText(text, source) {
  let normalized = text
    .replace(/\r/g, '')
    .replace(/([^\n])\s+(\d+\.\d+\.\s+)/g, '$1\n$2')
    .replace(/^(\d+\.\d+\.\s+[^.\n:]{2,120})\s+([A-ZÄÖÜ])/gm, '$1\n$2')
    .replace(/^(\d+\.\s+[^\n]{2,90}?)\s+(?=(Wenn|Um|Im|Bei|Auf|Die|Der|Das|Du|Ich|Bitte|Vasily|Gelegentlich|Diese|Soweit|Bestimmte|Kunden)\b)/gm, '$1\n')
    .replace(/^(Automatische Verlängerung und Kündigung|Widerrufsbelehrung|Folgen des Widerrufs|Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten)\s+(?=[A-ZÄÖÜ])/gm, '$1\n')
    .replace(/^(Kontakt:)\s+(.*)$/gm, '$1\n$2')
    .trim();

  if (source === 'Datenschutz.txt') {
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

  if (/(?:bestätigst du, dass:|Folgendes zu unterlassen:|Diese Daten sind:|folgende Rechte hinsichtlich|den folgenden Zweck|den folgenden Zwecken:|die folgenden in Betracht:|ergibt sich über die Einstellungen|nachdem du:)/i.test(line)) {
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
  if (line === 'Impressum') {
    const heading = document.createElement('h2');
    heading.textContent = line;
    return heading;
  }

  if (/^(Angaben gemäß § 5 DDG|Anbieter und Verantwortlicher für diese App:|EU-Streitbeilegung|Verbraucherstreitbeilegung \/ Universalschlichtungsstelle|Haftungsausschluss \(Disclaimer\)|Kontakt:)$/.test(line)) {
    const heading = document.createElement('h3');
    heading.textContent = line.replace(/:$/, '');
    return heading;
  }

  if (/^Kontakt:\s+/.test(line)) {
    const wrapper = document.createElement('div');
    wrapper.className = 'legal-impressum-block';

    const heading = document.createElement('h3');
    heading.textContent = 'Kontakt';
    wrapper.appendChild(heading);

    const paragraph = document.createElement('p');
    appendRichText(paragraph, line.replace(/^Kontakt:\s*/, ''));
    wrapper.appendChild(paragraph);
    return wrapper;
  }

  if (/^(Vasily Schob|Straße der Jugend 18|14974 Ludwigsfelde|Deutschland|Telefon:)/.test(line)) {
    const paragraph = document.createElement('p');
    paragraph.className = 'legal-impressum-meta';
    appendRichText(paragraph, line);
    return paragraph;
  }

  if (/^(Haftung für Inhalte|Haftung für Links)\b/.test(line)) {
    const wrapper = document.createElement('div');
    wrapper.className = 'legal-impressum-block';

    const match = line.match(/^(Haftung für Inhalte|Haftung für Links)\s+(.*)$/);
    if (match) {
      const heading = document.createElement('h3');
      heading.textContent = match[1];
      wrapper.appendChild(heading);

      const paragraph = document.createElement('p');
      appendRichText(paragraph, match[2]);
      wrapper.appendChild(paragraph);
      return wrapper;
    }
  }

  return null;
}

function createAgbNode(line) {
  const cleanLine = line.replace(/\.$/, '');

  if (/^(Preisgestaltung|Risiko des Verlustes|Automatische Verlängerung und Kündigung|Widerrufsbelehrung|Folgen des Widerrufs|Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten)$/.test(cleanLine)) {
    const heading = document.createElement('h4');
    heading.textContent = cleanLine;
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
