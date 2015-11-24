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
    
    if (meetingsReference === "legislator")
    {
        dataTitle = "Meetings";
    }
    else
    {
        dataTitle = "My Meetings";
    }
    
    setMeetingsDataSource();

    e.view.element.find("#add-button")
        .data("kendoMobileButton")
            .bind
            (
                "click",
                function ()
                {
                    if (meetingsReference === "legislator")
                    {
                        app.navigate("views/meeting.html?isAdd=Y&legislatorId=" + meetingLegislatorId);                        
                    }
                    else
                    {
                        app.navigate("views/meeting.html?isAdd=Y");
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

    app.navigate("views/meeting.html?uid=" + meetingUid);
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
    
    if (meetingsReference === "legislator")
    {
        apiReadUrl = apiBaseServiceUrl + "meetings?legislatorId=" + meetingLegislatorId + "&recentMeetings=" + recentMeetings;
    }
    else
    {
        apiReadUrl = apiBaseServiceUrl + "meetings?personId=" + personId + "&recentMeetings=" + recentMeetings;  // personId is set in the legislators.js
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