(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  if('IntersectionObserver' in window && !reduce.matches){
    const items=document.querySelectorAll('.statement h2,.service,.process h2,.process-intro,.step,.form-section h2,.form');
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12});
    items.forEach(el=>{el.classList.add('reveal');observer.observe(el);});document.body.classList.add('motion-ready');
  }
  const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
  const steps=[...document.querySelectorAll('.step')];let queued=false;
  function update(){queued=false;const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?scrollY/max:0})`;let nearest=null,distance=Infinity;steps.forEach(step=>{const d=Math.abs(step.getBoundingClientRect().top-innerHeight*.45);if(d<distance){nearest=step;distance=d;}});steps.forEach(step=>step.classList.toggle('active',step===nearest));}
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
})();
