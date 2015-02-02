window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    setTimeout(function(){ZTVButton.onload()},1000);
},false);


ZTVButton = {
    isON: false,
    onclick: function () {
    	if(ZTVButton.isON){
            content.wrappedJSObject.location='http://zerator.com/';
        }
    },
    updateIcon: function(){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
          if (xmlhttp.readyState==4 && xmlhttp.status==200){
              var data = JSON.parse(xmlhttp.responseText);
              if(data.stream != null){
                if (!ZTVButton.isON) {
                    ZTVButton.isON = true;
                    document.getElementById("ztv_button").className = "toolbarbutton-1 chromeclass-toolbar-additional custombutton liveon";
                    var nb = gBrowser.getNotificationBox();
                    nb.appendNotification('ZeratoR est en ligne.', 'notifyON', 'chrome://ztv/content/ztv_on.png', nb.PRIORITY_INFO_MEDIUM, []);
                }
              }else if(ZTVButton.isON){
                ZTVButton.isON = false;
                document.getElementById("ztv_button").className = "toolbarbutton-1 chromeclass-toolbar-additional custombutton";
              }
          }
        }
        xmlhttp.open("GET","https://api.twitch.tv/kraken/streams/zerator",true);
        xmlhttp.send();
    },
    onload: function () {
        setInterval(ZTVButton.updateIcon,120000);
        ZTVButton.updateIcon();
    }

}
