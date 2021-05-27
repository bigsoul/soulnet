using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Soulnet.Model.Entity;
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;

namespace Soulnet.Data.Repositories 
{
    public class LearningFilter {
        public bool IsArchive { get; set; }
    }

    public class LearningRepository
    {        
        private IConfiguration _configuration;

        public LearningRepository (IConfiguration configuration) { 
            _configuration = configuration;
        }

        public Section<Learning> GetSection(int dataOffset, int dataLimit, LearningFilter filter) {

            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            IEnumerable<Learning> result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"SELECT * FROM public.""Learning"" 
                              WHERE ""IsArchive"" = @IsArchive 
                              ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<Learning>(query, new {
                    Offset = dataOffset, 
                    Limit = dataLimit,
                    IsArchive = filter.IsArchive
                });

                if (result.Count() == dataLimit) {
                    return new Section<Learning> {
                        List = result,
                        DataOffset = dataOffset,
                        DataLimit = dataLimit
                    };
                }

                var dataOffsetMax = dataOffset + result.Count();

                if (dataOffsetMax >= dataLimit) {
                    result = db.Query<Learning>(query, new {
                        Offset = dataOffsetMax - dataLimit, 
                        Limit = dataLimit,
                        IsArchive = filter.IsArchive
                    });

                    return new Section<Learning> {
                        List = result,
                        DataOffset = dataOffsetMax - dataLimit,
                        DataLimit = dataLimit
                    };
                }     

                result = db.Query<Learning>(query, new {
                    Offset = 0, 
                    Limit = dataLimit,
                    IsArchive = filter.IsArchive
                });
            }

            return new Section<Learning>() {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }
    }

    public struct Section<T> {
        public IEnumerable<T> List;
        public int DataOffset;
        public int DataLimit;
    }
}