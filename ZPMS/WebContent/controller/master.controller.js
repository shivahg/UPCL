sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZPMS.ZPMS.controller.master", {

		
		onInit: function () {
		var t = this;
		debugger;
		 var oRouter=new sap.ui.core.UIComponent.getRouterFor(t);
	          oRouter.getRoute("master").attachPatternMatched(t.onObjectMatched,t);
         

		},
		
		onObjectMatched:function(evt){
		debugger;
		this.flag= evt.getParameter("arguments").key;
		this.Apid=evt.getParameter("arguments").Apid;
			this.section =[];
		
			
			if(this.flag === "1"){
			this.section.push(
			{
				section : "Employee Appraissel",
                    key:"1"
                    },
                    {
				section:"Self Appraisal",
                    key : "2"
			
			}
			);
			}
			
			else if(this.flag === "2"){
			this.section.push(
			{
			section: "Employee Appraissel",
              key:"1"

			},{
				section:"Self Appraisal",
                    key : "2"
			
			},
			 {
                section:"Appraisal by Reporting Officer",
                 key : "3"
                 }
			);
			}
			else if(this.flag === "3"){
			this.section.push(
			{
			section : "Employee Appraissel",
               key :"1"
                },
                {
			
			section:"Self Appraisal",
               key : "2"
                    },
                    {
                   section:"Appraisal by Reporting Officer",
                    key : "3"
                    },
                    {
                        section:"Assessment by Reviewing Authority",
                         key : "4"
                         }
                    );
			}
			else if(this.flag === "4"){
			this.section.push(
			{
			section:"Employee Appraissel",
               key:"1"

			},
			{
				section:"Self Appraisal",
                    key:"2"
                    },
                    
                    	{
                   section:"Appraisal by Reporting Officer",
                    key :"3"
                    },
                    	{
                   section:"Assessment by Reviewing Authority",
                    key : "4"
                    },
                    {
                        section:"Accepting Authority",
                         key : "5"
                         }
			
			);
			}
			else if(this.flag === "5"){
			this.section.push(
			{
			section:"Employee Appraissel",
               key:"1"

			},
			{
				section:"Self Appraisal",
                    key : "2"
                    },
                    
                    	{
                   section:"Appraisal by Reporting Officer",
                    key :"3"
                    },
                    	{
                   section:"Assessment by Reviewing Authority",
                    key : "4"
                    },
                    {
                   section:"Accepting Authority",
                    key : "5"
                    },
                    {
                        section:"Director",
                         key : "6"
                         }
			
			);
			}
		
			
		
			
	   var sectiondata=new sap.ui.model.json.JSONModel();
       sectiondata.setData(this.section);
       this.getView().setModel(sectiondata,"sections");
		},
		
		sectionselection:function(evt){
		/*	var section=evt.oSource.mProperties.title;*/
			/*var spath=evt.mParameters.id.slice(38);*/
			var spath=evt.getSource().getBindingContextPath().slice(1);
			
			var section;var router;
			
				section=spath;
				 router=this.getOwnerComponent().getRouter();
				router.navTo("pmspage",{s1:section,Apid:this.Apid});
			
			
			
		
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZPMS.ZPMS.view.master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZPMS.ZPMS.view.master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZPMS.ZPMS.view.master
		 */
		//	onExit: function() {
		//
		//	}

	});

});