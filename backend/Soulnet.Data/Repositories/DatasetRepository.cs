using System.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Soulnet.Model.Entity;
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;
using System;

namespace Soulnet.Data.Repositories 
{
    public class DatasetFilter {
        public Guid? Id { get; set; } 
    }

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
                var query = @"SELECT 
                                public.""Dataset"".xmin AS ""Version"",
                                public.""Dataset"".""Id"",
                                public.""Dataset"".""Name"",
                                public.""Dataset"".""IsLoaded"",
                                public.""Dataset"".""Description""
                              FROM public.""Dataset"" 
                              WHERE 
                                CASE WHEN @Id IS NULL THEN true ELSE ""Dataset"".""Id"" = @Id END
                              ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<Dataset>(query, new {
                    Id = filter.Id,
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
                        Id = filter.Id,
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
                    Id = filter.Id,
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

        public void Create(Dataset model)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {
                var query = @"INSERT INTO public.""Dataset"" (
                                ""Id"", ""Name"", ""Description""
                              )
                              VALUES (
                                @Id, @Name, @Description
                              );"; 

                db.Query<Dataset>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                });
            }
        }

        public void Update(Dataset model) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"UPDATE
                                public.""Dataset""
                              SET
                                ""Name"" = @Name,
                                ""Description"" = @Description
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<Dataset>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    Description = model.Description,
                });
            }
        }

        public void Delete(Guid id)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");
            
            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"DELETE FROM
                                public.""Dataset""
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<Dataset>(query, new {
                    Id = id,
                });
            }
        }
    }
}