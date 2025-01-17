using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models.DTOs;

public class ChoreDTO
{
    public int Id { get; set; }
    [MaxLength(100, ErrorMessage = "Chore names bust be 100 characters or less")]
    public string Name { get; set; }
    [Range(1, 5)]
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }

    public List<ChoreCompletionDTO> ChoreCompletions { get; set; }
    public List<UserProfileDTO> UserProfiles { get; set; }

}

public class ChoreBasicDTO
{
    public int Id { get; set; }
    [MaxLength(100, ErrorMessage = "Chore names bust be 100 characters or less")]
    public string Name { get; set; }
    [Range(1, 5)]
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreCompletionDTO> ChoreCompletions { get; set; }
}