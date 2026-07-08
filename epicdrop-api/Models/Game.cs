namespace epicdrop_api.Models;

public class Game
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Platform Platform { get; set; }
    public string? ImageUrl { get; set; }
    public string? StoreUrl { get; set; }
    
    // Когда раздача началась
    public DateTime StartDate { get; set; }
    
    // Когда раздача заканчивается
    public DateTime? EndDate { get; set; }
    
    // Активна ли ещё раздача
    public bool IsActive => EndDate == null || EndDate > DateTime.UtcNow;
    
    // Дата парсинга
    public DateTime ParsedAt { get; set; } = DateTime.UtcNow;
}