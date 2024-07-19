// Fetch the JSON data from the js folder and initialize the circle of fifths
fetch('js/data.json')
  .then(response => response.json())
  .then(circleOfFifthsData => {
    initializeCircleOfFifths(circleOfFifthsData);
  })
  .catch(error => console.error('Error fetching data:', error));

function initializeCircleOfFifths(circleOfFifthsData) {

  function createKeyButton(key) {
    const button = document.createElement('button');
    button.classList.add('m-2', 'p-2', 'bg-blue-500', 'text-white', 'rounded');
    button.innerText = key.name;
    button.onclick = () => displayKeyDetails(key);
    return button;
  }

  function displayKeyDetails(key) {
    document.getElementById('key-name').innerText = key.name;
    document.getElementById('key-notes').innerText = `Notes: ${key.notes.join(', ')}`;
    document.getElementById('key-signature').innerText = `Key Signature: ${key.key_signature}`;
    document.getElementById('relative-minor').innerText = `Relative Minor: ${key.relative_minor}`;
    document.getElementById('common-progressions').innerText = `Common Chord Progressions: ${key.common_chord_progressions.join(', ')}`;
    document.getElementById('modes').innerText = `Modes: ${Object.entries(key.modes).map(([mode, notes]) => `${mode}: ${notes.join(', ')}`).join(' | ')}`;
    document.getElementById('audio-sample').src = key.audio_sample;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const majorKeysContainer = document.getElementById('circle-of-fifths');
    console.log("majorKeysContainer: ");
    circleOfFifthsData.major_keys.forEach(key => {
      majorKeysContainer.appendChild(createKeyButton(key));
    });
  });
}