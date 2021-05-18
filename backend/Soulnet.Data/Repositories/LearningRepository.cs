using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class LearningRepository : EntityBaseRepository<Learning>
    {        
        public LearningRepository (SoulnetContext context) : base (context) { }

        public IEnumerable<Learning> GetSection(int dataOffset, int dataLimit, bool? isArchive) {
            
            var request = _context.Learning
                            .AsNoTracking();

            if (isArchive != null)
                request = request
                            .Where(e => e.IsArchive == isArchive);
                            
            var result = request.OrderBy(e => e.Name)
                                .Skip(dataOffset)
                                .Take(dataLimit);
            
            return result;
        }
    }
}