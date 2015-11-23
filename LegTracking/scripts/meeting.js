//var token='http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=tony.dangelo%40pciaa.net&TokenId=6666c7b1-b0fa-44eb-ab29-25cddc4bd993&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=tony.dangelo%40pciaa.net&PersonID=52112&FirstName=Tony&MiddleName=E&LastName=DAngelo&FullName=DAngelo%2c+Tony+E&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-5024&Extension=&Fax=888-888-8888&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=11916&Supervisor=Joyner%2c+Scott+A&Title=Developer&EmailAddress=tony.dangelo%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Administrators&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=BackendUsers&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=CompliAssist+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Initiatives+Center+Senior+Staff&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PAC+Authorization+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Profile+Lite+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=State+Snapshot+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fapi.pciaa.net%2f&ExpiresOn=1439825768&HMACSHA256=%2fFlJlJ8V9sO8rURJEkc3gwa0pU8ntC0In4C%2fvp%2fcmKE%3d';
var token = 'http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fname=jonathon.leslie%40pciaa.net&TokenId=9ba3e4e1-efd7-4ac2-8230-60cf01d9137b&http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2femailaddress=jonathon.leslie%40pciaa.net&PersonID=47561&FirstName=Jonathon&MiddleName=&LastName=Leslie&FullName=Leslie%2c+Jonathon&StreetAddress1=8700+West+Bryn+Mawr+Avenue+STE+1200S&StreetAddress2=STE+1200S&City=Chicago&State=IL&PostalCode=60631-3512&Country=USA&WorkPhone=847-553-3699&Extension=&Fax=847-297-5064&Company=PCI&CompanyID=4274&DeptID=262&Department=Information+Technology&SupervisorID=52112&Supervisor=DAngelo%2c+Tony+E&Title=Project+Manager%2c+Information+Technology&EmailAddress=jonathon.leslie%40pciaa.net&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Amicus+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Admin&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Branding&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+Sender&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Broadcast+User&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=PCI.Everyone&http%3a%2f%2fschemas.microsoft.com%2fws%2f2008%2f06%2fidentity%2fclaims%2frole=Staff+Request+Admin&Issuer=urn%3a%2f%2fpciaa-sts&Audience=http%3a%2f%2fdev.pciaa.net%2f&ExpiresOn=1445884400&HMACSHA256=vVyMUM0ntSXhTaMBdHYSe3e36LMYp53EwOIqbShOzgs%3d';

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

                        kendo.mobile.application.navigate("#:back");
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

            kendo.mobile.application.navigate(url + legislatorId + "&meetingId=" + meetingId);
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
            kendo.mobile.application.navigate(url + meetingId);
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

        this.events.cancel();
        e.event.stopPropagation();
    }
    else
    {
        kendo.mobile.application.navigate(url + id);
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