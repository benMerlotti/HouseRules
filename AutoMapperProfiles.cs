using AutoMapper;
using HouseRules.Models;
using HouseRules.Models.DTOs;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {

        CreateMap<UserProfile, UserProfileDTO>();
        CreateMap<UserProfileDTO, UserProfile>();
        CreateMap<UserProfile, UserProfileByIdDTO>();
        CreateMap<UserProfileByIdDTO, UserProfile>();
        CreateMap<ChoreCompletion, ChoreCompletionDTO>();
        CreateMap<ChoreCompletionDTO, ChoreCompletion>();
        CreateMap<ChoreCompletion, BasicChoreCompletionDTO>();
        CreateMap<BasicChoreCompletionDTO, ChoreCompletion>();
        CreateMap<Chore, ChoreDTO>();
        CreateMap<ChoreDTO, Chore>();
        CreateMap<ChoreBasicDTO, Chore>();
        CreateMap<Chore, ChoreBasicDTO>();
    }
}