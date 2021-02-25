namespace Soulnet.Api.ViewModels
{
    public class AuthData
    {
        public string JwtToken { get; set; }
        public long JwtTokenExpirationTime { get; set; }
        public string Id { get; set; }
    }
}