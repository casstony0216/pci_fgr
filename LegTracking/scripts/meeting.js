 function meetingsdetailShow(e) {
        var model =  dataSourceMeetings.getByUid(e.view.params.uid);
        kendo.bind(e.view.element, model, kendo.mobile.ui);
    }

    function meetingsdetailInit(e) {
        var view = e.view;
        view.element.find("#done").data("kendoMobileButton").bind("click", function() {
            dataSourceMeetings.one("change", function() {
                view.loader.hide();
                kendo.mobile.application.navigate("#:back");
            });

            view.loader.show();
             dataSourceMeetings.sync();
        });

        view.element.find("#cancel").data("kendoMobileBackButton").bind("click", function(e) {
            e.preventDefault();
             dataSourceMeetings.one("change", function() {
                view.loader.hide();
                kendo.mobile.application.navigate("#:back");
            });

            view.loader.show();
             dataSourceMeetings.cancelChanges();
        });
        
        //add touch event to the list view at the bottom
        
        view.element.find("#meeting-listview").kendoMobileListView({
            dataSource: dataSourceMeetingListView,
            template: $("#meeting-listview-template").html()
        })
        .kendoTouch({
           filter: ">li",
            enableSwipe: true,
            touchstart: meetingListViewTouchStart,  
            tap: meetingListViewNavigate,
            swipe: meetingListViewSwipe
        });
        
             
    }

  var dsMeetingListView = [
        {id:1,name: "Meeting location",  label:"Meeting Location", url: "views/locationMap.html",icon:"" },
        {id:2,name: "Meeting Attendees",  label:"Meeting Attendees", url: "views/meetingAttendees.html",icon:"" },
        {id:3,name: "Legislator Issues",  label:"Legislator Issues",url: "views/issues.html" ,icon:""},
        {id:4,name: "Legislator Tasks",  label:"Legislator Tasks",url: "views/tasks.html" ,icon:""}
    ];

var  dataSourceMeetingListView = new kendo.data.DataSource({
         data: dsMeetingListView,
     	 batch: true,
    //,
          //  transport: {
          //      read:  {
          //          url: crudServiceBaseUrl + "/Products",f
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
                        Name: "name",
                        Label: "label",
                        Url: "url",
                        Icon: "icon"                        
                    }
                }
            }
        });



function meetingListViewNavigate(e) 
{
 //   var itemUID = $(e.touch.currentTarget).data("uid");
 //   kendo.mobile.application.navigate("#legislators-detailview?uid=" + itemUID);
    
          var url=e.touch.currentTarget.childNodes[1].value;
    	  var filter='[id=id]';
          var id = kendo.fx($(e.touch.currentTarget).find(filter)).element[0].value;
    
    
     //check for phone
           //if(id!='2'){
               //alert('phone');
             //kendo.mobile.application.navigate(url);
          //}
                    kendo.mobile.application.navigate(url);

}

function meetingListViewSwipe(e) 
{
    var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
    
    button.expand().duration(200).play();
}

function meetingListViewTouchStart(e) 
{
        //alert($(e.touch.currentTarget).data("url"));
        //var url=e.touch.currentTarget.childNodes[1].value;
    	//alert(url);
    	//app.navigate(url);
       
    	//var target = $(e.touch.initialTouch),
        //listview = $("#legislators-listview").data("kendoMobileListView"),
        //model,
        //button = $(e.touch.target).find("[data-role=button]:visible");

    
   // if (target.closest("[data-role=button]")[0]) 
   // {
    //    model = legislatorsDataSource.getByUid($(e.touch.target).attr("data-uid"));
     //   legislatorsDataSource.remove(model);

        //prevent `swipe`
       // this.events.cancel();
       // e.event.stopPropagation();
   // } 
    //else if (button[0]) 
   // {
   //     button.hide();

        //prevent `swipe`
     //   this.events.cancel();
   // } 
   // else 
   // {
   //     listview.items().find("[data-role=button]:visible").hide();
   // }
}


function viewDetails(e){
      var model = e.dataItem; //ds.getByUid(e.view.params.uid);
    alert(model);
}