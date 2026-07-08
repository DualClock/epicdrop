using Microsoft.AspNetCore.Mvc;
using epicdrop_api.Models;
using epicdrop_api.Services;

namespace epicdrop_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly SteamParser _steamParser;
    private readonly EpicParser _epicParser;

    public GamesController(SteamParser steamParser, EpicParser epicParser)
    {
        _steamParser = steamParser;
        _epicParser = epicParser;
    }

    // GET /api/games
    [HttpGet]
    public async Task<ActionResult<List<Game>>> GetAll(
        [FromQuery] Platform? platform = null)
    {
        var steamGames = await _steamParser.ParseFreeGamesAsync();
        var epicGames = await _epicParser.ParseFreeGamesAsync();
        
        var allGames = steamGames.Concat(epicGames).ToList();

        if (platform.HasValue)
        {
            allGames = allGames.Where(g => g.Platform == platform).ToList();
        }

        return Ok(allGames);
    }

    // GET /api/games/steam
    [HttpGet("steam")]
    public async Task<ActionResult<List<Game>>> GetSteam()
    {
        var games = await _steamParser.ParseFreeGamesAsync();
        return Ok(games);
    }

    // GET /api/games/epic
    [HttpGet("epic")]
    public async Task<ActionResult<List<Game>>> GetEpic()
    {
        var games = await _epicParser.ParseFreeGamesAsync();
        return Ok(games);
    }
}