var assignmentsDataSource = null;
var assignmentUid;
var assignmentModel;
var assignmentMeetingCreated = "N";

function assignmentsListViewDataInit(e)
{
    e.view.element.find("#assignmentsListView")
        .kendoMobileListView
        (
            {
                dataSource: assignmentsDataSource,
                template: $("#assignmentsListViewTemplate").html()
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                touchstart: assignmentsTouchStart,
                swipe: assignmentsSwipe
            }
        );
}

function assignmentsListViewDataShow(e)
{
    setAssignmentsDataSource();

    $("#assignmentsListView").data("kendoMobileListView").setDataSource(assignmentsDataSource);

    e.view.scroller.reset();
}

function assignmentsSwipe(e)
{
    if (e.direction === "left")
    {
        var detailbutton = $(e.touch.currentTarget).find("[data-role=detailbutton]");
        var tabstrip = kendo.fx($(e.touch.currentTarget).find("div.swipeButtons"));

        detailbutton.hide();
        tabstrip.expand().duration(200).play();
    }
}

function assignmentsTouchStart(e)
{
    var target = $(e.touch.initialTouch);
    var listview = $("#assignmentsListView").data("kendoMobileListView");
    var model = assignmentsDataSource.getByUid($(e.touch.target).attr("data-uid"));
    var detailbutton = $(e.touch.target).find("[data-role=detailbutton]");
    var tabstrip = $(e.touch.target).find("div.swipeButtons:visible");

    if (target.closest("div.swipeButtons")[0])
    {
        var button = target.closest("[data-role=button]")[0];
        var buttonIcon = button.attributes["name"].value;
        var legislatorId = model.LegislatorId;
        var initiativeId = model.InitiativeId;
        var surveyId = model.SurveyId;
        var assignmentId = model.AssignmentId;

        switch(buttonIcon)
        {
            case "add":
                isAddMeeting = "Y";

                app.navigate("views/meeting.html?legislatorId=" + legislatorId + "&initiativeId=" + initiativeId + "&surveyId=" + surveyId + "&assignmentId=" + assignmentId);

                break;

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

function onAssignmentsGroupSelect(e)
{
    var index = this.current().index();

    if (index === 0)
    {
        assignmentMeetingCreated = "";
    }
    else if (index === 1)
    {
        assignmentMeetingCreated = "N";
    }
    else
    {
        assignmentMeetingCreated = "Y";
    }

    setAssignmentsDataSource();

    $("#assignmentsListView").data("kendoMobileListView").setDataSource(assignmentsDataSource);
}

function setAssignmentsDataSource()
{
    var apiReadUrl;
    
    //if (isPci)
    //{
    //    apiReadUrl = apiBaseServiceUrl + "assignments?meetingcreated=" + assignmentMeetingCreated;
    //}
    //else
    //{
    apiReadUrl = apiBaseServiceUrl + "assignments?meetingcreated=" + assignmentMeetingCreated + "&companyId=" + companyId;  // companyId declared and set in the login.js
    //}

    assignmentsDataSource = new kendo.data.DataSource
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
                }
            },
            schema:
            {
                model:
                {
                    id: "AssignmentId",
                    fields:
                    {
                        AssignmentId: "AssignmentId",
                        CompanyId: "CompanyId",
                        Company: "Company",
                        InitiativeId: "InitiativeId",
                        Initiative: "Initiative",
                        SurveyId: "SurveyId",
                        Survey: "Survey",
                        LegislatorId: "LegislatorId",
                        Legislator: "Legislator",
                        Party: "Party",
                        PartyName: "PartyName",
                        State: "State",
                        StateName: "StateName",
                        CommitteeIds: "CommitteeIds",
                        Committees: "Committees",
                        CreatedDate: "CreatedDate",
                        CompletionDate: "CompletionDate",
                        AssignmentStatusCode: "AssignmentStatusCode",
                        AssignmentStatus: "AssignmentStatus",
                        MeetingCreated: "MeetingCreated",
                        MeetingId: "MeetingId"
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
                //alert("Status: " + e.status + "; Error message: " + e.errorThrown + "; Error detail: " + e.xhr.responseText);
                alert("An error has occurred in the application.  Please contact support.");
            }
        }
    );
}