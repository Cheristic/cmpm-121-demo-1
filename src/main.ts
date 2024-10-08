import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My freaking sweet lil game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const smushCounter = document.createElement("div");
smushCounter.style.fontSize = "35px";
smushCounter.innerHTML = "0";
app.append(smushCounter);

app.append(document.createElement("br"));

const miceSmushButton = document.createElement("button");
miceSmushButton.innerHTML = "Smush a mouse 🐁";
app.append(miceSmushButton);

app.append(document.createElement("br"));
app.append(document.createElement("br"));

const upgradeOneButton = document.createElement("button");
upgradeOneButton.innerHTML = "Purchase auto-pounder";
upgradeOneButton.disabled = true;
app.append(upgradeOneButton);

const upgradeOneAmount = document.createElement("p");
app.append(upgradeOneAmount);

let counter: number = 0;

function incrementCounter(amount: number) {
  counter += amount;
  smushCounter.innerHTML = counter.toFixed(2);
}
miceSmushButton.addEventListener("click", () => incrementCounter(1));

requestAnimationFrame(update);
requestAnimationFrame(checkForUpgradeOne);

let growthRate = 0;

let lastTimestamp: number = 0;
function update(timestamp: number) {
  incrementCounter((growthRate * (timestamp - lastTimestamp)) / 1000);
  lastTimestamp = timestamp;
  requestAnimationFrame(update);
}

function checkForUpgradeOne() {
  if (counter >= 10) {
    upgradeOneButton.disabled = false;
  } else requestAnimationFrame(checkForUpgradeOne);
}
upgradeOneButton.addEventListener("click", () => {
  counter -= 10;
  growthRate++;
  if (counter < 10) {
    upgradeOneButton.disabled = true;
    requestAnimationFrame(checkForUpgradeOne);
  }
  upgradeOneAmount.textContent = `AUTO-POUNDER x${growthRate}`;
});
