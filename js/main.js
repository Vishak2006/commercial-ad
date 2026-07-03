/* ===== BOLD & BRIGHT � MAIN JS ===== */
"use strict";

/* --- CONFIG --- */
const openWA=(msg)=>{const m=msg||WA_MSG;window.open(`https://wa.me/${WA}?text=${m}`,"_blank")};
function filterCat(c){document.querySelector("#categories").scrollIntoView({behavior:"smooth"});setTimeout(()=>{document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));renderProducts(c);},400);}
function newsletterSubmit(e){e.preventDefault();alert("Thank you! You have subscribed successfully. ?");e.target.reset();}

/* --- LOADER --- */
window.addEventListener("load",()=>{setTimeout(()=>{const l=document.getElementById("loader");l.style.opacity="0";l.style.transition="opacity .6s";setTimeout(()=>l.remove(),600);},2200);});


/* --- NAVBAR SCROLL --- */
window.addEventListener("scroll",()=>{const nav=document.getElementById("navbar");if(window.scrollY>80)nav.classList.add("scrolled");else nav.classList.remove("scrolled");const bt=document.getElementById("back-top");if(window.scrollY>400)bt.classList.add("visible");else bt.classList.remove("visible");});
document.getElementById("back-top")?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

/* --- HAMBURGER --- */
const ham=document.getElementById("hamburger"),nl=document.getElementById("nav-links");
ham?.addEventListener("click",()=>{nl.classList.toggle("open");ham.classList.toggle("open");});
nl?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nl.classList.remove("open");ham.classList.remove("open");}));

/* --- SEARCH TOGGLE --- */
document.getElementById("search-toggle")?.addEventListener("click",()=>{document.getElementById("search-bar").classList.toggle("hidden");});


/* --- PARTICLES --- */
(function initParticles(){const canvas=document.getElementById("particle-canvas");if(!canvas)return;const ctx=canvas.getContext("2d");let W,H,particles=[];function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}resize();window.addEventListener("resize",resize);
class Particle{constructor(){this.reset();}reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.size=Math.random()*2.5+.5;this.speedX=(Math.random()-.5)*.4;this.speedY=(Math.random()-.5)*.4;this.opacity=Math.random()*.7+.1;this.pulse=Math.random()*Math.PI*2;}update(){this.x+=this.speedX;this.y+=this.speedY;this.pulse+=.02;this.opacity=(.4+Math.sin(this.pulse)*.3);if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();}draw(){ctx.save();ctx.globalAlpha=this.opacity;ctx.fillStyle=`hsl(${42+Math.sin(this.pulse)*10},70%,60%)`;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();ctx.restore();}}
for(let i=0;i<100;i++)particles.push(new Particle());
function animate(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}animate();})();

/* --- AOS SCROLL REVEAL --- */
(function initAOS(){const els=document.querySelectorAll("[data-aos]");const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("aos-animate");});},{threshold:.12,rootMargin:"0px 0px -50px 0px"});els.forEach((el,i)=>{el.style.transitionDelay=`${(i%4)*.1}s`;obs.observe(el);});})();

/* --- CONTACT FILL --- */
(function fillContact(){const s=STORE;if(document.getElementById("c-address"))document.getElementById("c-address").textContent=s.address;if(document.getElementById("c-phone"))document.getElementById("c-phone").textContent=s.phone;if(document.getElementById("c-wa"))document.getElementById("c-wa").textContent=s.phone;document.getElementById("c-hw").textContent=s.hoursWeek;document.getElementById("c-hs").textContent=s.hoursSun;const ig=document.getElementById("c-ig");if(ig)ig.href=s.ig;const fb=document.getElementById("c-fb");if(fb)fb.href=s.fb;})();

/* --- COUNTERS --- */
(function initCounters(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;const target=+el.dataset.target;let count=0;const step=Math.ceil(target/80);const timer=setInterval(()=>{count+=step;if(count>=target){el.textContent=target.toLocaleString();clearInterval(timer);}else el.textContent=count.toLocaleString();},20);obs.unobserve(el);});},{threshold:.5});document.querySelectorAll(".counter").forEach(el=>obs.observe(el));})();

