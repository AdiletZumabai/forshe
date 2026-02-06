document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('page2Music');
  const choices = document.querySelectorAll('.card');
  const starsRoot = document.getElementById('stars');

  /* 1) stars generator */
(function makeStars(){
  if(!starsRoot) return;

  const count = 80;

  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'star';

    const size = 1 + Math.random() * 3;
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';

    const moveDuration = 12 + Math.random() * 25;
    const twinkleDuration = 2 + Math.random() * 4;

    el.style.animationDuration =
      `${moveDuration}s, ${twinkleDuration}s`;

    el.style.animationDelay =
      `${Math.random() * -moveDuration}s, ${Math.random() * -twinkleDuration}s`;

    starsRoot.appendChild(el);
  }
})();


  /* 2) autoplay music */
  function tryPlayMusic(){
    if(!music) return;
    music.volume = 0.85;
    const p = music.play();
    if(p !== undefined){
      p.catch(()=> {
        // autoplay blocked — ничего не делаем
      });
    }
  }
  tryPlayMusic();

  /* 3) card click / keyboard */
  choices.forEach(card => {
    card.addEventListener('click', () => {
      goToChoice(card.dataset.choice);
    });
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToChoice(card.dataset.choice);
      }
    });
  });

  /* 4) navigation */
function goToChoice(kind){
  const panel = document.querySelector('.panel');
  // Визуальный эффект нажатия
  panel.style.transition = 'opacity .32s ease, transform .32s ease';
  panel.style.opacity = '0.5'; 
  panel.style.transform = 'scale(.995)';

  let target = '';
  if(kind === 'photobooth') target = 'page3.html';
  else if(kind === 'letter') target = 'letter.html';
  else if(kind === 'gift') target = 'gift.html';

  if(target) {
    // Открываем в новом окне/вкладке
    window.open(target, '_blank');
  }

  // Возвращаем панель в исходное состояние через секунду, 
  // чтобы пользователь мог нажать на что-то другое
  setTimeout(() => {
    panel.style.opacity = '1';
    panel.style.transform = 'scale(1)';
  }, 1000);
}

});


