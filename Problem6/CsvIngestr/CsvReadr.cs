using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CsvIngestr
{
    public class CsvReadr<T> where T : new()
    {
        private string[] Headers { get; set; }
        private string[] Rows { get; set; }
        private int CurrentRow { get; set; }
        public CsvReadr(string filename)
        {
            Rows = File.ReadAllLines(filename);
            Headers = Rows[0].Split(',', StringSplitOptions.TrimEntries);
            CurrentRow = 1;
        }

        public bool HasRowsRemaining()
        {
            return CurrentRow < Rows.Length;
        }

        public T ReadRow()
        {
            T obj = new T();

            string row = Rows[CurrentRow];

            //If this csv needs to handle quoted cell values, then read the row char by char and mark if inside of quote block
            var cells = row.Split(',', StringSplitOptions.TrimEntries);

            CurrentRow++;

            if(cells.Length != Headers.Length)
            {
                throw new InvalidDataException($"There are {cells.Length} cells and {Headers.Length} Headers");
            }

            for(int i = 0; i < Headers.Length; i++)
            {
                var header = Headers[i];
                var value = cells[i];
                var property = obj.GetType().GetProperty(header);
                property.SetValue(obj, Convert.ChangeType(value, property.PropertyType), null);
            }

            return obj;
        }
    }
}
