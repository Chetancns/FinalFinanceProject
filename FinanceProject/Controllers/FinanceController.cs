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
    public class FinanceController : ApiController
    {
        // [HttpGet]
        //[Route("api/finance/getfinance")]
        public HttpResponseMessage GetFinance()
        {
            using (project1Entities db = new project1Entities())
            {
                var data = db.Finances.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
        }
        [HttpGet]
        //[ActionName("GetFinanceById")]
        // [Route("api/finance/getfinancebyid/{id:int}")]
        // 
        //public HttpResponseMessage GetFinancebyid(int FinanceID)
        //{
        //    using (project1Entities db = new project1Entities())
        //    {
        //        var data = db.Finances.Find(FinanceID);
        //        if (data != null)
        //        {
        //            return Request.CreateResponse(HttpStatusCode.OK, data);
        //        }
        //        else
        //        {
        //            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Purchase with finance id " + FinanceID + "not found");
        //        }
        //    }
        //}
        public HttpResponseMessage Finance(int id)
        {
            using (project1Entities db = new project1Entities())
            {
                var data = db.Finances.Find(id);
                if (data != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, data);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Purchase with finance id " + id + "not found");
                }
            }
        }
        public HttpResponseMessage PostFinance(string Email, int ProductID, [FromBody] Finance finance)
        {

            try
            {
                using (project1Entities db = new project1Entities())
                {
                    var limit = db.CardDetails.Where(cd => cd.Email == Email).FirstOrDefault();
                    var price = db.Products.Where(pr => pr.ProductID == ProductID).FirstOrDefault();
                    if (limit.CurrentLimit > price.Price)
                    {
                        limit.CurrentLimit = limit.CurrentLimit - price.Price;
                        finance.purchaseDate = DateTime.Now;
                        db.Finances.Add(finance);
                        
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.Created, finance);
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Finance id cannot be created due to low current limit");
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        
        //public HttpResponseMessage Financeupdate(int FinanceID)
        //{
        //    try
        //    {
        //        using (project1Entities db = new project1Entities())
        //        {
        //            var data = db.Finances.Find(FinanceID);
        //            CardDetail card = db.CardDetails.Where(x => x.Email == data.Email).FirstOrDefault();
        //            if (data == null)
        //            {
        //                return Request.CreateResponse(HttpStatusCode.NotFound, "Purchase with finance id " + FinanceID + "not found");
        //            }
        //            else
        //            {

        //                data.Months = data.Months - 1; 
        //                //data.EmiAmount = finance.EmiAmount;
        //                //data.TotalAmount = finance.TotalAmount;
        //                data.RemainingAmount =data.RemainingAmount-data.EmiAmount;
        //                //data.purchaseDate = finance.purchaseDate;
        //                //data.ProductID = finance.ProductID;
        //                data.LastPaymentDate = DateTime.Now;
        //                card.CurrentLimit = card.CurrentLimit + data.EmiAmount;
        //                db.SaveChanges();
        //                return Request.CreateResponse(HttpStatusCode.OK, data);
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
        //    }
        //}

        [HttpGet]
        public HttpResponseMessage financeup(int id)
        {
            try
            {
                using (project1Entities db = new project1Entities())
                {
                    var data = db.Finances.Find(id);
                    CardDetail card = db.CardDetails.Where(x => x.Email == data.Email).FirstOrDefault();
                    if (data == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound, "Purchase with finance id " + id + " not found");
                    }
                    else
                    {

                        data.Months = data.Months - 1;
                        //data.EmiAmount = finance.EmiAmount;
                        //data.TotalAmount = finance.TotalAmount;
                        data.RemainingAmount = data.RemainingAmount - data.EmiAmount;
                        //data.purchaseDate = finance.purchaseDate;
                        //data.ProductID = finance.ProductID;
                        data.LastPaymentDate = DateTime.Now;
                        card.CurrentLimit = card.CurrentLimit + data.EmiAmount;
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        public HttpResponseMessage DeleteFinance(int FinanceId)
        {
            try
            {
                using (project1Entities db = new project1Entities())
                {
                    var data = db.Finances.Find(FinanceId);
                    if (data == null)
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound, "Purchase with finance id" + FinanceId + "not found");
                    }
                    else
                    {
                        db.Finances.Remove(data);
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, data);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
