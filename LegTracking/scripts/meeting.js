var collapsibleMeetingInformation = $("#collapsible").kendoMobileButtonGroup();

var isMeetingEditorDataSource = null;
var meetingInitiativeId = null;
var meetingSurveyId = null;
var meetingAssignmentId = null;

var meetingInitiativeData =
    [
        {
            id: 1,
            name: "initiatives",
            label: "Initiatives",
            url: "views/meetinginitiatives.html?uid="
        },
        {
            id: 2,
            name: "surveys",
            label: "Surveys",
            url: "views/surveys.html?legislatorId="
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
                    url: apiBaseServiceUrl + "list",
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
                    id: "LegislatorId",
                    fields:
                    {
                        Value: "LegislatorId",
                        Text: "FullName"
                    }
                }
            }
        }
    );

var meetingVenueTypesOptionsDataSource = new kendo.data.DataSource
    (
        {
            transport:
            {
                read:
                {
                    url: apiBaseServiceUrl + "meetingvenuetypes",
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
                    id: "VenueTypeId",
                    fields:
                    {
                        Value: "VenueTypeId",
                        Text: "VenueType"
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
                    url: apiBaseServiceUrl + "meetingattendeetypes",
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
                    id: "AttendeeTypeId",
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
                    url: apiBaseServiceUrl + "meetinglocations",
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
                    id: "MeetingLocationId",
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
                touchstart: meetingInitiativeTouchStart,
                tap: meetingInitiativeTap
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
                touchstart: meetingOtherTouchStart,
                tap: meetingOtherTap
            }
        );

    $("#meetingForm input").keyup
    (
        function (e)
        {
            if (e.keyCode === 13)
            {
                saveMeeting();

                $(this).blur(); //iOS likes to keep the keyboard open ... so remove focus to close it

                app.navigate("#:back");
            }
        }
    );
}

function meetingListViewDataShow(e)
{
    // Set the highlighted tabstrip icon.
    var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    tabstrip.switchTo(tabstripPathName);

    var legislatorId = e.view.params.legislatorId;
    var initiativeId, surveyId, assignmentId;
    var dataTitle = null;

    if (isAddMeeting === "Y")
    {
        meetingUid = null;

        meetingLegislatorId = legislatorId;

        initiativeId = e.view.params.initiativeId;
        surveyId = e.view.params.surveyId;
        assignmentId = e.view.params.assignmentId;

        if (initiativeId == undefined)
        {
            meetingInitiativeId = null;
        }
        else
        {
            meetingInitiativeId = initiativeId;
        }

        if (surveyId == undefined)
        {
            meetingSurveyId = null;
        }
        else
        {
            meetingSurveyId = surveyId;
        }

        if (assignmentId == undefined)
        {
            meetingAssignmentId = null;
        }
        else
        {
            meetingAssignmentId = assignmentId;
        }

        defineMeetingModel();

        dataTitle = "Add Meeting";

        $("#noneditormessages").hide();

        e.view.element.find("#save-button").show(); // Need to show in case it was hidden when editing meeting without rights.
    }
    else
    {
        if (meetingUid !== undefined && meetingUid !== null)
        {
            if (meetingsDataSource !== null)
            {
                meetingModel = meetingsDataSource.getByUid(meetingUid);

                meetingModel.MeetingDate = kendo.toString(kendo.parseDate(meetingModel.MeetingDate, 'yyyy-MM-dd'), 'yyyy-MM-dd');

                dataTitle = "Edit Meeting";

                var isMeetingEditor = false;

                setIsMeetingEditorDataSource(meetingModel.MeetingId);

                var data = isMeetingEditorDataSource.data();

                for (var i = 0; i < data.length; i++)
                {
                    if (data[i].IsEditor === "Y")
                    {
                        isMeetingEditor = true;

                        break;
                    }
                }

                if (!isCongressAdmin && !isMeetingEditor)
                {
                    $("#noneditormessages").show();

                    e.view.element.find("#save-button").hide();
                }
                else
                {
                    $("#noneditormessages").hide();

                    e.view.element.find("#save-button").show();
                }
            }
            else
            {
                alert("Error loading meeting information.");
            }
        }
        else
        {
            alert("Error loading meeting information.");
        }
    }

    var viewModel = kendo.observable({
        meetingItem: meetingModel,
        legislatorsOptions: legislatorsOptionsDataSource,
        meetingVenueTypesOptions: meetingVenueTypesOptionsDataSource,
        attendeeTypesOptions: attendeeTypesOptionsDataSource,
        meetingLocationsOptions: meetingLocationsOptionsDataSource
    });

    kendo.bind(e.view.element, viewModel, kendo.mobile.ui);
    
    $('#meetingnotes').val(meetingModel.Notes);

    var saveButton = e.view.element.find("#save-button").data("kendoMobileButton");

    saveButton.unbind("click");
    saveButton.bind
    (
        "click",
        function ()
        {
            if (saveMeeting())
            {
                meetingsDataSource.read();

                app.navigate("#:back");
            }
        }
    );

    $("#meetingLegislator").change
        (
            function ()
            {
                var optionSelected = $(this).find("option:selected");
                var textSelected = optionSelected.text();

                //meetingModel.set("FullName", textSelected);
                meetingModel.FullName = textSelected;
            }
        );
    
    $("#meetingAttendeeType").change
        (
            function ()
            {
                var optionSelected = $(this).find("option:selected");
                var textSelected = optionSelected.text();

                //meetingModel.set("AttendeeType", textSelected);
                meetingModel.AttendeeType = textSelected;
            }
        );
    
    $("#meetingLocation").change
        (
            function ()
            {
                var optionSelected = $(this).find("option:selected");
                var textSelected = optionSelected.text();

                //meetingModel.set("Location", textSelected);
                meetingModel.Location = textSelected;
            }
        );

    var navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    navbar.title(dataTitle);

    // clear validation messages from prior instance
    $("#meetingForm").find("span.k-tooltip-validation").hide();
    $("#meetingForm").find("input.k-invalid").removeClass('k-invalid');
    $("#meetingForm").find("select.k-invalid").removeClass('k-invalid');
    $("#meetingForm").find("span.invalid").removeClass('invalid');

    e.view.scroller.reset();
}

function meetingInitiativeTouchStart(e)
{
    $("#meetingForm input").blur();

    saveMeeting();
}

function meetingInitiativeTap(e) 
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = meetingInitiativeDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var legislatorId = null;
    var meetingId = null

    if (currentRecord.Name === "surveys")
    {
        legislatorId = meetingModel.LegislatorId;
        meetingId = meetingModel.MeetingId;
        
        if (meetingId === undefined)
        {
            alert('There was an error saving the meeting.');
        }
        else
        {
            surveysReference = "meeting";

            app.navigate(url + legislatorId + "&meetingId=" + meetingId);
        }
    }
    else
    {
        meetingId = meetingModel.MeetingId;
        
        if (meetingId === undefined)
        {
            alert('There was an error saving the meeting.');
        }
        else
        {
            app.navigate(url + meetingId);
        }
    }
}

function meetingOtherTouchStart(e)
{
    $("#meetingForm input").blur();

    saveMeeting();
}

function meetingOtherTap(e)
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = meetingOtherDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var meetingId = meetingModel.MeetingId;

    if (meetingId === undefined)
    {
        alert('There was an error saving the meeting.');
    }
    else
    {
        app.navigate(url + meetingId);
    }
}

