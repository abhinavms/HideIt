function updateUI(restoredSettings) {
  document.getElementById("peopleAskSection").checked = restoredSettings.hidePeopleAlsoAsk;
}

function onError(e) {
  console.error(e);
}

browser.storage.local.get().then(updateUI, onError);

function changeValue() {
  browser.storage.local.set({ hidePeopleAlsoAsk: this.checked });
  console.log("Updated Value : " + this.checked);
}

const peopleAlsoAskToggle = document.getElementById("peopleAskSection").addEventListener("change", changeValue);
