using Connectify.Entities;

namespace Connectify.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}