function defineMeetingModel()
{
    var newLegislatorId = null;
    var newFullName = null;
    var newVenueTypeId = null;
    var newVenueType = null;
    var newAttendeeTypeId = null;
    var newAttendeeType = null;
    var newMeetingLocationId = null;
    var newLocation = null;

    var MeetingModel = kendo.data.Model.define
        (
            {
                id: "MeetingId",
                fields:
                {
                    MeetingId: { type: "number", editable: true },
                    MeetingDate: { type: "string", editable: true, validation: { required: true } },
                    VenueTypeId: { type: "number", editable: true, validation: { required: true } },
                    VenueType: { type: "string", editable: true },
                    AttendeeTypeId: { type: "number", editable: true, validation: { required: true } },
                    AttendeeType: { type: "string", editable: true },
                    LobbyistId: { type: "number", editable: true },
                    Lobbyist: { type: "string", editable: true },
                    LegislatorId: { type: "number", editable: true, validation: { required: true } },
                    FullName: { type: "string", editable: true },
                    Name: { type: "string", editable: true },
                    PciInitiatives: { type: "string", editable: false },
                    PrimaryOfficeContact: { type: "string", editable: true },
                    MeetingLocationId: { type: "number", editable: true, validation: { required: true } },
                    Location: { type: "string", editable: true },
                    LegislatorStaffAttendees: { type: "string", editable: true },
                    FollowUpNeeded: { type: "string", editable: true },
                    CreatorId: { type: "number", editable: true },
                    Notes: { type: "string", editable: true },
                    InitiativeId: { type: "number", editable: true },
                    SurveyId: { type: "number", editable: true },
                    AssignmentId: { type: "number", editable: true }
                }
            }
        );

    if (meetingLegislatorId !== undefined && meetingLegislatorId !== null)
    {
        newLegislatorId = meetingLegislatorId;

        if (legislatorsOptionsDataSource.data().length > 0)
        {
            var data = legislatorsOptionsDataSource.data();

            for (var i = 0; i < data.length; i++)
            {
                if (data[i].Value === newLegislatorId)
                {
                    newFullName = data[i].Text;

                    break;
                }
            }
        }
        else
        {
            legislatorsOptionsDataSource.fetch
            (
                function ()
                {
                    for (var i = 0; i < this.data().length; i++)
                    {
                        if (this.data()[i].Value === newLegislatorId)
                        {
                            meetingModel.FullName = this.data()[i].Text;

                            break;
                        }
                    }
                }
            );
        }
    }
    else
    {
        if (legislatorsOptionsDataSource.data().length > 0)
        {
            newLegislatorId = legislatorsOptionsDataSource.data()[0].Value; //$('select[name="legislator"] option:first').val();
            newFullName = legislatorsOptionsDataSource.data()[0].Text;
        }
        else
        {
            legislatorsOptionsDataSource.fetch
            (
                function()
                {
                    meetingModel.LegislatorId = this.data()[0].Value;
                    meetingModel.FullName = this.data()[0].Text;
                }
            );
        }
    }

    if (meetingVenueTypesOptionsDataSource.data().length > 0)
    {
        newVenueTypeId = meetingVenueTypesOptionsDataSource.data()[0].Value; //$('select[name="type"] option:second').val();
        newVenueType = meetingVenueTypesOptionsDataSource.data()[0].Text;
    }
    else
    {
        meetingVenueTypesOptionsDataSource.fetch
        (
            function ()
            {
                meetingModel.VenueTypeId = this.data()[0].Value;
                meetingModel.Venue = this.data()[0].Text;
            }
        );
    }

    if (attendeeTypesOptionsDataSource.data().length > 0)
    {
        newAttendeeTypeId = attendeeTypesOptionsDataSource.data()[0].Value; //$('select[name="officeattendees"] option:first').val();
        newAttendeeType = attendeeTypesOptionsDataSource.data()[0].Text;
    }
    else
    {
        attendeeTypesOptionsDataSource.fetch
        (
            function()
            {
                meetingModel.AttendeeTypeId = this.data()[0].Value;
                meetingModel.AttendeeType = this.data()[0].Text;
            }
        );
    }

    if (meetingLocationsOptionsDataSource.data().length > 0)
    {
        newMeetingLocationId = meetingLocationsOptionsDataSource.data()[1].Value; //$('select[name="type"] option:second').val();
        newLocation = meetingLocationsOptionsDataSource.data()[1].Text;
    }
    else
    {
        meetingLocationsOptionsDataSource.fetch
        (
            function()
            {
                meetingModel.MeetingLocationId = this.data()[1].Value;
                meetingModel.Location = this.data()[1].Text;
            }
        );
    }

    var newDate = kendo.toString(new Date(), 'yyyy-MM-dd');

    meetingModel = new MeetingModel
        (
            {
                MeetingDate: newDate,
                VenueTypeId: newVenueTypeId,
                VenueType: newVenueType,
                AttendeeTypeId: newAttendeeTypeId, //$('select[name="officeattendees"] option:first').val(),
                AttendeeType: newAttendeeType,
                LegislatorId: newLegislatorId,
                FullName: newFullName,
                MeetingLocationId: newMeetingLocationId, //$('select[name="type"] option:first').val(),
                Location: newLocation,
                InitiativeId: meetingInitiativeId,
                SurveyId: meetingSurveyId,
                AssignmentId: meetingAssignmentId
            }
        );
}

