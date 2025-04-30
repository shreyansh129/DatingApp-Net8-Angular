using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extentions;

public static class IdentityServiceExtention
{
    public static IServiceCollection AddIdentityService(this IServiceCollection services,
    IConfiguration config)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
 .AddJwtBearer(options =>
 {
     var tokenKey = config["TokenKey"] ?? throw new Exception("TokenKey Not Found.");
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
         ValidateIssuer = false,
         ValidateAudience = false
     };
 });
        return services;
    }
}
