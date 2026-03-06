const words = ["Web-Developer.", "Designer."];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;

const typingElement = document.getElementById("typing");

function type() {
  currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, letterIndex--);
  } else {
    typingElement.textContent = currentWord.substring(0, letterIndex++);
  }

  if (!isDeleting && letterIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// Обработчик для кнопки "Weiter"
const weiterBtn = document.getElementById("weiter-btn");
if (weiterBtn) {
  weiterBtn.addEventListener("click", function() {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const tabs = document.querySelectorAll(".tab");
const blocks = document.querySelectorAll(".icons");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    blocks.forEach(b => b.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});


const aboutSection = document.querySelector(".about");


aboutSection.addEventListener("mousemove", (e) => {
  const rect = aboutSection.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const moveX = (x - rect.width / 2) / 10;
  const moveY = (y - rect.height / 2) / 10;

  aboutSection.style.setProperty(
    "--move",
    `translate(${moveX}px, ${moveY}px)`
  );
});



const sprachenBlock = document.getElementById("sprachen");

document.querySelector('[data-tab="sprachen"]')
  ?.addEventListener("click", () => {

    const bars = sprachenBlock.querySelectorAll(".progress");

    bars.forEach(bar => {
      const width = bar.getAttribute("data-width");
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    });

});


document.querySelectorAll(".flip-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".projekt_card").classList.toggle("flipped");
  });
});

const aboutContainer = document.querySelector(".about_container")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add("show")
}
})

},{ threshold:0.3 })

observer.observe(aboutContainer)

const projectsContainer = document.querySelector(".projekte_container")

const projectsObserver = new IntersectionObserver(entries => {

entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show")
projectsObserver.unobserve(entry.target)
}
})

},{threshold:0.3})

projectsObserver.observe(projectsContainer)