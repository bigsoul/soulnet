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
    public class TestingFilter {
        public bool IsArchive { get; set; }
    }

    public class TestingRepository : EntityBaseRepository<Testing>
    {      
        private IConfiguration _configuration;

        public TestingRepository (IConfiguration configuration) { 
            _configuration = configuration;
        }

        public Section<Testing> ReadSection(int dataOffset, int dataLimit, TestingFilter filter) {
            
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            IEnumerable<Testing> result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) { 
                var query = @"SELECT * FROM public.""Testing"" 
                              WHERE ""IsArchive"" = @IsArchive 
                              ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<Testing>(query, new {
                    Offset = dataOffset, 
                    Limit = dataLimit,
                    IsArchive = filter.IsArchive
                });

                if (result.Count() == dataLimit) {
                    return new Section<Testing> {
                        List = result,
                        DataOffset = dataOffset,
                        DataLimit = dataLimit
                    };
                }

                var dataOffsetMax = dataOffset + result.Count();

                if (dataOffsetMax >= dataLimit) {
                    result = db.Query<Testing>(query, new {
                        Offset = dataOffsetMax - dataLimit, 
                        Limit = dataLimit,
                        IsArchive = filter.IsArchive
                    });

                    return new Section<Testing> {
                        List = result,
                        DataOffset = dataOffsetMax - dataLimit,
                        DataLimit = dataLimit
                    };
                } 

                result = db.Query<Testing>(query, new {
                    Offset = 0, 
                    Limit = dataLimit,
                    IsArchive = filter.IsArchive
                });
            }

            return new Section<Testing>() {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }
    }
}