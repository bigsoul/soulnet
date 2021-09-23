using System.Data;
using Soulnet.Model.Entity;
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;
using System;

namespace Soulnet.Data.Repositories 
{
    public class DataFileRepository : EntityBaseRepository<DataFile>
    {   
        private IConfiguration _configuration;

        public DataFileRepository (IConfiguration configuration) { 
            _configuration = configuration;
        }

        public void Create(DataFile model)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {
                var query = @"INSERT INTO public.""DataFile"" (
                                ""Id"", ""Name"", ""Ext"", ""Size"", ""CRC32""
                              )
                              VALUES (
                                @Id, @Name, @Extm, @Size, @CRC32
                              );"; 

                db.Query<DataFile>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    Ext = model.Ext,
                    Size = model.Size,
                    CRC32 = model.CRC32
                });
            }
        }

        public void Update(DataFile model) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"UPDATE
                                public.""DataFile""
                              SET
                                ""Name"" = @Name,
                                ""Ext"" = @Ext,
                                ""Size"" = @Size,
                                ""CRC32"" = @CRC32
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<DataFile>(query, new {
                    Id = model.Id,
                    Name = model.Name,
                    Ext = model.Ext,
                    Size = model.Size,
                    CRC32 = model.CRC32
                });
            }
        }
        public void Delete(Guid id)
        {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");
            
            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var query = @"DELETE FROM
                                public.""DataFile""
                              WHERE 
                                ""Id"" = @Id;"; 

                db.Query<DataFile>(query, new {
                    Id = id,
                });
            }
        }
    }
}