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
      legalContainer.appendChild(formatLegalText(text));
    })
    .catch(() => {
      legalContainer.innerHTML = '<p class="legal-error">Der Rechtstext konnte nicht geladen werden. Bitte prüfe, ob die zugehörige .txt-Datei im Repository liegt.</p>';
    });
}

function formatLegalText(text) {
  const wrapper = document.createElement('div');
  wrapper.className = 'legal-text';

  const normalized = text.replace(/\r/g, '').trim();
  const lines = normalized.split('\n');
  let list = null;
  let previousEndedWithColon = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      list = null;
      previousEndedWithColon = false;
      continue;
    }

    if (/^\d+\.\d+\.\s+/.test(trimmed)) {
      list = null;
      previousEndedWithColon = false;
      const heading = document.createElement('h3');
      heading.textContent = trimmed;
      wrapper.appendChild(heading);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      list = null;
      previousEndedWithColon = false;
      const heading = document.createElement('h2');
      heading.textContent = trimmed;
      wrapper.appendChild(heading);
      continue;
    }

    if (/^[\-•]/.test(trimmed) || shouldBecomeListItem(trimmed, previousEndedWithColon)) {
      if (!list) {
        list = document.createElement('ul');
        wrapper.appendChild(list);
      }
      const item = document.createElement('li');
      appendRichText(item, trimmed.replace(/^[\-•]\s*/, ''));
      list.appendChild(item);
      previousEndedWithColon = false;
      continue;
    }

    list = null;

    const paragraph = document.createElement('p');
    appendRichText(paragraph, trimmed);
    wrapper.appendChild(paragraph);
    previousEndedWithColon = trimmed.endsWith(':');
  }

  return wrapper;
}

function shouldBecomeListItem(line, previousEndedWithColon) {
  if (!previousEndedWithColon) {
    return false;
  }

  if (line.length > 220) {
    return false;
  }

  return /^[A-ZÄÖÜ0-9]/.test(line);
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
