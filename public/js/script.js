(function() {
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