using System.Web.Mvc;

namespace MvcApplication1.Areas.Tsa
{
    public class TsaAreaRegistration : AreaRegistrationOrder
	{
        public override string AreaName
        {
            get
            {
                return "Tsa";
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
				"Tsa_default",
				"Tsa/{controller}/{action}/{id}",
				new { controller = "Page", action = "Index", id = UrlParameter.Optional },
				new string[] { "MvcApplication1.Areas.Tsa.Controllers" }
			);
		}
    }
}
