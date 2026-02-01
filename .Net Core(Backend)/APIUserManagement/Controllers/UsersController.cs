using APIUserManagement.Data;
using APIUserManagement.Models;
using APIUserManagement.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Create(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = from u in _context.Users
                    join c in _context.Countries on u.CountryId equals c.CountryId
                    join s in _context.States on u.StateId equals s.StateId
                    join ci in _context.Cities on u.CityId equals ci.CityId
                    select new
                    {
                        u.UserId,
                        u.UserName,
                        u.Email,
                        u.MobileNo,
                        CountryName = c.CountryName,
                        StateName = s.StateName,
                        CityName = ci.CityName,
                        u.CreatedDate
                    };

        return Ok(users.ToList());
    }


    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_context.Users.Find(id));
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, User user)
    {
        var existing = _context.Users.Find(id);
        if (existing == null) return NotFound();

        existing.UserName = user.UserName;
        existing.Email = user.Email;
        existing.MobileNo = user.MobileNo;

        _context.SaveChanges();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();

        _context.Users.Remove(user);
        _context.SaveChanges();
        return Ok("User deleted");
    }
}
