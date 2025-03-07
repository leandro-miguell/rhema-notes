sap.ui.define([
    './BaseController',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("workbench.controller.Index", {
            onInit: function () {
			
            },

            onBeforeRendering(){
                var oModel = this.getModel("oModelDashboard");
			    oModel.loadData(sap.ui.require.toUrl("workbench/model/navegacao.json"), null, false);
			    this.getView().setModel(oModel);
            },

            onMenuButtonPress(oEvent) {
                const button = oEvent?.sId;
                const toolPage = this.byId("toolPage");
                if(toolPage.getSideExpanded()){
                    toolPage.setSideExpanded(!toolPage.getSideExpanded());
                    return;
                }
                if(button == "menuButtonPressed"){
                    toolPage.setSideExpanded(!toolPage.getSideExpanded())
                }
            },

            onItemSelect(oEvent) {
                const item = oEvent.getParameter('item');
                const key = item.mProperties.key
                this.navToItemSelected(item,key);
                this.onMenuButtonPress();
            },

            onExpanded(oEvent){
                var oSelectedItem = oEvent.getParameter("item"); 
                
                if (oSelectedItem.getItems().length > 0) {
                    var bExpanded = oSelectedItem.getExpanded();
                    
                    oSelectedItem.setExpanded(!bExpanded);
                }else{
                    this.onItemSelect(oEvent);
                }
            },

            navToItemSelected(item,key){
                switch (key) {
                    case "dashboard":
                        this.byId("pageContainer").to(this.getView().createId(item.getKey()));
                        break;
                
                    case "introducao_teologia":
                        this.byId("pageContainer").to(this.getView().createId(item.getKey()));
                        break;
                    case "teologia_biblica":
                            this.byId("pageContainer").to(this.getView().createId(item.getKey()));
                            break;
                    default:
                        break;
                }
            },
    
            navToMinhasAprovacoes(){
                var sUrl = "https://essentialone-dev-g48xsdto.launchpad.cfapps.us10.hana.ondemand.com/df242942-22b9-4bbf-a3e1-74ce1d604044.purchaserequisitions.essentialonepurchaserequisitions-1.0.8/index.html#RouteMyApprovals";
                window.open(sUrl, "_blank");
            },
    
        });
    });
