   var dsMeetings = [
        {id:1,typeId:1,name: "Sen.Cory Booker", date: "2/6/2015 2:00 PM", staffer: "Matt Klapper Chief of Staff",notes:"Test Notes",pciAttendees:"Attendee 1, Attendee2",phone:"123-123-1233" },
        {id:2,typeId:1,name: "Rep. Donald Norcross [D-NJ]", date: "2/6/2015 3:00 PM" ,staffer: "Matt Klapper Chief of Staff",notes:"Test Notes",pciAttendees:"Attendee 1, Attendee2",phone:"123-123-1233"},
        {id:3,typeId:1,name: "Rep. Bonnie Watson Coleman", date: "2/6/2015 4:00 PM",staffer: "Michael Maitland, Chief of Staff" ,notes:"Test Notes",pciAttendees:"Attendee 1, Attendee2",phone:"123-123-1233"},
        {id:4,typeId:1,name: "Rep. Scott Joyner", date: "2/7/2015 2:00 PM" ,staffer: "James Gee, Chief of Staff",notes:"Test Notes",pciAttendees:"Attendee 1, Attendee2",phone:"123-123-1233"},
        {id:5,typeId:1,name: "Rep. Dorene Lehmann",date: "2/6/2015 2:00 PM",staffer: "James Gee, Chief of Staff",notes:"Test Notes" ,pciAttendees:"Attendee 1, Attendee2",phone:"123-123-1233"}
    ];


//MeetingOfficeAttendeesID
//MeetingAttendees




var  dataSourceMeetings = new kendo.data.DataSource({
         data: dsMeetings,
     	 batch: true,
    //,
          //  transport: {
          //      read:  {
          //          url: crudServiceBaseUrl + "/Products",
          //          dataType: "jsonp"
          //      },
          //      update: {
          //          url: crudServiceBaseUrl + "/Products/Update",
          //          dataType: "jsonp"
          //      },
          //      destroy: {
          //          url: crudServiceBaseUrl + "/Products/Destroy",
          //          dataType: "jsonp"
           //     },
            //    parameterMap: function(options, operation) {
            //        if (operation !== "read" && options.models) {
           //             return {models: kendo.stringify(options.models)};
           //         }
           //     }
          //  ,
         //   batch: true,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        Id: "id",
                        TypeId:"typeId",
                        Name: "name",
                        Date: "date",
                        Staffer: "staffer",
                        Notes: "notes",
                        Phone: "phone"      
                    }
                }
            }
        });

function meetingsListViewDataBindInitFlat(e) {
    
        e.view.element.find("#meetings-listview").kendoMobileListView({
            dataSource: dataSourceMeetings  ,
            template: $("#meetings-listview-filtering-template").html()
        })
        .kendoTouch({
            filter: ">li",
            enableSwipe: true,
            touchstart: meetingstouchstart,
            tap: meetingsnavigate,
            swipe: meetingsswipe
        });
    }


   function meetingsnavigate(e) {
        var itemUID = $(e.touch.currentTarget).data("uid");
        kendo.mobile.application.navigate("views/meeting.html?uid=" + itemUID);
        //app.mobileApp.navigate('views/activityView.html?uid=' + e.data.uid);
    }

    function meetingsswipe(e) {
        var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
        button.expand().duration(200).play();
    }

    function meetingstouchstart(e) {
        var target = $(e.touch.initialTouch),
            listview = $("#meetings-listview").data("kendoMobileListView"),
            model,
            button = $(e.touch.target).find("[data-role=button]:visible");

        if (target.closest("[data-role=button]")[0]) {
            model = dataSourceMeetings.getByUid($(e.touch.target).attr("data-uid"));
            dataSourceMeetings.remove(model);

            //prevent `swipe`
            this.events.cancel();
            e.event.stopPropagation();
        } else if (button[0]) {
            button.hide();

            //prevent `swipe`
            this.events.cancel();
        } else {
            listview.items().find("[data-role=button]:visible").hide();
        }
    }

  