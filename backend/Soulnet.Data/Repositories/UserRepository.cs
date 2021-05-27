using System.Collections.Generic;
using System.Data;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Soulnet.Model.Entity;

namespace Soulnet.Data.Repositories 
{
    public class UserFilter {
        public string Email { get; set; }
        public string Username { get; set; }
    }

    public class UserRepository : EntityBaseRepository<User>
    {     
        private IConfiguration _configuration;
        private string _queryCreate;
        private string _queryRead;

        public UserRepository (IConfiguration configuration) { 
            _configuration = configuration;
            _queryCreate = @"INSERT INTO public.""User"" (""Id"", ""Username"", ""Email"", ""Password"")
                            VALUES (@Id, @Username, @Email, @Password)";
            _queryRead = @"SELECT * FROM public.""User""";
        }

        private QueryParametrs QueryAddParametrs(UserFilter filter) {
            var query = _queryRead;
            var dynamicParameters = new DynamicParameters();

            var where = false;

            if (filter.Email != null) {
                if (!where) {
                    where = true;
                    query += @" WHERE";
                } else {
                    query += @" AND";
                }
                query += @" ""Email"" = @Email";
                dynamicParameters.Add("Email", filter.Email);
            }

            if (filter.Username != null) {
                if (!where) {
                    where = true;
                    query += @" WHERE";
                } else {
                    query += @" AND";
                }
                query += @" ""Username"" = @Username";
                dynamicParameters.Add("Username", filter.Username);
            }

            return new QueryParametrs() {
                Query = query,
                DynamicParameters = dynamicParameters
            };
        }

        public void Create(User user) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {
                db.Execute(_queryCreate, new { 
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Password = user.Password
                 });    
            }
        }

        public List<User> Read(UserFilter filter) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            IEnumerable<User> result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var queryParametrs = QueryAddParametrs(filter);
                result = db.Query<User>(queryParametrs.Query, queryParametrs.DynamicParameters);
            }
            
            return result.AsList();
        }

        public User ReadFirstOrDefault(UserFilter filter) {
            var connectionString = _configuration.GetConnectionString("SoulnetContext");

            User result;

            using(IDbConnection db = new NpgsqlConnection(connectionString)) {   
                var queryParametrs = QueryAddParametrs(filter);
                result = db.QueryFirstOrDefault<User>(queryParametrs.Query, queryParametrs.DynamicParameters);
            }

            if (result == null) {
                result = new User();
            }
            
            return result;
        }

        public bool IsEmailUniq (string email) 
        {
            var result = Read(new UserFilter { Email = email });
            return result.Count == 0;
        }

        public bool IsUsernameUniq (string username) 
        {
            var result = Read(new UserFilter { Username = username });
            return result.Count == 0;
        }
    }
}