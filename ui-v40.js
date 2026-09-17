/* MANTRA LAB V4.0 UI layer */
(function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  function ensureGalleryAlias(){if(typeof window.renderGallery==='function')window.renderModuleGallery=window.renderGallery}
  ensureGalleryAlias();
  document.addEventListener('click',e=>{if(e.target.closest('.mode-choice'))ensureGalleryAlias()},true);

  function enhancePlayerRows(){
    $$('.player').forEach(el=>{if(el.dataset.v40Enhanced==='1')return;el.dataset.v40Enhanced='1';const meta=el.querySelector('.pmeta'),price=el.querySelector('.roles');
      if(meta){const raw=meta.textContent.split('·'),team=(raw.shift()||'').trim(),roles=(raw.join('·')||'').trim();meta.innerHTML=`<span class="player-team">${team}</span><span class="player-role-line">${roles}</span>`}
      if(price){const value=price.textContent.trim()||'—';price.classList.add('player-price');price.innerHTML=`${value}<small>FC</small>`}
    })
  }
  enhancePlayerRows();new MutationObserver(enhancePlayerRows).observe(document.body,{subtree:true,childList:true});
  function priceOf(p){return Number(p.price)||0}
  function roleMatch(p,req){const roles=(p.roles||[p.classic]).map(String);return String(req).toUpperCase().split('/').some(r=>roles.some(x=>x.toUpperCase()===r))}
  function ensureRolePanel(){if($('#roleSuggestionPanel')||!$('#pitch'))return;const wrap=document.createElement('section');wrap.id='roleSuggestionPanel';wrap.className='role-suggestion-panel card hidden';wrap.innerHTML='<div class="role-suggestion-head"><div><span class="muted">SELEZIONE RAPIDA</span><h3 id="suggestionTitle">Giocatori adattabili</h3><p id="suggestionSub">Seleziona una posizione sul campo.</p></div><button id="closeSuggestion" class="ghost compact" type="button">Chiudi</button></div><div id="suggestionList" class="suggestion-list"></div>';$('#pitch').parentElement.parentElement.insertAdjacentElement('afterend',wrap);$('#closeSuggestion').onclick=()=>wrap.classList.add('hidden')}
  function openSuggestions(slot){ensureRolePanel();const req=slot.querySelector('.slot-role')?.textContent?.trim()||'',list=$('#suggestionList');if(!list)return;const data=window.MantraLabPlayers||[];const items=data.filter(p=>roleMatch(p,req)).sort((a,b)=>priceOf(b)-priceOf(a));$('#suggestionTitle').textContent=`Giocatori adattabili · ${req}`;$('#suggestionSub').textContent=`${items.length} giocatori · ordinati per fantacrediti`;list.innerHTML=items.map(p=>`<button class="suggestion-player" data-id="${p.id}" data-slot="${slot.dataset.slot}" type="button"><span class="suggestion-avatar">${(p.name.match(/\b\w/g)||[]).slice(0,2).join('').toUpperCase()}</span><span class="suggestion-info"><b>${p.name}</b><small>${p.team} · ${(p.roles||[p.classic]).join(' / ')}</small></span><strong>${p.price||'—'} FC</strong></button>`).join('')||'<div class="empty-list">Nessun giocatore adattabile trovato.</div>';$$(".suggestion-player").forEach(btn=>btn.onclick=()=>{if(typeof window.placePlayerOnSlot==='function')window.placePlayerOnSlot(btn.dataset.id,Number(btn.dataset.slot));$('#roleSuggestionPanel').classList.add('hidden')});$('#roleSuggestionPanel').classList.remove('hidden');$('#roleSuggestionPanel').scrollIntoView({behavior:'smooth',block:'nearest'})}
  document.addEventListener('click',e=>{const slot=e.target.closest('.slot');if(slot&&!e.target.closest('.slot-card[draggable="true"]'))openSuggestions(slot)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#roleSuggestionPanel')?.classList.add('hidden')});
  if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw-v40.js').catch(()=>{});
})();
