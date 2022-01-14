document.addEventListener("DOMContentLoaded", function() {
  function e(e) {
    const t = "_hiddenCopyText_",
      n = "INPUT" === e.tagName || "TEXTAREA" === e.tagName;
    var o, c;
    if (n) (a = e), (o = e.selectionStart), (c = e.selectionEnd);
    else {
      if (((a = document.getElementById(t)), !a)) {
        var a = document.createElement("textarea");
        (a.style.position = "absolute"),
          (a.style.left = "-9999px"),
          (a.style.top = "0"),
          (a.id = t),
          document.body.appendChild(a);
      }
      a.textContent = e.textContent;
    }
    var d = document.activeElement;
    a.focus(), a.setSelectionRange(0, a.value.length);
    var i;
    try {
      i = document.execCommand("copy");
    } catch (l) {
      i = !1;
    }
    return (
      d && "function" == typeof d.focus && d.focus(),
      n ? e.setSelectionRange(o, c) : (a.textContent = ""),
      i
    );
  }
  document
    .querySelector(".copy-to-clipboard")
    .addEventListener("click", function(t) {
      t.preventDefault(),
        e(document.querySelector(".copy-email")),
        (this.text = "email has been copied!");
    });
});
