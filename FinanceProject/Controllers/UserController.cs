using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using FinanceProject.Models;

namespace FinanceProject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetDashBoard(string email)
        {
            project1Entities db = new project1Entities();
            var data = db.CardDetails.Where(x => x.Email == email);
            return Request.CreateResponse(HttpStatusCode.OK, data);
        }
    }
}
