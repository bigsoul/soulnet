using System.Collections.Generic;
using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class LearningRepository : EntityBaseRepository<Learning>
    {        
        public LearningRepository (SoulnetContext context) : base (context) { }

        public IEnumerable<Learning> Get() {
            return this.GetAll();
        }
    }
}