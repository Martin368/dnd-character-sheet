// Ikony
lucide.createIcons();

let isRevealed = false;
let isMusicPlaying = false;
let scIframe;

const tracks = {
  illusion: "audio/song1.mp3",
  truth: "audio/song2.mp3",
};
// --- Definicie dat ---

const featsAndSkills = {
  feats: [
    { name: "Arcana", desc: "Skill" },
    { name: "Magic Initiate (Druid)", desc: "Feat" },
    { name: "History", desc: "Skill" },
    { name: "Alert", desc: "Feat" },
    { name: "Investigation", desc: "Skill" },
  ],
};
const spellsAndCantrips = {
  cantrips: [
    { name: "Minor Illusion", school: "Illusion", desc: "Kto" },
    { name: "Mage Hand", school: "Conjuration", desc: "toto" },
    { name: "Ray of Frost", school: "Evocation", desc: "číta" },
    { name: "Druidcraft", school: "Transmutation", desc: "je" },
    { name: "Starry Wisp", school: "Illusion", desc: "gay" },
  ],
  spells: [
    { name: "Color Spray", level: 1, ritual: false },
    { name: "Comprehend Languages", level: 1, ritual: true },
    { name: "Find Familiar", level: 1, ritual: true },
    { name: "Cure Wounds", level: 1, ritual: false },
    { name: "Mage Armor", level: 1, ritual: false },
    { name: "Magic Missile", level: 1, ritual: false },
    { name: "Shield", level: 1, ritual: false },
    { name: "Silent Image", level: 1, ritual: false },
  ],
};

const publicPersona = {
  name: "Alexander Spinoza",
  title: "z Vyšných Ružbachov",
  theme: "illusion",
  quote:
    '"Šéfko, to je taký debil, to je taký debil!"\n - vrchný učeň Francius Dragonovský',
  // Identita
  race: "Human",
  class: "Wizard",
  level: "1",
  alignment: "True Neutral",
  // Koniec identity
  story: `
            <div class="p-4 rounded-lg bg-gray-900/50 border-l-4 border-blue-500">
                <h4 class="text-xl font-semibold mb-2 text-gray-200">Deklasifikované informácie</h4>
                <p class="text-base leading-relaxed mb-2">
                    Alexander pochádzal z Vyšných Ružbachov, a práve odtiaľ získal prezývku Vyšný, ktorá sa s ním niesla celý život. Bol nechcené dieťa, ktoré našiel a vychoval odľahlý kruh Druidov. Tí ho naučili základy prírodnej mágie, no jeho túžba po komplexnej a hlbšej moci čoskoro spôsobila nezhody.
                <p class="text-base leading-relaxed mb-2">
                    Kruh opustil a istý čas využíval svoje nadanie na zločin, pričom si uvedomil, že skutočná moc sveta spočíva v ovládaní myslí iných. Netrvalo dlho a našiel si cestu k záhadnému arcimágovi Lysandrovi, majstrovi ilúzií, ku ktorému sa pridal ako učeň.
                </p>
                <p class="text-base leading-relaxed">
                    Teraz slúži Lysandrovi a vydáva sa na misiu získať realitu ohýbajúci grimoár známy ako "Kniha nezvratných axióm" skôr než padne do nevhodných rúk.
                </p>
            </div>
        `,
  combatStats: [
    { label: "Armor Class", value: "13", sub: "", color: "text-blue-400" },
    { label: "Hit Points", value: "8", sub: "", color: "text-blue-400" },
    { label: "Initiative", value: "+5", sub: "", color: "text-blue-400" },
  ],
  abilityScores: { STR: 8, DEX: 16, CON: 14, INT: 17, WIS: 10, CHA: 8 },
  spellSlots: { level1: 3, note: "" },
  // --- VLASTNOSTI PRE ILLUSION ---
  ephemeralMechanics: {
    buff: {
      title: "Volatilná Energia",
      description:
        "Alexander môže usmerniť nestálu arkánnu energiu v jeho oklí, aby castol akýkoľvek spell, ktorý pozná, bez spotrebovania spell slotu.",
      cost: "Keď čaruje týmto spôsobom, Alexander okamžite dostane <strong>damage rovný trojnásobku úrovne kúzla</strong> ( 3 HP za level 1 spell).",
    },
    debuff: {
      title: "Obmedzené Liečenie",
      description:
        "Jeho telo odmieta obyčajné liečivá, nedokáže sa liečiť nemagickými prostriedkami",
      restriction:
        "Nepôsobia naňho liečivé elixíry. HP mu dokáže obnoviť iba magické liečenie alebo prirodzený odpočinok",
    },
  },
};

