export default {
  checkNumber(e) {
    if ( (((e.keyCode > 47) && (e.keyCode < 58)) || ((e.keyCode > 95) && (e.keyCode < 106))) || (e.keyCode == 8) || (e.keyCode == 46) || (e.keyCode == 37) || (e.keyCode == 39)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  },
}
