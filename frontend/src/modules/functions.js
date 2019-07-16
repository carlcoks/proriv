export default {
  checkNumber(e) {
    if ( (((e.keyCode > 47) && (e.keyCode < 58)) || ((e.keyCode > 95) && (e.keyCode < 106))) || (e.keyCode == 8) || (e.keyCode == 46) || (e.keyCode == 37) || (e.keyCode == 39)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  },

  isValidUrl(url) {
    const objRE = /http(s?):\/\/[-\w\.]{3,}\.[A-Za-z]{2,3}/;
    return objRE.test(url);
  },

  returnVideoBlock(link, type) {
    if (link.indexOf('youtube.com') > -1 || link.indexOf('youtu.be') > -1) {
      let embed = '';

      const params = link.split('?');
      if (params.length > 1) {
        params.map(item => {
          if (item.indexOf('v=') == 0) {
            embed = item.replace('v=', '');
          }
        })
      } else {
        embed = link.split('/').pop();
      }
      if (type == 'small')
        return `<div class="image" style="background-image: url(https://img.youtube.com/vi/${embed}/mqdefault.jpg)"></div>`;
      else
        return `<div class="image" style="background-image: url(https://img.youtube.com/vi/${embed}/hqdefault.jpg)"></div>`;

      // return `https://www.youtube.com/embed/${embed}?rel=0&showinfo=0`;
    }

    // return `<iframe class="iframe" src="`+link+`" frameborder="0"></iframe>`;
  },

  returnVideoLink(link) {
    if (link.indexOf('youtube.com') > -1 || link.indexOf('youtu.be') > -1) {
      let embed = '';

      const params = link.split('?');
      if (params.length > 1) {
        params.map(item => {
          if (item.indexOf('v=') == 0) {
            embed = item.replace('v=', '');
          }
        })
      } else {
        embed = link.split('/').pop();
      }

      return `https://www.youtube.com/embed/${embed}?rel=0&showinfo=0`;
    }

    return link;
  }
}
