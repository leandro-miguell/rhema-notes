/* eslint-disable linebreak-style */
sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/core/Fragment",
      'sap/ui/core/library',
      /**
       * @param {typeof sap.ui.core.mvc.Controller} Controller
       */
    ],
    function (Controller,Fragment,coreLibrary) {
      "use strict";
  
      return Controller.extend(
        "workbench.controller.BaseController",
        {
          getModel: function (nameModel) {
            return this.getView().getModel(nameModel);
          },
  
          getBaseURL: function () {
            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);
            return appModulePath;
          },
  
          getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
          },
  
          getBundleMessage: function (name, args) {
            var oBundle = this.getResourceBundle();
            var message = "";
            if (args) {
              message = oBundle.getText(name, args[0]);
            } else {
              message = oBundle.getText(name);
            }
            return message;
          },
  
          openFragment(dialogName) {
            if (!this[dialogName]) {
                this[dialogName] = sap.ui.xmlfragment("workbench.view.fragments." + dialogName, this);
                this.getView().addDependent(this[dialogName]);
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this[dialogName]);
            }
            this[dialogName].open();
            },

            closeFragment(dialogName){
            this[dialogName].close();
            },
          limitDateInput(oEvent){
            
            if (oEvent) {
              var valor = oEvent.getParameters().value;
              var id = oEvent.getParameters().id.split('_')[1];
              oEvent.getSource().setValue(valor);
              if(id == 'IDDateTimePicker'){
                if(valor.length>=17){
                  oEvent.getSource().setValue("");
                }else{
                  oEvent.getSource().setValue(valor);
                }
              }else{
                if(valor.length>=11){
                  oEvent.getSource().setValue("");
                }else{
                  oEvent.getSource().setValue(valor);
                }
              }
            } 
          },
  
          handleChange: function (oEvent) {
            var ValueState = coreLibrary.ValueState;
            var oValidatedComboBox = oEvent.getSource(),
              sSelectedKey = oValidatedComboBox.getSelectedKey(),
              sValue = oValidatedComboBox.getValue();
      
            if (!sSelectedKey && sValue) {
              oValidatedComboBox.setValueState(ValueState.Error);
              oValidatedComboBox.setValueStateText("Por favor, entre com um valor correto!");
              oValidatedComboBox.setValue("");
            } else {
              oValidatedComboBox.setValueState(ValueState.None);
            }
          }
        }
      );
    }
  );
  