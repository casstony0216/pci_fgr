//var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';
var token = 'http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=jonathon.leslie%40pciaa.net&TokenId=9ba3e4e1-efd7-4ac2-8230-60cf01d9137b&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=jonathon.leslie%40pciaa.net&PersonID=47561&FirstName=Jonathon&MiddleName=&LastName=Leslie&FullName=Leslie%2c+Jonathon&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-3699&Extension=&Fax=847-297-5064&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=52112&Supervisor=DAngelo%2c+Tony+E&Title=Project+Manager%2c+Information+Technology&EmailAddress=jonathon.leslie%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Amicus+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Sender&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+User&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fdev.pciaa.net%2f&ExpiresOn=1445884400&HMACSHA256=vVyMUM0ntSXhTaMBdHYSe3e36LMYp53EwOIqbShOzgs%3d';

var meetingsReference = null;
var meetingsDataSource = null;
var meetingUid;
var meetingModel;
var meetingLegislatorId = null;
var recentMeetings = "Y";

function meetingsListViewDataInit(e)
{
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
}

function meetingsListViewDataShow(e)
{
    meetingLegislatorId = e.view.params.legislatorId;
    meetingsReference = e.view.params.reference;
    
    var dataTitle = null;
    
    if (meetingsReference === "meeting")
    {
        dataTitle = "My Meetings";
    }
    else
    {
        dataTitle = "Meetings";
    }
    
    setMeetingsDataSource();

    e.view.element.find("#add-button")
        .data("kendoMobileButton")
            .bind
            (
                "click",
                function ()
                {
                    if (meetingsReference === "meeting")
                    {
                        kendo.mobile.application.navigate("views/meeting.html?isAdd=Y");
                    }
                    else
                    {
                        kendo.mobile.application.navigate("views/meeting.html?isAdd=Y&legislatorId=" + meetingLegislatorId);
                    }
                }
            );

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(dataTitle);

    $("#meetingsListView").data("kendoMobileListView").setDataSource(meetingsDataSource);

}

function meetingsNavigate(e)
{
    meetingUid = $(e.touch.currentTarget).data("uid");

    kendo.mobile.application.navigate("views/meeting.html?uid=" + meetingUid);
}

function meetingsSwipe(e)
{
    if (e.direction === "left")
    {
        var detailbutton = $(e.touch.currentTarget).find("[data-role=detailbutton]");
        var tabstrip = kendo.fx($(e.touch.currentTarget).find("div.swipeButtons"));

        detailbutton.hide();
        tabstrip.expand().duration(200).play();
    }
}

function meetingsTouchStart(e)
{
    var target = $(e.touch.initialTouch);
    var listview = $("#meetingsListView").data("kendoMobileListView");
    var model = meetingsDataSource.getByUid($(e.touch.target).attr("data-uid"));
    var detailbutton = $(e.touch.target).find("[data-role=detailbutton]");
    var tabstrip = $(e.touch.target).find("div.swipeButtons:visible");

    if (target.closest("div.swipeButtons")[0])
    {
        var button = target.closest("[data-role=button]")[0];
        var buttonIcon = button.attributes["data-icon"].value;

        switch (buttonIcon)
        {
            case "delete-e":
                meetingsDataSource.remove(model);
                meetingsDataSource.sync();

            default:
                // Do nothing...

        }
        
        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    }
    else if (tabstrip[0])
    {
        tabstrip.hide();
        detailbutton.show();

        //prevent `swipe`
        this.events.cancel();
    }
    else
    {
        listview.items().find("[data-role=detailbutton]").show();
        listview.items().find("div.swipeButtons:visible").hide();
    }
}

function onMeetingsGroupSelect(e)
{
    var index = this.current().index();

    if (index === 0)
    {
        recentMeetings = "Y";
    }
    else
    {
        recentMeetings = "N";
    }

    setMeetingsDataSource();

    $("#meetingsListView").data("kendoMobileListView").setDataSource(meetingsDataSource);
}

function setMeetingsDataSource()
{
    var apiReadUrl = null;
    var apiCreateUrl = apiBaseServiceUrl + "insertupdatemeeting";
    var apiUpdateUrl = apiBaseServiceUrl + "insertupdatemeeting";
    var apiDestroyUrl = apiBaseServiceUrl + "deletemeeting";
    
    if (meetingsReference === "meeting")
    {
        apiReadUrl = apiBaseServiceUrl + "meetings?personId=" + personId + "&recentMeetings=" + recentMeetings;  // personId is set in the legislators.js
    }
    else
    {
        apiReadUrl = apiBaseServiceUrl + "meetings?legislatorId=" + meetingLegislatorId + "&recentMeetings=" + recentMeetings;
    }
    
    meetingsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiReadUrl,
                    type: "get",
                    dataType: "json",
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                },
                create:
                {
                    url: apiCreateUrl,
                    type: "post",
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
                },
                update:
                {
                    url: apiUpdateUrl,
                    type: "post",
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
                },
                destroy:
                {
                    url: apiDestroyUrl,
                    type: "post",
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
                },
                parameterMap: function (options, operation)
                {
                    if (operation !== "read")
                    {
                        return options;
                    }
                }
            },
            schema:
            {
                model:
                {
                    id: "MeetingId",
                    fields:
                    {
                        MeetingId: { editable: true },
                        MeetingDate: { editable: true, validation: { required: true } },
                        AttendeeTypeId: { editable: true, validation: { required: true } },
                        AttendeeType: { editable: true },
                        PersonId: { editable: true },
                        PciContact: { editable: true },
                        LegislatorId: { editable: true, validation: { required: true } },
                        FullName: { editable: true },
                        Name: { editable: true },
                        PrimaryOfficeContact: { editable: true },
                        MeetingLocationId: { editable: true, validation: { required: true } },
                        Location: { editable: true },
                        LegislatorStaffAttendees: { editable: true },
                        FollowUpNeeded: { editable: true },
                        CreatorId: { editable: true },
                        Notes: { editable: true }
                    }
                }
            },
            error: function (e)
            {
                /* the e event argument will represent the following object:
        
                {
                    errorThrown: "Unauthorized",
                    sender: {... the Kendo UI DataSource instance ...}
                    status: "error"
                    xhr: {... the Ajax request object ...}
                }
        
                */
                alert("Status: " + e.status + "; Error message: " + e.errorThrown);
            }
        }
    );
}