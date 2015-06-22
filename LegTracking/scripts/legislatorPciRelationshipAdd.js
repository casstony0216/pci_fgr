var relationAddData = 
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
   
    ];

var  relationDataDataSource = new kendo.data.DataSource
(
    {
		data:  relationAddData,
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


function relationAddDetailShow(e) 
{

}

function relationAddDetailInit(e) 
{
  
}