const truePersona = {
  name: "LYSANDER (KLON L-07)",
  title: "Tiež je z Ružbachov",
  theme: "truth",
  quote:
    '"Postrádateľný? Možno. No stále som stelesnenou vôľou arcimága Lysandra."',
  // Identita
  race: "Energetická Ilúzia",
  class: "Wizard",
  level: "1",
  alignment: "Neutral Evil ",
  // Koniec identity
  story: `
            <div class="p-4 rounded-lg border-l-4 covert-indicator border-red-500/70 bg-red-900/20">
                <h4 class="text-xl font-semibold mb-2 uppercase text-red-300">Pravda</h4>
                <p class="text-base leading-relaxed mb-2">
                    Alexander nie je učeň, ale dokonale vytvorený, mladší klon samotného paranoidného arcimága Lysandra. Je to Energetická Ilúzia navrhnutá pre maximálny efekt.
                </p>
                <p class="text-base leading-relaxed mb-2">
                    Lysander, nechcel riskovať svoj vlastný život, a tak vytvoril Alexandra ako ideálneho agenta pre túto misiu. Zachoval mu len útržky spomienok a zručnosti, ktoré považoval za nevyhnutné.
                </p>
                <p class="text-base leading-relaxed">
                    Postrádateľný, a predsa hnaný jedinou motiváciou: získať OP grimoár. Ak Alexander zlyhá, Lysander jednoducho aktivuje ďalšiu kópiu. Jeho život nemá hodnotu mimo úspechu misie.
                </p>
            </div>
        `,
  combatStats: [
    { label: "Armor Class", value: "13", sub: "", color: "text-red-400" },
    { label: "Hit Points", value: "8", sub: "", color: "text-red-400" },
    { label: "Initiative", value: "+5", sub: "", color: "text-red-400" },
  ],
  abilityScores: { STR: 8, DEX: 16, CON: 14, INT: 17, WIS: 10, CHA: 8 },
  spellSlots: { level1: 3, level2: 3, note: "" },
  // --- VLASTNOSTI PRE TRUTH (FIXED) ---
  ephemeralMechanics: {
    buff: {
      title: "Volatilná energia",
      description:
        "Alexander môže usmerniť nestálu arkánnu energiu, ktorá tvorí jeho telo, aby castol akýkoľvek spell, ktorý pozná, bez spotrebovania spell slotu.",
      cost: "Keď čaruje týmto spôsobom, Alexander okamžite dostane <strong>damage rovný trojnásobku úrovne kúzla</strong> ( 3 HP za level 1 spell).",
    },
    debuff: {
      title: "Obmedzené liečenie",
      description:
        "Jeho telo odmieta obyčajné liečivá, nedokáže sa liečiť nemagickými prostriedkami",
      restriction:
        "Nepôsobia naňho liečivé elixíry. HP mu dokáže obnoviť iba magické liečenie alebo prirodzený odpočinok",
    },
  },
};

window.toggleMusic = function () {
  const audio = document.getElementById("main-audio");
  if (isMusicPlaying) {
    audio.pause();
    isMusicPlaying = false;
  } else {
    audio.play().catch((e) => console.log("Interaction needed for play"));
    isMusicPlaying = true;
  }
  updateMusicUI();
};

function updateMusicUI() {
  const status = document.getElementById("music-status");
  const btn = document.getElementById("musicButton");
  if (isMusicPlaying) {
    status.innerText = "PLAYING";
    status.className = "text-xs italic text-green-400 hidden md:block";
    btn.innerHTML =
      '<i data-lucide="pause" class="w-3 h-3 text-white fill-white"></i>';
  } else {
    status.innerText = "PAUSED";
    status.className = "text-xs italic text-gray-500 hidden md:block";
    btn.innerHTML =
      '<i data-lucide="play" class="w-3 h-3 text-white fill-white"></i>';
  }
  lucide.createIcons();
}

