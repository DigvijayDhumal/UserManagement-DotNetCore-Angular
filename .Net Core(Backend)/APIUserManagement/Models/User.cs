namespace APIUserManagement.Models;

public class User
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string MobileNo { get; set; }
    public int CountryId { get; set; }
    public int StateId { get; set; }
    public int CityId { get; set; }
    public string Password { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}
