using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindNgBootstrap.Data;
using Microsoft.EntityFrameworkCore;
using NorthwindNgBootstrap.Models;
using System.Linq.Expressions;
using NorthwindNgBootstrap.Extensions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NorthwindNgBootstrap.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly NorthwindContext context;

        public ProductController(NorthwindContext context)
        {
            this.context = context;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get(string sortBy, bool isSortAscending, int page, int pageSize, string filter)
        {
            var columnsMap = new Dictionary<string, Expression<Func<Products, object>>>()
            {
                ["productid"] = column => column.ProductId,
                ["productname"] = column => column.ProductName,
                ["quantityperunit"] = column => column.QuantityPerUnit,
                ["unitprice"] = column => column.UnitPrice,
                ["unitsinstock"] = column => column.UnitsInStock,
                ["unitsonorder"] = column => column.UnitsOnOrder,
                ["reorderlevel"] = column => column.ReorderLevel,
                ["discontinued"] = column => column.Discontinued,
            };

            var resultModel = new ResultModel<ProductModel>();
            var list = context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter))
            {
                list = list.ApplyFilter(x => x.ProductId.ToString().ToLower().Contains(filter.ToLower()) ||
                    x.ProductName.ToLower().Contains(filter.ToLower()) ||
                    x.QuantityPerUnit.ToLower().Contains(filter.ToLower()) ||
                    x.UnitPrice.ToString().ToLower().Contains(filter.ToLower()) ||
                    x.UnitsInStock.ToString().ToLower().Contains(filter.ToLower()) ||
                    x.UnitsOnOrder.ToString().ToLower().Contains(filter.ToLower()) ||
                    x.ReorderLevel.ToString().ToLower().Contains(filter.ToLower()) ||
                    x.Discontinued.ToString().ToLower().Contains(filter.ToLower()));
            }

            list = list.ApplyOrder(sortBy, columnsMap, isSortAscending);
            
            resultModel.TotalRecords = await list.CountAsync();

            list = list.ApplyPage(page, pageSize);

            resultModel.Records = await list.Select(x => new ProductModel
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                SupplierId = x.SupplierId,
                CategoryId = x.CategoryId,
                QuantityPerUnit = x.QuantityPerUnit,
                UnitPrice = x.UnitPrice,
                UnitsInStock = x.UnitsInStock,
                UnitsOnOrder = x.UnitsOnOrder,
                ReorderLevel = x.ReorderLevel,
                Discontinued = x.Discontinued
            }).ToListAsync();

            return Ok(resultModel);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var productModel = await context.Products.Select(x => new ProductModel
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                SupplierId = x.SupplierId,
                CategoryId = x.CategoryId,
                QuantityPerUnit = x.QuantityPerUnit,
                UnitPrice = x.UnitPrice,
                UnitsInStock = x.UnitsInStock,
                UnitsOnOrder = x.UnitsOnOrder,
                ReorderLevel = x.ReorderLevel,
                Discontinued = x.Discontinued
            }).FirstOrDefaultAsync(x => x.ProductId == id);

            if (productModel == null)
                return NotFound();

            return Ok(productModel);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ProductModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = new Products();
            product.ProductName = model.ProductName;
            product.QuantityPerUnit = model.QuantityPerUnit;
            product.UnitPrice = model.UnitPrice;
            product.UnitsInStock = model.UnitsInStock;
            product.UnitsOnOrder = model.UnitsOnOrder;
            product.ReorderLevel = model.ReorderLevel;
            product.Discontinued = model.Discontinued;
            product.SupplierId = model.SupplierId;
            product.CategoryId = model.CategoryId;

            context.Products.Add(product);

            var result = await context.SaveChangesAsync();

            var productModel = await context.Products.Select(x => new ProductModel
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                SupplierId = x.SupplierId,
                CategoryId = x.CategoryId,
                QuantityPerUnit = x.QuantityPerUnit,
                UnitPrice = x.UnitPrice,
                UnitsInStock = x.UnitsInStock,
                UnitsOnOrder = x.UnitsOnOrder,
                ReorderLevel = x.ReorderLevel,
                Discontinued = x.Discontinued
            }).FirstOrDefaultAsync(x => x.ProductId == product.ProductId);

            return Ok(productModel);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]ProductModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);            

            var product = await context.Products.FirstOrDefaultAsync(x => x.ProductId == id);

            if (product == null)
                return NotFound();

            product.ProductName = model.ProductName;
            product.QuantityPerUnit = model.QuantityPerUnit;
            product.UnitPrice = model.UnitPrice;
            product.UnitsInStock = model.UnitsInStock;
            product.UnitsOnOrder = model.UnitsOnOrder;
            product.ReorderLevel = model.ReorderLevel;
            product.Discontinued = model.Discontinued;
            product.SupplierId = model.SupplierId;
            product.CategoryId = model.CategoryId;

            context.Products.Update(product);

            var result = await context.SaveChangesAsync();

            var productModel = await context.Products.Select(x => new ProductModel
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                SupplierId = x.SupplierId,
                CategoryId = x.CategoryId,
                QuantityPerUnit = x.QuantityPerUnit,
                UnitPrice = x.UnitPrice,
                UnitsInStock = x.UnitsInStock,
                UnitsOnOrder = x.UnitsOnOrder,
                ReorderLevel = x.ReorderLevel,
                Discontinued = x.Discontinued
            }).FirstOrDefaultAsync(x => x.ProductId == product.ProductId);

            return Ok(productModel);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.ProductId == id);

            if (product == null)
                return NotFound();

            context.Products.Remove(product);

            var result = await context.SaveChangesAsync();

            return Ok();
        }
    }
}