// --- Rendrovanie vsetkeho ---

function renderIdentity(data) {
  const raceBox = document.getElementById("raceBox");
  const backgroundBox = document.getElementById("backgroundBox");
  const levelBox = document.getElementById("levelBox");
  const alignmentBox = document.getElementById("alignmentBox");
  const themeClass = isRevealed ? "text-glow-truth" : "text-glow-illusion";
  const borderColor = isRevealed ? "border-red-600" : "border-blue-600";
  const textColor = isRevealed ? "text-red-300" : "text-blue-300";
  const hoverColor = isRevealed
    ? "hover:border-red-400"
    : "hover:border-blue-400";

  raceBox.innerHTML = `
                <p class="text-xs uppercase tracking-wider stat-label mb-1">Race</p>
                <p class="text-2xl font-bold ${textColor} ${themeClass}">${data.race}</p>
            `;
  raceBox.className = `p-4 rounded-xl border-l-4 border-r-2 transition-all duration-500 bg-gray-900/40 text-center shadow-inner ${borderColor} ${hoverColor}`;

  backgroundBox.innerHTML = `
                <p class="text-xs uppercase tracking-wider stat-label mb-1">Class</p>
                <p class="text-2xl font-bold ${textColor} ${themeClass}">${data.class}</p>
            `;
  backgroundBox.className = `p-4 rounded-xl border-l-4 border-r-2 transition-all duration-500 bg-gray-900/40 text-center shadow-inner ${borderColor} ${hoverColor}`;
  levelBox.innerHTML = `
                <p class="text-xs uppercase tracking-wider stat-label mb-1">Level</p>
                <p class="text-2xl font-bold ${textColor} ${themeClass}">${data.level}</p>
            `;
  levelBox.className = `p-4 rounded-xl border-l-4 border-r-2 transition-all duration-500 bg-gray-900/40 text-center shadow-inner ${borderColor} ${hoverColor}`;
  alignmentBox.innerHTML = `
                <p class="text-xs uppercase tracking-wider stat-label mb-1">Alignment</p>
                <p class="text-2xl font-bold ${textColor} ${themeClass}">${data.alignment}</p>
            `;
  alignmentBox.className = `p-4 rounded-xl border-l-4 border-r-2 transition-all duration-500 bg-gray-900/40 text-center shadow-inner ${borderColor} ${hoverColor}`;
}

function renderAbilityScores(scores) {
  const container = document.querySelector("#statsSection .grid-cols-3");
  container.innerHTML = Object.entries(scores)
    .map(([key, value]) => {
      const modifier = Math.floor((value - 10) / 2);
      const modifierSign = modifier >= 0 ? "+" : "";
      const themeClass = isRevealed ? "glow-text-truth" : "glow-text-illusion";

      return `
                    <div class="p-2 rounded-lg border border-gray-800 bg-black/30">
                        <p class="stat-label text-xs uppercase">${key}</p>
                        <p class="text-2xl font-bold ${themeClass}">${value}</p>
                        <p class="text-sm text-gray-400">${modifierSign}${modifier}</p>
                    </div>
                `;
    })
    .join("");
}

function renderCombatStats(stats) {
  const container = document.querySelector("#statsSection .grid-cols-2");
  container.innerHTML = stats
    .map((stat) => {
      const themeClass = isRevealed ? "text-glow-truth" : "text-glow-illusion";
      const bgClass = isRevealed ? "bg-red-900/10" : "bg-blue-900/10";
      return `
                    <div class="p-3 rounded-lg border border-gray-900 ${bgClass}">
                        <p class="stat-label text-xs uppercase mb-1">${stat.label}</p>
                        <p class="text-2xl font-bold ${themeClass}">${stat.value}</p>
                        <p class="text-xs italic text-gray-500">${stat.sub}</p>
                    </div>
                `;
    })
    .join("");
}

