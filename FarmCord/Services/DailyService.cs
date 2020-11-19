using System;
namespace FarmCord.Services.DailyService
{
    public class DailyService
    {
        public DateTime DailyDate
        {
            get; set;
        }
        public int Amount
        {
            get; set;
        }
        public ulong UserID
        {
            get; set;
        }
    }
}