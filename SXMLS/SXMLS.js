AR.log("SXMLS AR v1.0");

AR.onload = function() {
    AR.play("group_Mod#Round1",1);
   AR.play("Point001#Round1",1);
};

AR.onbegin = function(clipId) {
};

AR.onend = function(clipId) {
    if(clipId == "Point001#Round1"){
        AR.play("group_Mod#Round2",1);
        AR.play("Point001#Round2",1);
    }
};

AR.onclick = function(nodeId, x, y) {
    if(nodeId.indexOf("guide_Mod")>=0){
        AR.pause();
        AR.set_visible("Group_UI2",true);
        AR.set_visible("UI2_Close_Scenery",true);
        AR.set_visible("UI2_Scenery",true);
    }

    if(nodeId=="UI2_Close_Scenery"){
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Close_Scenery",false);
        AR.set_visible("UI2_Scenery",false);
        AR.resume();
    }
};
