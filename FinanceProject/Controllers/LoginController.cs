using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinanceProject.Models;
using System.Web.Http.Cors;

namespace FinanceProject.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [HttpPost]

        //public HttpResponseMessage Register(string Email, string password, string Name, string PhoneNumber, string username, 
        //                                    string Address, string CardType, string BankName, string AccountNumber, string IFSCCode)

        public HttpResponseMessage Registertest([FromBody] regandlogin ub)
        {
            project1Entities db = new project1Entities();
            UserTable tabledata = new UserTable();
            var emailAlreadyExists = db.UserTables.Find(ub.Email);

            if (emailAlreadyExists != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Already Exists!");
            }

            tabledata.Email = ub.Email;
            tabledata.password = ub.password;
            tabledata.Name = ub.Name;
            tabledata.PhoneNumber = ub.PhoneNumber;
            tabledata.username = ub.username;
            tabledata.validation = ub.validation;
            tabledata.Address = ub.Address;
            tabledata.CardType = ub.CardType;
            db.UserTables.Add(tabledata);
            db.SaveChanges();

            BankDetail data = new BankDetail();
            data.Email = ub.Email;
            data.BankName = ub.BankName;
            data.AccountNumber = ub.AccountNumber;
            data.IFSCCode = ub.IFSCCode;

            db.BankDetails.Add(data);
            db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, ub);
        }






        [HttpGet]
        public HttpResponseMessage Login(string email, string password)
        {
            project1Entities db = new project1Entities();
            UserTable tabledata = new UserTable();

            var data = db.UserTables.Where(x => x.Email == email && x.password == password).FirstOrDefault();


            if (data != null && data.validation.Trim() == "Approved")
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }

            else if (data != null && data.validation.Trim() == "ToValidate")
                return Request.CreateResponse(HttpStatusCode.OK, "yet to get approved");

            else if (data != null && data.validation.Trim() == "Rejected")
                return Request.CreateResponse(HttpStatusCode.OK, "Request Rejected");

            else
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid Email or password");


        }
        [HttpGet]
        public HttpResponseMessage Adminlogin(string Email, string password)
        {
            project1Entities db = new project1Entities();

            var data = db.Admins.Where(x => x.Email == Email && x.password == password);

            if (data != null)
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            else
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid Credentials");
        }


        [HttpGet]
        public HttpResponseMessage ChangePassword(string email, string phonenumber, string pwd)
        {
            try
            {
                project1Entities db = new project1Entities();
                UserTable ut = new UserTable();
                var data = db.UserTables.Find(email);

                if (data == null)
                    return Request.CreateResponse(HttpStatusCode.OK, "Account with given email is not found");

                else
                {
                    if (data.PhoneNumber == phonenumber)
                    {
                        data.password = pwd;
                        db.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, "Password Changed!");
                    }

                    else
                        return Request.CreateResponse(HttpStatusCode.OK, "Phone number is wrong");
                }
            }
            catch (Exception)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please try again!");
            }
        }
    }
}
