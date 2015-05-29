
(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    // create an object to store the models for each view
    window.APP = {
      models: {
        legislators: {
          title: 'Legislators'
        },
        meetings: {
          title: 'Meetings'
        },
        actionItems: {
          title: 'Action Items'
        },
        pciContacts: {
          title: 'PCI Contacts'
       
        }
      }
    };

}());
