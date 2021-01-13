using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FinanceProject.Models;
using System.Web.Http.Cors;

namespace FinanceProject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AdminController : ApiController
    {
        //GET api/admin/UserDetails
        [HttpGet]
        public HttpResponseMessage UserDetails()
        {
            using (project1Entities db = new project1Entities())
            {
                var u = from user in db.UserTables
                        where user.validation == "ToValidate"
                        select new
                        {
                            Email = user.Email,
                            Name = user.Name,
                            Phone = user.PhoneNumber,
                            Username = user.username,
                            Address = user.Address,
                            Cardtype = user.CardType,
                            Validation = user.validation
                        };
                var data = u.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
        }
        //GET api/admin/Details?Email=adc@gmail.com
        [HttpGet]
        public HttpResponseMessage Details(string Email)
        {
            using (project1Entities db = new project1Entities())
            {
                var data = db.UserTables.Include("BankDetail").Where(s => s.Email == Email).FirstOrDefault<UserTable>();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            //from user in db.UserTables
            //where user.Email == Email
            //select new
            //{
            //    Email = user.Email,
            //    Name = user.Name,
            //    Phone = user.PhoneNumber,
            //    Username = user.username,
            //    Address = user.Address,
            //    Cardtype = user.CardType,
            //    Validation = user.validation
            //};
        }

        //GET api/admin/Approved?Email=adc@gmail.com
        [HttpGet]
        public HttpResponseMessage Approved(string Email)
        {
            try
            {
                using (project1Entities db = new project1Entities())
                {
                    UserTable user = db.UserTables.Find(Email);
                    CardType type = db.CardTypes.Find(user.CardType);
                    Random rnd = new Random();
                    if (user == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound, "User with Email " + Email + "not found");
                    }
                    DateTime d1 = DateTime.Now;
                    user.validation = "Approved";
                    CardDetail card = new CardDetail();
                    card.Type = user.CardType;
                    card.Email = user.Email;
                    card.CurrentLimit = type.Limit;
                    card.ValidFrom = d1;
                    card.ValidTill = d1.AddYears(4);
                    card.CVV = rnd.Next(101, 999);
                    db.CardDetails.Add(card);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created, user);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        //GET api/admin/Rejected?Email=adc@gmail.com
        [HttpGet]
        public HttpResponseMessage Rejected(string Email)
        {
            try
            {
                using (project1Entities db = new project1Entities())
                {
                    UserTable user = db.UserTables.Find(Email);
                    user.validation = "Rejected";
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created, user);

                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        //GET api/admin/ApprovedUser
        [HttpGet]
        public HttpResponseMessage ApprovedUser()
        {
            using (project1Entities db = new project1Entities())
            {
                var u = from user in db.UserTables
                        where user.validation == "Approved"
                        select new
                        {
                            Email = user.Email,
                            Name = user.Name,
                            Phone = user.PhoneNumber,
                            Username = user.username,
                            Address = user.Address,
                            Cardtype = user.CardType,
                            Validation = user.validation
                        };
                var data = u.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
        }

        //GET api/admin/UserFinance?Email=abc@gmail.com
        [HttpGet]
        public HttpResponseMessage UserFinance(string Email)
        {
            using (project1Entities db = new project1Entities())
            {
                var data = (from f in db.Finances
                            join u in db.UserTables on f.Email equals u.Email
                            join p in db.Products on f.ProductID equals p.ProductID
                            where f.Email == Email
                            select new
                            {
                                FinanceID = f.FinanceID,
                                Email = f.Email,
                                Months = f.Months,
                                EmiAmount = f.EmiAmount,
                                TotalAmount = f.TotalAmount,
                                RemainingAmount = f.RemainingAmount,
                                purchaseDate = f.purchaseDate,
                                ProductName = p.ProductName,
                                LastPaymentDate = f.LastPaymentDate,
                                userName = u.username
                            }).AsEnumerable().Select(x => new {
                                FinanceID = x.FinanceID,
                                Email = x.Email,
                                Months = x.Months,
                                EmiAmount = x.EmiAmount,
                                TotalAmount = x.TotalAmount,
                                RemainingAmount = x.RemainingAmount,
                                purchaseDate = x.purchaseDate,
                                ProductName = x.ProductName,
                                LastPaymentDate = x.LastPaymentDate,
                                userName = x.userName,
                                value = getvDate(x.LastPaymentDate, x.Months)
                            });

                var finance = data.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, finance);
            }

        }
        public bool getvDate(DateTime? D1, int M)
        {
            DateTime dn = DateTime.Now;
            if (D1 == null)
            {
                return false;
            }
            else
            {
                DateTime dp = Convert.ToDateTime(D1);
                if (dp.Month == dn.Month && dp.Year == dp.Year && dn.Day >= dp.Day || M <= 0)
                {
                    return true;
                }
                else if (dp.Month < dn.Month && dp.Year == dp.Year)
                    return false;
            }
            return false;
        }
    }
}
