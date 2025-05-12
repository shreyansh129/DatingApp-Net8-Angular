using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


public class BuggyController(DataContext context) : BaseApiController
{
    [Authorize]
    [HttpGet("auth")] // api/buggy/auth
    public ActionResult<string> GetAuth()
    {
        return "secret text";
    }

    [HttpGet("not-found")] // api/buggy/not-found
    public ActionResult<AppUser> GetNotFound()
    {
        var thing = context.Users.Find(-1);

        if (thing == null) return NotFound();

        return thing;
    }

    [HttpGet("server-error")] // api/buggy/server-error
    public ActionResult<AppUser> GetServerError()
    {
    var thing = context.Users.Find(-1) ?? throw new Exception("There is an server-error");

        return thing;
    }

    [HttpGet("bad-request")] // api/buggy/bad-request
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This is a bad-request");
    }
}