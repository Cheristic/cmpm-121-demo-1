import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "My freaking sweet lil game";
document.title = gameName;

const header = document.createElement("div");
header.setAttribute("id", "head");
header.setAttribute(
  "style",
  "vertical-align: text-top;font-size: 1em;text-align: center;",
);
document.body.prepend(header);
const headerText = document.createElement("h1");
headerText.innerHTML = gameName;
header.append(headerText);

const centerContainer = document.createElement("div");
app.append(centerContainer);
const smushCounter = document.createElement("div");
smushCounter.style.fontSize = "35px";
smushCounter.innerHTML = "0";
centerContainer.append(smushCounter);

app.append(document.createElement("br"));

const miceSmushButton = document.createElement("button");
miceSmushButton.innerHTML = "Smush a mouse 🐁";
app.append(miceSmushButton);

app.append(document.createElement("br"));
app.append(document.createElement("br"));

const bottomUpgradeContainer = document.createElement("div");
bottomUpgradeContainer.setAttribute(
  "style",
  "height: 200px; position: fixed; bottom:2%;width:100%;display:flex; flex-wrap:wrap;justify-content:center;",
);
document.body.append(bottomUpgradeContainer);

interface Upgrade {
  name: string;
  cost: number;
  button: null | HTMLButtonElement;
  rateText: null | HTMLParagraphElement;
  purchased: number;
  rate: number;
}

const upgrades: Upgrade[] = [
  {
    name: "Auto-Pounder",
    cost: 10,
    button: null,
    rateText: null,
    purchased: 0,
    rate: 0.1,
  },
  {
    name: "Auto-Pounder",
    cost: 10,
    button: null,
    rateText: null,
    purchased: 0,
    rate: 0.1,
  },
];

upgrades.forEach((upgrade) => {
  const box = document.createElement("div");
  box.setAttribute(
    "style",
    "text-align:center; flex; 2 2;transform:translateY(30%);",
  );

  const rateText = document.createElement("p");
  upgrade.rateText = rateText;
  rateText.textContent = "0/sec";
  box.append(rateText);

  const upgradeButton = document.createElement("button");
  upgrade.button = upgradeButton;
  upgradeButton.disabled = true;
  upgradeButton.innerHTML = upgrade.name;
  upgradeButton.setAttribute("style", "text-align:left;font-size:23px;");
  const cost = document.createElement("h3");
  cost.setAttribute(
    "style",
    "color:red;margin-top:-3px;margin-bottom:-3px;font-size:18px",
  );
  cost.innerHTML = "Buy for " + upgrade.cost.toString();
  upgradeButton.append(cost);
  box.append(upgradeButton);

  bottomUpgradeContainer.append(box);
});

let counter: number = 0;

function incrementCounter(amount: number) {
  counter += amount;
  smushCounter.innerHTML = counter.toFixed(2);
}
miceSmushButton.addEventListener("click", () => incrementCounter(1));

requestAnimationFrame(update);
//requestAnimationFrame(checkForUpgradeOne);

const growthRate = 0;

let lastTimestamp: number = 0;
function update(timestamp: number) {
  incrementCounter((growthRate * (timestamp - lastTimestamp)) / 1000);
  lastTimestamp = timestamp;
  requestAnimationFrame(update);
}

// function checkForUpgradeOne() {
//   if (counter >= 10) {
//     upgradeOneButton.disabled = false;
//   } else requestAnimationFrame(checkForUpgradeOne);
// }
// upgradeOneButton.addEventListener("click", () => {
//   counter -= 10;
//   growthRate++;
//   if (counter < 10) {
//     upgradeOneButton.disabled = true;
//     requestAnimationFrame(checkForUpgradeOne);
//   }
//   upgradeOneAmount.textContent = `AUTO-POUNDER x${growthRate}`;
// });
