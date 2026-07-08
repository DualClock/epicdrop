using epicdrop_api.Models;

namespace epicdrop_api.Services;

public interface IGameParser
{
    Task<List<Game>> ParseFreeGamesAsync();
}