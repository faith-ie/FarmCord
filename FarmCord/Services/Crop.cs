namespace FarmCord.Services.Crop
{
    public class Crop
    {
        private string cashBack;
        private int numberOfSeeds;
        private bool destructible;
        private int itemID;

        public string CashBack
        {
            get; set;
        }

        public int NumberOfSeeds
        {
            get; set;
        }

        public bool Destructible
        {
            get; set;
        }

        public int ItemID
        {
            get; set;
        }
    }
}