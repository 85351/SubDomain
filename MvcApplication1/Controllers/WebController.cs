using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text.RegularExpressions;

namespace MvcApplication1.Controllers
{
    public class WebController : Controller
    {
        public ActionResult Index()
        {
            var v = RouteData.Values["area"].ToString();

            ViewBag.Message = "Beverly Hills歌词";
            ViewBag.Area = v;
            return View();
        }
        public void B()
        {
            string host = "aaa.bfme.com"; //Request.Url.Host;
            if (DenyHostList.Contains(host.ToUpper()))
                return;

            string lookFor = @"^([0-9a-zA-Z]+).bfme.com[/]?$";
            string sendTo = "http://www.bfme.com/shop/home/?subdomain={0}";
            Regex re = new Regex(lookFor, RegexOptions.IgnoreCase);
            string responseUrl = "";
            if (re.IsMatch(host))
            {
                responseUrl = string.Format(sendTo, re.Match(host).Groups[1].Value);
            }
        }

        public IList<string> DenyHostList = new List<string>() { "WWW.BFME.COM", "IMG.BFME.COM", "IMG01.BFME.COM" };
    }
}
