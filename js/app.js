// script.js
document.addEventListener('DOMContentLoaded', () => {
  const circleContainer = document.getElementById('circle-of-fifths');
  const keyDetailsContainer = document.getElementById('key-details');

  async function fetchData() {
    const response = await fetch('js/data.json');
    const data = await response.json();
    return data.circle_of_fifths.major_keys;
  }

  function createKeyElement(key, index) {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key', 'absolute', 'flex', 'items-center', 'justify-center', 'bg-white', 'border', 'border-gray-700', 'rounded-full', 'cursor-pointer', 'transition-colors', 'hover:bg-gray-200', 'w-16', 'h-16');
    keyElement.innerText = key.name;
    const angle = (index / 12) * 360;
    keyElement.style.transform = `rotate(${angle}deg) translate(125px) rotate(-${angle}deg)`;
    keyElement.addEventListener('click', () => displayKeyDetails(key));
    return keyElement;
  }

  function displayKeyDetails(key) {
    keyDetailsContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">${key.name} Major</h2>
      <p><strong>Notes:</strong> ${key.notes.join(', ')}</p>
      <p><strong>Relative Minor:</strong> ${key.relative_minor}</p>
      <p><strong>Key Signature:</strong> ${key.key_signature}</p>
      <p><strong>Common Chord Progressions:</strong> ${key.common_chord_progressions.join(', ')}</p>
      <p><strong>Modes:</strong></p>
      <ul class="list-disc list-inside">
        ${Object.entries(key.modes).map(([mode, notes]) => `<li><strong>${mode}:</strong> ${notes.join(', ')}</li>`).join('')}
      </ul>
      <audio controls class="mt-4">
        <source src="${key.audio_sample}" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
    `;
  }

  fetchData().then(majorKeys => {
    majorKeys.forEach((key, index) => {
      const keyElement = createKeyElement(key, index);
      circleContainer.appendChild(keyElement);
    });

    // Initially display details of the first key
    displayKeyDetails(majorKeys[0]);
  });
});
