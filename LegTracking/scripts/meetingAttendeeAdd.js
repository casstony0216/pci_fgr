var meetingAttendeeAddData = 
    [ 
        {
            id: 1,
            name: "Gerald Albanese", 
            company: "Markel Corporation Group",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 2,
            name: "Bud Albright", 
            company: "",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 3,
            name: "Kristina Baldwin", 
            company: "PCI",
            phone: "518-443-2220",
            email: "kristina.baldwin@pciaa.net",
            imageurl: "http://www.pciaa.net/pciwebsite/Common/StreamImage.ashx?personId=93063"
        }, 
        {
            id: 4,
            name: "John Barbagallo", 
            company: "Progressive Insurance Group",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 5,
            name: "Robert Bateman", 
            company: "COUNTRY Financial",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 6,
            name: "David Bell", 
            company: "ALPS Property & Casualty Insurance Company",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }, 
        {
            id: 7,
            name: "Eric Berger", 
            company: "The Gray Insurance Company",
            phone: "",
            email: "",
            imageurl: "http://na1.www.gartner.com/imagesrv/apps/gcms/events/img/no_avatar.png"
        }
    ];

var meetingAttendeeAddDataSource = new kendo.data.DataSource
(
    {
		data: meetingAttendeeAddData,
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
                    Company: "company",
                    Phone: "phone",
                    Email: "email",
                    ImageUrl: "imageurl"                        
                }
            }
        }
	}
);


function meetingAttendeeAddDAddShow(e) 
{
var type = e.view.params.type;
if(type=='relationship'){
// jQuery(".km-view-title").text('Add Relationship');
}
 else{
     
 }
}


function meetingAttendeeAddListViewDataBindInit(e) 
{
    e.view.element.find("#meetingAttendeeAdd-listview")
        .kendoMobileListView
        (
            { 
                dataSource: meetingAttendeeAddDataSource,
                template: $("#meetingAttendeeAddListViewTemplate").html(),
                filterable: 
                {
                    field: "name",
                    operator: "contains"
                }
             }
        
        )
        .kendoTouch
        (
            {
                filter: ">li",
                enableSwipe: true
              // touchstart: attendeeAddtouchstart,
              //  tap: attendeeAddnavigate,
              //  swipe: attendeeAddswipe
            }
        );
    }

function meetingattendeeaddnavigate(e) 
{
   // var itemUID = $(e.touch.currentTarget).data("uid");
    
    //kendo.mobile.application.navigate("views/meetingAttendee.html?uid=" + itemUID);
}

function meetingattendeeaddswipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}

function meetingattendeeaddtouchstart(e) 
{
    var target = $(e.touch.initialTouch),
        listview = $("#profilelistview").data("kendoMobileListView"),
        model,
        button = $(e.touch.target).find("[data-role=button]:visible");

    if (target.closest("[data-role=button]")[0]) 
    {
        model = meetingAttendeeAddDataSource.getByUid($(e.touch.target).attr("data-uid"));
        meetingAttendeeAddDataSource.remove(model);

        //prevent `swipe`
        this.events.cancel();
        e.event.stopPropagation();
    } 
    else if (button[0]) 
    {
        button.hide();

        //prevent `swipe`
        this.events.cancel();
    } 
    else     
    {
        listview.items().find("[data-role=button]:visible").hide();
    }
}
