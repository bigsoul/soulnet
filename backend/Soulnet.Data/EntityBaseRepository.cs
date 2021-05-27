using Soulnet.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Soulnet.Data;
using Soulnet.Model.Entity;
using Dapper;

namespace Soulnet.Data
{
    public class EntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        public void FillLearningWithTestData() { }
    }

    public struct Section<T> {
        public IEnumerable<T> List;
        public int DataOffset;
        public int DataLimit;
    }

    public struct QueryParametrs {
        public string Query;
        public DynamicParameters DynamicParameters;
    }
}