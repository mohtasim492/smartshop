
let bannerIndex = 0;
const banner = document.getElementById("banner");
const totalSlides = banner.children.length;
function showSlide() {
  banner.style.transform = `translateX(-${bannerIndex * 100}%)`;
}
document.getElementById("nextBtn").onclick = () => {
  bannerIndex = (bannerIndex + 1) % totalSlides;
  showSlide();
};
document.getElementById("prevBtn").onclick = () => {
  bannerIndex = (bannerIndex - 1 + totalSlides) % totalSlides;
  showSlide();
};
setInterval(() => {
  bannerIndex = (bannerIndex + 1) % totalSlides;
  showSlide();
}, 4000);


const productGrid = document.getElementById("productGrid");
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => displayProducts(data));

function displayProducts(products) {
  productGrid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";
    card.innerHTML = `
      <img src="${p.image}" class="w-full h-48 object-contain mb-3" alt="${p.title}">
      <h3 class="font-semibold mb-2">${p.title}</h3>
      <p class="text-gray-600 mb-2">$${p.price}</p>
      <button class="addCart bg-blue-600 text-white px-3 py-1 rounded">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}


document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(p => p.title.toLowerCase().includes(value));
      displayProducts(filtered);
    });
});


const reviewSlider = document.getElementById("reviewSlider");
fetch("reviews.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(r => {
      const div = document.createElement("div");
      div.className = "min-w-full p-6";
      div.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-semibold">${r.name}</h3>
          <p class="text-gray-600">"${r.comment}"</p>
          <p class="text-yellow-500 mt-2">Rating: ⭐ ${r.rating}</p>
          <p class="text-sm text-gray-400">${r.date}</p>
        </div>`;
      reviewSlider.appendChild(div);
    });
  });


const contactForm = document.getElementById("contactForm");
const thanksMsg = document.getElementById("thanksMsg");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  thanksMsg.classList.remove("hidden");
  contactForm.reset();
});


const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("hidden", window.scrollY < 200);
});
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
