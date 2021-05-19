using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class LearningRepository : EntityBaseRepository<Learning>
    {        
        public LearningRepository (SoulnetContext context) : base (context) { }

        public Section<Learning> GetSection(int dataOffset, int dataLimit, bool? isArchive) {
            
            var result = Request(dataOffset, dataLimit, isArchive);
            
            if (result.Count() == dataLimit) {
                return new Section<Learning> {
                    List = result,
                    DataOffset = dataOffset,
                    DataLimit = dataLimit
                };
            }

            var dataOffsetMax = dataOffset + result.Count();

            if (dataOffsetMax >= dataLimit) {
                result = this.Request(dataOffsetMax - dataLimit, dataLimit, isArchive);

                return new Section<Learning> {
                    List = result,
                    DataOffset = dataOffsetMax - dataLimit,
                    DataLimit = dataLimit
                };
            } 

            result = Request(0, dataLimit, isArchive);

            return new Section<Learning> {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }

        private IEnumerable<Learning> Request(int dataOffset, int dataLimit, bool? isArchive) {
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

    public struct Section<T> {
        public IEnumerable<T> List;
        public int DataOffset;
        public int DataLimit;
    }
}