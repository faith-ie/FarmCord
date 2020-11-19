using System;
namespace FarmCord.Services.UserBlackListService
{
    public class UserBlackListDoc
    {
        public ulong UserId
        {
            get; set;
        }
        public DateTime BanDate
        {
            get; set;
        }
        public string Reason
        {
            get; set;

        }
        public string UserName
        {
            get; set;
        }
    }
}
