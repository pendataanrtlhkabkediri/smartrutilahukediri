/**
 * Klien untuk backend Google Apps Script (lihat apps-script/Code.gs).
 * Content-Type dikirim sebagai text/plain agar browser tidak melakukan
 * CORS preflight (Apps Script Web App tidak menjawab preflight OPTIONS).
 */
(function(global){
  "use strict";

  function postConfirmation(apiUrl, payload){
    return fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).then(function(res){
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function(json){
      if (!json.ok) throw new Error(json.error || "Gagal mencatat konfirmasi.");
      return json.record;
    });
  }

  function fetchAll(apiUrl){
    var sep = apiUrl.indexOf("?") === -1 ? "?" : "&";
    return fetch(apiUrl + sep + "action=list").then(function(res){
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function(json){
      if (!json.ok) throw new Error(json.error || "Gagal mengambil data.");
      return json.data;
    });
  }

  global.RutilahuAPI = {
    postConfirmation: postConfirmation,
    fetchAll: fetchAll
  };

})(window);
