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
            var data = from c in db.CardDetails
                       join u in db.UserTables on c.Email equals u.Email
                       where c.Email == email
                       select new
                       {
                           CardNumber = c.CardNumber,
                           Name = u.Name,
                           Type = c.Type,
                           CurrentLimit = c.CurrentLimit,
                           ValidFrom = c.ValidFrom,
                           ValidTill = c.ValidTill,
                           CVV = c.CVV
                       };
            return Request.CreateResponse(HttpStatusCode.OK, data.ToList());
        }
    }
}
