using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Soulnet.Model.Entity;
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;

namespace Soulnet.Data.Repositories 
{
    public class DatasetFilter { }

    public class DatasetRepository : EntityBaseRepository<Dataset>
    {        
        public DatasetRepository () { }

        private IConfiguration _configuration;

        public DatasetRepository (IConfiguration configuration) { 
            _configuration = configuration;
        }

        public Section<Dataset> ReadSection(int dataOffset, int dataLimit, DatasetFilter filter) {

            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            IEnumerable<Dataset> result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"SELECT * FROM public.""Dataset"" 
                              ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<Dataset>(query, new {
                    Offset = dataOffset, 
                    Limit = dataLimit
                });

                if (result.Count() == dataLimit) {
                    return new Section<Dataset> {
                        List = result,
                        DataOffset = dataOffset,
                        DataLimit = dataLimit
                    };
                }

                var dataOffsetMax = dataOffset + result.Count();

                if (dataOffsetMax >= dataLimit) {
                    result = db.Query<Dataset>(query, new {
                        Offset = dataOffsetMax - dataLimit, 
                        Limit = dataLimit
                    });

                    return new Section<Dataset> {
                        List = result,
                        DataOffset = dataOffsetMax - dataLimit,
                        DataLimit = dataLimit
                    };
                }     

                result = db.Query<Dataset>(query, new {
                    Offset = 0, 
                    Limit = dataLimit
                });
            }

            return new Section<Dataset>() {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }
    }
}