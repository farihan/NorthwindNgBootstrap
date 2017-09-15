using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindNgBootstrap.Data;
using NorthwindNgBootstrap.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NorthwindNgBootstrap.Controllers
{
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private readonly NorthwindContext context;

        public SupplierController(NorthwindContext context)
        {
            this.context = context;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var supplierModels = await context.Suppliers.Select(x => new SupplierModel
            {
                SupplierID = x.SupplierId,
                CompanyName = x.CompanyName,
                ContactName = x.ContactName,
                ContactTitle = x.ContactTitle,
                Address = x.Address,
                City = x.City,
                Region = x.Region,
                PostalCode = x.PostalCode,
                Country = x.Country,
                Phone = x.Phone,
                Fax = x.Fax,
                HomePage = x.HomePage
            }).ToListAsync();
            
            return Ok(supplierModels);
        }
    }
}
