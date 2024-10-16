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
  currentRateText: null | HTMLSpanElement;
  description: string;
}
// store upgrades as an array
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
    currentRateText: null,
    description: "lightly taps your mouse with love",
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
    currentRateText: null,
    description: "pulverizes your mouse into a thin flat plane",
  },
  {
    name: "The Weight of the World",
    cost: 500,
    button: null,
    rateText: null,
    purchasedText: null,
    costText: null,
    purchased: 0,
    rate: 0,
    currentRateText: null,
    description: "all your efforts become once more",
  },
  {
    name: "Hydraulic Press",
    cost: 1000,
    button: null,
    rateText: null,
    purchasedText: null,
    costText: null,
    purchased: 0,
    rate: 50,
    currentRateText: null,
    description: "the force of a thousand youtube videos",
  },
  {
    name: "Yo Mamma",
    cost: 2500,
    button: null,
    rateText: null,
    purchasedText: null,
    costText: null,
    purchased: 0,
    rate: 200,
    currentRateText: null,
    description: "so fat haha",
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
    "vertical-align: text-top;-webkit-text-stroke: 2px #aaa676;color:#2f2d12;font-size: 1em;text-shadow: 0px 4.5px 4px #36301f;text-align: center;font-style:italic;font-family:papyrus;",
  );
  document.body.prepend(header);
  const headerText = document.createElement("h1");
  headerText.innerHTML = gameName;
  headerText.setAttribute("style", "margin-top: 0px; padding-top: 20px;");
  header.append(headerText);

  const centerContainer = document.createElement("div");
  centerContainer.setAttribute("style", "margin-top:-100px;");
  app.append(centerContainer);

  smushCounter = document.createElement("h1");
  smushCounter.setAttribute(
    "style",
    "color:#bfabac; font-size: 70px;-webkit-text-stroke: 2px #453634;margin-bottom:-40px;text-shadow: 0px 2px 4px #1e1e1e;",
  );
  smushCounter.innerHTML = "0";
  centerContainer.append(smushCounter);

  const smushText = document.createElement("h3");
  smushText.setAttribute(
    "style",
    "color:#bfabac; font-size: 40px;-webkit-text-stroke: 2px #453634;margin-bottom:70px;text-shadow: 0px 2px 4px #1e1e1e;",
  );
  smushText.innerHTML = "smushes";
  centerContainer.append(smushText);

  miceSmushButton = document.createElement("button");
  miceSmushButton.setAttribute(
    "style",
    "width:150px;height:150px;box-shadow: 0px 2px 4px #1e1e1e;",
  );
  const miceText = document.createElement("h1");
  miceText.innerHTML = "🐁";
  miceText.setAttribute(
    "style",
    "text-align:center;font-size:100px;margin:-10px;",
  );
  miceSmushButton.append(miceText);
  app.append(miceSmushButton);

  totalRate = document.createElement("h2");
  totalRate.innerHTML = "0/sec";
  totalRate.setAttribute(
    "style",
    "margin-top:1px;color:#d7aaa6;-webkit-text-stroke: .5px #453634;text-shadow: 0px 2px 4px #1e1e1e;",
  );
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
      "text-align:center; flex; 2 2;transform:translateY(30%);margin-top:-30px;margin-bottom:5px;",
    );

    const rateText = document.createElement("p");
    upgrade.rateText = rateText;
    rateText.textContent = "0/sec";
    rateText.setAttribute(
      "style",
      "font-size: 25px;margin-bottom:0px;text-align:center;color:#d7aaa6;-webkit-text-stroke: .5px #453634;text-shadow: 0px 2px 4px #1e1e1e;",
    );
    box.append(rateText);

    const upgradeButton = document.createElement("button");
    upgrade.button = upgradeButton;
    upgradeButton.disabled = true;
    upgradeButton.innerHTML = upgrade.name;
    upgradeButton.setAttribute(
      "style",
      "text-align:left;font-size:23px;padding-right:60px;;box-shadow: 0px 2px 4px #575757;",
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
    upgrade.currentRateText = rateAmount;
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

    const tooltip = document.createElement("p");
    tooltip.innerHTML = upgrade.description;
    tooltip.setAttribute(
      "style",
      "margin-top:0px;margin-left:0px;color:gray;font-size:12px;margin-bottom:0px;font-style:italic",
    );
    upgradeButton.append(tooltip);

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
      if (upgrade.costText) {
        if (upgrade.button.disabled)
          upgrade.costText.setAttribute("style", "color:red");
        else upgrade.costText.setAttribute("style", "color:green");
      }
    }
  });
  upgrades[2].rate = autoGrowth;
  if (upgrades[2].currentRateText)
    upgrades[2].currentRateText.innerHTML = "(" + autoGrowth.toFixed(1) + "x)";
}

main();
