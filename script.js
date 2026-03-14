const portfolioLayers = [
  {
    title: "About Me",
    text: "안녕하세요. 전통의 섬세함과 현대적인 감각을 함께 다루는 사람입니다. 보자기를 한 겹씩 펼치듯, 사용자에게 천천히 오래 남는 경험을 만드는 작업을 지향합니다."
  },
  {
    title: "Strength",
    text: "저의 강점은 차분한 관찰력, 정돈된 구성, 그리고 이야기를 시각적으로 풀어내는 감각입니다. 복잡한 내용도 부드럽고 이해하기 쉽게 전달하는 방식을 좋아합니다."
  },
  {
    title: "Works",
    text: "현재 전북대 소프트웨어공학과 2학년에 재학 중이며, 임베디드와 AI 분야에 대한 관심이 많습니다. 기술을 깊이 이해하고 실제로 구현해보는 과정을 좋아하며, 앞으로도 해당 분야를 중심으로 경험을 넓혀가고 싶습니다."
  },
  {
    title: "Contact",
    text: "kimmiso2493@naver.com / 협업 및 관련 프로젝트 제안은 언제든 환영입니다."
  }
];

const worksItems = {
  hackathon: {
    title: "2025학년도 학과 동아리 AM:PM 해커톤 참여",
    page: "file:///C:/Users/USER/Desktop/%ED%95%99%EA%B5%90/2025%20%EA%B8%B0%ED%83%80/2025%20ampm%20%EA%B3%BC%EB%8F%99%EC%95%84%EB%A6%AC/%ED%95%B4%EC%BB%A4%ED%86%A4/%ED%95%B4%EC%BB%A4%ED%86%A4%20%ED%95%A9%EC%B9%98%EA%B8%B0%20%EB%B2%84%EC%A0%84%20%EC%B5%9C%EC%A2%85/index.html"
  },
  "portfolio-award": {
    title: "교내 2025 SW융합 포트폴리오 공모전 우수상 수상",
    image: "award-portfolio.jpg"
  },
  "grade-award": {
    title: "2025-2학기 성적 우수 총장상 수상",
    image: "award-president.jpg"
  },
  "roadmap-award": {
    title: "교내 2025 전공 진로 탐색 로드맵 공모전 장려상 수상",
    image: "award-roadmap.jpg"
  }
};

const knotButton = document.getElementById("knotButton");
const cardStack = document.getElementById("cardStack");
const cardTemplate = document.getElementById("cardTemplate");
const heroImage = document.getElementById("heroImage");
const heroHint = document.getElementById("heroHint");
const worksStage = document.getElementById("worksStage");
const closeWorksButton = document.getElementById("closeWorksButton");
const worksViewer = document.getElementById("worksViewer");
const closeViewerButton = document.getElementById("closeViewerButton");
const viewerTitle = document.getElementById("viewerTitle");
const viewerContent = document.getElementById("viewerContent");
const workHotspots = document.querySelectorAll(".works-hotspot");
const worksNavLink = document.getElementById("worksNavLink");

let revealedCount = 0;
let portfolioState = "intro";

function createCards() {
  portfolioLayers.forEach((layer, index) => {
    const cardFragment = cardTemplate.content.cloneNode(true);
    const card = cardFragment.querySelector(".info-card");

    card.querySelector(".card-order").textContent = `0${index + 1}`;
    card.querySelector(".card-title").textContent = layer.title;
    card.querySelector(".card-text").textContent = layer.text;

    cardStack.appendChild(cardFragment);
  });
}

function showWorksStage() {
  worksStage.classList.add("is-active");
  worksStage.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-overlay-open");
}

function hideWorksStage() {
  worksStage.classList.remove("is-active");
  worksStage.setAttribute("aria-hidden", "true");
  if (!worksViewer.classList.contains("is-active")) {
    document.body.classList.remove("is-overlay-open");
  }
}

function openViewer(item) {
  viewerTitle.textContent = item.title;

  if (item.image) {
    viewerContent.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
  } else {
    viewerContent.innerHTML = '<p class="viewer__placeholder">이 항목은 이미지 파일이 아직 지정되지 않았습니다. 나중에 파일명을 연결하면 이 자리에서 바로 열립니다.</p>';
  }

  worksViewer.classList.add("is-active");
  worksViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-overlay-open");
}

function closeViewer() {
  worksViewer.classList.remove("is-active");
  worksViewer.setAttribute("aria-hidden", "true");
  if (!worksStage.classList.contains("is-active")) {
    document.body.classList.remove("is-overlay-open");
  }
}

function revealNextCard() {
  const cards = cardStack.querySelectorAll(".info-card");

  if (portfolioState === "intro") {
    heroImage.src = "bojagi-knot-1.jpg";
    heroHint.textContent = "이제 보자기 매듭을 다시 클릭하면 소개 카드가 펼쳐집니다.";
    portfolioState = "cards";
    return;
  }

  if (portfolioState === "completed") {
    showWorksStage();
    portfolioState = "works";
    return;
  }

  if (portfolioState === "works") {
    showWorksStage();
    return;
  }

  if (revealedCount >= cards.length) {
    knotButton.classList.add("is-finished");
    knotButton.setAttribute("aria-label", "보자기를 한 번 더 클릭하면 Works 화면으로 이동합니다");
    heroImage.src = "bojagi-end.jpg";
    heroHint.textContent = "모든 소개가 펼쳐졌습니다. 보자기를 한 번 더 클릭하면 Works 화면으로 이동합니다.";
    portfolioState = "completed";
    return;
  }

  const nextCard = cards[revealedCount];

  nextCard.hidden = false;
  requestAnimationFrame(() => {
    nextCard.classList.add("is-visible");
  });

  revealedCount += 1;
  nextCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

  if (revealedCount === cards.length) {
    knotButton.classList.add("is-finished");
    knotButton.setAttribute("aria-label", "보자기를 한 번 더 클릭하면 Works 화면으로 이동합니다");
    heroImage.src = "bojagi-end.jpg";
    heroHint.textContent = "모든 소개가 펼쳐졌습니다. 보자기를 한 번 더 클릭하면 Works 화면으로 이동합니다.";
    portfolioState = "completed";
  }
}

function handleHotspotClick(event) {
  const workId = event.currentTarget.dataset.workId;
  const selectedItem = worksItems[workId];

  if (!selectedItem) {
    return;
  }

  if (selectedItem.page) {
    window.open(selectedItem.page, "_blank", "noopener");
    return;
  }

  openViewer(selectedItem);
}

createCards();
knotButton.addEventListener("click", revealNextCard);
closeWorksButton.addEventListener("click", hideWorksStage);
closeViewerButton.addEventListener("click", closeViewer);
worksViewer.addEventListener("click", (event) => {
  if (event.target.dataset.closeViewer === "true") {
    closeViewer();
  }
});
workHotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", handleHotspotClick);
});
if (worksNavLink) {
  worksNavLink.addEventListener("click", (event) => {
    event.preventDefault();
    showWorksStage();
  });
}
