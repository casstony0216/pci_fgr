//var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';
var token = 'http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=jonathon.leslie%40pciaa.net&TokenId=9ba3e4e1-efd7-4ac2-8230-60cf01d9137b&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=jonathon.leslie%40pciaa.net&PersonID=47561&FirstName=Jonathon&MiddleName=&LastName=Leslie&FullName=Leslie%2c+Jonathon&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-3699&Extension=&Fax=847-297-5064&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=52112&Supervisor=DAngelo%2c+Tony+E&Title=Project+Manager%2c+Information+Technology&EmailAddress=jonathon.leslie%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Amicus+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Sender&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+User&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fdev.pciaa.net%2f&ExpiresOn=1445884400&HMACSHA256=vVyMUM0ntSXhTaMBdHYSe3e36LMYp53EwOIqbShOzgs%3d';

var meetingsDataSource = null;

//var  dataSourceMeetings = new kendo.data.DataSource({
//         data: dsMeetings,
//     	 batch: true,
//    //,
//          //  transport: {
//          //      read:  {
//          //          url: crudServiceBaseUrl + "/Products",
//          //          dataType: "jsonp"
//          //      },
//          //      update: {
//          //          url: crudServiceBaseUrl + "/Products/Update",
//          //          dataType: "jsonp"
//          //      },
//          //      destroy: {
//          //          url: crudServiceBaseUrl + "/Products/Destroy",
//          //          dataType: "jsonp"
//           //     },
//            //    parameterMap: function(options, operation) {
//            //        if (operation !== "read" && options.models) {
//           //             return {models: kendo.stringify(options.models)};
//           //         }
//           //     }
//          //  ,
//         //   batch: true,
//            schema: {
//                model: {
//                    id: "id",
//                    fields: {
//                        Id: "id",
//                        TypeId:"typeId",
//                        Name: "name",
//                        Date: "date",
//                        Staffer: "staffer",
//                        Notes: "notes",
//                        Phone: "phone"      
//                    }
//                }
//            }
//        });

function meetingsListViewDataInit(e)
{

}

function meetingsListViewDataShow(e)
{
    var apiUrl = null;
    var legislatorId = e.view.params.uid;
    
    if (legislatorId == undefined)
    {
        apiUrl = "http://dev.pciaa.net/pciwebsite/congressapi/legislators/meetings"
    }
    else
    {
        apiUrl = "http://dev.pciaa.net/pciwebsite/congressapi/legislators/legislatormeetings?legislatorId=" + legislatorId;
    }
    
    meetingsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    // the remote service url
                    url: apiUrl,

                    // the request type
                    type: "get",

                    // the data type of the returned result
                    dataType: "json",

                    // crossDomain: true, // enable this,
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },

                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                }
                //,
                //parameterMap: function (options, operation)
                //{
                //    if (operation === "read")
                //    {
                //        options.MeetingDate = kendo.toString(kendo.parseDate(options.MeetingDate, 'yyyy-MM-dd'), 'MM/dd/yyyy');
                //    }

                //    return options;
                //}
            },
            batch: true,
            schema:
            {
                model:
                {
                    Id: "MeetingId",
                    fields:
                    {
                        MeetingId: "MeetingId",
                        MeetingDate: "MeetingDate",
                        Notes: "Notes",
                        LegislatorId: "LegislatorId",
                        FullName: "FullName",
                        Name: "Name",
                        AttendeeTypeId: "AttendeeTypeId",
                        AttendeeType: "AttendeeType",
                        MeetingLocationId: "MeetingLocationId",
                        Location: "Location",
                        LegislatorStaffAttendees: "LegislatorStaffAttendees",
                        PciContact: "PciContact"
                    }
                }
            }
        }
    );

    e.view.element.find("#meetingsListView")
        .kendoMobileListView
        (
            {
                dataSource: meetingsDataSource,
                template: $("#meetingsListViewTemplate").html()
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: meetingsTouchStart,
                tap: meetingsNavigate,
                swipe: meetingsSwipe
            }
        );

    $('.km-rightitem a').attr('href', 'views/meeting.html');
}

function meetingsNavigate(e)
{
    var uid = $(e.touch.currentTarget).data("uid");

    kendo.mobile.application.navigate("views/meeting.html?uid=" + uid);
}

function meetingsSwipe(e)
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));

    button.expand().duration(200).play();
}

function meetingsTouchStart(e)
{
    var target = $(e.touch.initialTouch),
        listview = $("#meetingsListView").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0])
    {
        model = dataSourceMeetings.getByUid($(e.touch.target).attr("data-uid"));
        dataSourceMeetings.remove(model);

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    }
    else if (button[0])
    {
        button.hide();

        //prevent `swipe`
        this.events.cancel();
    }
    else
    {
        listview.items().find("[data-role=button]:visible").hide();
    }
}

  