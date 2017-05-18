function assignmentListViewDataInit(e)
{
    
}

function assignmentListViewDataShow(e) 
{
    // Set the highlighted tabstrip icon.
    var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    tabstrip.switchTo(tabstripPathName);

    assignmentUid = e.view.params.uid;
    assignmentModel = assignmentsDataSource.getByUid(assignmentUid);
    
    kendo.bind(e.view.element, assignmentModel, kendo.mobile.ui);

    var addButton = e.view.element.find("#add-button").data("kendoMobileButton");
    addButton.element[0].text = "Add Meeting";

    addButton.unbind("click");
    addButton.bind
    (
        "click",
        function (e)
        {
            isAddMeeting = "Y";

            app.navigate("views/meeting.html?legislatorId=" + assignmentModel.LegislatorId + "&initiativeId=" + assignmentModel.InitiativeId + "&surveyId=" + assignmentModel.SurveyId + "&assignmentId=" + assignmentModel.AssignmentId);
        }
    );

    var spanElement = e.view.element.find('span[id="meetingCreated"]');

    if (assignmentModel.MeetingCreated === 'Y')
    {
        e.view.element.find("#add-button").hide();

        spanElement[0].innerText = "Yes";

        $('ul.formArea li#meetingCreated').show();
        $('ul.formArea li#lobbyist').show();
    }
    else
    {
        e.view.element.find("#add-button").show();

        spanElement[0].innerText = "No";

        $('ul.formArea li#meetingCreated').hide();
        $('ul.formArea li#lobbyist').hide();
    }

    e.view.scroller.reset();
}