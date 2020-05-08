using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Areas.Test.Controllers
{
    public class PageController : Controller
    {
        //
        // GET: /Test/Page/

        public ActionResult Index()
        {
			var subdomain = RouteData.Values.ContainsKey("subdomain") ? RouteData.Values["subdomain"].ToString() : "不存在";

			ViewBag.SubDomain = subdomain;
            return View();
        }

    }
}
