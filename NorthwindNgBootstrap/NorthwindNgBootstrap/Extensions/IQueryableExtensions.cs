using NorthwindNgBootstrap.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NorthwindNgBootstrap.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrder<T>(this IQueryable<T> query, string sortBy, Dictionary<string, Expression<Func<T, object>>> columnsMap, bool isSortAscending)
        {
            if (string.IsNullOrWhiteSpace(sortBy) || !columnsMap.ContainsKey(sortBy))
                return query;

            if (isSortAscending)
                return query.OrderBy(columnsMap[sortBy]);
            else
                return query.OrderByDescending(columnsMap[sortBy]);
        }

        public static IQueryable<T> ApplyPage<T>(this IQueryable<T> query, int page, int pageSize)
        {
            if (page <= 0)
                page = 1;

            if (pageSize <= 0)
                pageSize = 10;

            return query.Skip((page - 1) * pageSize).Take(pageSize);
        }

        public static IQueryable<T> ApplyFilter<T>(this IQueryable<T> query, Expression<Func<T, bool>> where)
        {
            return query.Where(where);
        }
    }
}
