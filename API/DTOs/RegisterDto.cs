using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;
    [Required]
    [StringLength(10,MinimumLength = 6)]
    public string Password { get; set; } = string.Empty;
}
