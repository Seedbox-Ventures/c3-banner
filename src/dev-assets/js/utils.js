window.clearAllCookies = function clearAllCookies() {
  var cookies = document.cookie.split(";");
  var domain = window.location.hostname;
  var path = window.location.pathname;

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

window.clearCookiesAndReload = function clearCookiesAndReload() {
  window.clearAllCookies();
  location.reload();
};
