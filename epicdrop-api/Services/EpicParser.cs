using epicdrop_api.Models;

namespace epicdrop_api.Services;

public class EpicParser : IGameParser
{
    public Task<List<Game>> ParseFreeGamesAsync()
    {
        // ПОТОМ: реальный парсинг https://store.epicgames.com/ru/free-games
        // СЕЙЧАС: мок-данные
        var games = new List<Game>
        {
            new()
            {
                Id = 3,
                Title = "Fall Guys",
                Description = "Королевская битва с забавными персонажами",
                Platform = Platform.EpicGames,
                ImageUrl = "https://cdn1.epicgames.com/offer/50118b7f954e450f8823df1614b24e80/EGS_FallGuys_Mediatonic_S2_1200x1600-6d0e1e1c3e3e3e3e3e3e3e3e3e3e3e3e",
                StoreUrl = "https://store.epicgames.com/ru/p/fall-guys",
                StartDate = DateTime.UtcNow.AddMonths(-6),
                EndDate = null
            },
            new()
            {
                Id = 4,
                Title = "Rocket League",
                Description = "Футбол на машинах",
                Platform = Platform.EpicGames,
                ImageUrl = "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S2_1200x1600-6d0e1e1c3e3e3e3e3e3e3e3e3e3e3e3e",
                StoreUrl = "https://store.epicgames.com/ru/p/rocket-league",
                StartDate = DateTime.UtcNow.AddYears(-2),
                EndDate = null
            }
        };
        
        return Task.FromResult(games);
    }
}