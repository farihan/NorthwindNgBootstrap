using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindNgBootstrap.Models
{
    public class ProductModel
    {
        public int ProductId { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public int? SupplierId { get; set; }
        [Required]
        public int? CategoryId { get; set; }
        [Required]
        public string QuantityPerUnit { get; set; }
        [Required]
        public decimal? UnitPrice { get; set; }
        [Required]
        public short? UnitsInStock { get; set; }
        [Required]
        public short? UnitsOnOrder { get; set; }
        [Required]
        public short? ReorderLevel { get; set; }
        [Required]
        public bool? Discontinued { get; set; }
    }
}
