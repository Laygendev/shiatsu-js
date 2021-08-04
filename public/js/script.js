(function() {
  let oldRandom = 0;
  let currentBgImg = 0;
  let oldBgImg

  setInterval(() => {
    let random;

    do {
      random = Math.floor(Math.random() * 4);
    } while (random == oldRandom);

    oldBgImg = currentBgImg

    currentBgImg++;
    if (currentBgImg > 1) {
      currentBgImg = 0
    }

    document.querySelector('.bgimg' + currentBgImg).style.backgroundImage = "url('public/img/bg-" + random + ".jpg')";

    document.querySelector('.bgimg' + currentBgImg).classList.remove('fadeOut');
    document.querySelector('.bgimg' + currentBgImg).classList.add('fadeIn');
    document.querySelector('.bgimg' + currentBgImg).addEventListener('animationend', (item) => {
      item.target.hidden = false
    });

    oldRandom = random;

    setTimeout(() => {
      document.querySelector('.bgimg' + oldBgImg).classList.remove('fadeIn')
      document.querySelector('.bgimg' + oldBgImg).classList.add('fadeOut');
      document.querySelector('.bgimg' + oldBgImg).addEventListener('animationend', (item) => {
        item.target.hidden = true
      });
    }, 500);

  }, 10000);
  document.querySelector('.save-button').addEventListener('click', () => {
    let values = ['public/img/horse.png'];

    document.querySelectorAll('input:checked').forEach((item) => {
      values.push('public/img/meridian/' + item.value + '.png');
    });

    mergeImages(values).then(b64 => {
      b64 = b64.replace('data:image/png;base64,', '');

      const byteCharacters = atob(b64);

      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], {type: 'image/png'});

      download(blob, 'horse-' + Date.now(), "image/png");
    });
  });
})();