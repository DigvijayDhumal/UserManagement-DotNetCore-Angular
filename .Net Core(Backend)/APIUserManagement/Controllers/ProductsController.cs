using APIUserManagement.Data;
using APIUserManagement.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    // ===================== ADD PRODUCT =====================
    [HttpPost]
    public IActionResult Create(Product product)
    {
        if (product == null)
            return BadRequest("Invalid product data");

        product.CreatedDate = DateTime.Now;

        _context.Products.Add(product);
        _context.SaveChanges();

        return Ok(product);
    }

    // ===================== GET PRODUCTS BY USER =====================
    [HttpGet("user/{userId}")]
    public IActionResult GetByUser(int userId)
    {
        var products = _context.Products
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedDate)
            .ToList();

        return Ok(products);
    }

    // ===================== UPDATE PRODUCT =====================
    [HttpPut("{id}")]
    public IActionResult Update(int id, Product product)
    {
        var existing = _context.Products.Find(id);
        if (existing == null)
            return NotFound("Product not found");

        existing.ProductName = product.ProductName;
        existing.Price = product.Price;
        existing.Quantity = product.Quantity;

        _context.SaveChanges();

        return Ok(existing);
    }

    // ===================== DELETE PRODUCT =====================
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null)
            return NotFound("Product not found");

        _context.Products.Remove(product);
        _context.SaveChanges();

        return Ok(new { message = "Product deleted successfully" });
    }
}
