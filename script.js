const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'), nav=document.querySelector('.nav nav');
menu?.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='82px';nav.style.left='0';nav.style.right='0';nav.style.padding='25px';nav.style.background='#0d0d0d';nav.style.flexDirection='column';});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<851)nav.style.display='none'}));



const slider=document.getElementById('workSlider');
const prev=document.querySelector('.work-arrow.prev'), next=document.querySelector('.work-arrow.next'), progress=document.querySelector('.work-progress i');
let autoWorkTimer;
const AUTO_WORK_DELAY=4000;
function moveWork(dir){
  if(!slider)return;
  slider.scrollBy({left:dir*(slider.clientWidth*.82),behavior:'smooth'});
  restartAutoWork();
}
function autoMoveWork(){
  if(!slider)return;
  const max=slider.scrollWidth-slider.clientWidth;
  if(max<=0)return;
  const atEnd=slider.scrollLeft>=max-8;
  slider.scrollTo({left:atEnd?0:Math.min(slider.scrollLeft+slider.clientWidth*.82,max),behavior:'smooth'});
}
function restartAutoWork(){
  clearInterval(autoWorkTimer);
  autoWorkTimer=setInterval(autoMoveWork,AUTO_WORK_DELAY);
}
prev?.addEventListener('click',()=>moveWork(-1)); next?.addEventListener('click',()=>moveWork(1));
slider?.addEventListener('scroll',()=>{if(!progress)return; const max=slider.scrollWidth-slider.clientWidth; progress.style.width=(max?Math.max(8,slider.scrollLeft/max*100):100)+'%';});
slider?.addEventListener('pointerdown',()=>clearInterval(autoWorkTimer));
slider?.addEventListener('pointerup',restartAutoWork);
slider?.addEventListener('mouseenter',()=>clearInterval(autoWorkTimer));
slider?.addEventListener('mouseleave',restartAutoWork);
slider?.addEventListener('focusin',()=>clearInterval(autoWorkTimer));
slider?.addEventListener('focusout',restartAutoWork);
restartAutoWork();
// Pause other project videos when one starts playing.
document.querySelectorAll('.work-card video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('.work-card video').forEach(o=>{if(o!==v)o.pause()})));


// Animated team cards
const teamObserver=new IntersectionObserver(entries=>entries.forEach((entry,i)=>{if(entry.isIntersecting){entry.target.classList.add('show');teamObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.team-animate').forEach(card=>teamObserver.observe(card));
