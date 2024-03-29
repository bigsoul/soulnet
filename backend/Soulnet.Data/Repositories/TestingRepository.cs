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
    public class TestingFilter {
        public Guid? Id { get; set; }
        public bool? IsArchive { get; set; }
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
                var query = @"SELECT
                                public.""Testing"".xmin AS ""Version"",
                                public.""Testing"".""Id"",
                                public.""Testing"".""Name"",
                                public.""Testing"".""State"",
                                public.""Testing"".""IsArchive"",
                                public.""Testing"".""IterationCount"",
                                public.""Testing"".""IterationCurrent"",
                                public.""Testing"".""StopLossPercent"",
                                public.""Testing"".""StartDeposit"",
                                public.""Testing"".""EndDeposit"",
                                public.""Testing"".""LearningId"",
                                public.""Learning"".""Name"" AS ""LearningName"",
                                public.""Testing"".""DatasetId"",
                                public.""Dataset"".""Name"" AS ""DatasetName""
                            FROM 
                                public.""Testing"" 
                                LEFT OUTER JOIN public.""Dataset"" ON (public.""Testing"".""DatasetId"" = public.""Dataset"".""Id"")
                                LEFT OUTER JOIN public.""Learning"" ON (public.""Testing"".""LearningId"" = public.""Learning"".""Id"")
                            WHERE 
                                CASE WHEN @IsArchive IS NULL THEN true ELSE ""Testing"".""IsArchive"" = @IsArchive END
                                AND
                                CASE WHEN @Id IS NULL THEN true ELSE ""Testing"".""Id"" = @Id END
                            ORDER BY ""Name"" ASC LIMIT @Limit OFFSET @Offset;"; 

                result = db.Query<Testing>(query, new {
                    Offset = dataOffset, 
                    Limit = dataLimit,
                    IsArchive = filter.IsArchive,
                    Id = filter.Id
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
                        IsArchive = filter.IsArchive,
                        Id = filter.Id
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
                    IsArchive = filter.IsArchive,
                    Id = filter.Id
                });
            }

            return new Section<Testing>() {
                List = result,
                DataOffset = 0,
                DataLimit = result.Count()
            };
        }

        public void Create(Testing model)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {
                var query = @"INSERT INTO public.""Testing"" (
                                ""Id"", ""Name"", ""State"", ""IsArchive"", ""IterationCount"", 
                                ""IterationCurrent"", ""StopLossPercent"", ""StartDeposit"", 
                                ""LearningId"", ""DatasetId""
                              )
                              VALUES (
                                @Id, @Name, @State, @IsArchive, @IterationCount, @IterationCurrent,
                                @StopLossPercent, @StartDeposit, @LearningId, @DatasetId 
                              );"; 

                db.Query<Testing>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    State = model.State,
                    IsArchive = model.IsArchive,
                    IterationCount = model.IterationCount,
                    IterationCurrent = model.IterationCurrent,
                    StopLossPercent = model.StopLossPercent,
                    StartDeposit = model.StartDeposit,
                    LearningId = model.LearningId,
                    DatasetId = model.DatasetId,
                });
            }
        }

        public void Update(Testing model) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"UPDATE
                                public.""Testing""
                              SET
                                ""Name"" = @Name,
                                ""IsArchive"" = @IsArchive,                                
                                ""StopLossPercent"" = @StopLossPercent,
                                ""StartDeposit"" = @StartDeposit,
                                ""LearningId"" = @LearningId,
                                ""DatasetId"" = @DatasetId                                
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<Testing>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    IsArchive = model.IsArchive,                    
                    StopLossPercent = model.StopLossPercent,
                    StartDeposit = model.StartDeposit,
                    LearningId = model.LearningId,
                    DatasetId = model.DatasetId,
                });
            }
        }

        public void Delete(Guid id)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");
            
            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"DELETE FROM
                                public.""Testing""
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<Testing>(query, new {
                    Id = id,
                });
            }
        }
    }
}