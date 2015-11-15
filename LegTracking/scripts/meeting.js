//var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';
var token = 'http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=jonathon.leslie%40pciaa.net&TokenId=9ba3e4e1-efd7-4ac2-8230-60cf01d9137b&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=jonathon.leslie%40pciaa.net&PersonID=47561&FirstName=Jonathon&MiddleName=&LastName=Leslie&FullName=Leslie%2c+Jonathon&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-3699&Extension=&Fax=847-297-5064&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=52112&Supervisor=DAngelo%2c+Tony+E&Title=Project+Manager%2c+Information+Technology&EmailAddress=jonathon.leslie%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Amicus+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Sender&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+User&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fdev.pciaa.net%2f&ExpiresOn=1445884400&HMACSHA256=vVyMUM0ntSXhTaMBdHYSe3e36LMYp53EwOIqbShOzgs%3d';

var meetingUid = null;
var meetingModel = null;

var collapsible = $("#collapsible").kendoMobileButtonGroup();

var meetingInitiativeData =
    [
        {
            id: 1,
            name: "Initiatives",
            label: "Initiatives",
            url: "views/meetinginitiatives.html?uid="
        },
        {
            id: 2,
            name: "Initiative Surveys",
            label: "Initiative Surveys",
            url: "views/initiativesurveys.html?uid="
        }
    ];

var meetingInitiativeDataSource = new kendo.data.DataSource
(
    {
        data: meetingInitiativeData,
        schema:
        {
            model:
            {
                id: "id",
                fields:
                {
                    Id: "id",
                    Name: "name",
                    Label: "label",
                    Url: "url"
                }
            }
        }
    }
);

var legislatorsOptionsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    // the remote service url
                    url: apiBaseServiceUrl + "list",

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
            },
            schema:
            {
                model:
                {
                    Id: "LegislatorId",
                    fields:
                    {
                        Value: "LegislatorId",
                        Text: "FullName"
                    }
                }
            }
        }
    );

var attendeeTypesOptionsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    // the remote service url
                    url: apiBaseServiceUrl + "meetingattendeetypes",

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
            },
            schema:
            {
                model:
                {
                    Id: "AttendeeTypeId",
                    fields:
                    {
                        Value: "AttendeeTypeId",
                        Text: "Type"
                    }
                }
            }
        }
    );

var meetingLocationsOptionsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    // the remote service url
                    url: apiBaseServiceUrl + "meetinglocations",

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
            },
            schema:
            {
                model:
                {
                    Id: "MeetingLocationId",
                    fields:
                    {
                        Value: "MeetingLocationId",
                        Text: "Location"
                    }
                }
            }
        }
    );

var meetingOtherData =
    [
        {
            id: 1,
            name: "PCI Attendees",
            label: "PCI Attendees",
            url: "views/profiles.html?type=meeting&uid="
        }
    ];

var meetingOtherDataSource = new kendo.data.DataSource
(
    {
        data: meetingOtherData,
        batch: true,
        schema:
        {
            model:
            {
                id: "id",
                fields:
                {
                    Id: "id",
                    Name: "name",
                    Label: "label",
                    Url: "url"
                }
            }
        }
    }
);

function meetingListViewDataInit(e)
{
    e.view.element.find("#meetingInitiativeListView")
        .kendoMobileListView
        (
           {
               dataSource: meetingInitiativeDataSource,
               template: $("#meetingInitiativeListViewTemplate").html()
           }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                tap: meetingInitiativeNavigate
            }
        );

    e.view.element.find("#meetingOtherListView")
        .kendoMobileListView
        (
           {
               dataSource: meetingOtherDataSource,
               template: $("#meetingOtherListViewTemplate").html()
           }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                tap: meetingOtherNavigate
            }
        );

    //var view = e.view;

    //view.element.find("#done")
    //    .data("kendoMobileButton")
    //        .bind
    //        (
    //            "click",
    //            function ()
    //            {
    //                meetingsDataSource.one
    //                (
    //                    "change",
    //                    function ()
    //                    {
    //                        view.loader.hide();

    //                        kendo.mobile.application.navigate("#:back");
    //                    }
    //                );

    //                view.loader.show();

    //                meetingsDataSource.sync();
    //            }
    //        );

    //view.element.find("#cancel")
    //    .data("kendoMobileBackButton")
    //        .bind
    //        (
    //            "click",
    //            function (e)
    //            {
    //                e.preventDefault();
    //                meetingsDataSource.one
    //                (
    //                    "change",
    //                    function ()
    //                    {
    //                        view.loader.hide();

    //                        kendo.mobile.application.navigate("#:back");
    //                    }
    //                );

    //                view.loader.show();

    //                meetingsDataSource.cancelChanges();
    //            }
    //        );
}

function meetingListViewDataShow(e)
{
    meetingUid = e.view.params.uid;
    var legislatorId = e.view.params.legislatorId;

    if (meetingUid != null)
    {
        if (meetingsDataSource != null)
        {
            meetingModel = meetingsDataSource.getByUid(meetingUid);

            meetingModel.MeetingDate = kendo.toString(kendo.parseDate(meetingModel.MeetingDate, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        }
    }
    else if (legislatorId != null)
    {
        meetingModel = kendo.data.Model.define( {
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
        });

        meetingModel.LegislatorId = legislatorId;
    }

    var viewModel = kendo.observable({
        meetingItem: meetingModel,
        legislatorsOptions: legislatorsOptionsDataSource,
        attendeeTypesOptions: attendeeTypesOptionsDataSource,
        meetingLocationsOptions: meetingLocationsOptionsDataSource
    });

    kendo.bind(e.view.element, viewModel, kendo.mobile.ui);

    var view = e.view;

    view.element.find("#done-button")
        .data("kendoMobileButton")
            .bind
            (
                "click",
                function ()
                {
                    meetingsDataSource.one
                    (
                        "change",
                        function ()
                        {
                            view.loader.hide();

                            kendo.mobile.application.navigate("#:back");
                        }
                    );

                    view.loader.show();

                    var meetingUpdateModel = meetingsDataSource.getByUid(meetingUid);

                    meetingUpdateModel.set("AttendeeTypeId", 3);

                    //meetingsDataSource.sync();
                }
            );
}

function meetingInitiativeNavigate(e) 
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = meetingInitiativeDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var id = null;

    if (url == "views/initiativesurveys.html?uid=")
    {
        id = meetingModel.LegislatorId;

        if (id === undefined)
        {
            alert('In order to view initiative surveys, the meeting must be saved first.');
        }
        else
        {
            kendo.mobile.application.navigate(url + id);
        }
    }
    else
    {
        id = meetingModel.MeetingId;

        if (id === undefined)
        {
            alert('In order to view initiatives, the meeting must be saved first.');
        }
        else
        {
            kendo.mobile.application.navigate(url + id);
        }
    }
}

function meetingOtherNavigate(e)
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = meetingOtherDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var id = meetingModel.MeetingId;

    if (id === undefined)
    {
        alert('In order to view meeting attendees, the meeting must be saved first.');
    }
    else
    {
        kendo.mobile.application.navigate(url + id);
    }
}

function saveMeeting()
{
    meetingsDataSource.sync();
}