function addNewMeetingToDataSource()
{
    meetingModel.CreatorId = personId;
    meetingModel.LobbyistId = personId;

    // Necessary to check if MeetingDate is NOT a string... means it was updated and has to be converted.
    if (jQuery.type(meetingModel.MeetingDate) !== "string")
    {
        meetingModel.MeetingDate = meetingModel.MeetingDate.toLocaleDateString();
    }
    else
    {
        var newMeetingDate = new Date(meetingModel.MeetingDate);

        var newHour = newMeetingDate.getHours();

        // If the newHour !== 0, then the default date was left and needs to be offset from the GMT.  
        // If the newHour === 0, then the date was changed and will already be set correctly.
        if (newHour !== 0)
        {
            newMeetingDate = new Date(newMeetingDate.getTime() + newMeetingDate.getTimezoneOffset() * 60000);
        }

        meetingModel.MeetingDate = kendo.toString(newMeetingDate, 'yyyy-MM-dd');
    }
        
    if (meetingModel.LegislatorId === undefined)
    {
        meetingModel.LegislatorId = 8;
    }

    if (meetingModel.FullName === undefined)
    {
        meetingModel.FullName = "";
    }
                        
    if (meetingModel.Name === undefined)
    {
        meetingModel.Name = "";
    }
                        
    if (meetingModel.PciInitiatives === undefined)
    {
        meetingModel.PciInitiatives = "";
    }

    if (meetingModel.VenueTypeId === undefined)
    {
        meetingModel.VenueTypeId = 1;
    }

    if (meetingModel.VenueType === undefined)
    {
        meetingModel.VenueType = "In Person";
    }
                        
    if (meetingModel.AttendeeTypeId === undefined)
    {
        meetingModel.AttendeeTypeId = 1;
    }
                        
    if (meetingModel.AttendeeType === undefined)
    {
        meetingModel.AttendeeType = "Staff Only";
    }
                        
    if (meetingModel.MeetingLocationId === undefined)
    {
        meetingModel.MeetingLocationId = 1;
    }
                        
    if (meetingModel.Location === undefined)
    {
        meetingModel.Location = "Meeting in District";
    }
                        
    if (meetingModel.Lobbyist === undefined)
    {
        meetingModel.Lobbyist = "";
    }
                        
    if (meetingModel.PrimaryOfficeContact === undefined)
    {
        meetingModel.PrimaryOfficeContact = "";
    }
                        
    if (meetingModel.LegislatorStaffAttendees === undefined)
    {
        meetingModel.LegislatorStaffAttendees = "";
    }
                        
    if (meetingModel.FollowUpNeeded === undefined)
    {
        meetingModel.FollowUpNeeded = "N";
    }

    if (meetingModel.Notes === undefined)
    {
        meetingModel.Notes = "";
    }
    
    if (meetingsDataSource === undefined || meetingsDataSource === null)
    {
        // The following are defined in the meetings.js.
        meetingsReference = "legislator";
        meetingLegislatorId = meetingModel.LegislatorId;
        recentMeetings = "Y";

        setMeetingsDataSource();
    }

    meetingsDataSource.add
    (
        {
            MeetingDate: meetingModel.MeetingDate,
            VenueTypeId: meetingModel.VenueTypeId,
            VenueType: meetingModel.VenueType,
            AttendeeTypeId: meetingModel.AttendeeTypeId,
            AttendeeType: meetingModel.AttendeeType,
            LobbyistId: meetingModel.LobbyistId,
            Lobbyist: meetingModel.Lobbyist,
            LegislatorId: meetingModel.LegislatorId,
            FullName: meetingModel.FullName,
            Name: meetingModel.Name,
            PciInitiatives: meetingModel.PciInitiatives,
            PrimaryOfficeContact: meetingModel.PrimaryOfficeContact,
            MeetingLocationId: meetingModel.MeetingLocationId,
            Location: meetingModel.Location,
            LegislatorStaffAttendees: meetingModel.LegislatorStaffAttendees,
            FollowUpNeeded: meetingModel.FollowUpNeeded,
            CreatorId: meetingModel.CreatorId,
            Notes: meetingModel.Notes,
            InitiativeId: meetingModel.InitiativeId,
            SurveyId: meetingModel.SurveyId,
            AssignmentId: meetingModel.AssignmentId
        }
    );
}

