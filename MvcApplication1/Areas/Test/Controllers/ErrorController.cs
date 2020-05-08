using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Areas.Test.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /Test/Page/

        public ActionResult Error404()
        {
            return View();
        }

    }
}
