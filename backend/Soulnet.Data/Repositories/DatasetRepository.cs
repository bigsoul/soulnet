using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class DatasetRepository : EntityBaseRepository<Dataset>
    {        
        public DatasetRepository (SoulnetContext context) : base (context) { }

    }
}