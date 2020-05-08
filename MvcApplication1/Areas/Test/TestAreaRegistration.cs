using System.Web.Mvc;

namespace MvcApplication1.Areas.Test
{
    public class TestAreaRegistration : AreaRegistrationOrder
	{
        public override string AreaName
        {
            get
            {
                return "Test";
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
				"Test_default",
				"{controller}/{action}/{id}",
				new { controller = "Page", action = "Index", id = UrlParameter.Optional },
				new string[] { "MvcApplication1.Areas.Test.Controllers" }
			);
		}
    }
}
