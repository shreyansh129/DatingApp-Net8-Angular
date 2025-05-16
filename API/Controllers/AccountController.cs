using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext Context, ITokenServices tokenServices) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExist(registerDto.Username)) { return BadRequest("Username is taken."); }
        
        return Ok();

        // using var hmac = new HMACSHA512();

        // var user = new AppUser
        // {
        //     UserName = registerDto.Username.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };

        // Context.Users.Add(user);
        // await Context.SaveChangesAsync();

        // return new UserDto
        // {
        //     Username = user.UserName,
        //     Token = tokenServices.CreateToken(user)
        // };

    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await Context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
        
        if (user == null) return Unauthorized("Invalid Username");
        
        using var hmac =new HMACSHA512(user.PasswordSalt);

        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < ComputeHash.Length; i++)
        {
            if(ComputeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }

        return new UserDto
        {
            Username = user.UserName,
            Token = tokenServices.CreateToken(user)
        };

    }


    private async Task<bool> UserExist(string username)
    {
        return await Context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}
