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
  const blocks = normalized.split(/\n\s*\n/);
  let list = null;

  for (const block of blocks) {
    const trimmed = block.trim();

    if (!trimmed) {
      continue;
    }

    if (/^\d+(\.\d+)*\.?\s+/.test(trimmed)) {
      list = null;
      const heading = document.createElement('h2');
      heading.textContent = trimmed;
      wrapper.appendChild(heading);
      continue;
    }

    const lines = trimmed
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    for (const line of lines) {
      if (/^[\-•]/.test(line)) {
        if (!list) {
          list = document.createElement('ul');
          wrapper.appendChild(list);
        }
        const item = document.createElement('li');
        item.textContent = line.replace(/^[\-•]\s*/, '');
        list.appendChild(item);
      } else {
        list = null;
        const paragraph = document.createElement('p');
        paragraph.textContent = line;
        wrapper.appendChild(paragraph);
      }
    }
  }

  return wrapper;
}
