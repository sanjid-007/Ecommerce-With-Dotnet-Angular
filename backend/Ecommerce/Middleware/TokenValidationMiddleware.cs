using Microsoft.AspNetCore.Http;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Middleware
{
    public class TokenValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly ConcurrentDictionary<string, bool> BlacklistedTokens = new ConcurrentDictionary<string, bool>();

        public TokenValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null && BlacklistedTokens.ContainsKey(token))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid token or logged out.");
                return;
            }

            await _next(context);
        }

        // Method to add tokens to the blacklist
        public static void BlacklistToken(string token)
        {
            BlacklistedTokens.TryAdd(token, true);
        }
    }
}
