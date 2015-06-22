   var dsTasks = [
        {taskId:1,action: "Action 1", dateNeeded:"12/12/2016",statusId:2,status:"In Process",notes:"This is a note", legislatorId:1, legislator:"Bonnie Watson Coleman"},
        {taskId:2,action: "Action 2", dateNeeded:"2/12/2016",statusId:3,status:"Complete",notes:"This is a note", legislatorId:1, legislator:"Bonnie Watson Coleman"},
        {taskId:3,action: "Action 3", dateNeeded:"2/12/2016",statusId:1,status:"Not Started",notes:"This is a note", legislatorId:1, legislator:"Bonnie Watson Coleman"},
        {taskId:4,action: "Action 4", dateNeeded:"12/12/2015",statusId:2,status:"In Process",notes:"This is a note", legislatorId:1, legislator:"Bonnie Watson Coleman"},
        {taskId:5,action: "Action 5", dateNeeded:"12/12/2014",statusId:2,status:"In Process",notes:"This is a note", legislatorId:1, legislator:"Bonnie Watson Coleman"},

    ];


var  dataSourceTasks = new kendo.data.DataSource({
         data: dsTasks,
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
                    id: "taskId",
                    fields: {
                        Id: "taskId",
                        Action:"action",
                        DateNeeded: "dateNeeded",
                        StatusId: "statusId",
                        Status: "status",
                        Notes: "notes",
                        LegislatorId: "legislatorId",
                        Legislator: "legislator"
                    }
                }
            }
        });

function tasksListViewDataBindInitFlat(e) {
    
        e.view.element.find("#tasks-listview").kendoMobileListView({
            dataSource:dataSourceTasks ,
            template: $("#tasks-listview-filtering-template").html()
        })
        .kendoTouch({
            filter: ">li",
            enableSwipe: true,
            touchstart: taskstouchstart,
            tap: tasksnavigate,
            swipe: tasksswipe
        });
    }


   function tasksnavigate(e) {
        var itemUID = $(e.touch.currentTarget).data("uid");
        kendo.mobile.application.navigate("views/task.html?uid=" + itemUID);
    }

    function tasksswipe(e) {
        var button = kendo.fx($(e.touch.currentTarget).find("[data-role=button]"));
        button.expand().duration(200).play();
    }

    function taskstouchstart(e) {
        var target = $(e.touch.initialTouch),
            listview = $("#tasks-listview").data("kendoMobileListView"),
            model,
            button = $(e.touch.target).find("[data-role=button]:visible");

        if (target.closest("[data-role=button]")[0]) {
            model =dataSourceTasks.getByUid($(e.touch.target).attr("data-uid"));
            dataSourceTasks.remove(model);

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

  