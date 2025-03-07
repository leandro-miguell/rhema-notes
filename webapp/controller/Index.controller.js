sap.ui.define([
    './BaseController',
    'sap/ui/Device',
	'sap/ui/model/json/JSONModel',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Device, JSONModel) {
        "use strict";

        return BaseController.extend("workbench.controller.Index", {
            onInit: function () {
			
            },

            onBeforeRendering(){
                var oModel = this.getModel("oModelDashboard");
			    oModel.loadData(sap.ui.require.toUrl("workbench/model/navegacao.json"), null, false);
			    this.getView().setModel(oModel);
            },

            onMenuButtonPress() {
                const toolPage = this.byId("toolPage");
                toolPage.setSideExpanded(!toolPage.getSideExpanded());
            },

            onItemSelect(oEvent) {
                const item = oEvent.getParameter('item');
                const key = item.mProperties.key
                this.navToItemSelected(item,key);
                this.onMenuButtonPress();
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
