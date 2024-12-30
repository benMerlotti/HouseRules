using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Models;

public class Chore
{
    public int Id { get; set; }
    [Required]
    [MaxLength(100, ErrorMessage = "Chore names bust be 100 characters or less")]
    public string Name { get; set; }
    [Required]
    [Range(1, 5)]
    public int Difficulty { get; set; }
    [Required]
    public int ChoreFrequencyDays { get; set; }

    // Initialize the lists
    public List<ChoreCompletion> ChoreCompletions { get; set; } = new List<ChoreCompletion>();
    public List<UserProfile> UserProfiles { get; set; } = new List<UserProfile>();

}