function renderEphemeralMechanics(data) {
  const container = document.getElementById("buffDebuffContainer");
  const buffDebuffContent = data.ephemeralMechanics; // Get the specific mechanics from the persona object

  const buffTheme = isRevealed
    ? "border-green-400 bg-green-900/20"
    : "border-blue-600 bg-blue-900/10";
  const debuffTheme = isRevealed
    ? "border-red-400 bg-red-900/20"
    : "border-red-600 bg-red-900/10";
  const costTextColor = isRevealed ? "text-red-300" : "text-blue-300";
  const buffColor = isRevealed ? "text-green-300" : "text-blue-300";
  const debuffColor = isRevealed ? "text-red-300" : "text-red-300";

  container.innerHTML = `
                <div class="p-4 rounded-lg border-l-4 ${buffTheme} transition-colors duration-500 shadow-md">
                    <h4 class="text-xl font-semibold mb-1 ${buffColor}">${buffDebuffContent.buff.title}</h4>
                    <p class="text-sm italic text-gray-400 mb-2">${buffDebuffContent.buff.description}</p>
                    <div class="text-sm">
                        <strong class="${costTextColor}">Cena/Efekt:</strong> 
                        ${buffDebuffContent.buff.cost}
                    </div>
                </div>

                <div class="p-4 rounded-lg border-l-4 ${debuffTheme} transition-colors duration-500 shadow-md">
                    <h4 class="text-xl font-semibold mb-1 ${debuffColor}">${buffDebuffContent.debuff.title}</h4>
                    <p class="text-sm italic text-gray-400 mb-2">${buffDebuffContent.debuff.description}</p>
                    <div class="text-sm">
                        <strong class="${costTextColor}">Obmedzenie/Efekt:</strong> 
                        ${buffDebuffContent.debuff.restriction}
                    </div>
                </div>
            `;

  // Zabezpeci ze vsetko svieti jak ma
  const sectionHeader = document.querySelector("#ephemeralSection h3");
  const oppositeTheme = isRevealed ? "illusion" : "truth";
  const currentTheme = isRevealed ? "truth" : "illusion";

  sectionHeader.classList.remove(`glow-text-${oppositeTheme}`);
  sectionHeader.classList.add(`glow-text-${currentTheme}`);
}

function renderFeatsSkills(data) {
  const themeClass = isRevealed ? "text-glow-truth" : "text-glow-illusion";
  const currentThemeClass = isRevealed
    ? "glow-text-truth"
    : "glow-text-illusion";
  const defaultThemeClass = isRevealed
    ? "glow-text-illusion"
    : "glow-text-truth";

  const featContainer = document.getElementById("featsSkills");
  featContainer.innerHTML = data.feats
    .map(
      (feat) => `
                <div class="p-2 rounded bg-gray-900/30 border-l-4 border-gray-700 hover:border-blue-600 transition-colors">
                    <p class="font-semibold text-gray-100">${feat.name}</p>
                    <p class="text-xs italic text-gray-500">${feat.desc}</p>
                </div>
            `,
    )
    .join("");
}
function renderSpells(data, slots) {
  const themeClass = isRevealed ? "text-glow-truth" : "text-glow-illusion";
  const currentThemeClass = isRevealed
    ? "glow-text-truth"
    : "glow-text-illusion";
  const defaultThemeClass = isRevealed
    ? "glow-text-illusion"
    : "glow-text-truth";

  // 1. Rendruje Cantripy
  const cantripContainer = document.getElementById("cantripList");
  cantripContainer.innerHTML = data.cantrips
    .map(
      (cantrip) => `
                <div class="p-2 rounded bg-gray-900/30 border-l-4 border-gray-700 hover:border-blue-600 transition-colors">
                    <p class="font-semibold text-gray-100">${cantrip.name}</p>
                </div>
            `,
    )
    .join("");

  // 2. Rendruje spelly
  const spellContainer = document.getElementById("spellList");
  spellContainer.innerHTML = data.spells
    .map(
      (spell) => `
                <div class="p-2 rounded bg-gray-900/30 border-l-4 border-gray-700 hover:border-blue-600 transition-colors">
                    <p class="font-semibold text-gray-100">${spell.name} ${spell.ritual ? '<span class="text-xs italic text-blue-400">(R)</span>' : ""}</p>
                    <p class="text-xs italic text-gray-500">Level ${spell.level}</p>
                </div>
            `,
    )
    .join("");

  // 3. Rendruje Spell Sloty
  const slotContainer = document.getElementById("spellSlots");
  slotContainer.innerHTML = `
                <h4 class="text-lg font-semibold mb-2 text-white">Spell Slots</h4>
                <div class="flex flex-wrap gap-4 text-center">
                    <div class="p-3 rounded-lg border border-gray-700 bg-black/50 min-w-[6rem]">
                        <p class="stat-label text-xs uppercase">Level 1</p>
                        <p class="text-xl font-bold ${themeClass}">${slots.level1}</p>
                    </div>
                    
                </div>
                <p class="text-xs italic text-gray-500 mt-2">${slots.note}</p>
            `;

  // Vysvieti nadpis
  const magicHeaders = document.querySelectorAll(
    "#magicSection .glow-text-illusion, #magicSection .glow-text-truth",
  );
  magicHeaders.forEach((header) => {
    header.classList.remove(defaultThemeClass);
    header.classList.add(currentThemeClass);
  });
}

