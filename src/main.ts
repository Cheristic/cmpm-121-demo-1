import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My freaking sweet lil game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const miceSmushButton = document.createElement("button");
miceSmushButton.innerHTML = "Smush a mouse 🐁";
app.append(miceSmushButton);

const smushCounter = document.createElement("div");
smushCounter.style.fontSize = "35px";
const counter: number = 0;
smushCounter.innerHTML = counter.toString();
app.append(smushCounter);
