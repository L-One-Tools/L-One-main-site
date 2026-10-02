(() => {
  'use strict';
  const root=new URL('../',document.currentScript.src);
  const read=path=>fetch(new URL(path,root)).then(r=>{if(!r.ok)throw Error('工具资料读取失败');return r.json();});
  const ready=Promise.all([read('public/data/tools/ICON_ASSET_MAP.json'),read('public/data/tools/tools.json')]);
  window.LOneTools={ready,root};
  class ToolIconMarquee extends HTMLElement {
    connectedCallback(){if(this.dataset.initialized)return;this.dataset.initialized='true';this.setAttribute('aria-label','L-One工具');ready.then(([icons,tools])=>{if(!this.isConnected)return;const track=document.createElement('div');track.className='tool-icon-marquee__track';for(let repeat=0;repeat<2;repeat++){const group=document.createElement('div');group.className='tool-icon-marquee__group';if(repeat){group.setAttribute('aria-hidden','true');group.inert=true;}tools.filter(t=>t.marquee).sort((a,b)=>a.display_order-b.display_order).forEach(t=>{const item=document.createElement(t.detail_route?'a':'span');item.className='tool-icon-marquee__item';if(t.detail_route){item.href=new URL(t.detail_route,root);item.target='_top';item.setAttribute('aria-label',t.name+'：查看工具详情');}const img=document.createElement('img');img.src=new URL(icons[t.icon].src,root);img.alt='';img.width=140;img.height=140;img.loading='lazy';const name=document.createElement('span');name.textContent=t.name;item.append(img,name);if(!t.detail_route){const state=document.createElement('small');state.textContent='暂无公开详情';item.append(state);}group.append(item);});track.append(group);}this.replaceChildren(track);}).catch(()=>{this.textContent='工具图标暂时无法加载';this.setAttribute('role','status');});}
  }
  if(!customElements.get('tool-icon-marquee'))customElements.define('tool-icon-marquee',ToolIconMarquee);
  ready.then(([icons])=>document.querySelectorAll('[data-tool-icon]').forEach(img=>{const icon=icons[img.dataset.toolIcon];if(icon)img.src=new URL(icon.src,root);})).catch(()=>{});
})();
