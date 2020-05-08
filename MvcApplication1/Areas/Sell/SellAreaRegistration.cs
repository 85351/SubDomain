using System;
using System.Web.Mvc;

namespace MvcApplication1.Areas.Sell
{
    public class SellAreaRegistration : AreaRegistrationOrder
	{
        public override string AreaName
        {
            get
            {
                return "Sell";
            }
        }

		public override int Order
		{
			get
			{
				return 999;
			}
		}

		public override void RegisterAreaOrder(AreaRegistrationContext context)
        {
			context.MapRoute(
				"Sell_default",
				"Sell/{controller}/{action}/{id}",
				new { controller = "Page", action = "Index", id = UrlParameter.Optional },
				new string[] { "MvcApplication1.Areas.Test.Controllers" }
			);
		}
	}
}