function openModalMeetingNotes(e)
{
    $('#meetingnotes').val(meetingModel.Notes);

    $("#modalmeetingnotes").data("kendoMobileModalView").open();
}

function closeModalMeetingNotes(e)
{
    meetingModel.set("Notes", $('#meetingnotes').val());

    $("#modalmeetingnotes").data("kendoMobileModalView").close();
}

function saveMeeting()
{
    var allValid = true;
    var isValid = true;
    var validator = $("#meetingForm").kendoValidator
        (
            {
                validateOnBlur: false
            }
        ).data("kendoValidator");

    $('#meetingForm input').each
            (
                function ()
                {
                    $(this).parent().parent().find("li").find("span").removeClass('invalid');

                    isValid = validator.validateInput($(this));

                    if (!isValid)
                    {
                        if (allValid)
                        {
                            allValid = false;
                        }

                        $(this).parent().parent().find("li").find("span").addClass('invalid');

                        //return isValid;
                    }
                }
            );

    if (isValid)
    {
        $('#meetingForm select').each
            (
                function ()
                {
                    $(this).parent().parent().find("li").find("span").removeClass('invalid');

                    isValid = validator.validateInput($(this));
                                    
                    if (!isValid)
                    {
                        if (allValid)
                        {
                            allValid = false;
                        }

                        $(this).parent().parent().find("li").find("span").addClass('invalid');

                        //return isValid;
                    }
                }
            );
    }

    if (allValid)
    {
        if (meetingModel.MeetingId === undefined)
        {
            addNewMeetingToDataSource();
            
            isAddMeeting = "N";

            if (meetingModel.AssignmentId != null)
            {
                assignmentModel.MeetingCreated = 'Y';
            }
        }

        // Necessary to check if MeetingDate is NOT a string... means it was updated and has to be converted.
        if (jQuery.type(meetingModel.MeetingDate) !== "string")
        {
            meetingModel.MeetingDate = meetingModel.MeetingDate.toLocaleDateString();
        }
        
        meetingsDataSource.sync();

        return true;
    }
    else
    {
        return false;
    }
}

function setIsMeetingEditorDataSource(meetingId)
{
    var readUrl = apiBaseServiceUrl + "ismeetingeditor?meetingId=" + meetingId + "&personId=" + personId;

    isMeetingEditorDataSource = new kendo.data.DataSource
        (
            {
                transport:
                {
                    read:
                    {
                        url: readUrl,
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
                    }
                },
                schema:
                {
                    model:
                    {
                        id: "MeetingId",
                        fields:
                        {
                            MeetingId: "MeetingId",
                            IsEditor: "IsEditor"
                        }
                    }
                }
            }
        );

    isMeetingEditorDataSource.read();
}