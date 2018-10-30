AR.log("SXMLS AR v1.0");
var roundIndex=0;
var wasCreated=false;
AR.onload = function() {
   SLAMBoostrap(true);


};

AR.onbegin = function(clipId) {
};

AR.onend = function(clipId) {
    if(clipId=="Point002#Default"){
        AR.set_visible("UI1_gift",false);    
        AR.set_visible("UI1_gift",false);    
        AR.set_visible("Group_UI3",true);
        AR.set_visible("UI3_medal",true);
        //---------------------------------
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Explain",false);
        AR.set_visible("UI2_Close",false);
        //---------------------------------


        AR.setTimeout(function(){
            AR.set_visible("UI3_End",true);
            AR.set_visible("UI3_medal",false);
            AR.set_visible("UI3_Photograph",true);
            AR.set_visible("UI3_number01",true);
            AR.set_visible("UI3_number02",true);
            AR.set_visible("UI3_number03",true);
            AR.set_visible("UI3_ranking",true);
            AR.set_visible("UI3_close",true);
        },2000);
    }

    if(clipId == "Point001#Round1"){
        ReSetSLAM(true);
        AR.set_visible("group_Mod",false);
        //---------------------------------
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Explain",false);
        AR.set_visible("UI2_Close",false);
        //---------------------------------
        //Go to h5
        //AR.open_url();
    }
    if(clipId == "Point001#Round2"){
        ReSetSLAM(true);
        AR.set_visible("group_Mod",false);
        //---------------------------------
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Explain",false);
        AR.set_visible("UI2_Close",false);
        //---------------------------------
        //Go to h5
        //AR.open_url();
    }

    if(clipId=="Point001#Round3"){
        AR.play("Point002#Default",1);
        //---------------------------------
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Explain",false);
        AR.set_visible("UI2_Close",false);
        //---------------------------------
    }




};

AR.onclick = function(nodeId, x, y) {
    if(nodeId=="UI3_close")
    {
        //---------------------------------
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Explain",false);
        AR.set_visible("UI2_Close",false);
        //---------------------------------

        AR.set_visible("Group_UI4",true);
        AR.set_visible("Group_UI3",false);
        //ReSetSLAM(true);
    }
    if(nodeId.indexOf("guide_Mod")>=0){
        AR.pause();
        AR.set_visible("Group_UI2",true);
        AR.set_visible("UI2_Close_Scenery",true);
        AR.set_visible("UI2_Scenery",true);
        AR.set_texture("UI2_Scenery","bundle/details/"+nodeId.split("_")[2]%5+".png");
    };

    if(nodeId=="UI2_Close_Scenery"){
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Close_Scenery",false);
        AR.set_visible("UI2_Scenery",false);
        AR.resume();
    };

    if(nodeId=="UI1_Call"){
        //reset position
        SetModel();

        //hide ui
        AR.set_visible("UI1_Alignment",false);
        AR.set_visible("UI1_Call",false);
        AR.set_visible("group_Mod",true);
        AR.set_visible("UI1_gift",true);    
   

        if(wasCreated){
            //back to continue
            roundIndex++;
            if(roundIndex==1){
                AR.play("group_Mod#Round2",1);
                AR.play("Point001#Round2",1);
            }
            else if(roundIndex==2){
                AR.play("group_Mod#Round3",1);
                AR.play("Point001#Round3",1);
            }
        }else{
            AR.set_visible("UI1_Star",true); 
        }
        wasCreated=true;
    };

    if(nodeId=="UI1_Star"){
        AR.set_visible(nodeId,false);
        AR.play("group_Mod#Round1",1);
        AR.play("Point001#Round1",1);
    };

    if(nodeId=="UI3_Photograph"){
        // 截屏后分享
        AR.startRecord("PIC", true, null, function(result) {
            if (result.status) {
                AR.startShare("PIC", result.path, null, function(result) {});
            }
        });
    };

    if(nodeId=="UI3_ranking"){
        AR.open_url("");
    };

    if(nodeId=="UI1_gift"){
        //AR.open_url("");
        AR.set_visible("Group_UI2",true);
        AR.set_visible("UI2_Explain",true);
        AR.set_visible("UI2_Close",true);
        AR.set_visible("UI1_Star",false);
    };
    if(nodeId=="UI2_Close"){
        AR.set_visible("Group_UI2",false);
        AR.set_visible("UI2_Explain",false);
        AR.set_visible("UI2_Close",false);
        AR.set_visible("UI1_Star",true);  
    };

    if(nodeId=="UI4_again"){
        AR.set_visible("Group_UI3",false);
        AR.set_visible("Group_UI4",false);
        AR.set_visible("UI1_Star",true);
        AR.set_visible("Group_UI1",true);
        AR.set_visible("UI1_gift",true);    
        
        AR.play("Point002#Reset",1);
        AR.play("group_Mod#Reset",1);
        AR.play("Point001#Reset",1);
        roundIndex=0;
    }

    if(nodeId=="UI4_out"){
        AR.exit();
    }
};



 function SLAMBoostrap(_status){
    AR.set_visible("Group_UI1",_status);
    AR.set_visible("UI1_Call",_status);
    // AR.set_visible("UI1_Star",_status);
    // AR.set_visible("UI1_gift",_status);    
}
 function ReSetSLAM(_status){
    AR.set_visible("Group_UI1",_status);
    AR.set_visible("UI1_Call",_status);
    AR.set_visible("UI1_gift",!_status);  
    AR.set_visible("UI1_Star",!_status);
    AR.set_visible("UI1_gift",!_status);
    AR.set_visible("UI1_Alignment",_status);
    AR.set_texture("UI1_Call","SXMLS.fbm/btn_continue.png");
}
function SetModel(){
    //Set model to center
    var ua = AR.getUserAgent();
    var screenSize = ua.split(';')[3].split(' ')[1];
    var screenHeight = screenSize.split('x')[0];
    var screenWidth = screenSize.split('x')[1];
    if (screenHeight > 1100)
        setSlamPos(500, 1020);
    else {
        setSlamPos(380, 550);
    }
}

/**
 * [setSlamPos 放置模型实例]
 * @param {[type]} x [放置的X轴坐标]
 * @param {[type]} y [放置的Y轴坐标]
 */
setSlamPos = function(x, y) {
	if (AR.resetSlamModel && AR.getEnvProp("slamSupport") == "true") {
		AR.resetSlamModel(x, y);
	} else {
		AR.translate("group_Mod", 0, -30, 0);
    }
    AR.set_visible("group_Mod",true);
};