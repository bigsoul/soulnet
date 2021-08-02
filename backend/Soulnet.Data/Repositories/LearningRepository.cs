using System.ComponentModel.DataAnnotations;
using System;
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
    public class LearningFilter {
        public Guid? Id { get; set; }
        public bool? IsArchive { get; set; }
    }

    public class LearningRepository : EntityBaseRepository<Learning>
    {        
        private IConfiguration _configuration;

        public LearningRepository (IConfiguration configuration) { 
            _configuration = configuration;
        }

        public void Create(Learning model)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {
                var query = @"INSERT INTO public.""Learning"" (
                                ""Id"", ""Name"", ""State"", ""IsArchive"", ""IterationCount"", 
                                ""IterationCurrent"", ""InputNeuronsCount"", ""DeepLayersCount"", ""DatasetId""
                              )
                              VALUES (
                                @Id, @Name, @State, @IsArchive, @IterationCount, @IterationCurrent,
                                @InputNeuronsCount, @DeepLayersCount, @DatasetId
                              );"; 

                db.Query<Learning>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    State = model.State,
                    IsArchive = model.IsArchive,
                    IterationCount = model.IterationCount,
                    IterationCurrent = model.IterationCurrent,
                    InputNeuronsCount = model.InputNeuronsCount,
                    DeepLayersCount = model.DeepLayersCount,
                    DatasetId = model.DatasetId,
                });
            }
        }

        public Section<Learning> ReadSection(int dataOffset, int dataLimit, LearningFilter filter) {

            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            IEnumerable<Learning> result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"SELECT 
                                public.""Learning"".xmin AS ""Version"",
                                public.""Learning"".""Id"",
                                public.""Learning"".""Name"",
                                public.""Learning"".""State"",
                                public.""Learning"".""IsArchive"",
                                public.""Learning"".""IterationCount"",
                                public.""Learning"".""IterationCurrent"",
                                public.""Learning"".""InputNeuronsCount"",
                                public.""Learning"".""DeepLayersCount"",
                                public.""Learning"".""DatasetId"",
                                public.""Dataset"".""Name"" AS ""DatasetName""
                              FROM 
                                public.""Learning""
                                LEFT OUTER JOIN public.""Dataset"" ON (public.""Learning"".""DatasetId"" = public.""Dataset"".""Id"")
                              WHERE 
                                CASE WHEN @IsArchive IS NULL THEN true ELSE ""IsArchive"" = @IsArchive END
                              AND
                                CASE WHEN @Id IS NULL THEN true ELSE ""Learning"".""Id"" = @Id END
                              ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<Learning>(query, new {
                    Offset = dataOffset, 
                    Limit = dataLimit,
                    IsArchive = filter.IsArchive,
                    Id = filter.Id
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
                        IsArchive = filter.IsArchive,
                        Id = filter.Id
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
                    IsArchive = filter.IsArchive,
                    Id = filter.Id
                });
            }

            return new Section<Learning>() {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }
    
        public void Update(Learning model) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"UPDATE
                                public.""Learning""
                              SET
                                ""Name"" = @Name,
                                ""DatasetId"" = @DatasetId,
                                ""InputNeuronsCount"" = @InputNeuronsCount,
                                ""DeepLayersCount"" = @DeepLayersCount
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<Learning>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    DatasetId = model.DatasetId,
                    InputNeuronsCount = model.InputNeuronsCount,
                    DeepLayersCount = model.DeepLayersCount
                });
            }
        }

        public void Delete(Guid id)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");
            
            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"DELETE FROM
                                public.""Learning""
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<Learning>(query, new {
                    Id = id,
                });
            }
        }
    }
}