// --- Toggle pre pravdu/iluziu ---

window.toggleTruth = function () {
  isRevealed = !isRevealed;
  const data = isRevealed ? truePersona : publicPersona;
  const currentTheme = isRevealed ? "truth" : "illusion";
  const oppositeTheme = isRevealed ? "illusion" : "truth";

  // DOM (Document object model) Elementy
  const nameTitle = document.getElementById("charName");
  const charTitle = document.getElementById("charTitle");
  const quoteText = document.getElementById("quoteText");
  const eyeIcon = document.getElementById("eyeIcon");
  const storyContent = document.getElementById("storyContent");
  const toggleLabel = document.getElementById("toggleLabel");
  const dividers = document.querySelectorAll(".divider");
  const glowElements = document.querySelectorAll(`[class*="glow-text-"]`);

  const audio = document.getElementById("main-audio");
  const newTrack = isRevealed ? tracks.truth : tracks.illusion;

  // Update a Reload
  audio.src = newTrack;
  audio.load(); 

  
  if (isMusicPlaying) {
    audio.play();
  }

  // 1. Updatne header
  nameTitle.innerText = data.name;
  charTitle.innerText = data.title;
  quoteText.innerText = data.quote;
  storyContent.innerHTML = data.story;
  toggleLabel.innerText = isRevealed ? "Vyčaruj ilúziu" : "Zruš ilúziu";

  // 2. Updatne vsetko ostatne
  renderIdentity(data); // <-- Renderne novu identitu
  renderAbilityScores(data.abilityScores);
  renderCombatStats(data.combatStats);
  renderEphemeralMechanics(data);
  renderFeatsSkills(featsAndSkills);
  renderSpells(spellsAndCantrips, data.spellSlots);

  // 3. Zmeni podsvietenie z modrej na cervenu
  glowElements.forEach((el) => {
    el.classList.remove(`glow-text-${oppositeTheme}`);
    el.classList.add(`glow-text-${currentTheme}`);
  });

  dividers.forEach((div) => {
    const style = isRevealed ? "#cc0000" : "#004d99";
    div.style.background = `linear-gradient(to right, transparent, ${style}, transparent)`;
  });

  // Updatne farbu ikon
  eyeIcon.classList.remove("text-blue-500", "text-red-500");
  eyeIcon.classList.add(isRevealed ? "text-red-500" : "text-blue-500");

  document.getElementById("mainContainer").style.borderColor = isRevealed
    ? "#cc0000"
    : "#004d99";
  document.getElementById("mainContainer").style.boxShadow = isRevealed
    ? "0 0 15px rgba(255, 77, 77, 0.4), 0 0 40px rgba(0, 0, 0, 0.8)"
    : "0 0 15px rgba(0, 100, 255, 0.4), 0 0 40px rgba(0, 0, 0, 0.8)";

  quoteText.classList.remove("border-blue-700", "border-red-700");
  quoteText.classList.add(isRevealed ? "border-red-700" : "border-blue-700");
};

//
window.onload = function () {
  // pre istotu dvakrat, obcas blbne
  toggleTruth();
  isRevealed = true;
  toggleTruth();
  updateMusicUI();
};
