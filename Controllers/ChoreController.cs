using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using HouseRules.Models;
using HouseRules.Models.DTOs;
using HouseRules.Data;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace HouseRules.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet()]
    [Authorize]
    public IActionResult GetChores(IMapper mapper)
    {

        var chores = _dbContext
        .Chores
        .ProjectTo<ChoreBasicDTO>(mapper.ConfigurationProvider)
        .ToList();

        return Ok(chores);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetChoreById(IMapper mapper, int id)
    {

        var chores = _dbContext
        .Chores
        .ProjectTo<ChoreDTO>(mapper.ConfigurationProvider)
        .SingleOrDefault(c => c.Id == id);

        return Ok(chores);
    }

    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult CompleteChore(int id, [FromQuery] int userId)
    {
        // Check if the chore exists
        var choreExists = _dbContext.Chores.Any(c => c.Id == id);
        if (!choreExists)
        {
            return NotFound($"Chore with ID {id} not found.");
        }

        // Create a new ChoreCompletion entry
        var choreCompletion = new ChoreCompletion
        {
            ChoreId = id,
            UserProfileId = userId,
            CompletedOn = DateTime.UtcNow
        };

        // Add the new completion to the database
        _dbContext.ChoreCompletions.Add(choreCompletion);
        _dbContext.SaveChanges();

        // Return 204 No Content response
        return NoContent();
    }


    [HttpPost()]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateChore(IMapper mapper, ChoreBasicDTO choreDTO)
    {
        // Add the chore to the database
        var chore = mapper.Map<Chore>(choreDTO);
        _dbContext.Chores.Add(chore);
        _dbContext.SaveChanges();

        // Return a Created response with the location of the new resource
        return Created($"/api/Chore/{chore.Id}", chore);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult EditChore(IMapper mapper, int id, Chore chore)
    {
        var choreToUpdate = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
        if (choreToUpdate == null)
        {
            return NotFound($"ChoreCompletion with ID {id} not found.");
        }
        choreToUpdate.Name = chore.Name;
        choreToUpdate.Difficulty = chore.Difficulty;
        choreToUpdate.ChoreFrequencyDays = chore.ChoreFrequencyDays;


        _dbContext.SaveChanges();

        // Return a Created response with the location of the new resource
        return Ok(choreToUpdate);
    }

    [HttpDelete("{id}/delete")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        var choreToDelete = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
        if (choreToDelete == null)
        {
            return NotFound($"ChoreCompletion with ID {id} not found.");
        }

        _dbContext.Chores.Remove(choreToDelete);
        _dbContext.SaveChanges();

        // Return a Created response with the location of the new resource
        return NoContent();
    }

    [HttpPut("{id}/assign")]
    [Authorize(Roles = "Admin")]

    public IActionResult AssignChore(int id, int userId)
    {
        var chore = _dbContext.Chores
        .Include(c => c.UserProfiles)
        .FirstOrDefault(c => c.Id == id);

        var user = _dbContext.UserProfiles
        .FirstOrDefault(u => u.Id == userId);

        if (chore == null || user == null)
        {
            return NotFound("Chore or User not found.");
        }

        // Add the user to the chore's UserProfiles collection
        if (!chore.UserProfiles.Contains(user))
        {
            chore.UserProfiles.Add(user);
            _dbContext.SaveChanges();
            return Ok($"Chore {id} successfully assigned to user {userId}");
        }

        return BadRequest("User is already assigned to this chore.");
    }

    [HttpPut("{id}/UnAssign")]
    [Authorize(Roles = "Admin")]

    public IActionResult UnAssignChore(int id, int userId)
    {
        var chore = _dbContext.Chores
        .Include(c => c.UserProfiles)
        .FirstOrDefault(c => c.Id == id);

        var user = _dbContext.UserProfiles
        .FirstOrDefault(u => u.Id == userId);

        if (chore == null || user == null)
        {
            return NotFound("Chore or User not found.");
        }

        // Add the user to the chore's UserProfiles collection
        if (chore.UserProfiles.Contains(user))
        {
            chore.UserProfiles.Remove(user);
            _dbContext.SaveChanges();
            return Ok($"User-{userId} succesfully removed from Chore-{id}");
        }

        return BadRequest("User is not yet assigned to this chore.");
    }



}