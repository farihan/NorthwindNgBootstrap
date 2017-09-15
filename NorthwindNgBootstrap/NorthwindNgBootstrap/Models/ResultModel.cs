using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindNgBootstrap.Models
{
    public class ResultModel<T>
    {
        public int TotalRecords { get; set; }
        public List<T> Records { get; set; }
    }
}
