import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "MOUSE SMUSHER DELUXE 3D";
document.title = gameName;

interface Upgrade {
  name: string;
  cost: number;
  button: null | HTMLButtonElement;
  rateText: null | HTMLParagraphElement;
  purchasedText: null | HTMLSpanElement;
  costText: null | HTMLSpanElement;
  purchased: number;
  rate: number;
}

const upgrades: Upgrade[] = [
  {
    name: "Drinking Bird",
    cost: 10,
    button: null,
    rateText: null,
    purchasedText: null,
    costText: null,
    purchased: 0,
    rate: 0.1,
  },
  {
    name: "Meat Pounder",
    cost: 100,
    button: null,
    rateText: null,
    purchasedText: null,
    costText: null,
    purchased: 0,
    rate: 2,
  },
  {
    name: "Hydralic Press",
    cost: 1000,
    button: null,
    rateText: null,
    purchasedText: null,
    costText: null,
    purchased: 0,
    rate: 50,
  },
];

let bottomUpgradeContainer: HTMLDivElement;
let miceSmushButton: HTMLButtonElement;
let totalRate: HTMLHeadingElement;
let smushCounter: HTMLDivElement;

function SetupApp() {
  const header = document.createElement("div");
  header.setAttribute("id", "head");
  header.setAttribute(
    "style",
    "vertical-align: text-top;color:#6dd47b;font-size: 1em;text-align: center;font-style:italic;font-family:papyrus;",
  );
  document.body.prepend(header);
  const headerText = document.createElement("h1");
  headerText.innerHTML = gameName;
  header.append(headerText);

  const centerContainer = document.createElement("div");
  app.append(centerContainer);

  smushCounter = document.createElement("div");
  smushCounter.style.fontSize = "35px";
  smushCounter.innerHTML = "0";
  centerContainer.append(smushCounter);

  miceSmushButton = document.createElement("button");
  miceSmushButton.setAttribute("style", "width:150px;height:150px;");
  const miceText = document.createElement("h1");
  miceText.innerHTML = "🐁";
  miceText.setAttribute(
    "style",
    "text-align:center;font-size:100px;margin:-10px;",
  );
  miceSmushButton.append(miceText);
  app.append(miceSmushButton);

  totalRate = document.createElement("h3");
  totalRate.innerHTML = "0/sec";
  app.append(totalRate);

  bottomUpgradeContainer = document.createElement("div");
  bottomUpgradeContainer.setAttribute(
    "style",
    "position: absolute; bottom:5%;width:100%;display:flex; flex-wrap:wrap;justify-content:center;gap:10px;",
  );
  document.body.append(bottomUpgradeContainer);
}

function SetupUpgrades() {
  upgrades.forEach((upgrade) => {
    const box = document.createElement("div");
    box.setAttribute(
      "style",
      "text-align:center; flex; 2 2;transform:translateY(30%);",
    );

    const rateText = document.createElement("p");
    upgrade.rateText = rateText;
    rateText.textContent = "0/sec";
    rateText.setAttribute("style", "text-align:center;");
    box.append(rateText);

    const upgradeButton = document.createElement("button");
    upgrade.button = upgradeButton;
    upgradeButton.disabled = true;
    upgradeButton.innerHTML = upgrade.name;
    upgradeButton.setAttribute(
      "style",
      "text-align:left;font-size:23px;padding-right:60px;",
    );

    const cost = document.createElement("h3");
    cost.setAttribute(
      "style",
      "color:red;margin-top:-3px;margin-bottom:-3px;font-size:18px;",
    );
    const costText = document.createElement("span");

    costText.innerHTML = "$" + upgrade.cost.toString();
    upgrade.costText = costText;
    cost.append(costText);
    upgradeButton.append(cost);

    const rateAmount = document.createElement("span");
    rateAmount.innerHTML = "(" + upgrade.rate.toFixed(1) + "x)";
    rateAmount.setAttribute(
      "style",
      "margin-top:10px;margin-left:10px;color:gray;font-size:14px;",
    );
    cost.append(rateAmount);

    const amountPurchased = document.createElement("span");
    amountPurchased.innerHTML = "0";
    amountPurchased.setAttribute(
      "style",
      "color:white;float:right;margin-top:-15px;margin-right: -35px;",
    );
    upgrade.purchasedText = amountPurchased;
    cost.append(amountPurchased);
    box.append(upgradeButton);

    bottomUpgradeContainer.append(box);
  });

  // Set up upgrade features

  upgrades.forEach((upgrade) => {
    upgrade.button?.addEventListener("click", () => {
      totalSmushes -= upgrade.cost;
      upgrade.purchased++;
      if (upgrade.purchasedText)
        upgrade.purchasedText.innerHTML = upgrade.purchased.toFixed(0);
      if (upgrade.rateText)
        upgrade.rateText.innerHTML =
          (upgrade.rate * upgrade.purchased).toFixed(1) + "/sec";

      autoGrowth += upgrade.rate;
      totalRate.innerHTML = autoGrowth.toFixed(2) + "/sec";
      upgrade.cost *= 1.15;
      if (upgrade.costText)
        upgrade.costText.innerHTML = "$" + upgrade.cost.toFixed(1);
    });
  });
}

function incrementCounter(amount: number) {
  totalSmushes += amount;
  smushCounter.innerHTML = totalSmushes.toFixed(2);
}

function main() {
  SetupApp();
  SetupUpgrades();

  miceSmushButton.addEventListener("click", () => incrementCounter(1));

  requestAnimationFrame(update);
}

let totalSmushes: number = 0;
let autoGrowth: number = 0;
let lastTimestamp: number = 0;
function update(timestamp: number) {
  incrementCounter((autoGrowth * (timestamp - lastTimestamp)) / 1000);
  lastTimestamp = timestamp;
  UpdateUpgrades();
  requestAnimationFrame(update);
}

function UpdateUpgrades() {
  upgrades.forEach((upgrade) => {
    if (upgrade.button != null) {
      upgrade.button.disabled = totalSmushes < upgrade.cost;
    }
  });
}

main();
