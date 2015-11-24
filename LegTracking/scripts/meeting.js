var collapsibleMeetingInformation = $("#collapsible").kendoMobileButtonGroup();
var isAddMeeting = "N";

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
            label: "Initiative Surveys",
            url: "views/initiativesurveys.html?legislatorId="
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
}

function meetingListViewDataShow(e)
{
    var legislatorId = e.view.params.legislatorId;
    var isAdd = e.view.params.isAdd;
    var dataTitle = null;
    
    if (isAdd !== null)
    {
        isAddMeeting = isAdd;
    }
    else
    {
        isAddMeeting = "N";
    }

    if (isAddMeeting === "Y")
    {
        meetingUid = null;

        defineMeetingModel();

        if (legislatorId !== null)
        {
            meetingModel.LegislatorId = legislatorId;
        }

        dataTitle = "Add Meeting";
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
        attendeeTypesOptions: attendeeTypesOptionsDataSource,
        meetingLocationsOptions: meetingLocationsOptionsDataSource
    });

    kendo.bind(e.view.element, viewModel, kendo.mobile.ui);
    
    e.view.element.find("#save-button")
        .data("kendoMobileButton")
            .bind
            (
                "click",
                function ()
                {
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
                                        $(this).parent().parent().find("li").find("span").addClass('invalid');

                                        //return isValid;
                                    }
                                }
                            );
                    }

                    if (isValid)
                    {
                        if (meetingModel.MeetingId === undefined)
                        {
                            addNewMeetingToDataSource();
                        }

                        // Necessary to check if MeetingDate is NOT a string... means it was updated and has to be converted.
                        if (jQuery.type(meetingModel.MeetingDate) !== "string")
                        {
                            meetingModel.MeetingDate = meetingModel.MeetingDate.toLocaleDateString();
                        }

                        meetingsDataSource.sync();

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
}

function meetingInitiativeNavigate(e) 
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
            alert('In order to view initiative surveys, the meeting must be saved first.');

            this.events.cancel();
            e.event.stopPropagation();
        }
        else
        {
            initiativeSurveysReference = "meeting";

            app.navigate(url + legislatorId + "&meetingId=" + meetingId);
        }
    }
    else
    {
        meetingId = meetingModel.MeetingId;

        if (meetingId === undefined)
        {
            alert('In order to view initiatives, the meeting must be saved first.');

            this.events.cancel();
            e.event.stopPropagation();
        }
        else
        {
            app.navigate(url + meetingId);
        }
    }
}

function meetingOtherNavigate(e)
{
    var uid = $(e.touch.currentTarget).data("uid");
    var currentRecord = meetingOtherDataSource.getByUid(uid);
    var url = currentRecord.Url;
    var meetingId = meetingModel.MeetingId;

    if (meetingId === undefined)
    {
        alert('In order to view meeting attendees, the meeting must be saved first.');

        this.events.cancel();
        e.event.stopPropagation();
    }
    else
    {
        app.navigate(url + meetingId);
    }
}

function defineMeetingModel()
{
    meetingModel = kendo.data.Model.define( {
            id: "MeetingId",
            fields:
            {
                MeetingId: { type: "number", editable: true },
                MeetingDate: { type: "string", editable: true, validation: { required: true } },
                AttendeeTypeId: { type: "number", editable: true, validation: { required: true } },
                AttendeeType: { type: "string", editable: true },
                PersonId: { type: "number", editable: true },
                PciContact: { type: "string", editable: true },
                LegislatorId: { type: "number", editable: true, validation: { required: true } },
                FullName: { type: "string", editable: true },
                Name: { type: "string", editable: true },
                PrimaryOfficeContact: { type: "string", editable: true },
                MeetingLocationId: { type: "number", editable: true, validation: { required: true } },
                Location: { type: "string", editable: true },
                LegislatorStaffAttendees: { type: "string", editable: true },
                FollowUpNeeded: { type: "string", editable: true },
                CreatorId: { type: "number", editable: true },
                Notes: { type: "string", editable: true }
            }
        });
}

function addNewMeetingToDataSource()
{
    meetingModel.CreatorId = personId;
    meetingModel.PersonId = personId;
    meetingModel.MeetingDate = meetingModel.MeetingDate.toLocaleDateString();
    //meetingModel.MeetingDate = "2015-11-30";
                        
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
                        
    if (meetingModel.PciContact === undefined)
    {
        meetingModel.PciContact = "";
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

    meetingsDataSource.add
    (
        {
            MeetingDate: meetingModel.MeetingDate,
            AttendeeTypeId: meetingModel.AttendeeTypeId,
            AttendeeType: meetingModel.AttendeeType,
            PersonId: meetingModel.PersonId,
            PciContact: meetingModel.PciContact,
            LegislatorId: meetingModel.LegislatorId,
            FullName: meetingModel.FullName,
            Name: meetingModel.Name,
            PrimaryOfficeContact: meetingModel.PrimaryOfficeContact,
            MeetingLocationId: meetingModel.MeetingLocationId,
            Location: meetingModel.Location,
            LegislatorStaffAttendees: meetingModel.LegislatorStaffAttendees,
            FollowUpNeeded: meetingModel.FollowUpNeeded,
            CreatorId: meetingModel.CreatorId,
            Notes: meetingModel.Notes
        }
    );
}