let hidePeopleAlsoAsk = false;

browser.runtime.onInstalled.addListener(() => {
  console.log("onInstalled...");
  browser.storage.local.set({
    hidePeopleAlsoAsk: hidePeopleAlsoAsk,
  });
});


browser.storage.local.get((data) => {
  if (data.hidePeopleAlsoAsk) {
    hidePeopleAlsoAsk = data.hidePeopleAlsoAsk;
  }
});

function peopleAlsoAskCode(){
  const display = hidePeopleAlsoAsk ? "none" : "block";
  return `if (window.location.hostname.indexOf("google") > -1 && window.location.pathname.indexOf("/search") > -1) {
            let el = document.evaluate('//span[text()="People also ask"]/../..', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            Object.assign(el.style, {display: '${display}'});
          }`
}

function executeScript() {
  function onExecuted(result) {
    console.log("Toggled");
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  const executing = browser.tabs.executeScript({
    code: peopleAlsoAskCode()
  });

  executing.then(onExecuted, onError);
}

browser.storage.onChanged.addListener((changeData) => {
  console.log("Storage Changed : ", changeData.hidePeopleAlsoAsk);
  hidePeopleAlsoAsk = changeData.hidePeopleAlsoAsk.newValue;
  executeScript();
});

browser.tabs.onUpdated.addListener(executeScript);