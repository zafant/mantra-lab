/* V3.5 — restore guided flow without changing the existing module cards */
(function(){
  function setup(){
    const builder=document.querySelector('#builderView');
    if(!builder)return;
    const toolbar=builder.querySelector('.toolbar');
    const workspace=builder.querySelector('.workspace');
    const browser=builder.querySelector('.module-browser');
    if(!toolbar||!workspace||!browser)return;

    workspace.id='formationWorkspace';
    if(!document.querySelector('#modeGate')){
      const gate=document.createElement('section');
      gate.id='modeGate';
      gate.className='mode-gate card';
      gate.innerHTML='<div class="mode-gate-copy"><span class="muted">01 · FORMATO</span><h2>Scegli prima il tipo di gioco</h2><p>La scelta del formato determina i moduli e le regole di compatibilità.</p></div><div class="mode-choice-grid"><button class="mode-choice" data-mode="mantra"><span class="mode-choice-mark">M</span><span><b>MANTRA</b><small>11 moduli · ruoli Mantra</small></span><i>→</i></button><button class="mode-choice" data-mode="classic"><span class="mode-choice-mark classic-mark">C</span><span><b>CLASSIC</b><small>Moduli Classic · ruoli tradizionali</small></span><i>→</i></button></div>';
      builder.insertBefore(gate,builder.firstElementChild);
    }

    const gate=document.querySelector('#modeGate');
    toolbar.classList.add('flow-hidden');
    browser.classList.add('flow-hidden');
    workspace.classList.add('flow-hidden');

    document.querySelectorAll('.mode-choice').forEach(btn=>btn.onclick=function(){
      const target=document.querySelector('.mode[data-mode="'+btn.dataset.mode+'"]');
      if(!target)return;
      target.click();
      gate.classList.add('flow-hidden');
      browser.classList.remove('flow-hidden');
      toolbar.classList.add('flow-hidden');
      workspace.classList.add('flow-hidden');
      browser.scrollIntoView({behavior:'smooth',block:'start'});
    });

    browser.addEventListener('click',function(e){
      const card=e.target.closest('.module-card');
      if(!card)return;
      gate.classList.add('flow-hidden');
      browser.classList.remove('flow-hidden');
      toolbar.classList.remove('flow-hidden');
      workspace.classList.remove('flow-hidden');
    },true);

    document.querySelector('#changeModeBtn')?.addEventListener('click',function(e){
      e.preventDefault();
      gate.classList.remove('flow-hidden');
      browser.classList.add('flow-hidden');
      toolbar.classList.add('flow-hidden');
      workspace.classList.add('flow-hidden');
      gate.scrollIntoView({behavior:'smooth',block:'start'});
    });

    document.querySelector('#playerList')?.addEventListener('dragstart',function(e){
      if(workspace.classList.contains('flow-hidden')){e.preventDefault();e.stopPropagation();}
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
