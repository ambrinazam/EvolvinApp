var EvolvinAdapter = function() {

    this.initialize = function(data) {
        url = typeof data !== 'undefined' ? data : "http://cbccrmwebsite.dev1.evolvin.com/Webservices/Membership.asmx/GetAllRoles";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        //return $.ajax({url: url + "/" + id, dataType: "jsonp"});
        var objService = new ServiceRequest();
        objService.requestType = 1;
        objService.CallService(url);

        return objService;
    }

    this.findByName = function (searchKey) {
        //return $.ajax({url: url + "?name=" + searchKey, dataType: "jsonp"});
        var objService = new ServiceRequest();
        objService.requestType = 2;
        objService.CallService(url);

        return objService;
    }

    var url;

}

var ServiceRequest = function () {

    var invocation = new XMLHttpRequest();
    var doneHandler = null;
    var objThis = this;
    var requestType = 0;

    this.CallService = function (url) {
        if (invocation) {
            invocation.open('POST', url, true);
            invocation.withCredential = "true";
        }
        return true;
    }

    this.done = function (handler) {

        doneHandler = handler;
        if (invocation) {
            invocation.onreadystatechange = this.invocationResponsehandler;
            invocation.send("search=" + $('.search-key').val());
        }
        return true;
    }

    this.invocationResponsehandler = function () {
        if (invocation.readyState == 4) // Success
        {
            xmlDoc = $.parseXML(invocation.responseText);
            $xml = $(xmlDoc);
            $roles = $xml.find("string");

            var employees = objThis.parseRolesXml($roles.text());

            if (objThis.requestType == 1)
                doneHandler(employees[0]);

            if (objThis.requestType == 2)
                doneHandler(employees);
        }
    }

    this.parseRolesXml = function (xml) {
        console.log(xml);
        xml2 = $.parseXML(xml);
        var items = [];
        //var subitems = [];

        //var PageSize = $(ControlID + '_HiddenPageSize').val();
        //var Template = $(ControlID + '_Template').val();
        //var Container = ControlID + '_Container';


        //var Count = $(xml).find("Members").length;

        //if (Count == 0) {
        //    $(ControlID + '_noresultspanel').show();

        //}
        //else {
        xmlRoles = $(xml2).find("Roles");
        
        $(xmlRoles).find("Role").each(function () {

            items.push({
                id: $(this).find("RoleID").text(),
                firstName: $(this).find("RoleName").text(),
                //NameLink: ReplaceSpecialCharacterForUrl($(this).find("Name").text()),
                //PersonID: $(this).find("RoleID").text(),
                //Salutation: $(this).find("Salutation").text(),
                //FileName: $(this).find("FileName").text(),
                //Email: $(this).find("Email").text(),
                //RoleName: $(this).find("RoleName").text(),
                //RoleID: $(this).find("RoleID").text(),
                //Count: Count - 1,
                //ControlID: ControlID.substring(1, ControlID.length)
                //Contactmethods: subitems
                lastName: $(this).find("RoleName").text(),
                managerId: $(this).find("RoleID").text(),
                managerName: "",
                title: $(this).find("Description").text(),
                department: "Corporate",
                cellPhone: "617-000-0001",
                officePhone: "781-000-0001",
                email: "jking@fakemail.com",
                city: "Boston, MA",
                pic: "James_King.jpg",
                twitterId: "@fakejking",
                blog: "http=//coenraets.org"
            });

        });

        //my.utils.renderExternalTemplate(Template, Container, items);
        //my.utils.renderExternalTemplate(TemplateName, "#membersdirectory", items);

        //}
        return items;
    }


}