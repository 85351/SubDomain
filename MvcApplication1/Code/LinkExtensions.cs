﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Mvc;
using MvcApplication1.Code;

namespace System.Web.Mvc.Html
{
    public static class LinkExtensions
    {
        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, new RouteValueDictionary(), new RouteValueDictionary(), requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, object routeValues, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, new RouteValueDictionary(routeValues), new RouteValueDictionary(), requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, controllerName, new RouteValueDictionary(), new RouteValueDictionary(), requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, RouteValueDictionary routeValues, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, routeValues, new RouteValueDictionary(), requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, object routeValues, object htmlAttributes, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, new RouteValueDictionary(routeValues), new RouteValueDictionary(htmlAttributes), requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, routeValues, htmlAttributes, requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, object routeValues, object htmlAttributes, bool requireAbsoluteUrl)
        {
            return htmlHelper.ActionLink(linkText, actionName, controllerName, new RouteValueDictionary(routeValues), new RouteValueDictionary(htmlAttributes), requireAbsoluteUrl);
        }

        public static MvcHtmlString ActionLink(this HtmlHelper htmlHelper, string linkText, string actionName, string controllerName, RouteValueDictionary routeValues, IDictionary<string, object> htmlAttributes, bool requireAbsoluteUrl)
        {
            if (requireAbsoluteUrl)
            {
                HttpContextBase currentContext = new HttpContextWrapper(HttpContext.Current);
                RouteData routeData = RouteTable.Routes.GetRouteData(currentContext);

                routeData.Values["controller"] = controllerName;
                routeData.Values["action"] = actionName;
                //如果不需要变换area，则routeValues不传入area的值
                if (routeValues.Keys.Contains("area"))
                {
                    routeData.Values["area"] = routeValues["area"];                 
                }

                DomainRoute domainRoute = routeData.Route as DomainRoute;
                if (domainRoute != null)
                {
                    DomainData domainData = domainRoute.GetDomainData(new RequestContext(currentContext, routeData), routeData.Values);
                    return htmlHelper.ActionLink(linkText, actionName, controllerName, domainData.Protocol, domainData.HostName, domainData.Fragment, routeData.Values, null);
                }
            }
            return htmlHelper.ActionLink(linkText, actionName, controllerName, routeValues, htmlAttributes);
        }
    }
}
