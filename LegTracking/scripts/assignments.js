var assignmentsDataSource = null;
var assignmentUid;
var assignmentModel;
var assignmentMeetingCreated = "N";
var assignmentsFilter = "";

function assignmentsListViewDataInit(e)
{
    e.view.element.find("#assignmentsListView")
        .kendoMobileListView
        (
            {
                dataSource: assignmentsDataSource,
                template: $("#assignmentsListViewTemplate").html(),
                filterable: true,
                endlessScroll: true
            }
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true,
                tap: assignmentsTap,
                touchstart: assignmentsTouchStart,
                swipe: assignmentsSwipe
            }
        );

    $('input[type="search"]').keyup
    (
        function (e)
        {
            if (e.keyCode === 13)
            {
                $(this).blur(); //iOS likes to keep the keyboard open ... so remove focus to close it
            }
        }
    );
}

function assignmentsListViewDataShow(e)
{
    // Set the highlighted tabstrip icon.
    var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    tabstrip.switchTo(tabstripPathName);

    if (window.navigator.simulator !== true)
    {
        if (window.plugins !== undefined && window.plugins.spinnerDialog !== undefined)
        {
            window.plugins.spinnerDialog.hide();
        }
    }

    app.showLoading();

    var assignmentsListView = $("#assignmentsListView").data("kendoMobileListView");
    assignmentsListView.scroller().reset(); //reset the scroller

    setAssignmentsDataSource();

    assignmentsListView.setDataSource(assignmentsDataSource);

    if (assignmentsFilter !== "")
    {
        assignmentsListView._filter.searchInput[0].value = assignmentsFilter;
    }

    e.view.scroller.reset();
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

    assignmentsListView._filter.searchInput[0].value = assignmentsFilter; //set search text
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

function assignmentsTap(e)
{
    // Close the keyboard.
    $('input[type="search"]').blur();

    var uid = $(e.touch.currentTarget).data("uid");

    app.navigate("views/assignment.html?uid=" + uid);
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

function setAssignmentsDataSource()
{
    assignmentsDataSource = null;

    assignmentsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "assignmentsfilter",
                    type: "get",
                    dataType: "json",
                    async: false, // Work-around for now to get datasource sync to complete before show event finishes... 
                                // This is being deprecated and another approach will need to be developed in the near future.
                    beforeSend: function (xhr)
                    {
                        xhr.setRequestHeader("Authorization", token);
                    },
                    error: function (xhr, ajaxOptions, thrownError)
                    {
                        alert("error " + xhr.responseText);
                    }
                },
                parameterMap: function (options)
                {
                    if (options.filter === null)
                    {
                        assignmentsFilter = "";
                    }
                    else if (options.filter)
                    {
                        assignmentsFilter = options.filter.filters[0].value;
                    }

                    //alert(companyId);

                    return {
                        meetingCreated: assignmentMeetingCreated,
                        filter: assignmentsFilter, //options.filter ? options.filter.filters[0].value : '',
                        page: options.page,
                        pageSize: options.pageSize,
                        companyId: companyId
                    };
                }
            },
            change: function (data)
            {
                app.hideLoading();
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
                },
                parse: function (data)
                {
                    // assign top level array to property
                    data.data = data;
                    // assign the count off one of the fields to a new total field
                    data.total = data.data[0].Total;

                    return data;
                },
                total: function (data)
                {
                    return data.total;
                }
            },
            serverPaging: true,
            serverFiltering: true,
            pageSize: 50
        }
    );
}