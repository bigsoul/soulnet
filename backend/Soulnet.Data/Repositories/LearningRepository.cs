using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class LearningRepository : EntityBaseRepository<Learning>
    {        
        public LearningRepository (SoulnetContext context) : base (context) { }

        public IEnumerable<Learning> GetSection(int startFrom, int pageSize) {
            
            var result = _context.Learning
                            .AsNoTracking()
                            .OrderBy(e => e.Id)
                            .Skip(startFrom)
                            .Take(pageSize);
            
            return result;
        }
    }
}