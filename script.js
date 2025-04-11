const source = document.getElementById('source');
const typewriter = document.getElementById('typewriter');

const nodes = Array.from(source.childNodes);
let queue = [];

nodes.forEach(node => {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent.split('').forEach(char => {
      queue.push({ type: 'text', char });
    });
  } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
    const href = node.getAttribute('href');
    const target = node.getAttribute('target');
    const link = document.createElement('a');
    link.href = href;
    link.target = target;

    const linkChars = node.textContent.split('');
    linkChars.forEach((char, index) => {
      queue.push({
        type: 'link',
        char,
        element: link,
        isFirst: index === 0
      });
    });
  }
});

let i = 0;
let currentLink = null;

function typeNextChar() {
  if (i >= queue.length) return;

  const item = queue[i];

  if (item.type === 'text') {
    typewriter.append(item.char);
  } else if (item.type === 'link') {
    if (item.isFirst) {
      currentLink = item.element.cloneNode();
      currentLink.textContent = item.char;
      typewriter.appendChild(currentLink);
    } else {
      currentLink.textContent += item.char;
    }
  }

  i++;
  setTimeout(typeNextChar, 20);
}

typeNextChar();
