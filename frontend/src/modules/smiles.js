export default {
  setSmile(context, inputElement, smile) {
    context.openEmoji = false;

    document.execCommand("enableObjectResizing", false, false); // убрать ресайз эмоций
    // const inputElement = context.$refs[ref];
    inputElement.focus();

    try {
      let selection = window.getSelection(),
        range = selection.getRangeAt(0),
        temp = document.createElement('div'),
        insertion = document.createDocumentFragment();

      temp.innerHTML = context.$emoji(smile);

      while (temp.firstChild) {
        insertion.appendChild(temp.firstChild);
      }

      range.deleteContents();
      range.insertNode(insertion);
    } catch (z) {
      try {
        document.selection.createRange().pasteHTML(html);
      } catch (z) {}
    }

    inputElement.focus();
    if (window.getSelection && document.createRange) {
      let crRange = document.createRange();
      crRange.selectNodeContents(inputElement);
      crRange.collapse(false);

      if(document.getSelection){
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(crRange);
      }

    }

    return false;
  }
}