/* --- CATEGORY CLICK --- */
document.querySelectorAll(".cat-card").forEach(card=>{card.addEventListener("click",()=>{const cat=card.dataset.cat;document.querySelectorAll(".cat-card").forEach(c=>c.classList.remove("active"));card.classList.add("active");currentCat=cat;currentTab="all";renderProducts(cat,getSearchVal(),getPriceRange(),getSort());document.getElementById("products").scrollIntoView({behavior:"smooth"});});});

/* --- PRODUCT RENDERING --- */
let visibleCount=8,currentTab="all",currentCat="",currentSearch="";

function stars(n){return "?".repeat(n)+"?".repeat(5-n);}
function pct(p,w){return Math.round((w-p)/w*100);}
function badgeClass(b){return b?"badge-"+b:"";}
function badgeLabel(b){const m={bestseller:"Best Seller",new:"New",trending:"Trending",featured:"Featured",soldout:"Sold Out",lowstock:"Low Stock"};return m[b]||"";}
function getSearchVal(){return (document.getElementById("search-input")?.value||"").toLowerCase();}
function getPriceRange(){const v=(document.getElementById("price-filter")?.value||"");if(!v)return null;const[mn,mx]=v.split("-").map(Number);return{min:mn,max:mx};}
function getSort(){return document.getElementById("sort-filter")?.value||"newest";}

function filterProducts(cat,search,price,sort){
  let arr=[...P];
  if(cat)arr=arr.filter(p=>p.cat===cat);
  if(search)arr=arr.filter(p=>p.name.toLowerCase().includes(search)||p.desc.toLowerCase().includes(search)||p.cat.includes(search));
  if(price)arr=arr.filter(p=>p.price>=price.min&&p.price<=price.max);
  if(sort==="popular")arr.sort((a,b)=>b.rev-a.rev);
  else if(sort==="low")arr.sort((a,b)=>a.price-b.price);
  else if(sort==="high")arr.sort((a,b)=>b.price-a.price);
  return arr;
}

function renderProducts(cat,search,price,sort){
  cat=cat!==undefined?cat:currentCat;
  search=search!==undefined?search:getSearchVal();
  price=price!==undefined?price:getPriceRange();
  sort=sort!==undefined?sort:getSort();
  currentCat=cat;
  const grid=document.getElementById("product-grid");
  if(!grid)return;
  let arr=filterProducts(cat,search,price,sort);
  const tab=currentTab;
  if(tab!=="all")arr=arr.filter(p=>p.badge===tab);
  const slice=arr.slice(0,visibleCount);
  grid.innerHTML=slice.map(p=>productCard(p)).join("");if(window.VanillaTilt){VanillaTilt.init(document.querySelectorAll(".product-card"),{max:25,speed:400,scale:1.05});}
  document.getElementById("load-more").style.display=arr.length>visibleCount?"inline-flex":"none";
  attachCardEvents();
}

function productCard(p){
    const save=pct(p.price,p.was);
  const stockClass=p.stock==="In Stock"?"in":p.stock==="Low Stock"?"low":"out";
  return `<div class="product-card" data-id="${p.id}">
    <div class="card-img-wrap">
      ${p.badge?`<span class="card-badge ${badgeClass(p.badge)}">${badgeLabel(p.badge)}</span>`:""}
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='images/placeholder.png'"/>
      <div class="card-actions">
        <button class="card-action-btn quick-view-btn" data-id="${p.id}" title="Quick View"><i class="fas fa-eye"></i></button>
        <button class="card-action-btn share-btn" data-id="${p.id}" title="Share"><i class="fas fa-share-nodes"></i></button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-stars">${stars(p.stars)} <small style="color:var(--gray);font-size:.7rem">(${p.rev})</small></div>
      <div class="card-name">${p.name}</div>
      <div class="card-desc">${p.desc}</div>
            <button class="card-wa-btn" onclick="orderWA(${p.id})"><i class="fab fa-whatsapp"></i> Order on WhatsApp</button>
    </div>
  </div>`;
}

/* --- CARD EVENTS --- */
function attachCardEvents(){
  document.querySelectorAll(".quick-view-btn").forEach(btn=>{btn.addEventListener("click",e=>{e.stopPropagation();openPopup(+btn.dataset.id);});});
  document.querySelectorAll(".product-card").forEach(card=>{card.addEventListener("click",()=>openPopup(+card.dataset.id));});
  document.querySelectorAll(".share-btn").forEach(btn=>{btn.addEventListener("click",e=>{e.stopPropagation();const id=+btn.dataset.id;const p=P.find(x=>x.id===id);if(navigator.share){navigator.share({title:p.name,text:p.desc,url:window.location.href});}else{navigator.clipboard.writeText(window.location.href);alert("Link copied!");}});});
}

