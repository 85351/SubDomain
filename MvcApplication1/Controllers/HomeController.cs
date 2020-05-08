using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";
            ViewData["host"] = System.Web.Hosting.HostingEnvironment.SiteName; // Request.Url.Host;

            var newsDict = new List<KeyValuePair<int, int>>();
            var random = new Random();
            for (var i = 0; i < 20; i++)
            {
                newsDict.Add(new KeyValuePair<int, int>(i + 1, random.Next(100, 1000)));
            }
            newsDict.Sort((a, b) =>
                {
                    if (a.Value > b.Value)
                    {
                        return -1;
                    }
                    else if (a.Value < b.Value)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                });
            ViewData["list"] = newsDict;


            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
