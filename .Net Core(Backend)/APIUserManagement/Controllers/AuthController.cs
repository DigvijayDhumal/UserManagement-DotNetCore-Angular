using APIUserManagement.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public IActionResult Login(string email, string password)
    {
        var user = _context.Users
            .FirstOrDefault(x => x.Email == email && x.Password == password);

        if (user == null)
            return Unauthorized("Invalid credentials");

        return Ok(user);
    }
}
