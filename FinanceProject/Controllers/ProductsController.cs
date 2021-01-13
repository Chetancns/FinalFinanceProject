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
    public class ProductsController : ApiController
    {
        private project1Entities db = new project1Entities();


        public IQueryable<Product> GetProducts()
        {
            return db.Products;
        }


        //[ResponseType(typeof(Product))]
        public HttpResponseMessage GetProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, product);
            }
            else
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Product with Id =" + id + "not found");
        }

        // PUT: api/Products/5
        //[ResponseType(typeof(void))]
        public HttpResponseMessage PutProduct(int id, Product product)
        {

            try
            {
                var data = db.Products.Find(id);
                if (data == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Product with id" + id + "not found");
                }
                data.ProductName = product.ProductName;
                data.ImageName = product.ImageName;
                data.stock = product.stock;
                data.Price = product.Price;
                data.ProductDetails = product.ProductDetails;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public HttpResponseMessage PostProduct(Product product)
        {
            try
            {

                db.Products.Add(product);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, product);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductID == id) > 0;
        }
    }
}
