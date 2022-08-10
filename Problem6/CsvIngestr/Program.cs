// See https://aka.ms/new-console-template for more information
using CsvIngestr;

Console.WriteLine("Hello, World!");


var reader = new CsvReadr<Enrollment>("./MOCK_DATA.csv");

var companies = new Dictionary<string, Dictionary<string, Enrollment>>();

while (reader.HasRowsRemaining())
{
    var row = reader.ReadRow();

    Console.WriteLine($"Id: {row.Id} First: {row.FirstName} Last: {row.LastName} Version: {row.Version} Insurance: {row.Insurance}");

    if (!companies.ContainsKey(row.Insurance))
    {
        companies.Add(row.Insurance, new Dictionary<string, Enrollment>());
    }

    var users = companies[row.Insurance];

    var key = row.Id;

    if (users.ContainsKey(key))
    {
        var current = users[key];
        if (current.Version < row.Version)
        {
            users[key] = row;
        }
    } else
    {
        users[key] = row;
    }

}

foreach(var kvp in companies)
{
    var filename = $"{kvp.Key}.csv";

    var enrollments = kvp.Value.Values.OrderBy(e=> e.LastName).ThenBy(e=> e.FirstName).ToList();

    var header = "Id,FirstName,LastName,Version,Insurance";

    var rows = enrollments
        .Select(e => $"{e.Id},{e.FirstName},{e.LastName},{e.Version},{e.Insurance}")
        .ToList();

    var lines = new List<string>();
    lines.Add(header);
    lines.AddRange(rows);

    File.WriteAllLines(filename, lines);

    Console.WriteLine($"{filename} has {rows.Count()} records");
}