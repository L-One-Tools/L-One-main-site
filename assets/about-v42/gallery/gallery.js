(() => {
  const sticky=document.querySelector('.timeline__sticky'),cards=[...document.querySelectorAll('.world-card')];
  if(!sticky||!cards.length)return;
  const caption=document.createElement('div');caption.className='timeline-mobile-caption';caption.setAttribute('aria-label','当前时间线文字');sticky.append(caption);
  let scheduled=false,last='';
  function update(){scheduled=false;const card=cards.reduce((a,b)=>+(b.style.opacity||0)>+(a?.style.opacity||0)?b:a,null);if(!card||+(card.style.opacity||0)<.1){caption.replaceChildren();last='';return;}const lines=[...card.querySelectorAll('text')].map(t=>t.textContent.trim()).filter(Boolean),key=lines.join('|');if(last===key)return;last=key;caption.replaceChildren(...lines.map((text,i)=>{const node=document.createElement(i?'span':'strong');node.textContent=text;return node;}));}
  const observer=new MutationObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}});cards.forEach(c=>observer.observe(c,{attributes:true,attributeFilter:['style']}));update();addEventListener('pagehide',()=>observer.disconnect(),{once:true});
})();

(() => {let queued=false,last='';function theme(){queued=false;const node=[...document.querySelectorAll('.timeline,#now,.statement,.fog-story,.future,.contact')].reverse().find(e=>{const r=e.getBoundingClientRect();return r.top<=24&&r.bottom>24;});const dark=!!node?.matches('.timeline,#now,.fog-story');const key=dark?'dark':'light';if(key===last)return;last=key;const data={type:'lone-about-chrome',bg:dark?'#191b1d':'#fff',ink:dark?'#fff':'#171717'};if(parent!==window)parent.postMessage(data,location.origin);const header=document.querySelector('#siteHeader');if(header){header.style.background=data.bg;header.style.color=data.ink;header.style.borderBottom='0';}}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(theme)}},{passive:true});addEventListener('resize',theme);theme();})();
