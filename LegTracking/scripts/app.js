
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


function GetURLParameter(sParam)
{
    var sPageURL = window.location.hash.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}