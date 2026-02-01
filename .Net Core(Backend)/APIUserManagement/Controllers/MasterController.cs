using APIUserManagement.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/master")]
public class MasterController : ControllerBase
{
    private readonly AppDbContext _context;

    public MasterController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("countries")]
    public IActionResult Countries() => Ok(_context.Countries.ToList());

    [HttpGet("states/{countryId}")]
    public IActionResult States(int countryId) =>
        Ok(_context.States.Where(x => x.CountryId == countryId).ToList());

    [HttpGet("cities/{stateId}")]
    public IActionResult Cities(int stateId) =>
        Ok(_context.Cities.Where(x => x.StateId == stateId).ToList());
}
