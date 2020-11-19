
namespace FarmCord.Services.Crop
{
   public class Crop
    {
        public string CashBack;
        public int NumberOfSeeds;
        public bool Destructible;
        public int ItemID;

        public Crop(string CashBack, int NumberOfSeeds, bool Destructible, int ItemID)
        {
            this.CashBack = CashBack;
            this.NumberOfSeeds = NumberOfSeeds;
            this.Destructible = Destructible;
            this.ItemID = ItemID;
        }
    }
}