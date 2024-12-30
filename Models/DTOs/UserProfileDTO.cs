using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }

    public string UserName { get; set; }
    public List<string> Roles { get; set; }

    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<Chore> Chores { get; set; }
    public List<BasicChoreCompletionDTO> ChoreCompletions { get; set; }

}

public class UserProfileByIdDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }

    public string UserName { get; set; }
    public List<Chore> Chores { get; set; }
    public List<BasicChoreCompletionDTO> ChoreCompletions { get; set; }

}