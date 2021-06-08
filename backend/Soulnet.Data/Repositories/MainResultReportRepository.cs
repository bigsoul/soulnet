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
    public class MainResultReportFilter {}

    public class MainResultReportRepository : EntityBaseRepository<MainResultReport>
    {        
        private IConfiguration _configuration;

        public MainResultReportRepository (IConfiguration configuration) { 
            _configuration = configuration;
        }

        public Section<MainResultReport> ReadSection(int dataOffset, int dataLimit, MainResultReportFilter filter) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            IEnumerable<MainResultReport> result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) { 
                var query = @"SELECT * FROM public.""Testing"" 
                              ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<MainResultReport>(query, new {
                    Offset = dataOffset, 
                    Limit = dataLimit
                });

                if (result.Count() == dataLimit) {
                    return new Section<MainResultReport> {
                        List = result,
                        DataOffset = dataOffset,
                        DataLimit = dataLimit
                    };
                }

                var dataOffsetMax = dataOffset + result.Count();

                if (dataOffsetMax >= dataLimit) {
                    result = db.Query<MainResultReport>(query, new {
                        Offset = dataOffsetMax - dataLimit, 
                        Limit = dataLimit
                    });

                    return new Section<MainResultReport> {
                        List = result,
                        DataOffset = dataOffsetMax - dataLimit,
                        DataLimit = dataLimit
                    };
                } 

                result = db.Query<MainResultReport>(query, new {
                    Offset = 0, 
                    Limit = dataLimit
                });
            }

            return new Section<MainResultReport>() {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }
    }
}