document.getElementById("wl-close")?.addEventListener("click",()=>document.getElementById("wishlist-panel").classList.add("hidden"));

/* --- PRODUCT POPUP --- */
function openPopup(id){
  const p=P.find(x=>x.id===id);if(!p)return;
  const overlay=document.getElementById("popup-overlay");
  const inner=document.getElementById("popup-inner");
  const related=P.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,3);
  inner.innerHTML=`
    <div class="popup-img"><img src="${p.img}" alt="${p.name}" onerror="this.src='images/placeholder.png'"/></div>
    <div class="popup-details">
      ${p.badge?`<span class="popup-badge ${badgeClass(p.badge)}">${badgeLabel(p.badge)}</span>`:""}
      <div class="popup-name">${p.name}</div>
      <div class="popup-desc">${p.desc}</div>
            <div><div class="popup-label">Colors</div><div class="popup-colors">${p.colors.map((c,i)=>`<button class="color-btn${i===0?" active":""}">${c}</button>`).join("")}</div></div>
            <div class="popup-stock ${p.stock==="In Stock"?"in":p.stock==="Low Stock"?"low":"out"}"><i class="fas fa-circle" style="font-size:.5rem"></i> ${p.stock}</div>
      <button class="popup-wa-btn" onclick="orderWA(${p.id})"><i class="fab fa-whatsapp" style="font-size:1.3rem"></i> Order on WhatsApp</button>
      ${related.length?`<div style="margin-top:1rem"><div class="popup-label">Related Products</div><div style="display:flex;gap:.5rem;flex-wrap:wrap">${related.map(r=>`<div onclick="openPopup(${r.id})" style="cursor:pointer;border-radius:8px;overflow:hidden;width:60px;height:60px;border:1px solid rgba(201,168,76,.2)"><img src="${r.img}" alt="${r.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.src='images/placeholder.png'"/></div>`).join("")}</div></div>`:""}
    </div>`;
  overlay.classList.remove("hidden");
  document.body.style.overflow="hidden";
  inner.querySelectorAll(".color-btn").forEach(b=>b.addEventListener("click",()=>{inner.querySelectorAll(".color-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");}));
  inner.querySelectorAll(".size-btn").forEach(b=>b.addEventListener("click",()=>{inner.querySelectorAll(".size-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");}));
}
document.getElementById("popup-close")?.addEventListener("click",closePopup);
document.getElementById("popup-overlay")?.addEventListener("click",e=>{if(e.target===e.currentTarget)closePopup();});
function closePopup(){document.getElementById("popup-overlay").classList.add("hidden");document.body.style.overflow="";}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePopup();});

/* --- WA ORDER --- */
function orderWA(id){
  const p=P.find(x=>x.id===id);if(!p)return;
  const msg=`Hello Bold %26 Bright Fancy Shop,%0aI am interested in ordering:%0a%0a*${encodeURIComponent(p.name)}*%0aPlease confirm availability.`;
  openWA(msg);
}

/* --- TABS --- */
document.querySelectorAll(".tab-btn").forEach(btn=>{btn.addEventListener("click",()=>{document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentTab=btn.dataset.tab;visibleCount=8;renderProducts();});});

/* --- LOAD MORE --- */
document.getElementById("load-more")?.addEventListener("click",()=>{visibleCount+=8;renderProducts();});

/* --- SEARCH / FILTER --- */
function applyFilters(){renderProducts(currentCat,getSearchVal(),getPriceRange(),getSort());}
document.getElementById("search-input")?.addEventListener("input",applyFilters);
document.getElementById("cat-filter")?.addEventListener("change",applyFilters);
document.getElementById("price-filter")?.addEventListener("change",applyFilters);
document.getElementById("sort-filter")?.addEventListener("change",applyFilters);


/* --- PARALLAX HERO --- */
window.addEventListener("scroll",()=>{const hero=document.querySelector(".hero-bg");if(hero)hero.style.transform=`scale(1.1) translateY(${window.scrollY*.2}px)`;});

/* --- INIT --- */
renderProducts();
