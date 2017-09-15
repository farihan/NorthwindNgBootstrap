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
    public class CategoryController : Controller
    {
        private readonly NorthwindContext context;

        public CategoryController(NorthwindContext context)
        {
            this.context = context;
        }
        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var supplierModels = await context.Categories.Select(x => new CategoryModel
            {
                CategoryID = x.CategoryId,
                CategoryName = x.CategoryName,
                Description = x.Description,
                Picture = x.Picture
            }).ToListAsync();

            return Ok(supplierModels);
        }
    }
}
