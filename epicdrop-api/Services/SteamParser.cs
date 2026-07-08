using epicdrop_api.Models;

namespace epicdrop_api.Services;

public class SteamParser : IGameParser
{
    public Task<List<Game>> ParseFreeGamesAsync()
    {
        // ПОТОМ: реальный парсинг https://store.steampowered.com/genre/Free%20to%20Play/
        // СЕЙЧАС: мок-данные для теста фронта
        var games = new List<Game>
        {
            new()
            {
                Id = 1,
                Title = "Dota 2",
                Description = "Бесплатная MOBA от Valve",
                Platform = Platform.Steam,
                ImageUrl = "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg",
                StoreUrl = "https://store.steampowered.com/app/570",
                StartDate = DateTime.UtcNow.AddYears(-10),
                EndDate = null // Бессрочно бесплатно
            },
            new()
            {
                Id = 2,
                Title = "Team Fortress 2",
                Description = "Командный шутер от Valve",
                Platform = Platform.Steam,
                ImageUrl = "https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg",
                StoreUrl = "https://store.steampowered.com/app/440",
                StartDate = DateTime.UtcNow.AddYears(-15),
                EndDate = null
            }
        };
        
        return Task.FromResult(games);
    }
}