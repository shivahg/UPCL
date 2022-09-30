sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/ui/core/BusyIndicator"
], function (Controller,BusyIndicator) {
	"use strict";

	return Controller.extend("ZPMS.ZPMS.controller.TransferData", {
		getdata:function(section){ 
		 debugger;
			var null1=[];
		var n={};
		null1.push(n);
		
	       var array=[];
			////@@@@@@@@@@@@@@@@@@@@@@@@@@@@panel1
			 var pms_honoursSet=this.getView().getModel("pmsmodel").getData().pms_honoursSet;
			 
			 
			 if(pms_honoursSet.length === 0){
				 pms_honoursSet=null1;
			 }
			 else {
			 for(var i=0;i<pms_honoursSet.length;i++){
					delete pms_honoursSet[i].__metadata;
					array.push(pms_honoursSet[i]);
			 }
			 pms_honoursSet=array;
	            array=[];
			 }
				
	           
			
	        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@panel1
			 
	            var pms_leavesSet=this.getView().getModel("pmsmodel").getData().pms_leavesSet;
	            if(pms_leavesSet.length === 0){
	            	pms_leavesSet=null1;
	            }
	            else {
	            for(var i=0;i<pms_leavesSet.length;i++){
					delete pms_leavesSet[i].__metadata;
				       array.push(pms_leavesSet[i]);
	            }
	            pms_leavesSet=array;
	            //@@@@@@@@@@@@@@@@@@@@@@@@@@@panel1
	            array=[];
	            }
	           
	            
	            
	           var  pms_perappSet=this.getView().getModel("pmsmodel").getData().pms_perappSet;
	           
	           if(pms_perappSet.length===0){
	        	   pms_perappSet=null1;
	           }
	           else {
	           for(var i=0;i<pms_perappSet.length;i++){
					delete pms_perappSet[i].__metadata;
					
					array.push(pms_perappSet[i]);
				}
	           pms_perappSet=array;
	           array=[];
	           }
	           
	           
	           
	           var  pms_caseSet=this.getView().getModel("pmsmodel").getData().pms_caseSet;
	           
	           if(pms_caseSet.length===0){
	        	   pms_caseSet=null1;
	        	   }
	           else {
	        	   pms_caseSet;
	           }
	          
	           
	           var pms_leavesSet=this.getView().getModel("pmsmodel").getData().pms_leavesSet;
	           
	           if(pms_leavesSet.length===0){
	        	   pms_leavesSet=null1;
	           }
	           else{
	        	   pms_leavesSet;
	           }
	           
	           var Zrole=this.getView().getModel("pmsmodel").getData().pmsdetails.Zzrole;
		        var pms_trtopicSet =[];
		        if(Zrole==="3"){
		        	var a=this.getView().byId("pms_trtopicSet").getSelectedItems();
		        	 for(var i=0;i<a.length;i++){
		        		  pms_trtopicSet.push(a[i].getBindingContext("pmsmodel").getObject());
		        	  }
		        }
		        	 else {
		        		 var pms_trtopicSet= this.getView().getModel("pmsmodel").getData().pms_trtopicSet;
		        	 }
	        
	              
	           
	          ////////////Date Validations////////
	          
				   var Zzfdate=this.getView().byId("Zzfdate").getDateValue();
				if((Zzfdate==="")||(Zzfdate===null)){
					Zzfdate=null;
				}
				else {
				var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
				 Zzfdate=frmt.format(new Date(Zzfdate));
				Zzfdate=new Date(Zzfdate);
				Zzfdate= new Date(Zzfdate.setHours("00","00","00","00"));
		       Zzfdate = new Date(Zzfdate.getTime() + Zzfdate.getTimezoneOffset() * (-60000));
		       this.getView().getModel("pmsmodel").getData().pmsdetails.Zzfdate=Zzfdate;
				}
				
				
				
				////dob///////
				 var Zzdob= this.getView().getModel("pmsmodel").getData().pmsdetails.Zzdob;
					if((Zzdob==="")||(Zzdob===null)){
						Zzdob=null;
					}
					else {
					var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
					 Zzdob=frmt.format(new Date(Zzdob));
					Zzdob=new Date(Zzdob);
					Zzdob= new Date(Zzdob.setHours("00","00","00","00"));
			       Zzdob = new Date(Zzdob.getTime() + Zzdob.getTimezoneOffset() * (-60000));
			       this.getView().getModel("pmsmodel").getData().pmsdetails.Zzdob=Zzdob;
					}
				
	 //////////training set remove metadata in record//////////
				var pms_trainingSet=this.getView().getModel("pmsmodel").getData().pms_trainingSet;
				
				for(var i=0;i<pms_trainingSet.length;i++){
					delete pms_trainingSet[i].__metadata;
					array.push(pms_trainingSet[i]);
				}
				pms_trainingSet=array;
				array=[];
	       
			if(section==="T"){
				this.pmsdetails.Zzsection="T";
			}
		
		
			//this.getView().getModel("pmsmodel").getData().pmsdetails.Zzfdate
		
		
		
			       this.pmsdetails={
	    		       "Pernr": this.getView().getModel("pmsmodel").getData().pmsdetails.Pernr,
	    			   "Uname": this.getView().getModel("pmsmodel").getData().pmsdetails.Uname,
	    			   "ZzacceptAuth": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzacceptAuth,
	    			   "ZzacceptPer": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzacceptPer,
	    			   "Zzaction": this.getView().getModel("pmsmodel").getData().pmsdetails.pmsZzaction,
	    			   "ZzappraisalId": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzappraisalId,
	    			   "ZzauditNo": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzauditNo,
	    			   "Zzcirclezone":this.getView().getModel("pmsmodel").getData().pmsdetails.Zzcirclezone,
	    			   "Zzdesignation": this.getView().getModel("pmsmodel").getData().pmsdetails.Zzdesignation,
	    			   "Zzdob": (this.getView().getModel("pmsmodel").getData().pmsdetails.Zzdob),
	    			   "ZzdocId": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzdocId,
	    			   "Zzfdate":  this.getView().getModel("pmsmodel").getData().pmsdetails.Zzfdate,
	    			   "Zzfinaled": this.getView().getModel("pmsmodel").getData().pmsdetails.Zzfinaled,
	    			   "Zzinitialed": this.getView().getModel("pmsmodel").getData().pmsdetails.Zzinitialed,
	    			   "ZzpartApId": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzpartApId,
	    			   "ZzperiodApp": this.getView().getModel("pmsmodel").getData("pmsmodel").pmsdetails.ZzperiodApp,
	    			   "Zzplace": this.getView().getModel("pmsmodel").getData().pmsdetailsZzplace,
	    			   "ZzreportAuth": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzreportAuth,
	    			   "ZzreportPer": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzreportPer,
	    			   "ZzreviewAuth": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzreviewAuth,
	    			   "ZzreviewPer": this.getView().getModel("pmsmodel").getData().pmsdetails.ZzreviewPer,
	    			   "Zgrsa":this.getView().getModel("pmsmodel").getData().pmsdetails.Zgrsa,
	    			   "Zkpiagg":this.getView().getModel("pmsmodel").getData().pmsdetails.Zkpiagg,
	    			   "Zsugvara3":this.getView().getModel("pmsmodel").getData().pmsdetails.Zsugvara3,
	    			   "Zsugvarb3":this.getView().getModel("pmsmodel").getData().pmsdetails.Zsugvarb3,
	    			   "Zsugvara4":this.getView().getModel("pmsmodel").getData().pmsdetails.Zsugvara4,
	    			   "Zsugvarb4":this.getView().getModel("pmsmodel").getData().pmsdetails.Zsugvarb4,
	    			   "Zsugvara5":this.getView().getModel("pmsmodel").getData().pmsdetails.Zsugvara5,
	    			   "Zsugvarb5":this.getView().getModel("pmsmodel").getData().pmsdetails.Zsugvarb5,
	    			   "Zzrole": this.section,
	    			   "Zkpiagg":this.getView().getModel("pmsmodel").getData().pmsdetails.Zkpiagg,
	    			   
	    			   "BACCOM14":this.getView().getModel("pmsmodel").getData().pmsdetails.BACCOM14,
	    			   "EXCCONTI15":this.getView().getModel("pmsmodel").getData().pmsdetails.EXCCONTI15,
	    			   "SIGFAIL16":this.getView().getModel("pmsmodel").getData().pmsdetails.SIGFAIL16,
	    			   "DELAY17":this.getView().getModel("pmsmodel").getData().pmsdetails.DELAY17,
	    			   "Zrexcgood":this.getView().getModel("pmsmodel").getData().pmsdetails.Zrexcgood,
	    			   "Zaarexcgood":this.getView().getModel("pmsmodel").getData().pmsdetails.Zaarexcgood,
	    			   "Zaaoverass":this.getView().getModel("pmsmodel").getData().pmsdetails.Zaaoverass,
	    			   "Zzsection":section,
	    			   "pms_honoursSet":pms_honoursSet,
	    			   "pms_leavesSet":pms_leavesSet,
	    			   "pms_perappSet":pms_perappSet,
	    			   "pms_acrSet": this.getView().getModel("pmsmodel").getData().pms_acrSet,
                       "pms_caseSet":pms_caseSet,
                       "pms_kpiSet": this.getView().getModel("pmsmodel").getData().pms_kpiSet,
                       "pms_s3c1Set": this.getView().getModel("pmsmodel").getData().pms_s3c1Set,
                       "pms_s3c2Set":this.getView().getModel("pmsmodel").getData().pms_s3c2Set,
                       "pms_trainingSet":this.getView().getModel("pmsmodel").getData().pms_trainingSet,
                       "pms_trtopicSet":pms_trtopicSet,
                       "pms_trgradeSet":this.getView().getModel("pmsmodel").getData().pms_trgradeSet,
                       "pms_revass4Set":this.getView().getModel("pmsmodel").getData().pms_revass4Set,
                       "pms_revgrade4Set":this.getView().getModel("pmsmodel").getData().pms_revgrade4Set
						
	       }
	       
	       return this.senddata(this.pmsdetails);
			},
		
	});
});